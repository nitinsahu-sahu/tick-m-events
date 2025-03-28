import { Box, Card, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

// 📊 Chart Options & Data
const chartOptions:ApexOptions = {
    chart: { type: "bar",toolbar: { show: false } },
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

export function ReportDataExport() {
    return (
        <Box boxShadow={3} borderRadius={3} mt={3} p={3}>
            
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
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Event Comparison Graph
                        </Typography>
                        <Chart options={chartOptions} series={chartSeries} type="bar" height={285} width={420} />
                    </Card>
                </Grid>
            </Grid>

            {/* Report Buttons */}
            <Box mt={4}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Reports & Data Export
                </Typography>
                <Grid container spacing={2}>
                    {["PDF", "Excel", "CSV", "Send via Email"].map((label, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Button fullWidth variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "#fff", "&:hover": { backgroundColor: "#333" } }}>
                                Download Full Report ({label})
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}