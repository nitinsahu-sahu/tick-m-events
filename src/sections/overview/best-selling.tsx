import { Card, Grid, Typography, Box, MenuItem, Select, Stack, Tab, Tabs } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { Chart } from "src/components/chart";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function BestSelling(
    {
        selectedTicket,
        setSelectedTicket,
        donutBestSellingChartOptions,
        donutBestSellingChartSeries,
        chartOptions
    }: any) {


    return (
        <Grid container spacing={3} alignItems="stretch">
            {/* Left Card - Best Selling */}
            <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                    <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" spacing={2}>
                        <Typography variant="h6" color="primary">Best Selling</Typography>

                        {/* Ticket Type Selector */}
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>Ticket Type:</Typography>
                            <Select value={selectedTicket} onChange={(e) => setSelectedTicket(e.target.value)} size="small" sx={{ minWidth: 100 }}>
                                <MenuItem value="VIP">VIP</MenuItem>
                                <MenuItem value="Standard">Standard</MenuItem>
                                <MenuItem value="Early Bird">Early Bird</MenuItem>
                            </Select>
                        </Stack>
                    </Stack>

                    {/* Chart & Info */}
                    <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" mt={2} spacing={2} flex={1}>
                        <Chart options={donutBestSellingChartOptions} series={donutBestSellingChartSeries} type="donut" height={150} width={150} />

                        <Stack spacing={2} flex={1}>
                            <HeadingCommon
                                title="Visualize your ticket performance."
                                variant="body2"
                                baseSize="14px"
                                weight={400}
                                color="primary"
                            />
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                                {[
                                    { color: "#12263F", value: "21,512", label: "Ticket Left" },
                                    { color: "#1E88E5", value: "45,612", label: "Ticket Sold" },
                                    { color: "#BDBDBD", value: "275", label: "Event Held" },
                                ].map((item, index) => (
                                    <Stack key={index}>
                                        <Box width={20} height={5} bgcolor={item.color} borderRadius={2} />
                                        <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                                        <Typography variant="caption" color="gray">{item.label}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </Card>
            </Grid>

            {/* Right Card - Ticket Sold Today */}
            <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: "#2395D4", color: "#fff", height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mt={1}>
                        {/* Ticket Sold Info */}
                        <Box>
                            <Typography variant="h6">Ticket Sold Today</Typography>

                            <Typography variant="h3" fontWeight="bold">
                                456,502 <span style={{ fontSize: "16px" }}>pcs</span>
                            </Typography>
                        </Box>

                        {/* Growth Chart */}
                        <Box display="flex" alignItems="center">
                            <Chart
                                options={{ ...chartOptions, colors: ["#FFF"] }}
                                series={[{ name: "Tickets", data: [10, 20, 15, 25, 2, 34, 50] }]}
                                type="line"
                                height={110}
                                width={100}
                            />
                            <Box>
                                <Typography variant="body2" sx={{ ml: 1 }}>+4%</Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>from last day</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Progress Bar */}
                    <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" mt={1} spacing={1}>
                        <HeadingCommon
                            title="986 pcs left"
                            variant="body2"
                            baseSize="12px"
                            weight={400}
                            color="#2395D4"
                            css={{backgroundColor: "#FFF",px: 1, borderRadius: 1}}
                        />
                       
                        <Box sx={{ width: "100%", height: 8, backgroundColor: "#64B5F6", borderRadius: 4, overflow: "hidden" }}>
                            <Box sx={{ width: "80%", height: "100%", backgroundColor: "#FFF" }} />
                        </Box>
                    </Stack>
                    <HeadingCommon
                        title="Track daily ticket sales performance and the number of tickets still available here."
                        variant="body2"
                        mt={1}
                        baseSize="14px"
                        weight={400}
                        color="white"
                    />
                </Card>
            </Grid>
        </Grid>
    )
}