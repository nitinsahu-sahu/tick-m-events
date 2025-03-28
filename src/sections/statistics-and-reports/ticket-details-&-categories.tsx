import { ApexOptions } from "apexcharts";
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@mui/material";
import Chart from "react-apexcharts";

const ticketData = [
    { type: "Standard", price: 10000, stock: 3000, sold: 2500, percentage: 55, revenue: 25000000, color: "#2196F3" },
    { type: "VIP", price: 20000, stock: 1500, sold: 1200, percentage: 80, revenue: 24000000, color: "#212121" },
    { type: "Premium", price: 50000, stock: 500, sold: 300, percentage: 60, revenue: 15000000, color: "#FF5722" },
];

const chartOptions: ApexOptions = {
    chart: { type: "radialBar" },
    plotOptions: {
        radialBar: {
            hollow: { size: "40%" },
            dataLabels: {
                name: { show: false },
                value: { fontSize: "16px" },
            },
        },
    },
    labels: ticketData.map((t) => t.type),
    colors: ticketData.map((t) => t.color),
};

const chartSeries = ticketData.map((t) => t.percentage);
export function TicketDetailsAndCategories() {
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
                                <TableCell><b>Ticket Type</b></TableCell>
                                <TableCell><b>Price</b></TableCell>
                                <TableCell><b>Total Stock</b></TableCell>
                                <TableCell><b>Tickets Sold</b></TableCell>
                                <TableCell><b>% of Sales</b></TableCell>
                                <TableCell><b>Revenue</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketData.map((ticket, index) => (
                                <TableRow key={index}>
                                    <TableCell>{ticket.type}</TableCell>
                                    <TableCell>{ticket.price.toLocaleString()} XAF</TableCell>
                                    <TableCell>{ticket.stock.toLocaleString()}</TableCell>
                                    <TableCell>{ticket.sold.toLocaleString()}</TableCell>
                                    <TableCell>{ticket.percentage}%</TableCell>
                                    <TableCell>{ticket.revenue.toLocaleString()} XAF</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={3} mt={3} alignItems="center">
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