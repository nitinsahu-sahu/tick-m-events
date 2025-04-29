import { Box, Button, Card, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CheckIcon from '@mui/icons-material/Check'; // Import check icon
import { HeadProcess } from "./head-process";

export function FinalProcess() {
    return (
        <Box mt={6}>
            <Paper sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2, position: "relative" }}>
                <HeadProcess title="Congratulations! Your Purchase is Confirmed" step={<CheckIcon />} />

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
                    <Typography variant="h6" fontWeight={400} fontSize={{ xs: "12px", sm: "14px", md: "16px" }}>
                        You have successfully purchased your ticket. Please present the QR code at the entrance.
                    </Typography>
                    <QrCodeIcon sx={{ fontSize: 100, mb: 1 }} />
                </Box>

                <Grid container spacing={2}>
                    {["Download My Ticket (PDF)", "Add to Apple Wallet / Google Pay", "Share My Ticket", "View My Tickets"].map((label, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Button fullWidth variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "#fff", "&:hover": { backgroundColor: "#333" } }}>
                                Download Full Report ({label})
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    )
}