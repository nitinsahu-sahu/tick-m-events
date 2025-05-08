import { Box, Button, Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function TrackingSystem({ tickets, location }: any) {

    const [vipCount, setVipCount] = useState(0);
    const [standardCount, setStandardCount] = useState(0);
    return (
        <Box mt={3}>
            {/* Ticketing Section */}
            <HeadingCommon title='Ticketing System' variant="h5" baseSize="40px" mb={0} weight={600} />


            <Grid container spacing={3} mt={{ xs: 0.1, sm: 0.5, md: 1 }}>
                <Grid item xs={12} sm={10} md={6} lg={6}>
                    <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: 3 }}>
                        {
                            Object.keys(tickets).length ? <>
                                {/* VIP Ticket Section */}
                                {
                                console.log(tickets)
                                }
                                <Typography fontWeight="bold" fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>
                                    VIP Ticket s<span style={{ color: "#3CB1F1" }}>(Sold Out)</span>
                                </Typography>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography fontWeight={600} fontSize={{ xs: "0.8rem", sm: "1rem", md: "1.2rem" }}>10,000 XAF</Typography>
                                    <Box display="flex" alignItems="center">
                                        <IconButton disabled sx={{ border: "1px solid black", borderRadius: "8px", padding: "1px" }}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography mx={1}>0</Typography>
                                        <IconButton disabled sx={{ border: "1px solid black", borderRadius: "8px", padding: "1px" }}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Divider sx={{ border: "1px solid black", mt: "15px" }} />
                                {/* Standard Ticket Section */}
                                <Typography fontWeight="bold" mt={1} fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>
                                    Standard Ticket
                                </Typography>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography fontWeight={600} fontSize={{ xs: "0.8rem", sm: "1rem", md: "1.2rem" }}>10,000 XAF</Typography>
                                    <Box display="flex" alignItems="center">
                                        <IconButton sx={{ border: "1px solid black", borderRadius: "8px", padding: "1px" }}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography mx={1}>0</Typography>
                                        <IconButton sx={{ border: "1px solid black", borderRadius: "8px", padding: "1px" }}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Pricing Details */}
                                <Typography mt={2}>Total: {standardCount * 100} XAF</Typography>
                                <Typography fontSize={{ xs: "10px", sm: "12px", md: "14px" }} sx={{ color: "blue", fontWeight: "500", }}>
                                    <span style={{ color: "#3CB1F1" }}>Discount Applied:</span> 10,000 XAF
                                </Typography>

                                {/* Promo Code */}
                                <Grid container spacing={2} sx={{ marginTop: "1px" }}>
                                    <Grid item xs={12} sm={8} md={8}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            placeholder="Enter Promo Code"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <Button variant="contained" fullWidth sx={{ paddingY: "9px", fontSize: { xs: "10px", sm: "11px", md: "12px" }, backgroundColor: "#0B2E4C", color: "#fff" }}>
                                            Apply Promo Code
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Typography fontSize={{ xs: "0.9rem", md: "1rem" }}>
                                    <strong>Net Amount To Pay:</strong> {standardCount * 100} XAF
                                </Typography>

                                {/* Purchase Buttons */}
                                <Grid container spacing={2} mt={1}>
                                    <Grid item xs={12} sm={4}>
                                        <Button fullWidth variant="contained" sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" }, backgroundColor: "#0B2E4C", color: "#fff" }}>
                                            Buy Online
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Button fullWidth variant="contained" sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" }, backgroundColor: "#0B2E4C", color: "#fff" }}>
                                            Buy At a Physical Store
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Button fullWidth variant="contained" sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" }, backgroundColor: "#0B2E4C", color: "#fff" }}>
                                            Buy Via WhatsApp
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Typography mt={1} fontSize="small" textAlign="center">
                                    Event Time: March 28, 2025, 19:00 GMT
                                </Typography>
                            </> : <HeadingCommon title="No ticket avalable" />
                        }
                    </Card>
                </Grid>

                {/* Location Map Section */}
                <Grid item xs={12} sm={6} md={6} alignContent={{ md: "center" }}>
                    <Card variant="outlined" sx={{ p: 3, backgroundColor: "#fafafa" }}>
                        <Typography fontWeight="bold" fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>Location</Typography>
                        <Typography fontSize={{ xs: "12px", sm: "14px", md: "16px" }}>
                            <strong>Full Address:</strong> {location}
                        </Typography>
                        <iframe
                            title="Location map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.379073403025!2d4.804463075231841!3d43.951522671089506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5eb86894c0b4f%3A0x2937b10bc1f0a963!2sCentre%20de%20congr%C3%A8s%20du%20Palais%20des%20Papes!5e0!3m2!1sen!2sin!4v1743656943350!5m2!1sen!2sin"
                            width="100%"
                            height="250"
                            loading="lazy"
                        />
                    </Card>
                </Grid>
            </Grid>
        </Box >
    )
}