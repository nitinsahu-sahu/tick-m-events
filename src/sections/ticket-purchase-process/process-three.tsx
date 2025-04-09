import { Box, Button, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useState } from "react";
import { HeadProcess } from "./head-process";

export function ProcessThree() {
    const paymentOptions = [
        {
            src: "./assets/images/payment-gateway-logo/mtn-mobile-money.png",
            name: "MTN Mobile Money"
        },
        {
            src: "./assets/images/payment-gateway-logo/orange-money.png",
            name: "Orange Money"
        },
        {
            src: "./assets/images/payment-gateway-logo/bank-card.jpg",
            name: "Bank Card"
        },
        {
            src: "./assets/images/payment-gateway-logo/bank-transfer.png",
            name: "Bank Transfer"
        },
    ];

    const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);

    return (
        <Box mt={6}>
            <Paper sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2, position: "relative" }}>
                <HeadProcess title="Secure Payment" step="3" />
                <Typography variant="h6" fontWeight={600} fontSize={{ xs: "14px", sm: "16px", md: "20px" }}>
                    Select Payment Method
                </Typography>

                <Select
                    fullWidth
                    value={selectedPayment.name}
                    onChange={(e) => {
                        const selected = paymentOptions.find(opt => opt.name === e.target.value);
                        if (selected) setSelectedPayment(selected);
                    }}
                    sx={{
                        borderRadius: "12px",
                        backgroundColor: "#fff",
                        boxShadow: 1,
                        mb: 2,
                    }}
                >
                    {paymentOptions.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                            <Box display="flex" alignItems="center">
                                <img
                                    src={option.src}
                                    alt={option.name}
                                    style={{ width: 30, height: 30, marginRight: 10 }}
                                />
                                {option.name}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>

                {/* Payment Details Box */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#F8F9FA",
                        p: 2,
                        borderRadius: "12px",
                        mb: 2,
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <img
                            src={selectedPayment.src}
                            alt={selectedPayment.name}
                            style={{ width: 50, height: 50, marginRight: 2 }}
                        />
                        <Typography fontWeight="bold">
                            {selectedPayment.name === "MTN Mobile Money"
                                ? "Payment Number: 987621"
                                : selectedPayment.name === "Orange Money"
                                    ? "Payment Number: 654321"
                                    : "Payment Details"}
                        </Typography>
                    </Box>
                    <Typography fontWeight="bold">
                        Total: 30,000 XAF
                    </Typography>
                </Box>

                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ bgcolor: "#0B3558" }}
                        >
                            Confirm & Pay
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#B0B0B0",
                                borderRadius: "12px",
                                "&:hover": { bgcolor: "#A0A0A0" },
                                p: "8px",
                                fontSize: "14px",
                            }}
                        >
                            &lt; Back
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}