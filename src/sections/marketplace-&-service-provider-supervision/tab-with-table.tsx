
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningIcon from '@mui/icons-material/Warning';  // Import WarningIcon
import PhoneIcon from '@mui/icons-material/Phone';

import { MatrixFourCard } from "src/components/matrix-three-cards/matrix-four-cards";
import { TabButton } from "src/components/button/multiple-button";
import { MarketTrendsTab } from "./MarketTrendsTab";
import { RequestTabSection } from "./request-tab-section";
import { securityTransactionTableHeader, securityTransactionTableData, conflictServiceTableData, conflictServiceTableHeader } from "./utills";

export function TabWithTableView() {
    const stats = [
        { title: 'Approve an Offer', icon: <VerifiedUserIcon /> },
        { title: 'Resolve a Dispute', icon: <WarningIcon /> },
        { title: 'Verify a Suspicious Transaction', icon: <WarningIcon /> },
        { title: 'Approve an Offer', icon: <PhoneIcon /> },
    ];
    const [tabValue, setTabValue] = useState(0);
    const tabLabels = ["Service Provider Offer & Management", "Conflict Arbitration", "Market Trends Monitoring", "Security & Transaction Control"];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const [selectedFilter, setSelectedFilter] = useState("All");

    const handleFilterChange = (newValue: string) => {
        setSelectedFilter(newValue);
    };
    // Filtering for Tab 3 (based on provider)
    const filteredSecurityData = selectedFilter === "All"
        ? securityTransactionTableData
        : securityTransactionTableData.filter((item) =>
            item.provider.toLowerCase().includes(selectedFilter.toLowerCase())
        );

    // Filtering for Tab 1 (based on date)
    const filteredConflictData = selectedFilter === "All"
        ? conflictServiceTableData
        : conflictServiceTableData.filter((item) =>
            item.date.includes(selectedFilter)
        );


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
            <Paper elevation={6}
                sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                }}
            >
                {tabValue === 0 && (
                    <MatrixFourCard metrics={stats} />
                )}

                {tabValue === 1 && (
                    <RequestTabSection
                        description=""
                        title="Conflict Arbitration Between Organizers & Service Providers"
                        headers={conflictServiceTableHeader}
                        data={filteredConflictData}
                        type="2"
                        filterOptions={['All', '2025-02-12', '2025-02-15']}
                        selectedFilter={selectedFilter}
                        onFilterChange={handleFilterChange}
                    />
                )}
                {tabValue === 2 && <MarketTrendsTab />}
                {tabValue === 3 && (
                    <RequestTabSection
                        title="Security & Suspicious Transaction Control"
                        description=""
                        headers={securityTransactionTableHeader}
                        data={filteredSecurityData}
                        type="4"
                        filterOptions={['All', 'DJ Max', 'EventPro']}
                        selectedFilter={selectedFilter}
                        onFilterChange={handleFilterChange}
                    />
                )}
            </Paper>

        </>

    )
}