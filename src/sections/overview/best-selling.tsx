
import { Card, Grid, Typography, Box, MenuItem, Select, Stack, Tab, Tabs } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";
import dayjs from 'dayjs';
import { Chart } from "src/components/chart";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { ApexOptions } from 'apexcharts';

interface TicketSalesData {
    labels: string[];
    series: number[];
}

export function BestSelling(
    {
        selectedTicket,
        setSelectedTicket,
        donutBestSellingChartOptions,
        donutBestSellingChartSeries,
        chartOptions, selectedEvent
    }: any) {

    const totalTickets = Number(selectedEvent?.ticketQuantity) || 0;
    const soldTickets = Number(selectedEvent?.soldTicket) || 0;
    const ticketsLeft = totalTickets - soldTickets;
    const percentSold = totalTickets > 0 ? (soldTickets / totalTickets) * 100 : 0;
    const ticketData = getLast7DaysTicketData(selectedEvent);
    const lastValue = ticketData[ticketData.length - 1] || 0;
    const prevValue = ticketData[ticketData.length - 2] || 0;
    const dynamicGrowth = prevValue === 0
        ? 0
        : Math.round(((lastValue - prevValue) / prevValue) * 100);

    const ticketTypes = selectedEvent?.tickets?.[0]?.tickets || [];
    useEffect(() => {
        const firstTicket = selectedEvent?.tickets?.[0]?.tickets?.[0];
        const allTicketTypes = selectedEvent?.tickets?.[0]?.tickets?.map((t: any) => t.ticketType) || [];

        if (firstTicket && (!selectedTicket || !allTicketTypes.includes(selectedTicket))) {
            setSelectedTicket(firstTicket.ticketType);
        }
    }, [selectedEvent, selectedTicket, setSelectedTicket]);

    const { labels, series } = getTicketSalesData(selectedEvent, selectedTicket);

    const hasData = series.some(value => value > 0);

    const fallbackLabels = [selectedTicket || "No Sales"];
    const fallbackSeries = [0.00001, 0.99999];
    const localDonutOptions: ApexOptions = {
        chart: { type: "donut" },
        labels: hasData ? labels : fallbackLabels,
        legend: { show: false },
        colors: hasData ? undefined : ["#9E9E9E", "#F7F7F7"],
        dataLabels: {
            formatter: () => hasData ? '' : '0%',
            style: {
                colors: ['#FFFFFF'],
            },
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
            },
            fillSeriesColor: false,
        },
    };

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
                            <Select
                                value={selectedTicket}
                                onChange={(e) => setSelectedTicket(e.target.value)}
                                size="small"
                                sx={{ minWidth: 100 }}
                            >
                                {ticketTypes.map((ticket: any) => (
                                    <MenuItem key={ticket.id} value={ticket.ticketType}>
                                        {ticket.ticketType}
                                    </MenuItem>
                                ))}
                            </Select>

                        </Stack>
                    </Stack>

                    {/* Chart & Info */}
                    <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" mt={2} spacing={2} flex={1}>
                        <Chart
                            options={{
                                ...localDonutOptions,
                                labels,
                                colors: series[0] > 0 ? undefined : ["#E0E0E0"]
                            }}
                            series={series}
                            type="donut"
                            height={150}
                            width={150}
                        />


                        <Stack spacing={2} flex={1}>
                            <HeadingCommon
                                title="Visualize your ticket performance."
                                variant="body2"
                                baseSize="14px"
                                weight={400}
                                color="primary"
                            />
                            <Stack direction="row" spacing={2}>
                                {(() => {
                                    const selectedTicketData = ticketTypes.find((t: any) => t.ticketType === selectedTicket);
                                    const ticketId = selectedTicketData?.id;
                                    const totalForTicket = Number(selectedTicketData?.totalTickets || 0);

                                    const soldForTicket = selectedEvent?.order?.reduce((sum: number, order: any) => {
                                        if (order.paymentStatus !== "confirmed") return sum;

                                        const ticketQty = Array.isArray(order.tickets)
                                            ? order.tickets.reduce(
                                                (innerSum: number, t: any) =>
                                                    t.ticketId === ticketId ? innerSum + (t.quantity || 0) : innerSum,
                                                0
                                            )
                                            : 0;

                                        return sum + ticketQty;
                                    }, 0) || 0;


                                    const leftForTicket = totalForTicket - soldForTicket;

                                    return (
                                        <>
                                            <Stack>
                                                <Box width={20} height={5} bgcolor="#12263F" borderRadius={2} />
                                                <Typography variant="h6" fontWeight="bold">{leftForTicket}</Typography>
                                                <Typography variant="caption" color="gray">Ticket Left</Typography>
                                            </Stack>
                                            <Stack>
                                                <Box width={20} height={5} bgcolor="#1E88E5" borderRadius={2} />
                                                <Typography variant="h6" fontWeight="bold">{soldForTicket}</Typography>
                                                <Typography variant="caption" color="gray">Ticket Sold</Typography>
                                            </Stack>
                                        </>
                                    );
                                })()}
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
                                {getTodayTicketSold(selectedEvent)} <span style={{ fontSize: "16px" }}>pcs</span>
                            </Typography>
                        </Box>

                        {/* Growth Chart */}
                        <Box display="flex" alignItems="center">
                            <Chart
                                options={{ ...chartOptions, colors: ["#FFF"] }}
                                series={[{ name: "Tickets", data: ticketData }]}
                                type="line"
                                height={110}
                                width={100}
                            />
                            <Box>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {dynamicGrowth >= 0 ? `+${dynamicGrowth}%` : `${dynamicGrowth}%`}
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    from last day
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Progress Bar */}
                    <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" mt={1} spacing={1}>
                        <HeadingCommon
                            title={`${ticketsLeft} pcs left`}
                            variant="body2"
                            baseSize="12px"
                            weight={400}
                            color="#2395D4"
                            css={{ backgroundColor: "#FFF", px: 1, borderRadius: 1 }}
                        />

                        <Box sx={{ width: "100%", height: 8, backgroundColor: "#64B5F6", borderRadius: 4, overflow: "hidden" }}>
                            <Box sx={{ width: `${percentSold}%`, height: "100%", backgroundColor: "#FFF" }} />
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


function getTodayTicketSold(selectedEvent: any) {
    const today = dayjs().format("YYYY-MM-DD");

    if (!selectedEvent?.order?.length) return 0;

    return selectedEvent.order.reduce((total: number, order: any) => {
        const orderDate = dayjs(order.createdAt).format("YYYY-MM-DD");
        if (orderDate === today && order.paymentStatus === "confirmed") {
            const qty = order.tickets?.reduce((sum: number, t: any) => sum + (t.quantity || 0), 0) || 0;
            return total + qty;
        }
        return total;
    }, 0);
}

function getTicketsSoldOnDate(selectedEvent: any, date: string): number {
    if (!selectedEvent?.order?.length) return 0;

    return selectedEvent.order.reduce((total: number, order: any) => {
        const orderDate = dayjs(order.createdAt).format("YYYY-MM-DD");
        if (orderDate === date && order.paymentStatus === "confirmed") {
            const qty = order.tickets?.reduce((sum: number, t: any) => sum + (t.quantity || 0), 0) || 0;
            return total + qty;
        }
        return total;
    }, 0);
}

function getTicketGrowthPercentage(selectedEvent: any): number {
    const today = dayjs().format("YYYY-MM-DD");
    const yesterday = dayjs().subtract(1, 'day').format("YYYY-MM-DD");

    const todayCount = getTicketsSoldOnDate(selectedEvent, today);
    const yesterdayCount = getTicketsSoldOnDate(selectedEvent, yesterday);

    if (yesterdayCount === 0) {
        return todayCount > 0 ? 100 : 0; // Avoid division by zero
    }

    const change = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
    return Math.round(change);
}

function getLast7DaysTicketData(selectedEvent: any): number[] {
    const days = [...Array(7)].map((_, i) => dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD'));

    return days.map(date => getTicketsSoldOnDate(selectedEvent, date));
}
function getTicketSalesData(event: any, selectedTicket: string): { labels: string[]; series: number[] } {
    const ticketList = event?.tickets?.[0]?.tickets || [];
    const selected = ticketList.find((t: any) => t.ticketType === selectedTicket);

    if (!selected) {
        return {
            labels: [selectedTicket || "Unknown Ticket"],
            series: [0, 0],  // two series: sold, total
        };
    }

    const totalCount = Number(selected.totalTickets || 0);
    let soldCount = 0;

    event?.order?.forEach((order: any) => {
        if (order.paymentStatus !== "confirmed") return;

        order.tickets?.forEach((ticket: any) => {
            if (ticket.ticketType === selectedTicket) {
                soldCount += ticket.quantity || 0;
            }
        });
    });

    // Return series as [soldCount, totalCount]
    return {
        labels: ["Sold", "Total"],  // or use ["Sold Tickets", "Total Tickets"]
        series: [soldCount, totalCount],
    };
}



