import { Box, Card, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

// 📊 Chart Options & Data
const chartOptions: ApexOptions = {
    responsive: [{
        breakpoint: 600, // sm breakpoint
        options: {
            plotOptions: {
                bar: {
                    columnWidth: '60%' // Wider bars on small screens
                }
            },
            xaxis: {
                labels: {
                    style: {
                        fontSize: '10px' // Smaller labels on small screens
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '10px' // Smaller labels on small screens
                    }
                }
            }
        }
    }],
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    colors: ["#2E93fA", "#1A1A1A"], // Blue & Black
    xaxis: {
        categories: ["Total Tickets Sold", "Total Revenue", "Conversion Rate"],
        labels: {
            rotate: -30,  // Rotate labels for better readability
            trim: false,   // Prevent cutting off long labels
            style: {
                fontSize: "12px", // Reduce font size if needed
                fontWeight: 500,
            },
        },
    },
    legend: { position: "top" },
};


const chartSeries = [
    { name: "Current Edition", data: [4500, 4500, 4500] },
    { name: "Previous Edition", data: [3800, 3800, 3800] },
];

export function ReportDataExport({ compairableEvent, selectEvent }: any) {
    return (
        <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
            {/* Main Grid Layout */}
            <Grid container spacing={3}>
                {/* Table Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Event Metrics
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Criteria</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Current Edition</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Previous Edition</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                        { label: "Total Tickets Sold", current: 4500, previous: 3800 },
                                        { label: "Total Revenue", current: 4500, previous: 3800 },
                                        { label: "Conversion Rate", current: 4500, previous: 3800 },
                                    ].map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.label}</TableCell>
                                            <TableCell>{row.current}</TableCell>
                                            <TableCell>{row.previous}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>

                {/* Chart Card */}
                <Grid item xs={12} sm={12} md={6}>
                    <Card sx={{
                        p: { xs: 1.5, sm: 2, md: 3 }, // Responsive padding
                        borderRadius: 3,
                        boxShadow: 3,
                        height: '100%' // Ensure full height
                    }}>
                        <Typography variant="h6" fontWeight="bold" sx={{
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } // Responsive font size
                        }}>
                            Event Comparison Graph
                        </Typography>
                        <Box sx={{
                            height: { xs: 250, sm: 270, md: 285 }, // Responsive height
                            width: '100%' // Full width of container
                        }}>
                            <Chart
                                options={{
                                    ...chartOptions,
                                }}
                                series={chartSeries}
                                type="bar"
                                height="100%"
                                width="100%"
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}