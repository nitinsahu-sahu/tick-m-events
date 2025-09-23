import {
    Typography, Box, Card, CardContent, Grid,
    Chip, Avatar, Fade, Collapse,Tooltip, CircularProgress,
    Modal, IconButton, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow
    
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ExpandMore, ExpandLess, Chat, Assignment, People, MonetizationOn, CheckCircle, ArrowForward
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { Iconify } from "src/components/iconify";
import { fatchOrgEvents } from "src/redux/actions/organizer/pageEvents";
import { DashboardContent } from "src/layouts/dashboard";
import { AppDispatch, RootState } from "src/redux/store";
import { EventBreadCrum } from "src/sections/entry-validation/event-status";
import { formatDateTimeCustom } from "src/hooks/formate-time";

import { SignedStatusModal } from "./signed-modal";

// Types
interface Provider {
    _id: string;
    name: string;
    email: string;
    experience: string;
    avatar: {
        public_id: string;
        url: string;
    };
    isVerified: boolean;
    reviewCount: number;
}

interface Milestone {
    milestorneName: string;
    amount: number;
    currency: string;
    isReleased: boolean;
    _id: string;
}

interface WinningBid {
    _id: string;
    providerId: Provider;
    bidAmount: number;
    deliveryTime: number;
    deliveryUnit: string;
    winningBid: number;
    organizrAmount: number;
    isOrgnizerAccepted: boolean;
    isProviderAccepted: boolean;
    proposal: string;
    milestones: Milestone[];
    status: string;
    createdAt: string;
}

interface ProjectDetails {
    _id: string;
    eventId: string;
    categoryId: {
        _id: string;
        name: string;
    };
    subcategoryId: string;
    eventLocation: string;
    createdBy: string;
    isSigned: boolean;
    status: string;
    bidStatus: string;
    bidsCount: number;
    avgBidAmount: number;
    totalBidAmount: number;
    orgBudget: string;
    orgRequirement: string;
    orgAdditionalRequirement: string;
    providerHasProposed: boolean;
    serviceTime: string;
    createdAt: string;
    updatedAt: string;
}

interface SignedProject {
    projectDetails: ProjectDetails;
    winningBid: WinningBid;
    totalBids: number;
    bidsStatistics: {
        totalBids: number;
        averageBid: number;
        pendingBids: number;
        acceptedBids: number;
        rejectedBids: number;
    };
    projectStatus: string;
    bidStatus: string;
}

interface ProjectStatistics {
    totalProjects: number;
    signedProjects: number;
    openForBidding: number;
    closedProjects: number;
    cancelledProjects: number;
}

// Project Details Modal Component
function ProjectDetailsModal({
    open,
    onClose,
    project
}: {
    open: boolean;
    onClose: () => void;
    project: SignedProject | null;
}) {
    if (!project) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 800,
                    maxHeight: '90vh',
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" fontWeight="bold">
                            Project Details
                        </Typography>
                        <IconButton onClick={onClose} size="small">
                            <ArrowForward />
                        </IconButton>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Project Information
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Category:</strong> {project.projectDetails.categoryId.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Location:</strong> {project.projectDetails.eventLocation}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Budget:</strong> {project.projectDetails.orgBudget} XAF
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Service Time:</strong> {new Date(project.projectDetails.serviceTime).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Requirements
                                    </Typography>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: project.projectDetails.orgRequirement
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Winning Bid Details
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Bid Amount:</strong> {project.winningBid.bidAmount} XAF
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Delivery:</strong> {project.winningBid.deliveryTime} {project.winningBid.deliveryUnit}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Accepted Amount:</strong> {project.winningBid.winningBid} XAF
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Milestones
                                    </Typography>
                                    {project.winningBid.milestones.map((milestone, index) => (
                                        <Box key={milestone._id} mb={1}>
                                            <Typography variant="body2">
                                                {index + 1}. {milestone.milestorneName} -
                                                {milestone.amount} {milestone.currency}
                                                {milestone.isReleased && (
                                                    <Chip
                                                        label="Released"
                                                        size="small"
                                                        color="success"
                                                        sx={{ ml: 1 }}
                                                    />
                                                )}
                                            </Typography>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
}

// Statistics Cards Component
function StatisticsCards({ statistics }: { statistics: ProjectStatistics }) {
    const cards = [
        {
            label: "Total Projects",
            value: statistics.totalProjects,
            icon: <Assignment />,
            color: "#1976d2"
        },
        {
            label: "Signed Projects",
            value: statistics.signedProjects,
            icon: <CheckCircle />,
            color: "#2e7d32"
        },
        {
            label: "Open for Bidding",
            value: statistics.openForBidding,
            icon: <People />,
            color: "#ed6c02"
        },
        {
            label: "Closed Projects",
            value: statistics.closedProjects,
            icon: <MonetizationOn />,
            color: "#9c27b0"
        }
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={card.label}>
                    <Fade in timeout={500 + (index * 100)}>
                        <Card
                            sx={{
                                background: `linear-gradient(135deg, ${card.color}20, ${card.color}40)`,
                                border: `1px solid ${card.color}30`,
                                borderRadius: 3,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)'
                                }
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="h4" fontWeight="bold" color={card.color}>
                                            {card.value}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600} color="dark">
                                            {card.label}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ color: card.color, opacity: 0.8 }}>
                                        {card.icon}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Fade>
                </Grid>
            ))}
        </Grid>
    );
}

// Project Row Component
function ProjectRow({
    project,
    onRowClick,
    onChatClick
}: {
    project: SignedProject;
    onRowClick: (project: SignedProject) => void;
    onChatClick: (provider: Provider) => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const [selectedContractForStatus, setSelectedContractForStatus] = useState<any>(null);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'success';
            case 'ongoing': return 'warning';
            case 'completed': return 'info';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

    const handleStatusChangeClick = (contract: any) => {
        setSelectedContractForStatus(contract);
        setStatusModalOpen(true);
    };

    return (
        <>
            <TableRow
                sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        transform: 'translateX(4px)'
                    }
                }}
                onClick={() => onRowClick(project)}
            >
                <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            src={project.winningBid?.providerId?.avatar?.url}
                            alt={project.winningBid?.providerId?.name}
                        >
                            {project?.winningBid?.providerId?.name.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                                {project.winningBid?.providerId?.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" fontSize={9}>
                                {project.projectDetails?.categoryId?.name}
                            </Typography>
                        </Box>
                    </Box>
                </TableCell>

                <TableCell>
                    <Typography variant="body2">
                        {project.winningBid.bidAmount.toLocaleString()} XAF
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontSize={9}>
                        Accepted: {project.winningBid.winningBid.toLocaleString()} XAF
                    </Typography>
                </TableCell>

                <TableCell>
                    <Chip
                        label={project.projectStatus}
                        sx={{ textTransform: "capitalize" }}
                        size="small"
                        color={getStatusColor(project.projectStatus)}
                        variant="outlined"
                    />
                </TableCell>

                <TableCell>
                    <Typography variant="body2">
                        {project.winningBid?.deliveryTime} {project.winningBid?.deliveryUnit}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2">
                        {formatDateTimeCustom(project.projectDetails?.serviceTime)}
                    </Typography>
                </TableCell>

                <TableCell align="center">
                    <Box display="flex" gap={1}>
                        <Tooltip title="Chat with Provider">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onChatClick(project.winningBid.providerId);
                                }}
                                color="primary"
                            >
                                <Chat />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="We can change project status here.">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChangeClick(project)
                                }}
                                disabled={project?.projectDetails?.status === 'completed'}
                                color="primary"
                            >
                                <Iconify width={24} icon="f7:status" />

                            </IconButton>
                        </Tooltip>
                        <Tooltip title="View Details">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpanded(!expanded);
                                }}
                            >
                                {expanded ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Quick Overview
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">
                                        <strong>Total Bids:</strong> {project.bidsStatistics.totalBids}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Average Bid:</strong> {project.bidsStatistics.averageBid.toLocaleString()} XAF
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">
                                        <strong>Location:</strong> {project.projectDetails.eventLocation}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Original Budget:</strong> {project.projectDetails.orgBudget} XAF
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <SignedStatusModal
                open={statusModalOpen}
                onClose={() => setStatusModalOpen(false)}
                currentStatus={selectedContractForStatus?.projectDetails?.status || ''}
                contract={selectedContractForStatus}
            />
        </>
    );
}

// Main Component
export function SignedProjectList() {
    const { __events } = useSelector((state: RootState) => state.organizer);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [selectedProject, setSelectedProject] = useState<SignedProject | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fatchOrgEvents())
    }, [dispatch,__events])
    const handleEventSelect = (event: any | null) => {
        setSelectedEvent(event);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleProjectClick = (project: SignedProject) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const handleChatClick = (provider: Provider) => {
        navigate("/messaging-relationship");
        sessionStorage.setItem('currentChatProvider', JSON.stringify(provider));
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProject(null);
    };

    if (!selectedEvent) {
        return (
            <>
                <EventBreadCrum events={__events} onEventSelect={handleEventSelect} />
                <DashboardContent>
                    <Typography variant="h6" color="text.secondary" textAlign="center" mt={4}>
                        Select an event to view signed projects
                    </Typography>
                </DashboardContent>
            </>
        );
    }

    const signedProjects = selectedEvent.signedProjects || [];
    const projectStatistics = selectedEvent.projectStatistics || {
        totalProjects: 0,
        signedProjects: 0,
        openForBidding: 0,
        closedProjects: 0,
        cancelledProjects: 0
    };

    return (
        <>
            <EventBreadCrum events={__events} onEventSelect={handleEventSelect} />
            <DashboardContent>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Fade in timeout={500}>
                        <Box>
                            {/* Statistics Cards */}
                            <StatisticsCards statistics={projectStatistics} />

                            {/* Projects Table */}
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    overflow: 'hidden'
                                }}
                            >
                                <CardContent sx={{ p: 0 }}>
                                    <Box p={3} bgcolor="primary.main" color="white">
                                        <Typography variant="h5" fontWeight="bold">
                                            Signed Projects
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            {signedProjects.length} projects signed with providers
                                        </Typography>
                                    </Box>

                                    {signedProjects?.length === 0 ? (
                                        <Box p={4} textAlign="center">
                                            <Typography variant="h6" color="text.secondary">
                                                No signed projects found for this event
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                                                        <TableCell><strong>Provider</strong></TableCell>
                                                        <TableCell><strong>Bid Amount</strong></TableCell>
                                                        <TableCell><strong>Status</strong></TableCell>
                                                        <TableCell><strong>Delivery Time</strong></TableCell>
                                                        <TableCell><strong>Service Date</strong></TableCell>
                                                        <TableCell align="center"><strong>Actions</strong></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {signedProjects.map((project: any, index: any) => (
                                                        <ProjectRow
                                                            key={project.projectDetails._id}
                                                            project={project}
                                                            onRowClick={handleProjectClick}
                                                            onChatClick={handleChatClick}
                                                        />
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </CardContent>
                            </Card>
                        </Box>
                    </Fade>
                )}

                {/* Project Details Modal */}
                <ProjectDetailsModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    project={selectedProject}
                />
            </DashboardContent>
        </>
    );
}