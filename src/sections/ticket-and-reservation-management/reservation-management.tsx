import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";

export function ReservationManagement() {
      const chartRealTimeOptions: ApexOptions = {
        series: [45, 30, 25], // Ticket Sold, Validation, Remaining
        labels: ["Ticket Sold", "Ticket Validation", "Remaining Tickets"],
        chart: { type: "donut" },
        colors: ["#2395D4", "#002E4E", "#29A71A"], // Match colors from screenshot
        legend: { position: "bottom", markers: { strokeWidth: 8 } },
        dataLabels: { enabled: true },
        responsive: [{ breakpoint: 768, options: { legend: { position: "bottom" } } }],
      };

      const reservationManagementTableHeaders = ["Name", "Email", "Ticket Type", "Purchase Date", "Status", "Actions"];
      const reservationManagementTableData = [
        { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/02/2025", reservationStatus: "Pending", action: ["Cancel"] },
        { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/03/2025", reservationStatus: "Pending", action: ["Cancel"] },
        { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/04/2025", reservationStatus: "Pending", action: ["Cancel"] },
      ];

    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">

            {/* Title */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Reservation Management
            </Typography>

            {/* Table */}
            <TicketReservationManagementTable data={reservationManagementTableData} headers={reservationManagementTableHeaders} type="3" />

            {/* Export Buttons */}
            <Box mt={2} display="flex" gap={2}>
                <Button variant="contained" sx={{ bgcolor: "#003B73", color: "white" }}>
                    Export as CSV
                </Button>
                <Button variant="contained" sx={{ bgcolor: "#003B73", color: "white" }}>
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
                        <Button variant="contained" sx={{ bgcolor: "#1E3A8A", color: "white" }}>
                            Save Changes
                        </Button>
                        <Button variant="contained" sx={{ bgcolor: "#1E3A8A", color: "white" }}>
                            Go to Ticket Validation Page
                        </Button>
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