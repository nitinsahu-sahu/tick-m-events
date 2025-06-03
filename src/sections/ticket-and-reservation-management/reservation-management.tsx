import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";
import { useCSVExport, useExcelExport } from "src/hooks/downloadable";

export function ReservationManagement() {
    const exportToExcel = useExcelExport();
    const exportToCSV = useCSVExport();
    const chartRealTimeOptions: ApexOptions = {
        series: [45, 30, 25], // Ticket Sold, Validation, Remaining
        labels: ["Ticket Sold", "Ticket validated", "Remaining Tickets"],
        chart: { type: "donut" },
        colors: ["#2395D4", "#002E4E", "#29A71A"], // Match colors from screenshot
        legend: { position: "bottom", markers: { strokeWidth: 8 } },
        dataLabels: { enabled: true },
        responsive: [{ breakpoint: 768, options: { legend: { position: "bottom" } } }],
    };

    const reservationManagementTableHeaders = ["Name", "Email", "Ticket Type", "Purchase Date", "Status"];
    const reservationManagementTableData = [
        { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/02/2025", reservationStatus: "Pending" },
        { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/03/2025", reservationStatus: "Pending" },
        { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/04/2025", reservationStatus: "Pending" },
    ];

    const handleExcelExport = () => {
        exportToExcel(reservationManagementTableData, {
            fileName: 'transaction_list',
            sheetName: 'Reservalation Entry List'
        });
    };

    const handleCSVExport = () => {
        exportToCSV(reservationManagementTableData, {
            fileName: 'transaction_list',
            headers: reservationManagementTableHeaders,
            fieldNames: ['name', 'email', 'resrvationTicketType', 'purchaseDate', 'reservationStatus'] // Map to your actual data properties
        });
    };

    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">

            {/* Title */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Reservation Management
            </Typography>

            {/* Table */}
            {/* <TicketReservationManagementTable data={reservationManagementTableData} headers={reservationManagementTableHeaders} type="3" /> */}

            {/* Export Buttons */}
            <Box mt={2} display="flex" gap={2}>
                <Button onClick={handleCSVExport}
                    variant="contained" sx={{ bgcolor: "#0B2E4C", color: "white" }}>
                    Export as CSV
                </Button>
                <Button onClick={handleExcelExport} variant="contained" sx={{ bgcolor: "#0B2E4C", color: "white" }}>
                    Export as Excel
                </Button>
            </Box>

            {/* Ticket Validation Section */}
            <Box mt={4}>
                <Typography variant="h6" fontWeight="bold">
                    Ticket Validation
                </Typography>

                <Box display="flex" flexDirection="column" gap={1} mt={1}>
                    <FormControlLabel control={<Checkbox />} label="QR Code Scan" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Manual Entry of Unique Code" />
                    <FormControlLabel control={<Checkbox />} label="Validation via Name List & Account ID" />

                    <Box display="flex" gap={2} mt={2}>
                        <Button variant="contained" sx={{ bgcolor: "#0B2E4C", color: "white" }}>
                            Save Changes
                        </Button>
                        <Link to='/entry-validation'>
                            <Button variant="contained" sx={{ bgcolor: "#0B2E4C", color: "white" }}>
                                Go to Ticket Validation Page
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>

            {/* Real-time Entry Statistics */}
            <Box
                mt={4}
                p={3}
                borderRadius={3}
                sx={{
                    background: "linear-gradient(to right, #ffffff 82%, #2395D4 82%)",
                    boxShadow: 3,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {/* Left Side: Title */}
                <Box flex={1} minWidth="250px">
                    <Typography variant="h6" fontWeight={500} color="#002E4E" fontSize={{ xs: 20, sm: 25, md: 43 }}>
                        Real-time Entry Statistics
                    </Typography>
                </Box>

                {/* Center: Chart */}
                <Box flex={2} minWidth="300px">
                    <Chart options={chartRealTimeOptions} series={chartRealTimeOptions.series} type="donut" width="100%" height={250} />
                </Box>
            </Box>

        </Box>
    )
}