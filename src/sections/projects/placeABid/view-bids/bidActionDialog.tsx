import {
    Typography, Box, TextField, Chip, Button, Avatar, FormControl, InputLabel,
    Alert, Dialog, DialogTitle, Grid, MenuItem, SelectChangeEvent, Tooltip,
    DialogContent, DialogActions, Stack, Divider, IconButton, Select
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info'; // or your preferred info icon
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Cancel, Edit, Save } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { assignProjectToProvider } from "src/redux/actions/organizer/pageEvents";
import { AppDispatch, RootState } from "src/redux/store";
import { formatEventDate } from "src/hooks/formate-time";
import { ConfirmAcceptanceDialog } from "./Confirm-acceptance-dialog";
import RejectConfirmationDialog from "./reject-confirmation-dialog";
// import axios from "../../../../redux/helper/axios";

interface Milestone {
    _id: number;
    milestorneName: string;
    amount: string;
    currency: "XAF" | "USD";
    isReleased: boolean
}

interface BidData {
    bidAmount: string;
    deliveryTime: string;
    deliveryUnit: string;
    proposal: string;
}

interface FormErrors {
    [key: string]: string;
}

interface BidErrors {
    bidAmount?: string;
    deliveryTime?: string;
    deliveryUnit?: string;
    proposal?: string;
    [key: string]: string | undefined;
}

export function BidActionDialog({ open, selectedBid, onClose, onAction, project }: any) {
    const [actionType, setActionType] = useState(null); // 'reject' or 'accept'
    const { user } = useSelector((state: RootState) => state?.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const [statuss, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const [rejectionReason, setRejectionReason] = useState("");
    const [acceptedAmount, setAcceptedAmount] = useState(0);
    const [errors, setErrors] = useState({ acceptedAmount: "", rejectionReason: "", message: "" });
    const dispatch = useDispatch<AppDispatch>();
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [errorss, setErrorss] = useState<BidErrors>({});
    const [loading, setLoading] = useState(false);
    const [statusUpdates, setStatusUpdates] = useState<Record<string, string>>({});

    const [bidData, setBidData] = useState<BidData>({
        bidAmount: '',
        deliveryTime: selectedBid?.deliveryTime?.toString() || "1",
        deliveryUnit: selectedBid?.deliveryUnit || "Days",
        proposal: ""
    });


    // Initialize milestones from selectedBid when dialog opens
    useEffect(() => {
        if (selectedBid && selectedBid.milestones) {
            setBidData({
                bidAmount: selectedBid.bidAmount?.toString() || "",
                deliveryTime: selectedBid.deliveryTime?.toString() || "1",
                deliveryUnit: selectedBid.deliveryUnit || "Days",
                proposal: selectedBid.proposal || ""
            });
            const initialMilestones = selectedBid.milestones.map((milestone: any, index: number) => ({
                _id: milestone._id || index + 1,
                milestorneName: milestone.milestorneName || "",
                amount: milestone.amount?.toString() || "",
                currency: milestone.currency || "XAF",
                isReleased: milestone.isReleased || false
            }));
            setMilestones(initialMilestones);
        }
    }, [selectedBid]);


    const toggleEdit = () => {
        if (isEditing) {
            // If saving, validate the form
            if (validateForm()) {
                setIsEditing(false);
            }
        } else {
            // Enable editing
            setIsEditing(true);
        }
    };

    const addMilestone = () => {
        if (milestones.length < 5) {
            setMilestones(prev => [
                ...prev,
                { _id: Date.now(), milestorneName: "", amount: "", currency: "XAF", isReleased: false }
            ]);
        }
    };

    const removeMilestone = (_id: number) => {
        if (milestones.length > 1) {
            setMilestones(prev => prev.filter(milestone => milestone._id !== _id));
        }
    };

    const handleMilestoneChange = (_id: number, field: keyof Milestone, value: string) => {
        setMilestones(prev => {
            const updated = prev.map(milestone =>
                milestone._id === _id ? { ...milestone, [field]: value } : milestone
            );
            setTimeout(() => validateForm(), 0);
            return updated;
        });
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        const bidAmountNum = Number(bidData.bidAmount);
        if (!bidData.bidAmount || Number.isNaN(bidAmountNum) || bidAmountNum <= 0) {
            newErrors.bidAmount = "Please enter a valid bid amount";
        }

        const deliveryTimeNum = parseInt(bidData.deliveryTime, 10);
        if (!bidData.deliveryTime || Number.isNaN(deliveryTimeNum) || deliveryTimeNum <= 0) {
            newErrors.deliveryTime = "Please enter a valid delivery time";
        }

        if (!bidData.proposal || bidData.proposal.length < 100) {
            newErrors.proposal = "Proposal must be at least 100 characters";
        }

        // Track milestone total and mark only the violating milestone
        let runningTotal = 0;
        milestones.forEach((milestone, index) => {
            const name = milestone.milestorneName.trim();
            const amountNum = Number(milestone.amount);

            if (!name) {
                newErrors[`milestone_${index}_milestorneName`] = "Milestone name is required";
            }

            if (!milestone.amount || Number.isNaN(amountNum) || amountNum <= 0) {
                newErrors[`milestone_${index}_amount`] = "Valid amount is required";
            } else {
                runningTotal += amountNum;

                if (bidAmountNum > 0 && runningTotal > bidAmountNum) {
                    newErrors[`milestone_${index}_amount`] = "Milestone exceeds the total bid amount";
                }
            }
        });

        setErrorss(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // const handleActionClick = (type: any) => {
    //     setActionType(type);
    //     if (type === 'isOrgnizerAccepted') {
    //         setAcceptedAmount(selectedBid?.bidAmount || 0);
    //     }
    // };
    const handleActionClick = async (type: any) => {
        if (type === 'isOrgnizerAccepted') {
            // Calculate 10% admin fee
            const bidAmount = selectedBid?.bidAmount || 0;
            const adminFee = bidAmount * 0.1;

            // Process admin fee payment first
            const paymentSuccess = await processAdminFeePayment(adminFee);

            if (paymentSuccess) {
                setActionType(type);
                setAcceptedAmount(bidAmount);
            } else {
                setErrors({
                    acceptedAmount: "",
                    rejectionReason: "",
                    message: "Failed to process admin fee payment. Please try again."
                });
                // Remove the unnecessary return statement
            }
        } else {
            setActionType(type);
        }
    };

    const processAdminFeePayment = async (adminFee: number): Promise<boolean> => {
        try {
            const fapshiPayload = {
                amount: Math.round(adminFee), // Round to whole number
                email: user?.email,
                redirectUrl: `${window.location.origin}${location.pathname}?projectId=${project?._id}&bidId=${selectedBid?._id}&adminFee=true`,
                userId: user._id.toString(),
                externalId: `admin_fee_${selectedBid?._id}_${Date.now()}`,
                message: `Admin fee for project award: ${project?.title}`,
            };

            const fapshiRes = await axios.post(
                "https://sandbox.fapshi.com/initiate-pay",
                fapshiPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apikey: 'FAK_TEST_177a608c18c0db8c50be',
                        apiuser: 'f046347f-8d27-40cd-af94-90bc44f3d2c7',
                    },
                    timeout: 10000,
                }
            );

            if (fapshiRes.data && fapshiRes.data.link) {
                // Open payment window and wait for callback
                return await waitForPaymentConfirmation(fapshiRes.data.link);
            }
            return false;
        } catch (error) {
            console.error('Admin fee payment error:', error);
            return false;
        }
    };

    const waitForPaymentConfirmation = (paymentLink: string): Promise<boolean> =>
        new Promise((resolve) => {
            const paymentWindow = window.open(paymentLink, '_self');
            if (!paymentWindow) {
                alert('Please allow popups for this site to make payments');
                resolve(false);
                return;
            }

            let paymentCompleted = false;

            const checkPayment = setInterval(() => {
                try {
                    // Check if payment window is closed by user
                    if (paymentWindow.closed) {
                        clearInterval(checkPayment);
                        if (!paymentCompleted) {
                            // Window was closed manually without completing payment
                            resolve(false);
                        }
                        return;
                    }

                    // Check the main window's URL for payment success parameters
                    const mainWindowParams = new URLSearchParams(window.location.search);
                    const adminFeeStatus = mainWindowParams.get('adminFeeStatus');
                    const transId = mainWindowParams.get('transId');
                    const status = mainWindowParams.get('status');

                    if ((adminFeeStatus === 'success') || (status === 'successful' && transId)) {
                        paymentCompleted = true;
                        clearInterval(checkPayment);

                        // Force close the payment popup
                        paymentWindow.close();

                        // Clean up the main window URL
                        cleanUrlParameters();

                        resolve(true);
                        return;
                    }

                    // Alternative: Check if we're in the popup and payment is successful
                    try {
                        const popupUrl = paymentWindow.location.href;
                        if (popupUrl.includes('success') || popupUrl.includes('status=successful')) {
                            paymentCompleted = true;
                            clearInterval(checkPayment);

                            // Close the popup
                            paymentWindow.close();

                            resolve(true);
                        }
                    } catch (error) {
                        // Cross-origin error - can't access payment window URL
                        // This is normal, continue checking
                    }

                } catch (error) {
                    console.log('Error checking payment status:', error);
                }
            }, 1000);

            // Also listen for message events from the popup
            const handleMessage = (event: MessageEvent) => {
                if (event.data?.type === 'PAYMENT_COMPLETED') {
                    paymentCompleted = true;
                    clearInterval(checkPayment);
                    paymentWindow.close();
                    window.removeEventListener('message', handleMessage);
                    resolve(true);
                }
            };

            window.addEventListener('message', handleMessage);

            // Timeout after 5 minutes
            setTimeout(() => {
                if (!paymentCompleted) {
                    clearInterval(checkPayment);
                    window.removeEventListener('message', handleMessage);
                    if (!paymentWindow.closed) {
                        paymentWindow.close();
                    }
                    resolve(false);
                }
            }, 300000);
        });

    // Helper function to clean URL parameters
    const cleanUrlParameters = () => {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }

        setBidData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setBidData(prev => ({ ...prev, [name]: value }));
    };
    const handleConfirmAction = useCallback(async () => {
        const newErrors = { acceptedAmount: "", rejectionReason: "", message: "" };

        if (actionType === 'rejected' && !rejectionReason.trim()) {
            newErrors.rejectionReason = 'Rejection reason is required';
        }

        if (actionType === 'isOrgnizerAccepted' && (!acceptedAmount || acceptedAmount <= 0)) {
            newErrors.acceptedAmount = 'Valid amount is required';
        }
        // Check if there are any errors (if any error message is not empty)
        const hasErrors = Object.values(newErrors).some(error => error !== "");

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        onAction(selectedBid._id, actionType, {
            rejectionReason,
            acceptedAmount
        });

        const data = {
            status: actionType,
            rejectionReason,
            acceptedAmount,
            bidData,
            milestones
        };

        try {
            const result = await dispatch(assignProjectToProvider(data, selectedBid?.projectId, selectedBid?._id));
            if (result?.status === 200) {
                // Reset state
                setActionType(null);
                setRejectionReason("");
                setAcceptedAmount(0);
                setErrors({ acceptedAmount: "", rejectionReason: "", message: "" });
            } else {
                setErrors({ acceptedAmount: "", rejectionReason: "", message: result?.message });

            }
        } catch (error) {
            console.error("Verification error:", error);
        }
    }, [acceptedAmount, actionType, bidData, milestones, dispatch, onAction, rejectionReason, selectedBid]);

    const handleCancelAction = () => {
        setActionType(null);
        setRejectionReason("");
        setAcceptedAmount(0);
        setErrors({ acceptedAmount: "", rejectionReason: "", message: "" });
    };

    const handleClose = () => {
        handleCancelAction();
        setIsEditing(false);
        onClose();
    };

    const handleStatusChange = (bidId: string, newStatus: string) => {
        setStatusUpdates(prev => ({
            ...prev,
            [bidId]: newStatus
        }));

        // Here you would typically save the status change to your backend
        console.log(`Updating bid ${bidId} status to:`, newStatus);
        // dispatch(updateBidStatus(bidId, newStatus));
    };

    const handleReleaseMilestone = async (milestone: any, bid: any) => {
        const fapshiPayload = {
            amount: Number(milestone?.amount),
            email: user?.email,
            redirectUrl: `http://localhost:3039/place-a-bid/bids/68d7da67a34a3899fbbbdc25?bidId=${bid._id}&milestoneId=${milestone._id}&projectId=${project?._id}`,
            userId: user._id.toString(),
            externalId: `milestone_${milestone._id}_${Date.now()}`, // Unique ID for tracking
            message: `Milestone release for project ${project?.title}`,
        };

        try {
            const fapshiRes = await axios.post(
                "https://sandbox.fapshi.com/initiate-pay",
                fapshiPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apikey: 'FAK_TEST_177a608c18c0db8c50be',
                        apiuser: 'f046347f-8d27-40cd-af94-90bc44f3d2c7',
                    },
                    timeout: 10000, // 10 second timeout
                }
            );
            // Redirect to Fapshi payment page
            if (fapshiRes.data && fapshiRes.data.link) {
                const reslese = window.open(fapshiRes.data.link, '_self');
            }

        } catch (error) {
            console.log('Fapsi erro', error);

        }

        // Your release logic here
    };

    useEffect(() => {
        const handlePaymentCallback = async () => {
            const queryParams = new URLSearchParams(location.search);
            const transId = queryParams.get('transId');
            const fapshistatus = queryParams.get('status');
            const bidId = queryParams.get('bidId');
            const milestoneId = queryParams.get('milestoneId');
            const projectId = queryParams.get('projectId');
            const adminFee = queryParams.get('adminFee');

            // Handle admin fee payment callback
            if (adminFee && fapshistatus === 'successful' && transId) {
                try {
                    // Verify admin fee payment with your backend
                    const verificationResponse = await axios.post('/api/v1/admin/verify-admin-fee-payment', {
                        transId,
                        bidId,
                        projectId,
                        amount: selectedBid.bidAmount * 0.1
                    });

                    if (verificationResponse.data.success) {
                        // Update URL to remove admin fee parameters
                        const newUrl = window.location.pathname + window.location.search.replace(/[?&]adminFee=true&adminFeeStatus=success/, '');
                        window.history.replaceState({}, '', newUrl);

                        setStatus('success');
                        setMessage('Admin fee paid successfully! You can now proceed with awarding the project.');
                    } else {
                        setStatus('error');
                        setMessage('Admin fee payment verification failed.');
                    }
                } catch (error) {
                    setStatus('error');
                    setMessage('Error verifying admin fee payment.');
                }
                return;
            }

            // Existing milestone payment handling...
            if (fapshistatus === 'successful' && transId && !adminFee) {
                // Your existing milestone payment logic...
            }
        };

        handlePaymentCallback();
    }, [location.search, navigate, selectedBid]);

    return (
        <>
            {/* Main Bid Details Dialog */}
            <Dialog open={open && !actionType} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedBid && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                    src={selectedBid.providerId.avatar?.url}
                                    sx={{ mr: 2 }}
                                >
                                    {selectedBid.providerId.name.charAt(0)}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6">{selectedBid.providerId.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedBid.providerId.email}
                                    </Typography>
                                </Box>
                            </Box>
                            <IconButton
                                onClick={toggleEdit}
                                color={isEditing ? "primary" : "default"}
                                sx={{ ml: 2 }}
                            >
                                {isEditing ? <Save /> : <Edit />}
                            </IconButton>
                        </Box>
                    )}
                </DialogTitle>
                <DialogContent>
                    {selectedBid && (
                        <>
                            <Grid item xs={12} md={12}>
                                <Typography variant="subtitle2" gutterBottom>Bid Information</Typography>
                                <Typography><strong>Bid Amount:</strong> {selectedBid.bidAmount} XAF</Typography>
                                <Typography><strong>Delivery Time:</strong> {selectedBid.deliveryTime} {selectedBid.deliveryUnit}</Typography>
                                <Typography><strong>Time to bid:</strong> {formatEventDate(selectedBid?.createdAt)}</Typography>
                                {
                                    selectedBid.isOrgnizerAccepted && (
                                        <Typography sx={{ color: selectedBid.isProviderAccepted ? 'green' : 'red' }}>
                                            <strong style={{ color: "black" }}>Provider Acceptance:</strong>
                                            &nbsp;{selectedBid.isProviderAccepted ? "Accepted" : "Pending"}
                                        </Typography>
                                    )
                                }
                                <Typography sx={{ color: selectedBid.isOrgnizerAccepted ? 'green' : 'red' }}>
                                    <strong style={{ color: "black" }}>Your Acceptance:</strong>
                                    &nbsp;{selectedBid.isOrgnizerAccepted ? "Accepted" : "Pending"}
                                </Typography>
                                <Typography mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <strong>Project Status:</strong>
                                    <FormControl size="small" sx={{ ml: 1, minWidth: 120 }}>
                                        <InputLabel>Project Status</InputLabel>
                                        <Select
                                            sx={{ width: 200, height: 30, textTransform: "capitalize" }}
                                            value={project?.status}
                                            label="Status"
                                            onChange={(e) => handleStatusChange(selectedBid._id, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            disabled={project?.status === "pending" || project?.status === "process"}
                                        >
                                            <MenuItem value={project?.status} disabled>
                                                {project?.status} (Current)
                                            </MenuItem>
                                            <MenuItem value="completed">Mark as Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Tooltip
                                        title="When a project moves into the Ongoing stage, the status select box will automatically open so that you can mark as complete this project."
                                        placement="right"
                                        arrow
                                    >
                                        <IconButton size="small" sx={{ ml: 1, color: 'text.secondary' }}>
                                            <InfoIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Typography>

                            </Grid>


                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={2} mb={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" mb={1}>
                                        Bid Amount (XAF)
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="bidAmount"
                                        variant="outlined"
                                        size="small"
                                        // value={bidData.bidAmount}
                                        onChange={handleInputChange}
                                        // error={!!errors.bidAmount}
                                        // helperText={errors.bidAmount}
                                        disabled={!isEditing}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 1,
                                                backgroundColor: !isEditing ? 'action.disabledBackground' : 'background.paper'
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" mb={1}>
                                        This project will be delivered in
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                        <TextField
                                            name="deliveryTime"
                                            variant="outlined"
                                            size="small"
                                            value={bidData.deliveryTime}
                                            onChange={handleInputChange}
                                            // error={!!errors.deliveryTime}
                                            // helperText={errors.deliveryTime}
                                            disabled={!isEditing}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 1,
                                                    backgroundColor: !isEditing ? 'action.disabledBackground' : 'background.paper'
                                                }
                                            }}
                                        />
                                        <Select
                                            name="deliveryUnit"
                                            variant="outlined"
                                            size="small"
                                            value={bidData.deliveryUnit}
                                            onChange={handleSelectChange}
                                            disabled={!isEditing}
                                            sx={{
                                                minWidth: 100,
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 1,
                                                    backgroundColor: !isEditing ? 'action.disabledBackground' : 'background.paper'
                                                }
                                            }}
                                        >
                                            <MenuItem value="Days">Days</MenuItem>
                                            <MenuItem value="Weeks">Weeks</MenuItem>
                                            <MenuItem value="Months">Months</MenuItem>
                                        </Select>
                                    </Stack>
                                </Grid>
                            </Grid>
                            {selectedBid.milestones && selectedBid.milestones.length > 0 && (
                                <>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
                                        <Typography variant="h6">Milestones</Typography>
                                    </Box>

                                    {milestones.map((milestone, index) => (
                                        <Grid container spacing={2} key={milestone._id} alignItems="center" mb={2}>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    placeholder={`Milestone ${index + 1} name`}
                                                    variant="outlined"
                                                    size="small"
                                                    value={milestone.milestorneName}
                                                    onChange={(e) => handleMilestoneChange(milestone._id, 'milestorneName', e.target.value)}
                                                    error={!!errorss[`milestone_${index}_milestorneName`]}
                                                    helperText={errorss[`milestone_${index}_milestorneName`]}
                                                    disabled={!isEditing}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: 1,
                                                            backgroundColor: !isEditing ? 'action.disabledBackground' : 'background.paper'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Amount"
                                                    variant="outlined"
                                                    size="small"
                                                    value={milestone.amount}
                                                    onChange={(e) => handleMilestoneChange(milestone._id, 'amount', e.target.value)}
                                                    error={!!errorss[`milestone_${index}_amount`]}
                                                    helperText={errorss[`milestone_${index}_amount`]}
                                                    disabled={!isEditing}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: 1,
                                                            backgroundColor: !isEditing ? 'action.disabledBackground' : 'background.paper'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <TextField
                                                    select
                                                    fullWidth
                                                    value={milestone.currency}
                                                    onChange={(e) => handleMilestoneChange(milestone._id, 'currency', e.target.value)}
                                                    variant="outlined"
                                                    size="small"
                                                    disabled={!isEditing}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: 1,
                                                            backgroundColor: !isEditing ? 'action.disabledBackground' : 'background.paper'
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="XAF">XAF</MenuItem>
                                                    <MenuItem value="USD">USD</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    disabled={milestone.isReleased}
                                                    sx={{
                                                        minWidth: '100px',
                                                        backgroundColor: milestone.isReleased ? '#e0e0e0' : '#1976d2',
                                                        color: milestone.isReleased ? '#9e9e9e' : 'white',
                                                        '&:hover': {
                                                            backgroundColor: milestone.isReleased ? '#e0e0e0' : '#1565c0',
                                                        },
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        borderRadius: '4px',
                                                        textTransform: 'none',
                                                        boxShadow: milestone.isReleased ? 'none' : '0 2px 4px rgba(0,0,0,0.2)',
                                                    }}
                                                    onClick={() => handleReleaseMilestone(milestone, selectedBid)}
                                                >
                                                    {milestone.isReleased ? 'Released' : 'Release Funds'}
                                                </Button>
                                            </Grid>
                                            {isEditing && (
                                                <Grid item xs={12} md={1}>
                                                    <IconButton
                                                        onClick={() => removeMilestone(milestone._id)}
                                                        disabled={milestones.length <= 1}
                                                        size="small"
                                                        sx={{
                                                            color: milestones.length <= 1 ? 'grey.400' : 'error.main'
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </Grid>
                                            )}
                                        </Grid>
                                    ))}

                                    {isEditing && (
                                        <Box display="flex" justifyContent="flex-end" mt={1}>
                                            <Button
                                                startIcon={<AddIcon />}
                                                onClick={addMilestone}
                                                disabled={milestones.length >= 5}
                                                size="small"
                                            >
                                                Add Milestone
                                            </Button>
                                        </Box>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        startIcon={<Cancel />}
                        color="error"
                        onClick={() => handleActionClick('rejected')}
                        disabled={selectedBid?.status !== 'pending'}
                    >
                        Reject
                    </Button>
                    <Button
                        startIcon={<CheckCircle />}
                        variant="contained"
                        color="success"
                        onClick={() => handleActionClick('isOrgnizerAccepted')}
                        disabled={selectedBid?.isSigned || isEditing}
                    >
                        Award Request
                        {selectedBid?.bidAmount && (
                            <Tooltip
                                title={`10% admin fee: ${(selectedBid.bidAmount * 0.1).toFixed(2)} XAF will be deducted`}
                                placement="top"
                            >
                                <InfoIcon fontSize="small" sx={{ ml: 1 }} />
                            </Tooltip>
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Reject Confirmation Dialog */}
            <RejectConfirmationDialog
                actionType={actionType}
                handleCancelAction={handleCancelAction}
                rejectionReason={rejectionReason}
                setRejectionReason={setRejectionReason}
                errors={errors}
                setErrors={setErrors}
                handleConfirmAction={handleConfirmAction}
            />


            {/* Accept Confirmation Dialog */}
            <ConfirmAcceptanceDialog
                actionType={actionType}
                handleCancelAction={handleCancelAction}
                selectedBid={selectedBid}
                errors={errors}
                bidData={bidData}
                setAcceptedAmount={setAcceptedAmount}
                setErrors={setErrors}
                handleConfirmAction={handleConfirmAction}
            />
        </>
    );
}