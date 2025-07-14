import { Grid, Paper, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { Chart } from "src/components/chart";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

import { AnalyticsCard } from "./analytics-card";

export function AnalyticsFourCards({ up, chartOptions, percentage, donutChartOptions }: any) {
    const theme = useTheme();

    return (
        <Grid container spacing={2} alignItems="stretch">
            {/* Card 1 - Total Tickets Sold */}
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
                <AnalyticsCard
                    title="Total Tickets Sold"
                    value="215"
                    iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
                    chartOptions={{ ...chartOptions, colors: [theme.palette.primary.main] }}
                    chartSeries={[{ name: "Tickets", data: [10, 20, 15, 25, 2, 34, 50] }]}
                    chartType="line"
                    chartHeight={110}
                />
            </Grid>

            {/* Card 2 - Revenue Generated */}
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
                <AnalyticsCard
                    title="Revenue Generated"
                    value="$536k"
                    iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
                    chartOptions={{ ...chartOptions, colors: ['#0B2E4E'] }}
                    chartSeries={[{ name: "Tickets", data: [10, 20, 15, 25, 20] }]}
                    chartType="line"
                    chartHeight={110}
                />
            </Grid>

            {/* Card 3 - Remaining Tickets */}
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
                <AnalyticsCard
                    title="Remaining Tickets"
                    value="652"
                    iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
                    chartOptions={{
                        ...chartOptions,
                        chart: { type: "bar", toolbar: { show: false }, sparkline: { enabled: true } },
                        colors: [theme.palette.error.main],
                        plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
                    }}
                    chartSeries={[{ name: "Remaining", data: [5, 10, 8, 15, 10, 20, 50, 22] }]}
                    chartType="bar"
                    chartHeight={100}
                />
            </Grid>

            {/* Card 4 - Tickets Confirmed */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: "12px", display: "flex", alignItems: "center" }}>
                    {/* Left Section */}
                    <Box sx={{ flex: 1 }}>
                        <HeadingCommon title={`${percentage}% of tickets purchased are confirmed`} weight={700} baseSize="14px" />
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            {/* Bullet Icon */}
                            <Box
                                component="img"
                                src="./assets/icons/dashboard/ic_arrow_right.svg"
                                width={20}
                                height={20}
                                sx={{
                                    fill: theme.palette.success.main
                                }}
                            />
                            <HeadingCommon title="Total number of tickets sold:" weight={300} baseSize="12px" />
                            <Box >
                                <Chart
                                    options={donutChartOptions}
                                    series={[percentage, 100 - percentage]}
                                    type="donut"
                                    height={100}
                                />
                                <Typography
                                    sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "black",
                                        textAlign: "center",
                                        mt: -7,
                                    }}
                                >
                                    {percentage}%
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "black",
                                        textAlign: "center",
                                        mt: 4,
                                    }}
                                >
                                    Attendee Engagement
                                </Typography>
                            </Box>
                        </Box>
                        <HeadingCommon title="215 vs. Number of tickets scanned at the entrance: 100" weight={600} baseSize="13px" />

                    </Box>

                </Paper>
            </Grid>
        </Grid>
    )
}