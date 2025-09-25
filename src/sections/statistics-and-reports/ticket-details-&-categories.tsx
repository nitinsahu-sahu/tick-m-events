import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type TicketDetailsAndCategoriesProps = {
    selectedEvent: any;
};
type TicketInfo = {
    type: string;
    price: number | string;
    stock: number;
    sold: number;
    percentage: number;
    revenue: number | string;
    color: string;
};

export function TicketDetailsAndCategories({
    selectedEvent,
}: TicketDetailsAndCategoriesProps) {
    const ticketTypes = selectedEvent?.ticketType || [];

    // Prepare ticket data with sales and revenue
    const ticketData: TicketInfo[] = ticketTypes.map((ticket: any, index: number): TicketInfo => {
        const sold = ticket?.sold || 0;
        const total = ticket?.quantity || 0;
        const price = ticket.price === "Free" ? "Free" : parseInt(ticket?.price, 10);
        const stock = Number(ticket.quantity - ticket.sold);
        const revenue = price === "Free" ? "Free" : price * sold;
        const percentage = (sold / total) * 100 || 0;



        return {
            type: ticket.name,
            price,
            stock,
            sold,
            percentage,
            revenue,
            color: getColorByTicketType(ticket.name, index),
        };
    });
    console.log('ticketData', ticketData);
    // Chart configuration
    const chartOptions: ApexOptions = {
        chart: { type: "radialBar" },
        yaxis: { max: 100 },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: { show: false },
                    value: {
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#333",
                    },
                },
                hollow: { size: "50%" },
                track: {
                    background: "#F0F3FA",
                },
            },
        },

        labels: ticketData.map((t) => t.type),
        colors: ticketData.map((t) => t.color),
        legend: {
            show: true,
            position: "right",
            fontSize: "14px",
            fontWeight: 500,
            labels: { colors: "#333" },
            itemMargin: { horizontal: 25, vertical: 5 },
            onItemClick: {
                toggleDataSeries: false
            },
            onItemHover: {
                highlightDataSeries: false
            }
        },
    };

    const chartSeries = ticketData.map((t: TicketInfo) => t.percentage);

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
                                <TableCell align="center">
                                    <b>Ticket Type</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Price</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Total Stock</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Tickets Sold</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>% of Sales</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Revenue</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketData.map((ticket, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{ticket.type}</TableCell>
                                    <TableCell align="center">
                                        {ticket.price === 0 ? "Free" : `${ticket.price} XAF`}
                                    </TableCell>
                                    <TableCell align="center">
                                         {Number(ticket.stock + ticket.sold) >= 10000 ? "Unlimited" : ticket.stock}
 
                                    </TableCell>
                                    <TableCell align="center">{ticket.sold}</TableCell>
                                    <TableCell align="center">{ticket.percentage}%</TableCell>
                                    <TableCell align="center">
                                        {ticket.revenue === 0
                                            ? "Free"
                                            : `${ticket.revenue} XAF`}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid
                    container
                    mt={2}
                    alignItems="center"
                    sx={{ border: "2px solid grey", borderRadius: 3, py: 2, px: 6 }}
                >
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold">
                            Ticket Sales Distribution
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="radialBar"
                            width={320}
                        />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}


const colorPalette = ["#2196F3", "#FF5722"];
function getColorByTicketType(type: string, index: number): string {
    return colorPalette[index % colorPalette.length];
}
