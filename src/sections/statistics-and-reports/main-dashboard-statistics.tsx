import { Box, Grid, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export function MainDashboardStatistics() {
    // Line Chart Data (Total Tickets Sold, Revenue, Pending Payments)
    const lineChartOptions: ApexOptions = {
        chart: { type: "line", height: 50, sparkline: { enabled: true } },
        stroke: { width: 2, curve: "smooth" },
        colors: ["#007BFF"],
    };
    const lineChartSeries = [{ data: [20, 50, 30, 80, 40, 70] }];

    // Bar Chart Data (Remaining Tickets & Sales Trends)
    const barChartOptions: ApexOptions = {
        chart: { type: "bar", height: 50, sparkline: { enabled: true } },
        plotOptions: { bar: { columnWidth: "50%" } },
        colors: ["#FF5733"],
    };
    const barChartSeries = [{ data: [10, 40, 30, 70, 50, 90] }];
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Main Dashboard Statistics
            </Typography>

            <Grid container spacing={2}>
                {/* Total Tickets Sold */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold">215</Typography>
                            <Typography color="primary">Total Tickets Sold</Typography>
                            <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={50} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Revenue Generated */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold">$536k</Typography>
                            <Typography color="primary">Revenue Generated</Typography>
                            <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={50} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Remaining Tickets & Sales Trends */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold">652</Typography>
                            <Typography color="primary">Remaining Tickets & Sales Trends</Typography>
                            <Chart options={barChartOptions} series={barChartSeries} type="bar" height={50} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Attendee Engagement */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold">45,242</Typography>
                            <Typography color="primary">Attendee Engagement</Typography>
                            <Box display="flex" alignItems="center">
                                <CircularProgress variant="determinate" value={75} size={50} thickness={5} />
                                <Typography sx={{ ml: 2 }}>75%</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Conversion Rate */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography color="primary">Conversion Rate</Typography>
                            <Box display="flex" alignItems="center">
                                <CircularProgress variant="determinate" value={75} size={50} thickness={5} />
                                <Typography sx={{ ml: 2 }}>75%</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Tickets Pending Payment */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold">200</Typography>
                            <Typography color="primary">Tickets Pending Payment</Typography>
                            <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={50} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Peak Sales */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">Peak Sales</Typography>
                            <Typography variant="body2" color="textSecondary">
                                02/02/2025 at 3 PM – 700 tickets sold in 1 hour
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sales Evolution */}
                <Grid item xs={12} md={8} lg={6}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">Sales Evolution</Typography>
                            <Typography variant="body2" color="textSecondary">This Week</Typography>
                            <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={100} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}