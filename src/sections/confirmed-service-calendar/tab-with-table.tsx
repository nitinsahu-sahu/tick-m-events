import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { expectedPaymentsTableHeader, expectedPaymentsTableData, confirmedServiceListTableData, confirmedServiceListTableHeader } from "./utills";
import { RequestTabSection } from "./request-tab-section";



export function TabWithTableView() {
    const [tabValue, setTabValue] = useState(0);
    const tabLabels = ["Calendar View", "Service List", "Reminders & Notifications"];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Box
                sx={{
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
                            overflow: "auto !important",
                        }
                    }}
                >
                    {tabLabels.map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            sx={{
                                px: { xs: 1, sm: 3 },
                                margin: "0px 5px ",
                                minWidth: "unset",
                                textTransform: "none",
                                borderRadius: 3,
                                border: "1px solid #0B2E4C",
                                backgroundColor: tabValue === index ? "#0B2E4C" : "white",
                                fontWeight: tabValue === index ? "bold" : "normal",
                                color: tabValue === index ? "white" : "black",
                                fontSize: { xs: "0.75rem", sm: "0.875rem" }
                            }}
                        />
                    ))}
                </Tabs>
            </Box>

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
                    <Typography>one</Typography>
                )}
                {tabValue === 1 && (
                    <Typography>one</Typography>

                )}
                {tabValue === 2 && (
                    <Typography>one</Typography>

                )}
            </Paper>
        </>

    )
}