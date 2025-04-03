import React from "react";
import { Box, Button, Card, Divider, Grid, MenuItem, Select, Typography } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { PageTitleSection } from "src/components/page-title-section";

export function TicketValidationAtEntryView() {
    return (
        <Box p={3}>
            <PageTitleSection
                title="Loyalty Program"

            />
            <Grid container spacing={2} sx={{ alignItems: "stretch" }}>  {/* Add alignItems: "stretch" */}
                {/* Select Event */}
                <Grid item xs={12} md={6} sx={{ display: "flex" }} >  {/* Add display: "flex" */}
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <Card sx={{ p: 2, borderRadius: "12px", boxShadow: 3 }}>  {/* Add flex: 1 */}
                            <Typography variant="body1" fontSize={{ xs: "18px", sm: "22px", md: "26px" }} fontWeight={600} mb={1}>
                                Select Event:
                            </Typography>
                            <Select fullWidth defaultValue="concert">
                                <MenuItem value="concert">Concert Night</MenuItem>
                                <MenuItem value="festival">Urban Music Festival</MenuItem>
                            </Select>
                        </Card>

                        {/* Ticket Status */}
                        <Card sx={{ p: 2, marginTop: 2, borderRadius: "12px", flex: 1, boxShadow: 3 }}>  {/* Add flex: 1 */}
                            <Typography fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>Ticket QR Code Display</Typography>
                            <Typography variant="body2" color="black" mb={2}>
                                Please keep your QR code visible for quick scanning.
                            </Typography>
                            <Divider sx={{ border: "1px solid #C3C3C3" }} />
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
                                <Typography fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>
                                    Ticket Status <br /><span style={{ color: "orange", fontWeight: 700 }}>Pending</span>
                                </Typography>
                                <Typography variant="body2" fontWeight={400} fontSize={{ xs: "10px", sm: "12px", md: "14px" }}>
                                    Your ticket has been successfully scanned. In validation process, please wait.
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, backgroundColor: "#0B2E4C", color: "white", py: 1.5 }}
                                >
                                    Retry
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                </Grid>

                {/* Ticket QR Code */}
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>  {/* Add display: "flex" */}
                    <Card sx={{ p: 2, borderRadius: "12px", width: "100%", boxShadow: 3 }}>  {/* Ensure full width */}
                        <Typography variant="body1" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>
                            Ticket QR Code Display
                        </Typography>
                        <Typography variant="body2" color="black" mb={2}>
                            Please keep your QR code visible for quick scanning.
                        </Typography>
                        <Divider sx={{ border: "1px solid #C3C3C3" }} />
                        {/* QR Code */}
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
                                Your Ticket
                            </Typography>
                            <QrCodeIcon sx={{ fontSize: 100, mb: 1 }} />
                            <Typography fontWeight={600} fontSize={{ xs: "12px", sm: "14px", md: "16px" }}>Ticket ID: 1234567890</Typography>
                        </Box>
                        {/* Buttons */}
                        <Box mt={2} display="flex" gap={1} justifyContent="center">
                            <Button variant="contained" sx={{ fontWeight: 500, fontSize: { xs: "12px", sm: "14px", md: "16px", }, backgroundColor: "#0B2E4C" }} >
                                Add to Apple Wallet / Google Pay
                            </Button>
                            <Button variant="outlined"
                                sx={{ fontWeight: 500, color: "#0B2E4C", borderColor: "#0B2E4C", fontSize: { xs: "12px", sm: "14px", md: "16px", } }}
                            >Share My Ticket</Button>
                            <Button variant="outlined" sx={{ color: "#0B2E4C", borderColor: "#0B2E4C", fontWeight: 500, fontSize: { xs: "12px", sm: "14px", md: "16px", } }}>View Ticket Details</Button>
                        </Box>
                    </Card>
                </Grid>

                {/* Scanned Tickets */}
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3, borderRadius: "12px" }}>
                        <Typography fontWeight="bold">Scanned Tickets</Typography>
                        <Typography variant="body2" color="black" mb={2}>
                            Please keep your QR code visible for quick scanning.
                        </Typography>

                        {/* Ticket 1 */}
                        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd" py={1}>
                            <Box>
                                <Typography fontWeight="bold">Urban Music Festival</Typography>
                                <Typography variant="body2" color="black">
                                    Date: 02/10/2025 | Time: 8:30 PM
                                </Typography>
                            </Box>
                            <Typography color="green">Validated</Typography>
                        </Box>

                        {/* Ticket 2 */}
                        <Box display="flex" justifyContent="space-between" py={1}>
                            <Box>
                                <Typography fontWeight="bold">Urban Music Festival</Typography>
                                <Typography variant="body2" color="black">
                                    Date: 02/10/2025 | Time: 8:30 PM
                                </Typography>
                            </Box>
                            <Typography color="green">Validated</Typography>
                        </Box>

                        {/* Full History Button */}
                        <Button
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: "#0D3B66",
                                color: "white",
                                "&:hover": { backgroundColor: "#092C4C" },
                            }}
                        >
                            View My Full History
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </Box>

    )
}