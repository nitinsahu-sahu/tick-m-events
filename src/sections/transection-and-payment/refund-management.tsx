import { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { RefundTableData, RefundTableHeaders } from "./utils";

export function RefundManagementHistory() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (option: any) => {
        setSelectedOption(option);
    };
    return (
        <>
            <Typography variant="h5" fontSize={{ xs: 20, sm: 25, md: 33 }} fontWeight={600} sx={{ mt: 3 }} >
                Refund Management
            </Typography>

            <Box mt={2} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
                {/* Card Wrapper */}
                <TransactionAndPaymentTable
                        headers={RefundTableHeaders}
                        data={RefundTableData}
                        type="2"
                    />

                <Box mt={3}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Configurable Refund Policies
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={selectedOption === "full_refund"} onChange={() => handleChange("full_refund")} />}
                                label="Full refund up to X days before the event (Editable field)"
                            />
                            <TextField fullWidth disabled={selectedOption !== "full_refund"} placeholder="Enter number of days" variant="outlined" />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={selectedOption === "partial_refund"} onChange={() => handleChange("partial_refund")} />}
                                label="Partial refund with penalty (Percentage of ticket price retained)"
                            />
                            <TextField fullWidth disabled={selectedOption !== "partial_refund"} placeholder="Enter percentage" variant="outlined" />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={selectedOption === "no_refund_purchase"} onChange={() => handleChange("no_refund_purchase")} />}
                                label="No refund after ticket purchase"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={selectedOption === "no_refund_date"} onChange={() => handleChange("no_refund_date")} />}
                                label="No refund after a specific date"
                            />
                            <TextField fullWidth disabled={selectedOption !== "no_refund_date"} placeholder="Select a date" variant="outlined" type="date" />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, backgroundColor: "#0B2E4C", color: "white", py: 1.5 }}
                        >
                            Process Refund
                        </Button>
                    </Box>
                </Box>
            </Box>


        </>
    )
}