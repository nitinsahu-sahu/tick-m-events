import {
    Box, Typography, Chip, Grid, Paper, Divider, Stack,
    List, ListItem, ListItemText, Avatar
} from "@mui/material";
import { AccessTime, CheckCircle } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DashboardContent } from "src/layouts/dashboard";
import { placeABidsByIdFetch } from "src/redux/actions/provider/Home-Global-View/freelancer.action";
import { AppDispatch, RootState } from "src/redux/store";
import { formatEventDate, formatTimeToAMPM } from "src/hooks/formate-time";

export default function ProjectSinglePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { projectId } = useParams();
    const { _project } = useSelector((state: RootState) => state.provider);

    useEffect(() => {
        dispatch(placeABidsByIdFetch(projectId));
    }, [dispatch, projectId]);
    return (
        <DashboardContent>
            {/* Page Layout */}
            <Grid container spacing={3}>
                {/* Left Column - Project Details */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "#1e293b", color: "#fff" }}>
                        {/* Title & Status */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
                                {_project.eventId?.eventName}
                            </Typography>
                            <Chip label={_project?.status} color="success" size="small" sx={{ textTransform: "capitalize" }} />
                        </Stack>

                        {/* Tabs (Details / Proposals) */}
                        <Stack direction="row" spacing={3} mt={2} mb={2}>
                            <Typography sx={{ fontWeight: "bold", borderBottom: "2px solid #0ea5e9", pb: 0.5 }}>
                                Details
                            </Typography>
                            <Typography sx={{ color: "gray" }}>Proposals</Typography>
                        </Stack>

                        {/* Project Details */}
                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                            Project Details
                        </Typography>
                        <Typography variant="body2" color="gray" mb={2}>
                            {_project?.orgBudget} XAF
                        </Typography>
                        <Typography variant="body2" mb={2}>
                            {_project?.orgRequirement}
                        </Typography>
                        <Typography variant="body2" mb={2}>
                            {_project?.orgAdditionalRequirement}
                        </Typography>

                        <Divider sx={{ my: 2, borderColor: "#334155" }} />

                        {/* Skills */}
                        <Typography fontWeight="bold" mb={1}>
                            Categories Required
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                            <Chip key={_project?.subcategoryName} label={_project?.subcategoryName} variant="outlined" sx={{ color: "#fff", borderColor: "#475569" }} />
                            <Chip key={_project?.categoryId?.name} label={_project?.categoryId?.name} variant="outlined" sx={{ color: "#fff", borderColor: "#475569" }} />
                        </Stack>
                    </Paper>
                </Grid>

                {/* Right Column - Client Info */}
                <Grid item xs={12} md={4} key={_project?.createdBy?._id}>
                    <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "#1e293b", color: "#fff" }}>
                        <Typography fontWeight="bold" mb={2}>
                            About the Client
                        </Typography>

                        <Box display="flex" justifyContent="space-around" alignItems="center">
                            <Box>
                                <Avatar
                                    src={_project?.createdBy?.avatar?.url} // Replace with your image path
                                    alt={_project?.createdBy?.name}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        border: '3px solid #f0f0f0'
                                    }}
                                >
                                    {/* Fallback initials if image fails to load */}
                                    {_project?.createdBy?.name
                                        ? _project.createdBy.name
                                            .split(' ')
                                            .map((word:any) => word.charAt(0))
                                            .join('')
                                            .toUpperCase()
                                            .slice(0, 2)
                                        : 'US' // Default fallback if no name
                                    }
                                </Avatar>
                            </Box>
                            <Box>
                                <Typography variant="h6" textTransform="capitalize">{_project?.createdBy?.name}</Typography>
                                <Typography variant="body2" textTransform="capitalize">📍 {_project?.createdBy?.address}</Typography>
                                <Typography variant="body2" color="gray" fontSize={11} mb={2}>
                                    Member since {formatEventDate(_project?.createdBy?.createdAt)}
                                </Typography>
                            </Box>
                        </Box>


                        <Divider sx={{ my: 2, borderColor: "#334155" }} />

                        <Typography fontWeight="bold" mb={1}>
                            Client Engagement
                        </Typography>
                        <Typography variant="body2">✔️ Contacted <b>less than 10</b> freelancers</Typography>
                        <Typography variant="body2">✔️ Invited <b>0</b> freelancers</Typography>
                        <Typography variant="body2">✔️ Completed <b>0</b> projects</Typography>

                        <Divider sx={{ my: 2, borderColor: "#334155" }} />

                        <Typography fontWeight="bold" mb={1}>
                            Client Verification
                        </Typography>
                        <Stack spacing={0.5}>
                            {["Identity verified", "Payment verified", "Deposit made", "Email verified", "Profile completed", "Phone verified"].map((v) => (
                                <Typography key={v} variant="body2">
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} /> {v}
                                </Typography>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </DashboardContent>
    );
}
