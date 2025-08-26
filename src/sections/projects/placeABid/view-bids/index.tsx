import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';

import {
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    Chip,
    Button,
    Avatar,
    Divider,
    Container,
    Paper,
    Tabs,
    Tab,
    Skeleton,
    Alert,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
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
import { fatchOrgProjectBids } from "src/redux/actions/organizer/pageEvents";
import { AppDispatch, RootState } from "src/redux/store";

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

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    // Type guard to check if we have valid data
    const hasValidData = __projectWithBids &&
        __projectWithBids.project &&
        __projectWithBids.bids !== undefined;

    if (!hasValidData) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error" sx={{ mt: 3 }}>
                    Project not found or failed to load.
                </Alert>
            </Container>
        );
    }

    const { project, bids, bidStats } = __projectWithBids as ProjectWithBids;

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
                                {project.serviceTime}
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
                        <Tab label={`All Bids (${bids.length})`} />
                        <Tab label="Pending" />
                        <Tab label="Accepted" />
                        <Tab label="Rejected" />
                    </Tabs>
                </Box>

                {/* Bid Stats */}
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

                {/* Bids List */}
                <Box sx={{ p: 2 }}>
                    {bids.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                            No bids have been placed on this project yet.
                        </Typography>
                    ) : (
                        bids.map((bid) => (
                            <BidCard key={bid._id} bid={bid} onSelect={handleBidSelect} />
                        ))
                    )}
                </Box>
            </Paper>

            {/* Bid Detail Dialog */}
            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
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
                                    {selectedBid.milestones.map((milestone) => (
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
                    <Button startIcon={<Cancel />} color="error">
                        Reject
                    </Button>
                    <Button startIcon={<CheckCircle />} variant="contained" color="success">
                        Accept Bid
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

interface BidCardProps {
    bid: Bid;
    onSelect: (bid: Bid) => void;
}

function BidCard({ bid, onSelect }: BidCardProps) {
      const navigate = useNavigate();
    
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
                            src={bid.providerId.avatar?.url}
                            sx={{ mr: 2 }}
                        >
                            {bid.providerId.name.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h6">{bid.providerId.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {bid.providerId.experience || 'No experience specified'}
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
                            {bid.createdAt}
                        </Typography>
                        <Chip
                            label={bid.status}
                            color={
                                bid.status === 'accepted' ? 'success' :
                                    bid.status === 'rejected' ? 'error' : 'default'
                            }
                            size="small"
                            sx={{ mt: 1 }}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<ChatIcon />}
                            onClick={() => {
                                navigate("/messaging-relationship");
                                sessionStorage.setItem('currentChatProvider', JSON.stringify(bid?.providerId));
                            }}
                            size="small"
                            sx={{ mt: 1 }}
                        >
                            Chat
                        </Button>
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