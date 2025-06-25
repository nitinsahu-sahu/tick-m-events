import { Box, Button, Paper, Tab, Tabs, Typography, Grid, TextField, CardContent, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MatrixOneCard } from "src/components/matrix-three-cards/matrix-one-cards";
import { getRequestsByProvider } from "src/redux/actions/service-request";
import { AppDispatch, RootState } from "src/redux/store";

import { RequestTabSection } from "./request-tab-section";
import { metrics, availableProjectsTableHeaders, confirmedServicesTableData, confirmedServicesTableHeader } from "./utills";

export function TabWithTableView() {
    const [tabValue, setTabValue] = useState(0);
    const { requests } = useSelector((state: RootState) => state?.serviceRequest);

    const tabLabels = ["Available Projects", "Confirmed Services"];
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getRequestsByProvider());
    }, [dispatch]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
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
                        />
                        {/* Proposal Form */}
                        <Box
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
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontWeight: "600", fontSize: "17px", mb: 0.5 }}>
                                            Amount
                                        </Typography>
                                        <TextField
                                            placeholder="Enter Amount"
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ fontWeight: "600", fontSize: "17px", mb: 0.5 }}>
                                            Days
                                        </Typography>
                                        <TextField
                                            placeholder="Enter Days"
                                            fullWidth
                                            variant="outlined"
                                        />
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
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </>

                )}
                {tabValue === 1 && (
                    <RequestTabSection
                        title="Confirmed Services"
                        description="Track projects where the service provider has been selected."
                        headers={confirmedServicesTableHeader}
                        data={confirmedServicesTableData}
                        type="2"
                    />
                )}
            </Paper>
        </>

    )
}