import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';

import {
    Typography, Box, Card, TextField, Grid, Chip, Button, Avatar, Divider,
    Container, Paper, Tabs, Tab, Skeleton, Alert, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions
} from "@mui/material";
import {
    ArrowBack,
    CheckCircle,
    Cancel,
    AttachMoney,
    Schedule,
    Person,
    Work,
    LocationOn,
    Event
} from "@mui/icons-material";
import { assignProjectToProvider, fatchOrgProjectBids } from "src/redux/actions/organizer/pageEvents";
import { AppDispatch, RootState } from "src/redux/store";
import { formatDateTimeCustom } from "src/hooks/formate-time";

// Define TypeScript interfaces for better type safety
interface Provider {
    _id: string;
    name: string;
    email: string;
    experience?: string;
    avatar?: {
        public_id: string;
        url: string;
    };
    reviewCount: number;
}

interface Milestone {
    milestorneName: string;
    amount: number;
    currency: string;
    _id: string;
}

interface Bid {
    _id: string;
    projectId: string;
    providerId: Provider;
    bidAmount: number;
    deliveryTime: number;
    deliveryUnit: string;
    proposal: string;
    milestones: Milestone[];
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    winningBid: number;
}

interface Project {
    _id: string;
    eventId: {
        _id: string;
        eventName: string;
        date: string;
        time: string;
        location: string;
        description: string;
    };
    categoryId: {
        _id: string;
        name: string;
    };
    subcategoryId: {
        _id: string;
        name: string;
    };
    eventLocation: string;
    createdBy: {
        _id: string;
        name: string;
        email: string;
    };
    status: string;
    orgBudget: string;
    orgRequirement: string;
    orgAdditionalRequirement: string;
    providerHasProposed: boolean;
    serviceTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    bidsCount: number;
    avgBidAmount: number;
    totalBidAmount: number;
    bidStatus: string;
}

interface ProjectWithBids {
    project: Project;
    bids: Bid[];
    bidStats: {
        totalBids: number;
        averageBid: number;
        lowestBid: number;
        highestBid: number;
    };
}

export function BidsOnPlaceABid() {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { __projectWithBids } = useSelector((state: RootState) => state.organizer);
    const { projectId } = useParams();



    useEffect(() => {
        if (projectId) {
            dispatch(fatchOrgProjectBids(projectId));
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [dispatch, projectId]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleBidSelect = (bid: Bid) => {
        setSelectedBid(bid);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedBid(null);
    };

    // Filter bids based on active tab
    const getFilteredBids = () => {
        if (!__projectWithBids?.bids) return [];

        const allBids = __projectWithBids.bids;

        switch (activeTab) {
            case 0: // All Bids
                return allBids;
            case 1: // Pending
                return allBids.filter((bid: any) => bid.status === 'pending');
            case 2: // Accepted
                return allBids.filter((bid: any) => bid.status === 'accepted');
            case 3: // Rejected
                return allBids.filter((bid: any) => bid.status === 'rejected');
            default:
                return allBids;
        }
    };

    const filteredBids = getFilteredBids();

    // Calculate counts for each tab
    const getStatusCounts = () => {
        if (!__projectWithBids?.bids) return { pending: 0, accepted: 0, rejected: 0 };

        const bids = __projectWithBids.bids;
        return {
            pending: bids.filter((bid: any) => bid.status === 'pending').length,
            accepted: bids.filter((bid: any) => bid.status === 'accepted').length,
            rejected: bids.filter((bid: any) => bid.status === 'rejected').length
        };
    };

    const statusCounts = getStatusCounts();

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!__projectWithBids || !__projectWithBids.project) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error" sx={{ mt: 3 }}>
                    Project not found or failed to load.
                </Alert>
            </Container>
        );
    }

    const { project, bidStats } = __projectWithBids;



    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            {/* Header with Back Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton sx={{ mr: 1 }} onClick={() => window.history.back()}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4" component="h1">
                    Project Bids
                </Typography>
            </Box>

            {/* Project Details Card */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Work sx={{ mr: 1 }} /> {project.eventId.eventName}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip
                        icon={<Event />}
                        label={project.eventId.date}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        icon={<LocationOn />}
                        label={project.eventLocation}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        label={project.categoryId.name}
                        color="primary"
                        size="small"
                    />
                    {project.subcategoryId && (
                        <Chip
                            label={project.subcategoryId.name}
                            color="secondary"
                            size="small"
                        />
                    )}
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>Project Requirements</Typography>
                        <Typography variant="body1" paragraph>
                            {project.orgRequirement}
                        </Typography>

                        {project.orgAdditionalRequirement && (
                            <>
                                <Typography variant="h6" gutterBottom>Additional Requirements</Typography>
                                <Typography variant="body1" paragraph>
                                    {project.orgAdditionalRequirement}
                                </Typography>
                            </>
                        )}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                Budget
                            </Typography>
                            <Typography variant="h5" color="primary" gutterBottom>
                                {project.orgBudget} XAF
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <Schedule sx={{ mr: 1 }} /> Service Time
                            </Typography>
                            <Typography variant="body1">
                                {formatDateTimeCustom(project.serviceTime)}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <Person sx={{ mr: 1 }} /> Posted By
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                                    {project.createdBy.name.charAt(0)}
                                </Avatar>
                                <Typography variant="body1">
                                    {project.createdBy.name}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            {/* Bids Section */}
            <Paper elevation={2} sx={{ borderRadius: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={handleTabChange}>
                        <Tab label={`All Bids (${__projectWithBids.bids.length})`} />
                        <Tab label={`Pending (${statusCounts.pending})`} sx={{ color: "#db9052ff" }} />
                        <Tab label={`Accepted (${statusCounts.accepted})`} sx={{ color: "#3cbe1bff" }} />
                        <Tab label={`Rejected (${statusCounts.rejected})`} sx={{ color: "#db2f2fff" }} />
                    </Tabs>
                </Box>

                {/* Bid Stats - Only show for "All Bids" tab */}
                {activeTab === 0 && (
                    <Box sx={{ p: 2, bgcolor: 'grey.50', display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Total Bids</Typography>
                            <Typography variant="h6">{bidStats.totalBids}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Average Bid</Typography>
                            <Typography variant="h6">{Math.round(bidStats.averageBid)} XAF</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Lowest Bid</Typography>
                            <Typography variant="h6">{bidStats.lowestBid} XAF</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Highest Bid</Typography>
                            <Typography variant="h6">{bidStats.highestBid} XAF</Typography>
                        </Box>
                    </Box>
                )}

                {/* Bids List */}
                <Box sx={{ p: 2 }}>
                    {filteredBids.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                            {activeTab === 0
                                ? 'No bids have been placed on this project yet.'
                                : `No ${getTabLabel(activeTab).toLowerCase()} bids found.`
                            }
                        </Typography>
                    ) : (
                        filteredBids.map((bid: any) => (
                            <BidCard key={bid._id} bid={bid} onSelect={handleBidSelect} />
                        ))
                    )}
                </Box>
            </Paper>

            {/* // In your main component, replace the existing Dialog with: */}
            <BidActionDialog
                open={dialogOpen}
                selectedBid={selectedBid}
                onClose={handleDialogClose}
                onAction={(bidId: any, actionType: any, data: any) => {
                    // Handle the action here
                    if (actionType === 'reject') {
                        // Call API to reject bid with data.rejectionReason
                        console.log('Rejecting bid:', bidId, 'Reason:', data.rejectionReason);
                    } else if (actionType === 'accept') {
                        // Call API to accept bid with data.acceptedAmount
                        console.log('Accepting bid:', bidId, 'Amount:', data.acceptedAmount);
                    }
                }}
            />
        </Container>
    );
}

// Helper function to get tab label
const getTabLabel = (tabIndex: number) => {
    switch (tabIndex) {
        case 0: return 'All';
        case 1: return 'Pending';
        case 2: return 'Accepted';
        case 3: return 'Rejected';
        default: return 'All';
    }
};

interface BidCardProps {
    bid: Bid;
    onSelect: (bid: Bid) => void;
}

function BidCard({ bid, onSelect }: BidCardProps) {
    const navigate = useNavigate();

    const handleChatClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the card click
        navigate("/messaging-relationship");
        sessionStorage.setItem('currentChatProvider', JSON.stringify(bid?.providerId));
    };

    return (
        <Card
            sx={{
                mb: 2,
                p: 2,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => onSelect(bid)}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar
                            src={bid.providerId?.avatar?.url}
                            sx={{ mr: 2 }}
                        >
                            {bid?.providerId?.name?.charAt(0) || 'U'}
                        </Avatar>
                        <Box>
                            <Typography variant="h6">{bid.providerId?.name || 'Unknown Provider'}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {bid.providerId?.experience || 'No experience specified'}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography variant="body2" paragraph sx={{ mb: 1 }}>
                        {bid.proposal.length > 150 ? `${bid.proposal.substring(0, 150)}...` : bid.proposal}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: { md: 'right' } }}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            {bid.bidAmount} XAF
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Delivery in {bid.deliveryTime} {bid.deliveryUnit}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                            {formatDateTimeCustom(bid.createdAt)}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: "end", mt: 2, textTransform: "capitalize" }}>
                            <Chip
                                label={bid.status}
                                color={
                                    bid.status === 'accepted' ? 'success' :
                                        bid.status === 'rejected' ? 'error' : 'default'
                                }
                                size="small"
                            />
                            <Button
                                variant="outlined"
                                startIcon={<ChatIcon />}
                                onClick={handleChatClick}
                                size="small"
                            >
                                Chat
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}

function LoadingSkeleton() {
    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Skeleton variant="text" height={60} width="40%" sx={{ mb: 3 }} />

            {/* Project Skeleton */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Skeleton variant="text" height={40} width="60%" sx={{ mb: 2 }} />
                <Skeleton variant="text" height={25} width="30%" sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={200} />
            </Paper>

            {/* Bids Skeleton */}
            <Paper elevation={2} sx={{ borderRadius: 2 }}>
                <Skeleton variant="rectangular" height={48} />
                {[1, 2, 3].map((item) => (
                    <Box key={item} sx={{ p: 2 }}>
                        <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
                    </Box>
                ))}
            </Paper>
        </Container>
    );
}

export default BidsOnPlaceABid;


interface ApiResult {
    status: number;
    type: string;
    message: any;
}

function BidActionDialog({ open, selectedBid, onClose, onAction }: any) {
    const [actionType, setActionType] = useState(null); // 'reject' or 'accept'
    const [rejectionReason, setRejectionReason] = useState("");
    const [acceptedAmount, setAcceptedAmount] = useState(0);
    const [errors, setErrors] = useState({ acceptedAmount: "", rejectionReason: "" });
    const dispatch = useDispatch<AppDispatch>();
    // console.log(selectedBid, 'selectedBid');


    const handleActionClick = (type: any) => {
        setActionType(type);
        if (type === 'accept') {
            setAcceptedAmount(selectedBid?.bidAmount || 0);
        }
    };

    const handleConfirmAction = useCallback(async () => {
        console.log("1");

        const newErrors = { acceptedAmount: "", rejectionReason: "" };

        if (actionType === 'reject' && !rejectionReason.trim()) {
            newErrors.rejectionReason = 'Rejection reason is required';
        }

        if (actionType === 'accept' && (!acceptedAmount || acceptedAmount <= 0)) {
            newErrors.acceptedAmount = 'Valid amount is required';
        }

        if (Object.keys(newErrors)) {
            setErrors(newErrors);
            return;
        }

        onAction(selectedBid._id, actionType, {
            rejectionReason,
            acceptedAmount
        });

        const data = {
            status: actionType, rejectionReason, acceptedAmount
        };
        console.log('2', data);

        try {
            const result = await dispatch(assignProjectToProvider(data, selectedBid?.projectId, selectedBid?._id));

            // if (result?.status === 200) {
            //     // Reset state
            //     setActionType(null);
            //     setRejectionReason("");
            //     setAcceptedAmount(0);
            //     setErrors({ acceptedAmount: "", rejectionReason: "" });
            // }
        } catch (error) {

            console.error("Verification error:", error);
        }


    }, [acceptedAmount, actionType, dispatch, onAction, rejectionReason, selectedBid])

    const handleCancelAction = () => {
        setActionType(null);
        setRejectionReason("");
        setAcceptedAmount(0);
        setErrors({ acceptedAmount: "", rejectionReason: "" });
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
                                    sx={{ mt: 1 }}
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
                        onClick={() => handleActionClick('reject')}
                        disabled={selectedBid?.status !== 'pending'}
                    >
                        Reject
                    </Button>
                    <Button
                        startIcon={<CheckCircle />}
                        variant="contained"
                        color="success"
                        onClick={() => handleActionClick('accept')}
                        disabled={selectedBid?.status !== 'pending'}
                    >
                        Accept Bid
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Reject Confirmation Dialog */}
            <Dialog open={actionType === 'reject'} onClose={handleCancelAction} maxWidth="sm" fullWidth>
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
            <Dialog open={actionType === 'accept'} onClose={handleCancelAction} maxWidth="sm" fullWidth>
                <DialogTitle>Confirm Acceptance</DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        Are you sure you want to accept this bid?
                    </Alert>
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