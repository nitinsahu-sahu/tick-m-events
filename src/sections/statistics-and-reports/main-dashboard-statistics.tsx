import { Box, Grid, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

interface MainDashboardStatisticsProps {
    selectedEvent: any;
}

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

export function MainDashboardStatistics({ selectedEvent }: MainDashboardStatisticsProps) {
    console.log(selectedEvent);

    const isRefundApproved = (orderId: string): boolean =>
        Array.isArray(selectedEvent?.refundRequests) &&
        selectedEvent.refundRequests.some(
            (refund: any) =>
                refund.orderId?._id === orderId && refund.refundStatus === "approved"
        );

    // PEAK SALES LOGIC
    interface HourlySales {
        [key: string]: number;
    }

    let peakHour = "";
    let peakTicketsSold = 0;
    const hourlySales: HourlySales = {};

    if (Array.isArray(selectedEvent?.order)) {
        selectedEvent.order.forEach((order: any) => {
            if (!order.createdAt || isRefundApproved(order._id) || order.paymentStatus !== "confirmed") return;

            const date = new Date(order.createdAt);
            const hourKey = `${date.toISOString().slice(0, 13)}:00`; // e.g. "2025-08-12T15:00"

            const ticketCount = Array.isArray(order.tickets)
                ? order.tickets.reduce((sum: number, ticket: any) => sum + (ticket.quantity || 0), 0)
                : 0;

            hourlySales[hourKey] = (hourlySales[hourKey] || 0) + ticketCount;

            if (hourlySales[hourKey] > peakTicketsSold) {
                peakTicketsSold = hourlySales[hourKey];
                peakHour = hourKey;
            }
        });
    }

    let formattedPeakSales = "No sales data available";

    if (peakHour) {
        const peakDate = new Date(peakHour);
        const dateStr = peakDate.toLocaleDateString("en-GB"); // "dd/mm/yyyy"
        const hourStr = peakDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
        }); // e.g. "3 PM"

        formattedPeakSales = `${dateStr} at ${hourStr} – ${peakTicketsSold} tickets sold in 1 hour`;
    }

    // Calculate total tickets sold from selectedEvent
    const totalTicketsSold = Array.isArray(selectedEvent?.order)
        ? selectedEvent.order
            .filter((order: any) => !isRefundApproved(order._id))
            .reduce((sum: number, order: any) =>
                sum + order.tickets.reduce((ticketSum: number, ticket: any) =>
                    ticketSum + (ticket.quantity || 0), 0)
                , 0) : 0;

    // If you want total tickets available
    const totalTicketsAvailable = selectedEvent && selectedEvent.ticketQuantity
        ? Number(selectedEvent.ticketQuantity)
        : 0;

    const conversionRate = totalTicketsAvailable
        ? Number(((totalTicketsSold / totalTicketsAvailable) * 100).toFixed(2))
        : 0;

    const revenueGenerated = Array.isArray(selectedEvent?.order)
        ? selectedEvent.order
            .filter((order: any) => order.paymentStatus === "confirmed" && !isRefundApproved(order._id))
            .reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0)
        : 0;

    const ticketsPendingPaymentCount = Array.isArray(selectedEvent?.order)
        ? selectedEvent.order
            .filter((order: any) => order.paymentStatus === "pending" && !isRefundApproved(order._id))
            .reduce((sum: number, order: any) =>
                sum + order.tickets.reduce((ticketSum: number, ticket: any) =>
                    ticketSum + (ticket.quantity || 0), 0)
                , 0)
        : 0;


    // Replace your chart data or counts with these variables
    const totalTicketsSoldStr = totalTicketsSold.toString();
    const revenueGeneratedStr = selectedEvent?.payStatus === "free"
        ? "Free Tickets"
        : `${revenueGenerated.toLocaleString("en-CM")} XAF`;


    // 1. Create an array with days of the week labels
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // 2. Initialize an object to accumulate sales per day
    const ticketsSoldByDay: Record<string, number> = {
        Sun: 0,
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
    };

    if (Array.isArray(selectedEvent?.order)) {
        selectedEvent.order.forEach((order: any) => {
            if (!order.createdAt || isRefundApproved(order._id)) return;

            const date = new Date(order.createdAt);
            if (Number.isNaN(date.getTime())) return;

            const day = daysOfWeek[date.getDay()];
            const ticketCount = Array.isArray(order.tickets)
                ? order.tickets.reduce((sum: number, ticket: any) => sum + (ticket.quantity || 0), 0)
                : 0;

            ticketsSoldByDay[day] += ticketCount;
        });
    }

    // 4. Prepare the chart series data in order of daysOfWeek array
    const totalTicketsSoldPerDay = daysOfWeek.map(day => ticketsSoldByDay[day]);
    const revenueByDay: Record<string, number> = {
        Sun: 0,
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
    };

    let cumulativeSold = 0;
    const remainingTicketsPerDay = totalTicketsSoldPerDay.map(sold => {
        cumulativeSold += sold;
        return totalTicketsAvailable - cumulativeSold;
    });

    if (Array.isArray(selectedEvent?.order)) {
        selectedEvent.order.forEach((order: any) => {
            if (!order.createdAt || isRefundApproved(order._id) || order.paymentStatus !== "confirmed") return;

            const date = new Date(order.createdAt);
            const day = daysOfWeek[date.getDay()];
            revenueByDay[day] += order.totalAmount || 0;
        });
    }

    const totalRevenuePerDay = daysOfWeek.map(day => revenueByDay[day]);

    // Line Chart Data (Total Tickets Sold, Revenue, Pending Payments)
    const lineChartOptions: ApexOptions = {
        chart: { type: "line", height: 50, sparkline: { enabled: true } },
        stroke: { width: 4, curve: "smooth" },
        colors: ["#2395D4"],
    };
    const lineChartSeries = [{ data: totalTicketsSoldPerDay }];

    const weekDaysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weeklyTicketsSoldByDay: Record<string, number> = {
        Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0,
    };
    if (Array.isArray(selectedEvent?.order)) {
        // Get start (Sunday) and end (Saturday) of the current week
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
        endOfWeek.setHours(23, 59, 59, 999);

        // console.log(startOfWeek);
        // console.log(endOfWeek);
        selectedEvent.order.forEach((order: any) => {
            // console.log("xd",new Date(order.createdAt).toISOString().split('T')[0]);
            if (!order.createdAt) return;

            const orderDate = new Date(order.createdAt);
            console.log("orderData", orderDate)
            // ✅ Only include orders between Sun and Sat of this week
            if (orderDate < startOfWeek || orderDate > endOfWeek) return;

            const dayName = daysOfWeek[orderDate.getDay()];
            const ticketCount = Array.isArray(order.tickets)
                ? order.tickets.reduce((sum: number, ticket: any) => sum + (ticket.quantity || 0), 0)
                : 0;

            weeklyTicketsSoldByDay[dayName] += ticketCount;
        });

    }

    const totalTicketsSoldThisWeek = weekDaysOrder.map(day => weeklyTicketsSoldByDay[day]);

    // Line Chart Data (Total Tickets Sold, Revenue, Pending Payments)
    const SalesEvaluationChartOptions: ApexOptions = {
        chart: { type: "line", height: 50, sparkline: { enabled: true } },
        stroke: { width: 4, curve: "smooth" },
        colors: ["#2395D4"],
    };
    const SalesEvaluationChartSeries = [{ data: totalTicketsSoldThisWeek }];

    // console.log("Orders counted this week:", weeklyTicketsSoldByDay);

    // console.log("SalesEvaluationChartSeries", SalesEvaluationChartSeries);
    // Line Chart Data (Total Tickets Sold, Revenue, Pending Payments)
    const RevenueGenerateChartOptions: ApexOptions = {
        chart: { type: "line", height: 50, sparkline: { enabled: true } },
        stroke: { width: 4, curve: "smooth" },
        colors: ["#0B2E4E"],
    };
    const RevenueGenerateChartSeries = [{ data: totalRevenuePerDay }];

    // Bar Chart Data (Remaining Tickets & Sales Trends)
    const barChartOptions: ApexOptions = {
        chart: { type: "bar", height: 50, sparkline: { enabled: true } },
        plotOptions: { bar: { columnWidth: "50%" } },
        colors: ["#FF5733"],
    };
    const barChartSeries = [
        {
            name: "Tickets Sold",
            data: totalTicketsSoldPerDay,
        },
        {
            name: "Remaining Tickets",
            data: remainingTicketsPerDay,
        },
    ];

    const pendingTicketsByDay: Record<string, number> = {
        Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0,
    };

    if (Array.isArray(selectedEvent?.order)) {
        selectedEvent.order
            .filter((order: any) => order.paymentStatus === "pending")
            .forEach((order: any) => {
                if (!order.createdAt) return;

                const date = new Date(order.createdAt);
                const day = daysOfWeek[date.getDay()];
                const ticketCount = Array.isArray(order.tickets)
                    ? order.tickets.reduce((sum: number, ticket: any) => sum + (ticket.quantity || 0), 0)
                    : 0;

                pendingTicketsByDay[day] += ticketCount;
            });
    }

    const totalPendingTicketsPerDay = daysOfWeek.map(day => pendingTicketsByDay[day]);

    const TicketsPendingChartOptions: ApexOptions = {
        chart: { type: "line", height: 50, sparkline: { enabled: true } },
        stroke: { width: 4, curve: "smooth" },
        colors: ["#FF5733"], // you can change color if needed
    };

    const TicketsPendingChartSeries = [{ data: totalPendingTicketsPerDay }];

    const validatedTicketsCount = Array.isArray(selectedEvent?.order)
        ? selectedEvent.order
            .filter((order: any) => order.verifyEntry === true) // only validated entries
            .reduce((sum: number, order: any) =>
                sum + order.tickets.reduce((ticketSum: number, ticket: any) =>
                    ticketSum + (ticket.quantity || 0), 0)
                , 0)
        : 0;
    const validatedPercentage = totalTicketsAvailable > 0
        ? Math.round((validatedTicketsCount / totalTicketsAvailable) * 100)
        : 0;

    return (
        <Box mt={3}>
            <HeadingCommon title="Main Dashboard Statistics" mb={0} />

            <Grid container spacing={2} mt={1}>
                {[
                    {
                        totalCount: totalTicketsSoldStr || "0",
                        head: "Total Tickets Sold",
                        chartOptions: lineChartOptions,
                        chartSeries: lineChartSeries,
                    },
                    {
                        totalCount: revenueGeneratedStr,
                        head: "Revenue Generated",
                        chartOptions: RevenueGenerateChartOptions,
                        chartSeries: RevenueGenerateChartSeries,
                    },
                    {
                        totalCount: (totalTicketsAvailable - totalTicketsSold).toString(),
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
                                        {validatedTicketsCount.toLocaleString()} {/* dynamically show count */}
                                    </Typography>
                                    <Typography color="primary" sx={{ fontSize: "13px", fontWeight: 500 }}>
                                        Tickets <br /> Validated at Entrance
                                    </Typography>
                                </Box>
                                <Box position="relative" display="flex" alignItems="center">
                                    <CircularProgress
                                        variant="determinate"
                                        value={validatedPercentage} // replace with dynamic % if available
                                        size={55}
                                        thickness={5}
                                        sx={{ color: "#2395D4" }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {validatedPercentage}%
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
                                    <CircularProgress variant="determinate" value={conversionRate} size={55} thickness={5} sx={{ color: "#2395D4" }} />
                                    <Typography
                                        variant="caption"
                                        sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold" }}
                                    >
                                        {conversionRate}%
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                    },
                    {
                        totalCount: ticketsPendingPaymentCount.toString(),
                        head: "Tickets Pending Payment",
                        chartOptions: TicketsPendingChartOptions,
                        chartSeries: TicketsPendingChartSeries,
                    },
                    {
                        custom: true,
                        content: (
                            <>
                                <Typography variant="h6" fontWeight="bold">
                                    Peak Sales
                                </Typography>
                                <Typography variant="body2" color="#2395D4" fontSize={13}>
                                    {formattedPeakSales}
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