import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { serviceListTableData, serviceListTableHeader, confirmedServiceListTableData, confirmedServiceListTableHeader } from "./utills";
import { RequestTabSection } from "./request-tab-section";
import { CalenderView } from "./calender-view";



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


            {tabValue === 0 && (
                <Paper elevation={6}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: "hidden",
                        mt:2
                    }}
                >
                    <CalenderView />
                </Paper>
            )}
            {tabValue === 1 && (
                <Paper elevation={6}
                    sx={{
                        mt: 2,
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: "hidden",
                    }}
                >
                    <RequestTabSection
                        title="Service List"
                        headers={serviceListTableHeader}
                        data={serviceListTableData}
                        type="1"
                    />
                </Paper>

            )}
            {tabValue === 2 && (
                <Paper elevation={6}
                    sx={{
                        mt: 2,
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: "hidden",
                    }}
                >
                    <RequestTabSection
                        title="Confirmed Service List"
                        headers={confirmedServiceListTableHeader}
                        data={confirmedServiceListTableData}
                        type="2"
                    />
                </Paper>

            )}

        </>

    )
}