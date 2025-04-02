import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    Paper,
} from "@mui/material";

export function WithdrawalRequest() {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit_card");
    const [withdrawalCode, setWithdrawalCode] = useState("");
    return (
        <>
            <Typography variant="h5" fontSize={{ xs: 20, sm: 25, md: 33 }} fontWeight={600} sx={{ mt: 3 }} >
                Withdrawal Requests
            </Typography>
            {/* <Box mt={2} boxShadow={3} borderRadius={3} >
                abc
            </Box> */}
            <Box mt={3} boxShadow={3} borderRadius={3}>
                {/* Main Card */}
                <Paper sx={{ p: 3 }}>
                    {/* Available Amount */}
                    <Typography fontWeight="bold">Available Amount</Typography>
                    <TextField fullWidth variant="outlined" value="500 XAF" sx={{ mt: 1 }} />
                    <Typography sx={{ fontSize: "0.9rem", mt: 1, color: "gray" }}>
                        Minimum Withdrawal Amount: $50
                    </Typography>

                    {/* Amount Input */}
                    <Typography fontWeight="bold" sx={{ mt: 3 }}>
                        Amount To Withdraw
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter Amount"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        sx={{ mt: 1 }}
                    />

                    {/* Select Payment Method */}
                    <Typography fontWeight="bold" sx={{ mt: 3 }}>
                        Select a Payment Method
                    </Typography>
                    <Select
                        fullWidth
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        sx={{ mt: 1 }}
                    >
                        <MenuItem value="credit_card">Credit Card (Visa / Mastercard)</MenuItem>
                        <MenuItem value="mobile_money">Mobile Money (MTN MoMo / Orange Money)</MenuItem>
                        <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                    </Select>

                    {/* Card Details */}
                    {paymentMethod === "credit_card" && (
                        <Box sx={{ mt: 2, p: 2, backgroundColor: "#f8f8f8", borderRadius: 2 }}>
                            <Typography>Card Holder: John Doe</Typography>
                            <Typography>Card Number: **** **** **** 1234</Typography>
                            <Typography>Expiration: 12/23</Typography>
                            <Button variant="contained" sx={{ mt: 2, backgroundColor:"#0B2E4C" }} >Confirm</Button>
                        </Box>
                    )}

                    {/* Withdrawal Code */}
                    <Typography fontWeight="bold" sx={{ mt: 3 }}>
                        Withdrawal Code
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter Withdrawal Code"
                        variant="outlined"
                        value={withdrawalCode}
                        onChange={(e) => setWithdrawalCode(e.target.value)}
                        sx={{ mt: 1 }}
                    />

                    {/* Request Withdrawal Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: "#0B2E4C", color: "white", py: 1.5 }}
                    >
                        Request Withdrawal
                    </Button>
                </Paper>
                
                {/* Withdrawal Processing Times */}
                <Paper sx={{ p: 3, m: 3, backgroundColor: "#f2f2f2", borderRadius: 3, border:"1px solid black" }}>
                    <Typography fontWeight="bold">Withdrawal Processing Times</Typography>
                    <Typography sx={{ mt: 1 }}>
                        <strong>Mobile Money:</strong> Instantaneous
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        <strong>Bank Transfer:</strong> 24 to 48 business hours
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        <strong>Credit Card:</strong> 2 to 24 hours (depending on the issuing bank)
                    </Typography>
                </Paper>
            </Box>
        </>
    )
}