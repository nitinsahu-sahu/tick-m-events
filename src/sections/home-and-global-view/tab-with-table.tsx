import { Box, Button, Paper, Tab, Tabs, Typography, Grid, TextField, CardContent, Card } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MatrixOneCard } from "src/components/matrix-three-cards/matrix-one-cards";
import { getRequestsByProvider, sendProviderProposal, getProposalById, updateProviderProposal } from "src/redux/actions/service-request";
import { AppDispatch, RootState } from "src/redux/store";

import { RequestTabSection } from "./request-tab-section";
import { metrics, availableProjectsTableHeaders, confirmedServicesTableData, confirmedServicesTableHeader } from "./utills";

interface Project {
    _id: string;
    eventId: {
        _id: string;
        eventName: string;
        date: string;
        time: string;
        location: string;
        description: string;
        averageRating: number;
    };
    organizerId: {
        _id: string;
        name: string;
        email: string;
        avatar: {
            public_id: string;
            url: string;
        };
    };
    serviceRequestId: {
        _id: string;
        serviceType: string;
        budget: string;
        description: string;
        additionalOptions: string;
    };
    providerId: string;
    status: string;
    contractStatus: string;
    orgBudget: number;
    orgRequirement: string;
    createdAt: string;
    updatedAt: string;

    // ✅ Add these two:
    providerHasProposed?: boolean;
    providerProposal?: {
        amount: number;
        days: number;
        message: string;
    };
}

export function TabWithTableView() {
    const [tabValue, setTabValue] = useState(0);
    const { requests } = useSelector((state: RootState) => state?.serviceRequest);
    console.log(requests);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const tabLabels = ["Available Projects", "Confirmed Services"];
    const [amount, setAmount] = useState('');
    const [days, setDays] = useState('');
    const [description, setDescription] = useState('');
    const proposalFormRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>()
    // useEffect(() => {
    //     dispatch(getRequestsByProvider({ status: "requested-by-organizer" }));
    // }, [dispatch]);

    useEffect(() => {
        if (tabValue === 0) {
            dispatch(getRequestsByProvider({ status: "requested-by-organizer" }));
        } else if (tabValue === 1) {
            dispatch(getRequestsByProvider({ status: "accepted-by-organizer" }));
        }
    }, [tabValue, dispatch]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setSelectedProject(null);
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    marginTop: 3,
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    TabIndicatorProps={{ style: { display: "none" } }}
                    textColor="inherit"
                    sx={{
                        "& .MuiTabs-scroller": {
                            overflow: "auto !important"
                        }
                    }}
                >
                    {tabLabels.map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            sx={{
                                px: { xs: 1, sm: 3 },
                                minWidth: "unset",
                                textTransform: "none",
                                fontWeight: tabValue === index ? "bold" : "normal",
                                color: tabValue === index ? "black" : "gray",
                                fontSize: { xs: "0.75rem", sm: "0.875rem" }
                            }}
                        />
                    ))}
                </Tabs>

            </Paper>
            <MatrixOneCard metrics={metrics} />
            <Paper elevation={6}
                sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                }}
            >
                {tabValue === 0 && (
                    <>
                        <RequestTabSection
                            title="Available Projects (Organizer Requests)"
                            description=""
                            headers={availableProjectsTableHeaders}
                            data={requests}
                            type="1"
                            onApply={async (row) => {
                                setSelectedProject(row);

                                // Check if provider already proposed
                                if (row.providerHasProposed) {
                                    const res = await dispatch(getProposalById(row._id) as any);

                                    if (res?.data?.providerProposal) {
                                        const {
                                            amount: proposalAmount,
                                            days: proposalDays,
                                            message,
                                        } = res.data.providerProposal;
                                        setAmount(String(proposalAmount));
                                        setDays(String(proposalDays));
                                        setDescription(message);

                                    }
                                } else {
                                    setAmount('');
                                    setDays('');
                                    setDescription('');
                                }

                                setTimeout(() => {
                                    proposalFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }, 100);
                            }}

                            onViewDetails={() => {
                                setSelectedProject(null);
                            }}

                        />
                        {/* Proposal Form */}
                        {selectedProject && (
                            <Box
                                ref={proposalFormRef}
                                sx={{
                                    backgroundColor: "#f1f1f1",
                                    borderRadius: "10px",
                                    marginTop: 4,
                                    overflow: "hidden",
                                    padding: 0,
                                }}
                            >

                                {/* Form Header */}
                                <Box
                                    sx={{
                                        backgroundColor: "#1F8FCD",
                                        padding: "10px 20px",
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        borderTopLeftRadius: "10px",
                                        borderTopRightRadius: "10px",
                                    }}
                                >
                                    Fill Out This Form
                                </Box>

                                {/* Form Body */}
                                <Box sx={{ padding: "26px" }}>
                                    {/* Project Info Section */}
                                    <Box
                                        sx={{ padding: "10px", }} >
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            Project Details
                                        </Typography>

                                        <Typography variant="body2"><strong>Event Name:</strong> {selectedProject?.eventId?.eventName}</Typography>
                                        <Typography variant="body2"><strong>Date:</strong> {new Date(selectedProject?.eventId?.date).toDateString()}</Typography>
                                        <Typography variant="body2"><strong>Location:</strong> {selectedProject?.eventId?.location}</Typography>
                                        <Typography variant="body2"><strong>Organizer:</strong> {selectedProject?.organizerId?.name}</Typography>
                                        <Typography variant="body2"><strong>Budget:</strong> {selectedProject?.serviceRequestId?.budget}</Typography>
                                        <Typography variant="body2"><strong>Service Type:</strong> {selectedProject?.serviceRequestId?.serviceType}</Typography>
                                    </Box>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6}>
                                            <Typography sx={{ fontWeight: "600", fontSize: "17px", mb: 0.5 }}>
                                                Amount
                                            </Typography>
                                            <TextField placeholder="Enter Amount" fullWidth variant="outlined" value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Typography sx={{ fontWeight: "600", fontSize: "17px", mb: 0.5 }}>
                                                Days
                                            </Typography>
                                            <TextField placeholder="Enter Days" fullWidth variant="outlined" value={days}
                                                onChange={(e) => setDays(e.target.value)} />
                                        </Grid>

                                        <Grid item xs={12} mt={1}>
                                            <Typography sx={{ fontWeight: "600", fontSize: "17px", mb: 0.5 }}>
                                                Describe Your Proposal
                                            </Typography>
                                            <TextField
                                                placeholder="Write A Message.."
                                                fullWidth
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} mt={2} textAlign="right">
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#0B2E4C",
                                                    borderRadius: "10px",
                                                    textTransform: "none",
                                                    paddingX: 3,
                                                    "&:hover": {
                                                        backgroundColor: "#09304a",
                                                    },
                                                }}
                                                onClick={async () => {
                                                    if (!amount || !days || !description || !selectedProject) return;

                                                    const proposalData = {
                                                        amount: Number(amount),
                                                        days: Number(days),
                                                        message: description,
                                                    };

                                                    let res;

                                                    if (selectedProject.providerHasProposed) {
                                                        // Call update proposal API
                                                        res = await dispatch(updateProviderProposal(selectedProject._id, proposalData) as any);
                                                    } else {
                                                        // Call create proposal API
                                                        res = await dispatch(sendProviderProposal(selectedProject._id, proposalData) as any);
                                                    }

                                                    if (res?.type?.includes("SUCCESS")) {
                                                        setAmount('');
                                                        setDays('');
                                                        setDescription('');
                                                        setSelectedProject(null);
                                                        dispatch(getRequestsByProvider()); // Refresh
                                                    } else {
                                                        alert(res?.message || "Something went wrong");
                                                    }
                                                }}
                                            >
                                                {selectedProject?.providerHasProposed ? "Update" : "Submit"}
                                            </Button>

                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        )}

                    </>

                )}
                {tabValue === 1 && (
                    <RequestTabSection
                        title="Confirmed Services"
                        description="Track projects where the service provider has been selected."
                        headers={confirmedServicesTableHeader}
                        // data={confirmedServicesTableData}
                        data={requests}
                        type="2"
                    />
                )}
            </Paper>
        </>

    )
}