import {
    Box, Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Container,
    Avatar,
} from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";

import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";

import { TicketHistoryCancelRefundCard } from "../t-h-c-r";
import { TicketCard } from "../ticket-card";

export function TicketManagementView() {
    const ticketst = [
        {
            id: 1,
            title: "Tech Expo 2025",
            location: "Douala",
            date: "10/02/2025",
            time: "5:00 PM",
            status: "Valid",
            statusColor: "green",
        },
        {
            id: 2,
            title: "Startup Summit 2025",
            location: "Yaoundé",
            date: "10/02/2025",
            time: "5:00 PM",
            status: "Pending Validation",
            statusColor: "#d4af37", // Gold
        },
    ];

    // Data for metric cards
    const metrics = [
        { title: "Total", value: "10" },
        { title: "Active", value: "6" },
        { title: "Refunded", value: "2" },
        { title: "Expired", value: "2" },
    ];
    const ticketHsitory = [
        { title: "Urban Music Festival", date: "10/02/2024", type: "VIP", status: "Used", statusColor: "green", button: ["Download Invoice", "Leave a Review"] },
        { title: "Urban Music Festival", date: "10/02/2024", type: "VIP", status: "Expired", statusColor: "red", button: ["Download Invoice", "Leave a Review"] },
    ];
    const cancelAndRefund = [
        { title: "Urban Music Festival", date: "10/02/2024", type: "VIP", money: "", status: "In Progress", statusColor: "green", btnColor: "#0B2E4C", button: ["Request Refund"] },
        { title: "Startup Summit 2025", date: "15/04/2025", type: "Standard", money: "1000 XAF", status: "Denied", statusColor: "red" },
    ];
    return (
        <DashboardContent>
            <PageTitleSection
                title="Ticket Management"
            />

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { md: "center" },
                            flexWrap: { xs: "nowrap", sm: "wrap" }, // No wrap on mobile, wrap on tablets and up
                            overflowX: { xs: "auto", sm: "visible" }, // Horizontal scroll on mobile
                            gap: 2,
                            pb: 1, // Padding bottom to prevent scrollbar hiding buttons
                        }}
                    >
                        {["Active Tickets", "History", "Cancellations & Refunds"].map((text) => (
                            <Button
                                key={text}
                                variant="contained"
                                sx={{
                                    backgroundColor: text === "Active Tickets" ? "#0B2E4C" : "#818181",
                                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    minWidth: "150px",
                                    '&:hover': {
                                        backgroundColor: text === "Active Tickets" ? "#0B2E4C" : "#818181",
                                    }
                                }}
                            >
                                {text}
                            </Button>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            <MatrixThreeCard metrics={metrics} sm={3} md={3}/>

            <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
                <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: "20px", sm: "26px", md: "34px" }}>
                    My Active Tickets
                </Typography>
                {/* Main Grid Layout */}
                <Grid container spacing={3} mt={3}>
                    {ticketst.map((ticketc) => (
                        <Grid item xs={12} sm={6} md={6}>
                            <TicketCard ticket={ticketc} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
                <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: "20px", sm: "26px", md: "34px" }}>
                    Ticket History
                </Typography>
                <Grid container spacing={3}>
                    {ticketHsitory.map((ticket, index) => (
                        <TicketHistoryCancelRefundCard items={ticket} index={index} type="Cancel" />
                    ))}
                </Grid>
            </Box>

            <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
                <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: "20px", sm: "26px", md: "34px" }}>
                    Cancellations & Refunds
                </Typography>
                <Grid container spacing={3}>
                    {cancelAndRefund.map((ticket, index) => (
                        <TicketHistoryCancelRefundCard items={ticket} index={index} type="Cancel" />
                    ))}
                </Grid>

                <Grid container mt={3}>
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={500} fontSize={{ xs: "16px", sm: "20px", md: "24px" }}>
                                    Refund Policy
                                </Typography>
                                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                                    <li>Free cancellation up to 7 days before the event.</li>
                                    <li>Partial refund (-20%) between 7 and 3 days before the event.</li>
                                    <li>No refund after purchasing a ticket.</li>
                                    <li>No refund if canceled within 48 hours of the event.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
                <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: "20px", sm: "26px", md: "34px" }}>
                    QR Code & Ticket Validation
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Card
                        sx={{
                            width: { xs: "100%", sm: "400px", md: "450px", lg: "500px" },
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 3,
                            textAlign: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',  // Horizontal centering
                                justifyContent: 'center',  // Vertical centering (if needed)
                                textAlign: 'center',  // Center text
                                mb: 2  // Optional bottom margin
                            }}
                        >
                            <Typography variant="body1" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>
                                Urban Music Festival
                            </Typography>
                            <Typography variant="body1" color="text.secondary" mb={2}>
                                10/02/2025 - VIP
                            </Typography>
                            <QrCodeIcon sx={{ fontSize: 100, mb: 1 }} />
                            <Button
                                variant="contained"
                                sx={{ mt: 2, backgroundColor: "#0a2540", color: "#fff" }}
                            >
                                Scan QR Code
                            </Button>
                        </Box>
                    </Card>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "red", color: "#fff", fontWeight: "bold" }}
                    >
                        Invalid Ticket - Entry Denied
                    </Button>
                </Box>
            </Box>
        </DashboardContent>
    )
}