import {
    Box, Typography, Chip, Grid, Paper, Divider, Stack,
    TextField, MenuItem, Button
} from "@mui/material";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DashboardContent } from "src/layouts/dashboard";
import { placeABidsByIdFetch } from "src/redux/actions/provider/Home-Global-View/freelancer.action";
import { AppDispatch, RootState } from "src/redux/store";
import { ProposalsTab } from "./ProposalsTab";
import { ProjectDetailsTab } from "./projectDetailsTab";
import { ClientInfo } from "./client-info";
import { PlaceBidOnProject } from "./place-project-bid";



export default function ProjectSinglePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { projectId } = useParams();
    const { _project } = useSelector((state: RootState) => state.provider);
    const [activeTab, setActiveTab] = useState('details');
    const tabs = [
        { id: 'details', label: 'Details' },
        // { id: 'proposals', label: 'Proposals' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'details':
                return <ProjectDetailsTab _project={_project} />;
            case 'proposals':
                return <ProposalsTab />;
            default:
                return <ProjectDetailsTab />;
        }
    };
    useEffect(() => {
        dispatch(placeABidsByIdFetch(projectId));
    }, [dispatch, projectId]);
    return (
        <DashboardContent>
            {/* Page Layout */}
            <Grid container spacing={3}>
                {/* Left Column - Project Details */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{
                        p: 3,
                        borderRadius: 2,
                        border: '3px solid #2395D4',

                    }}>
                        {/* Title & Status */}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ width: '100%' }}
                        >
                            {/* Left Content */}
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
                                    {_project.eventId?.eventName}
                                </Typography>
                                <Typography variant="body2" color="gray" >
                                    Event Location : {_project?.eventLocation}
                                </Typography>
                            </Box>

                            {/* Right Content */}
                            <Box sx={{
                                textAlign: 'right',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: 1
                            }}>
                                <Chip
                                    label={_project?.bidStatus}
                                    color={_project?.bidStatus === "closed" ? "error" : "success"}
                                    size="small"
                                    sx={{ textTransform: "capitalize" }}
                                />
                                <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
                                    Avg Bid Amount : {_project.avgBidAmount} XAF
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Tabs (Details / Proposals) */}
                        <Box>
                            {/* Tabs Navigation */}
                            <Stack direction="row" spacing={3} mt={2} mb={2}>
                                {tabs.map((tab) => (
                                    <Typography
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        sx={{
                                            cursor: 'pointer',
                                            fontWeight: activeTab === tab.id ? "bold" : "normal",
                                            color: activeTab === tab.id ? "inherit" : "gray",
                                            borderBottom: activeTab === tab.id ? "2px solid #0ea5e9" : "2px solid transparent",
                                            pb: 0.5,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                color: activeTab === tab.id ? "inherit" : "#0ea5e9",
                                                borderBottom: "2px solid #0ea5e9"
                                            }
                                        }}
                                    >
                                        {tab.label}
                                    </Typography>
                                ))}
                            </Stack>

                            {/* Tab Content */}
                            <Box mt={2}>
                                {renderTabContent()}
                            </Box>
                        </Box>
                    </Paper>

                    {/* Provider Bid Section */}
                    <PlaceBidOnProject
                        project={_project}
                    />

                </Grid>


                {/* Right Column - Client Info */}
                <Grid item xs={12} md={4} key={_project?.createdBy?._id}>
                    <ClientInfo _project={_project} />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}
