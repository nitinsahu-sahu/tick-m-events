import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { TabButton } from "src/components/button/multiple-button";

import { serviceListTableData, serviceListTableHeader, confirmedServiceListTableData, confirmedServiceListTableHeader } from "./utills";
import { RequestTabSection } from "./request-tab-section";
import { CalenderView } from "./calender-view";

export function TabWithTableView() {
    const [tabValue, setTabValue] = useState(0);
    const tabLabels = ["Calendar View", "Reminders & Notifications"];

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
                <TabButton tabValue={tabValue} tabLabels={tabLabels} onChange={handleTabChange} />
            </Box>


            {tabValue === 0 && (
                <Paper elevation={6}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: "hidden",
                        mt: 2
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