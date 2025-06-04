import { Box, FormControl, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTheme } from '@mui/material/styles';
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";
import { realTimeSalseTrackingTableHeaders } from "./utills";

type TabType = 'monthly' | 'weekly' | 'daily';

export function SalesAndStockTracking({ tickets }: any) {
    const [activeTab, setActiveTab] = useState<TabType>('monthly'); // 👈 typed state
    const theme = useTheme();
    const [priceFilter, setPriceFilter] = useState("All");
    const [nameFilter, setNameFilter] = useState("All");

    // Get unique ticket names for the name filter dropdown
    const ticketNames = useMemo(() => {
        const names = tickets?.map((ticket: any) => ticket.name);
        return ["All", ...new Set(names)];
    }, [tickets]);

    const ticketPrice = useMemo(() => {
        const price = tickets?.map((ticket: any) => ticket.price);
        return ["All", ...new Set(price)];
    }, [tickets]);

    // Filter tickets based on selected filters
    const filteredTickets = useMemo(() => {
        if (!tickets) return [];

        return tickets.filter((ticket: any) => {
            // Apply category filter
            const priceMatch =
                priceFilter === "All" ||
                (ticket.price === priceFilter)

            // Apply name filter
            const nameMatch =
                nameFilter === "All" ||
                ticket.name === nameFilter;

            return priceMatch && nameMatch;
        });
    }, [tickets, priceFilter, nameFilter]);

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
        <Paper sx={{ p: 3, borderRadius: 3, mt: 3, boxShadow: 3 }}>
            {/* Title */}
            <Box sx={{ textAlign: 'center' }}>
                <HeadingCommon
                    baseSize="40px"
                    weight={700}
                    variant="h5"
                    title="Sales & Stock Tracking"
                />
            </Box>

            {/* Filters */}
            <Box>
                <HeadingCommon
                    baseSize="32px"
                    weight={600}
                    variant="h5"
                    title="Real-time Sales Tracking"
                />
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
                        <HeadingCommon
                            baseSize="14px"
                            weight={400}
                            title="Ticket Name:"
                        />
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <Select
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                size="small"
                                sx={{
                                    fontSize: '0.8rem',
                                    height: '32px',
                                    '& .MuiSelect-select': {
                                        padding: '6px 12px'
                                    }
                                }}
                            >
                                {ticketNames.map((name: any) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        sx={{ fontSize: '0.8rem', minHeight: '32px', textTransform: "capitalize" }}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Ticket Status */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <HeadingCommon
                            baseSize="14px"
                            weight={400}
                            title="Ticket Price:"
                        />
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <Select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                size="small"
                                sx={{
                                    fontSize: '0.8rem',
                                    height: '32px',
                                    '& .MuiSelect-select': {
                                        padding: '6px 12px'
                                    }
                                }}
                            >
                                {ticketPrice.map((name: any) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        sx={{ fontSize: '0.8rem', minHeight: '32px', textTransform: "capitalize" }}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>

            {/* Table */}
            <TicketReservationManagementTable type="2" headers={realTimeSalseTrackingTableHeaders} data={filteredTickets} />

            {/* Sales Graph */}
            <Box sx={{ mt: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <HeadingCommon
                        baseSize="20px"
                        weight={500}
                        variant="h5"
                        title="Sales Graph"
                        color="#2395D4"
                    />
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
    )
}