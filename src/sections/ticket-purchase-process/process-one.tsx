import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { ParticipantTable } from "src/components/tables/party-participant-table";
import { HeadProcess } from "./head-process";


export function ProcessOne() {
    const processOneTableHeaders = ["#id", "Ticket Type ", "Unit Price (XAF)", "Included Benefits", "Selection"];
    const processOneTableData = [
        { id: "1", ticketType: "Standard (Sold Out)", unitPrice: "10,000 XAF", benefits: "General Access", selection: "1" },
        { id: "2", ticketType: "Premium", unitPrice: "20,000 XAF", benefits: "VIP Area + Free Drinks", selection: "1" },
        { id: "3", ticketType: "VIP", unitPrice: "30,000 XAF", benefits: "Backstage + Meet & Greet", selection: "1" },
    ];

    return (
        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 3, position: "relative", mt: 3 }}>
            <HeadProcess title="Participant Details" step="1" />
            <Grid container spacing={3} mt={2} alignItems="center">
                <Grid item xs={12} sm={7} md={7}>
                    <Paper
                        sx={{
                            p: 3,
                            boxShadow: 4,
                            borderRadius: 2,
                            backdropFilter: "blur(14px)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={600} fontSize={{ xs: "14px", sm: "16px", md: "20px" }}>
                                Select Tickets
                            </Typography>
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                InputProps={{
                                    sx: {
                                        backgroundColor: "#FFF",
                                        borderColor: "black",
                                        borderRadius: 1,
                                    },
                                }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="contained" sx={{ bgcolor: "#B0B0B0", borderRadius: 1, fontWeight: 400 }}>
                                &lt; Back
                            </Button>
                            <Button variant="contained" sx={{ bgcolor: "#1F8FCD", borderRadius: 1, fontWeight: 400 }}>
                                Next &gt;
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                    <Paper
                        sx={{
                            height: "100%",
                            p: 3,
                            boxShadow: 4,
                            borderRadius: 2,
                            backdropFilter: "blur(14px)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={600} fontSize={{ xs: "14px", sm: "16px", md: "20px" }}>
                                Summary
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                                <Typography fontWeight={500} fontSize={{ xs: "10px", sm: "12px", md: "16px" }}>Tickets: 1</Typography>
                                <Typography fontWeight={500} fontSize={{ xs: "10px", sm: "12px", md: "16px" }}>Discount: None</Typography>
                                <Typography fontWeight={500} fontSize={{ xs: "10px", sm: "12px", md: "16px" }}>Payment: Credit Card</Typography>
                            </Box>
                        </Box>
                        <Button variant="outlined" sx={{ borderRadius: 1, minWidth: "230px", flexGrow: 1, fontWeight: 500, color: "#0B2E4C", borderColor: "#0B2E4C", mt: 2 }}>
                            Net Amount To Be Paid :  $190.00
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Typography
                fontWeight={500} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} my={2}
            >
                Select Tickets
            </Typography>

            <ParticipantTable headers={processOneTableHeaders} data={processOneTableData} />

            <Typography variant="h6" align="center" mt={3} fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>
                Total: 30,000 XAF
            </Typography>
            <TextField fullWidth placeholder="Promo Code" sx={{ my: 2 }} />
            <Typography variant="h6" align="center" fontSize={{ xs: "18px", sm: "22px", md: "26px" }} fontWeight={600}>
                Net Amount: 9,700 XAF
            </Typography>
            <Box mt={3} display="flex" justifyContent="center">
                <Button fullWidth variant="contained" sx={{ bgcolor: "#0B3558", mt: 2 }}>
                    Proceed to Participant Details
                </Button>

            </Box>
        </Box>
    )
}