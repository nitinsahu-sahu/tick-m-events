import { Grid, Paper, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { Chart } from "src/components/chart";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import dayjs from 'dayjs';

import { AnalyticsCard } from "./analytics-card";

type Order = {
    totalAmount?: number;
    paymentStatus?: 'pending' | 'confirmed' | 'denied';
};

export function AnalyticsFourCards({ up, chartOptions, donutChartOptions, selectedEvent }: any) {
    const theme = useTheme();
    const totalTickets = selectedEvent?.ticketQuantity ?? 0;
    const soldTickets = selectedEvent?.soldTicket ?? 0;
    // Calculate remaining tickets
    const remainingTickets = totalTickets - soldTickets;

    const revenue = (selectedEvent?.order as Order[] | undefined)
        ?.filter(order => order.paymentStatus === 'confirmed')
        .reduce((total: number, order: Order) => total + (order.totalAmount ?? 0), 0) ?? 0;

    // Calculate dynamic values
    const confirmedOrders = selectedEvent?.order?.filter((o: any) => o.paymentStatus === "confirmed") || [];

    const confirmedTickets = confirmedOrders.reduce(
        (sum: number, order: any) =>
            sum + order.tickets.reduce((s: number, t: any) => s + t.quantity, 0),
        0
    );

    const scannedTickets =
        selectedEvent?.order
            ?.filter((order: any) => order.verifyEntry && order.ticketCode)
            ?.reduce((uniqueCodes: Set<string>, order: any) => {
                uniqueCodes.add(order.ticketCode);
                return uniqueCodes;
            }, new Set<string>())?.size ?? 0;

    const percentage = totalTickets > 0 ? Number(((confirmedTickets / totalTickets) * 100).toFixed(1)) : 0;

    // Group confirmed ticket sales by day
    const ticketSalesByDay: { [day: string]: number } = {};

    confirmedOrders.forEach((order: any) => {
        const day = dayjs(order.createdAt).format("ddd"); // e.g., 'Mon', 'Tue'
        const quantity = order.tickets.reduce((sum: number, t: any) => sum + t.quantity, 0);
        ticketSalesByDay[day] = (ticketSalesByDay[day] || 0) + quantity;
    });

    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const ticketChartData = dayOrder.map(day => ticketSalesByDay[day] || 0);
    const revenueByDay: { [day: string]: number } = {};

    confirmedOrders.forEach((order: any) => {
        const day = dayjs(order.createdAt).format("ddd"); // 'Mon', 'Tue', etc.
        const amount = order.totalAmount ?? 0;
        revenueByDay[day] = (revenueByDay[day] || 0) + amount;
    });

    // Format revenue chart data by day order
    const revenueChartData = dayOrder.map(day => revenueByDay[day] || 0);
    const ticketsIssuedByDay: { [day: string]: number } = {};

    selectedEvent?.order?.forEach((order: any) => {
        const day = dayjs(order.createdAt).format("ddd");
        const quantity = order.tickets.reduce((sum: number, t: any) => sum + t.quantity, 0);
        ticketsIssuedByDay[day] = (ticketsIssuedByDay[day] || 0) + quantity;
    });

    const jsDayMap: { [key: string]: number } = {
        Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
    };

    const currentDayIndex = new Date().getDay();

    let cumulativeSold = 0;
    let lastKnownRemaining = totalTickets;

    const remainingTicketsByDay = dayOrder.map((day) => {
        const dayIndex = jsDayMap[day];

        if (dayIndex > currentDayIndex) {
            // For future days, keep showing the last known remaining value
            return lastKnownRemaining;
        }

        const soldToday = ticketsIssuedByDay[day] || 0;
        cumulativeSold += soldToday;

        const remaining = totalTickets - cumulativeSold;

        // Update last known remaining for use in future days
        lastKnownRemaining = remaining;

        return remaining;
    });

    return (
        <Grid container spacing={2} alignItems="stretch">
            {/* Card 1 - Total Tickets Sold */}
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
                <AnalyticsCard
                    title="Total Tickets Sold"
                    value={soldTickets.toString()}
                    iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
                    chartOptions={{
                        ...chartOptions,
                        xaxis: {
                            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        colors: [theme.palette.primary.main]
                    }}

                    chartSeries={[{ name: "Tickets", data: ticketChartData }]}
                    chartType="line"
                    chartHeight={110}
                />
            </Grid>

            {/* Card 2 - Revenue Generated */}
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
                <AnalyticsCard
                    title="Revenue Generated"
                    value={`XAF ${revenue.toLocaleString('en-CM')}`}
                    iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
                    chartOptions={{
                        ...chartOptions,
                        xaxis: {
                            categories: dayOrder
                        },
                        colors: ['#0B2E4E']
                    }}
                    chartSeries={[{ name: "Revenue", data: revenueChartData }]}
                    chartType="line"
                    chartHeight={110}
                />
            </Grid>

            {/* Card 3 - Remaining Tickets */}
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
                <AnalyticsCard
                    title="Remaining Tickets"
                    value={remainingTickets.toString()}
                    iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
                    chartOptions={{
                        ...chartOptions,
                        chart: { type: "bar", toolbar: { show: false }, sparkline: { enabled: true } },
                        colors: [theme.palette.error.main],
                        plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
                    }}
                    chartSeries={[{ name: "Remaining", data: remainingTicketsByDay }]}

                    chartType="bar"
                    chartHeight={100}
                />
            </Grid>

            {/* Card 4 - Tickets Confirmed */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: "12px", display: "flex", alignItems: "center" }}>
                    <Box sx={{ flex: 1 }}>
                        <HeadingCommon
                            title={`${percentage}% of tickets purchased are confirmed`}
                            weight={700}
                            baseSize="14px"
                        />
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            <Box
                                component="img"
                                src="./assets/icons/dashboard/ic_arrow_right.svg"
                                width={20}
                                height={20}
                                sx={{ fill: theme.palette.success.main }}
                            />
                            <HeadingCommon
                                title={`Total confirmed tickets: ${confirmedTickets}`}
                                weight={300}
                                baseSize="12px"
                            />
                            <Box>
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
                        <HeadingCommon
                            title={`${confirmedTickets} vs. Number of tickets scanned at the entrance: ${scannedTickets}`}
                            weight={600}
                            baseSize="13px"
                        />
                    </Box>
                </Paper>
            </Grid>

        </Grid>
    )
}