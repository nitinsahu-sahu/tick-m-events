import { Box, Grid, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";


export function CommonBarHead({ totalCount, leftHead, head }: any) {
    return (
        <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
            <Typography variant="h6" sx={{ flex: 1, textAlign: "left" }}>
                {totalCount || leftHead}
            </Typography>
            <Typography sx={{ flex: 1, textAlign: "left", fontSize: "13px", color: "#2395D4", fontWeight: 500 }}>
                {head}
            </Typography>
        </Box>
    )
}

export function MainDashboardStatistics() {
    // Line Chart Data (Total Tickets Sold, Revenue, Pending Payments)
    const lineChartOptions: ApexOptions = {
        chart: { type: "line", height: 50, sparkline: { enabled: true } },
        stroke: { width: 4, curve: "smooth" },
        colors: ["#2395D4"],
    };
    const lineChartSeries = [{ data: [20, 50, 30, 80, 40, 70] }];

     // Line Chart Data (Total Tickets Sold, Revenue, Pending Payments)
     const SalesEvaluationChartOptions: ApexOptions = {
        chart: { type: "line", height: 50, sparkline: { enabled: true } },
        stroke: { width: 4, curve: "smooth" },
        colors: ["#2395D4"],
    };
    const SalesEvaluationChartSeries = [{ data: [20, 50, 30, 80, 40, 70] }];

    // Line Chart Data (Total Tickets Sold, Revenue, Pending Payments)
    const RevenueGenerateChartOptions: ApexOptions = {
        chart: { type: "line", height: 50, sparkline: { enabled: true } },
        stroke: { width: 4, curve: "smooth" },
        colors: ["#0B2E4E"],
    };
    const RevenueGenerateChartSeries = [{ data: [20, 50, 30, 80, 40, 10] }];

    // Bar Chart Data (Remaining Tickets & Sales Trends)
    const barChartOptions: ApexOptions = {
        chart: { type: "bar", height: 50, sparkline: { enabled: true } },
        plotOptions: { bar: { columnWidth: "50%" } },
        colors: ["#FF5733"],
    };
    const barChartSeries = [{ data: [10, 40, 30, 70, 50, 90] }];
    return (
        <Box mt={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Main Dashboard Statistics
            </Typography>

            <Grid container spacing={2} mt={2}>
                {[
                    {
                        totalCount: "215",
                        head: "Total Tickets Sold",
                        chartOptions: lineChartOptions,
                        chartSeries: lineChartSeries,
                    },
                    {
                        totalCount: "$536k",
                        head: "Revenue Generated",
                        chartOptions: RevenueGenerateChartOptions,
                        chartSeries: RevenueGenerateChartSeries,
                    },
                    {
                        totalCount: "652",
                        head: "Remaining Tickets & Sales Trends",
                        chartOptions: barChartOptions,
                        chartSeries: barChartSeries,
                        type: "bar",
                    },
                    {
                        custom: true,
                        content: (
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="h4" fontWeight="bold">
                                        45,242
                                    </Typography>
                                    <Typography color="primary" sx={{ fontSize: "13px", fontWeight: 500 }}>
                                        Attendee <br /> Engagement
                                    </Typography>
                                    <Typography sx={{ fontSize: "12px", color: "#2395D4", fontWeight: "bold" }}>
                                        2.4% <span style={{ color: "#2395D4", fontWeight: 300 }}>than last week</span>
                                    </Typography>
                                </Box>
                                <Box position="relative" display="flex" alignItems="center">
                                    <CircularProgress variant="determinate" value={75} size={55} thickness={5} sx={{ color: "#2395D4" }} />
                                    <Typography
                                        variant="caption"
                                        sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold" }}
                                    >
                                        75%
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                    },
                    {
                        custom: true,
                        content: (
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography color="primary" sx={{ fontSize: "16px", fontWeight: "bold" }}>
                                        Conversion <br /> Rate
                                    </Typography>
                                </Box>
                                <Box position="relative" display="flex" alignItems="center">
                                    <CircularProgress variant="determinate" value={75} size={55} thickness={5} sx={{ color: "#2395D4" }} />
                                    <Typography
                                        variant="caption"
                                        sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold" }}
                                    >
                                        75%
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                    },
                    {
                        totalCount: "200",
                        head: "Tickets Pending Payment",
                        chartOptions: RevenueGenerateChartOptions,
                        chartSeries: RevenueGenerateChartSeries,
                    },
                    {
                        custom: true,
                        content: (
                            <>
                                <Typography variant="h6" fontWeight="bold">
                                    Peak Sales
                                </Typography>
                                <Typography variant="body2" color="#2395D4" fontSize={13}>
                                    02/02/2025 at 3 PM – 700 tickets sold in 1 hour
                                </Typography>
                            </>
                        ),
                    },
                    {
                        totalCount: "Sales Evolution",
                        head: "This Week",
                        chartOptions: SalesEvaluationChartOptions,
                        chartSeries: SalesEvaluationChartSeries,
                    },
                ].map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ boxShadow: 3, borderRadius: 3, height: "100%" }}>
                            <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                {item.custom ? (
                                    item.content
                                ) : (
                                    <>
                                        <CommonBarHead totalCount={item.totalCount} head={item.head} />
                                        <Chart
                                            options={item.chartOptions}
                                            series={item.chartSeries}
                                            type={(item.type || "line") as "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap"}
                                            height={50}
                                        />

                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}