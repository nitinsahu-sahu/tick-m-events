import { ApexOptions } from "apexcharts";
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@mui/material";
import Chart from "react-apexcharts";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTicketType } from "src/redux/actions/ticket-&-reservation-management.action";

const ticketData = [
    { type: "Standard", price: 10000, stock: 3000, sold: 2500, percentage: 55, revenue: 25000000, color: "#2196F3" },
    { type: "VIP", price: 20000, stock: 1500, sold: 1200, percentage: 80, revenue: 24000000, color: "#212121" },
    { type: "Premium", price: 50000, stock: 500, sold: 300, percentage: 60, revenue: 15000000, color: "#FF5722" },
];

const chartOptions: ApexOptions = {
    chart: { type: "radialBar" },
    plotOptions: {
        radialBar: {
            hollow: { size: "50%" },
            track: { background: "#F0F3FA" },
            dataLabels: {
                name: { show: false },
                value: { fontSize: "16px", fontWeight: "bold", color: "#333" }, // Customizing value labels
            },
        },
    },
    labels: ticketData.map((t) => t.type),
    colors: ticketData.map((t) => t.color),
    legend: {
        show: true,
        position: "right", // Options: 'top', 'bottom', 'left', 'right'
        fontSize: "14px",
        fontWeight: 500,
        labels: { colors: "#333" },
        itemMargin: { horizontal: 25, vertical: 5 },
    },
};


const chartSeries = ticketData.map((t) => t.percentage);
export function TicketDetailsAndCategories() {
    const dispatch = useDispatch<AppDispatch>();

    const { tickets } = useSelector((state: RootState) => state?.ticketReservationMang);
    useEffect(() => {
        dispatch(fetchTicketType());
        const interval = setInterval(() => {
            dispatch(fetchTicketType());
        }, 15000);

        return () => clearInterval(interval);
    }, [dispatch]);
    return (
        <Box boxShadow={3} borderRadius={3} mt={3}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Ticket Details & Categories
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell align="center"><b>Ticket Type</b></TableCell>
                                <TableCell align="center"><b>Price</b></TableCell>
                                <TableCell align="center"><b>Total Stock</b></TableCell>
                                <TableCell align="center"><b>Tickets Sold</b></TableCell>
                                <TableCell align="center"><b>% of Sales</b></TableCell>
                                <TableCell align="center"><b>Revenue</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets?.map((ticket: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{ticket.name}</TableCell>
                                    <TableCell align="center">{ticket.price}</TableCell>
                                    <TableCell align="center">{ticket.quantity}</TableCell>
                                    <TableCell align="center">{ticket.sold || 0}</TableCell>
                                    <TableCell align="center">
                                        {ticket.quantity > 0
                                            ? `${Math.round((ticket.sold / ticket.quantity) * 100) || 0}%`
                                            : "0%"
                                        }
                                    </TableCell>
                                    <TableCell align="center">{ticket.price === "Free"
                                        ? ticket.price
                                        : `${parseInt(ticket.price, 10) * parseInt(ticket.sold || 0, 10)} XAF`
                                    }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container mt={2} alignItems="center" sx={{ border: "2px solid grey", borderRadius: 3, py: 2, px: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold">Ticket Sales Distribution</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Chart options={chartOptions} series={chartSeries} type="radialBar" width={320} />
                    </Grid>
                </Grid>

            </Card>
        </Box>
    )
}