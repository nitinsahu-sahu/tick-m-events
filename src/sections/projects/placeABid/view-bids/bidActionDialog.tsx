import {
    Typography, Box, TextField, Chip, Button, Avatar,
    Alert, Dialog, DialogTitle,
    DialogContent, DialogActions
} from "@mui/material";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { CheckCircle, Cancel, } from "@mui/icons-material";

import { assignProjectToProvider } from "src/redux/actions/organizer/pageEvents";
import { AppDispatch } from "src/redux/store";

export function BidActionDialog({ open, selectedBid, onClose, onAction }: any) {
    const [actionType, setActionType] = useState(null); // 'reject' or 'accept'
    const [rejectionReason, setRejectionReason] = useState("");
    const [acceptedAmount, setAcceptedAmount] = useState(0);
    const [errors, setErrors] = useState({ acceptedAmount: "", rejectionReason: "", message: "" });
    const dispatch = useDispatch<AppDispatch>();

    const handleActionClick = (type: any) => {
        setActionType(type);
        if (type === 'accepted') {
            setAcceptedAmount(selectedBid?.bidAmount || 0);
        }
    };

    const handleConfirmAction = useCallback(async () => {
        const newErrors = { acceptedAmount: "", rejectionReason: "", message: "" };

        if (actionType === 'rejected' && !rejectionReason.trim()) {
            newErrors.rejectionReason = 'Rejection reason is required';
        }

        if (actionType === 'accepted' && (!acceptedAmount || acceptedAmount <= 0)) {
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
            acceptedAmount
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
    }, [acceptedAmount, actionType, dispatch, onAction, rejectionReason, selectedBid]);

    const handleCancelAction = () => {
        setActionType(null);
        setRejectionReason("");
        setAcceptedAmount(0);
        setErrors({ acceptedAmount: "", rejectionReason: "", message: "" });
    };

    const handleClose = () => {
        handleCancelAction();
        onClose();
    };

    return (
        <>
            {/* Main Bid Details Dialog */}
            <Dialog open={open && !actionType} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedBid && (
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
                    )}
                </DialogTitle>
                <DialogContent>
                    {selectedBid && (
                        <>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    {selectedBid.bidAmount} XAF
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Delivery in {selectedBid.deliveryTime} {selectedBid.deliveryUnit}
                                </Typography>
                                <Chip
                                    label={selectedBid.status}
                                    color={
                                        selectedBid.status === 'accepted' ? 'success' :
                                            selectedBid.status === 'rejected' ? 'error' : 'default'
                                    }
                                    size="small"
                                    sx={{ mt: 1, textTransform: "capitalize" }}
                                />
                            </Box>

                            <Typography variant="h6" gutterBottom>Proposal</Typography>
                            <Typography variant="body1" paragraph>
                                {selectedBid.proposal}
                            </Typography>

                            {selectedBid.milestones && selectedBid.milestones.length > 0 && (
                                <>
                                    <Typography variant="h6" gutterBottom>Milestones</Typography>
                                    {selectedBid.milestones.map((milestone: any) => (
                                        <Box key={milestone._id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                            <Typography variant="body1">{milestone.milestorneName}</Typography>
                                            <Typography variant="body1">
                                                {milestone.amount} {milestone.currency}
                                            </Typography>
                                        </Box>
                                    ))}
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
                        onClick={() => handleActionClick('accepted')}
                        disabled={selectedBid?.status !== 'pending'}
                    >
                        Accept Bid
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Reject Confirmation Dialog */}
            <Dialog open={actionType === 'rejected'} onClose={handleCancelAction} maxWidth="sm" fullWidth>
                <DialogTitle>Confirm Rejection</DialogTitle>
                <DialogContent>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        Are you sure you want to reject this bid?
                    </Alert>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Reason for rejection"
                        value={rejectionReason}
                        onChange={(e) => {
                            setRejectionReason(e.target.value);
                            if (errors.rejectionReason) setErrors({ ...errors, rejectionReason: '' });
                        }}
                        error={!!errors.rejectionReason}
                        helperText={errors.rejectionReason || "Please provide a detailed reason for rejection"}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelAction}>Cancel</Button>
                    <Button
                        onClick={handleConfirmAction}
                        color="error"
                        variant="contained"
                    >
                        Confirm Rejection
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Accept Confirmation Dialog */}
            <Dialog open={actionType === 'accepted'} onClose={handleCancelAction} maxWidth="sm" fullWidth>
                <DialogTitle>Confirm Acceptance</DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        Are you sure you want to accept this bid?
                    </Alert>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="error">
                            {
                                errors.message
                            }
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Original Bid Amount: {selectedBid?.bidAmount} XAF
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        type="number"
                        label="Accepted Amount (XAF)"
                        value={acceptedAmount}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setAcceptedAmount(value ? 0 : value);
                            if (errors.acceptedAmount) setErrors({ ...errors, acceptedAmount: '' });
                        }}
                        error={!!errors.acceptedAmount}
                        helperText={errors.acceptedAmount || "Enter the final accepted amount"}
                        required
                        inputProps={{
                            min: 1,
                            max: selectedBid?.bidAmount || 0
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelAction}>Cancel</Button>
                    <Button
                        onClick={handleConfirmAction}
                        color="success"
                        variant="contained"
                    >
                        Confirm Acceptance
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}