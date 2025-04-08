import { Box, FormControl, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Chart from "react-apexcharts";

import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";
import { ApexOptions } from "apexcharts";

type TabType = 'monthly' | 'weekly' | 'daily';

export function SalesAndStockTracking() {
    const [activeTab, setActiveTab] = useState<TabType>('monthly'); // 👈 typed state
    const theme = useTheme();

    const realTimeSalseTrackingTableHeaders = ["Ticket Type", "Price", "Total Stock", "Remaining Stock", "Tickets Sold", "Revenue Generated"];
    const realTimeSalseTrackingTableData = [
        { ticketType: "Standard", price: "10,000 XAF", totalStock: 500, remainingStock: 230, ticketSold: 270, revenueGenerated: "2,700,000 XAF" },
        { ticketType: "VIP", price: "20,000 XAF", totalStock: 200, remainingStock: 50, ticketSold: 150, revenueGenerated: "3,000,000 XAF" },
        { ticketType: "Advanced", price: "30,000 XAF", totalStock: 300, remainingStock: 100, ticketSold: 200, revenueGenerated: "6,000,000 XAF" },
    ];

    const salesGraphChartData: Record<TabType, {
        categories: string[];
        series: { name: string; data: number[] }[];
    }> = {
        monthly: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            series: [{ name: "Sales", data: [600, 400, 300, 450, 500, 200, 150, 300, 450, 600, 550, 700] }]
        },
        weekly: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            series: [{ name: "Sales", data: [1200, 800, 1500, 900] }]
        },
        daily: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            series: [{ name: "Sales", data: [200, 300, 250, 400, 350, 500, 450] }]
        }
    };

    const salesGraphChartOptions: ApexOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        xaxis: {
            categories: salesGraphChartData[activeTab].categories,
        },
        stroke: { curve: "smooth" },
        markers: { size: 5 },
        colors: [theme.palette.primary.main],
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue as TabType); // ✅ safely cast to TabType
    };
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} >
            {/* Card Wrapper */}
            <Paper sx={{ p: 3, borderRadius: 2, maxWidth: "1000px", mx: "auto" }}>
                {/* Title */}
                <Typography variant="h5" fontSize={{ xs: 25, sm: 30, md: 40 }} fontWeight="bold" sx={{ mb: 2 }} display="flex" justifyContent="center">
                    Sales & Stock Tracking
                </Typography>

                {/* Filters */}
                <Box>
                    <Typography
                        variant="h5"
                        fontSize={{ xs: 20, sm: 25, md: 32 }}
                        fontWeight="500"
                        sx={{ mb: 2 }}
                    >
                        Real-time Sales Tracking
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",  // Change to flex for better control
                            alignItems: "center",
                            gap: 3,  // Adjust spacing between elements
                            flexWrap: "wrap", // Ensure responsiveness
                            mb: 2
                        }}
                    >
                        {/* Ticket Category */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
                                Ticket Category:
                            </Typography>
                            <FormControl sx={{ minWidth: 120 }}>
                                <Select defaultValue="All" size="small">
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="VIP">VIP</MenuItem>
                                    <MenuItem value="Standard">Standard</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Ticket Status */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
                                Ticket Status:
                            </Typography>
                            <FormControl sx={{ minWidth: 120 }}>
                                <Select defaultValue="All" size="small">
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="Sold">Sold</MenuItem>
                                    <MenuItem value="Remaining">Remaining</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Date Range */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
                                Date Range:
                            </Typography>
                            <TextField
                                type="date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Table */}
                <TicketReservationManagementTable type="2" headers={realTimeSalseTrackingTableHeaders} data={realTimeSalseTrackingTableData} />

                {/* Sales Graph */}
                <Box sx={{ mt: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Sales Graph
                        </Typography>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab
                                label="Monthly"
                                value="monthly"
                                sx={{
                                    fontSize: { xs: "10px", sm: "12px", md: "14px" },
                                    '&.Mui-selected': {
                                        borderBottom: `2px solid ${theme.palette.primary.main}`
                                    }
                                }}
                            />
                            <Tab
                                label="Weekly"
                                value="weekly"
                                sx={{
                                    fontSize: { xs: "10px", sm: "12px", md: "14px" },
                                    '&.Mui-selected': {
                                        borderBottom: `2px solid ${theme.palette.primary.main}`
                                    }
                                }}
                            />
                            <Tab
                                label="Daily"
                                value="daily"
                                sx={{
                                    fontSize: { xs: "10px", sm: "12px", md: "14px" },
                                    '&.Mui-selected': {
                                        borderBottom: `2px solid ${theme.palette.primary.main}`
                                    }
                                }}
                            />
                        </Tabs>
                    </Box>

                    <Chart
                        options={salesGraphChartOptions}
                        series={salesGraphChartData[activeTab].series}
                        type="line"
                        height={300}
                    />
                </Box>
            </Paper>
        </Box>
    )
}