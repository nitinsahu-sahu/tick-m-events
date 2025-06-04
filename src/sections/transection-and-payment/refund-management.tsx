import { useState } from "react";
import { Box, Button, Radio, FormControlLabel, RadioGroup, TextField, Typography } from "@mui/material";

import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";

import { RefundTableData, RefundTableHeaders } from "./utils";

export function RefundManagementHistory() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedPolicy, setSelectedPolicy] = useState("");
    const [daysBeforeEvent, setDaysBeforeEvent] = useState("");
    const [partialRefundPercent, setPartialRefundPercent] = useState("");
    const [cutoffDate, setCutoffDate] = useState("");
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

                    <RadioGroup
                        value={selectedPolicy}
                        onChange={(e) => setSelectedPolicy(e.target.value)}
                        sx={{ mt: 2 }}
                    >
                        {/* Full Refund Option */}
                        <FormControlLabel
                            value="full_refund"
                            control={<Radio />}
                            label="Full refund up to X days before the event"
                        />
                        {selectedPolicy === "full_refund" && (
                            <TextField
                                size="small"
                                placeholder="Enter number of days"
                                value={daysBeforeEvent}
                                onChange={(e) => setDaysBeforeEvent(e.target.value)}
                                sx={{ ml: 4, mt: 1, width: "200px" }}
                            />
                        )}

                        {/* Partial Refund Option */}
                        <FormControlLabel
                            value="partial_refund"
                            control={<Radio />}
                            label="Partial refund with penalty (percentage of ticket price retained)"
                        />
                        {selectedPolicy === "partial_refund" && (
                            <TextField
                                size="small"
                                placeholder="Enter percentage"
                                value={partialRefundPercent}
                                onChange={(e) => setPartialRefundPercent(e.target.value)}
                                sx={{ ml: 4, mt: 1, width: "200px" }}
                            />
                        )}

                        {/* No Refund After Purchase */}
                        <FormControlLabel
                            value="no_refund_purchase"
                            control={<Radio />}
                            label="No refund after ticket purchase"
                        />

                        {/* No Refund After Specific Date */}
                        <FormControlLabel
                            value="no_refund_date"
                            control={<Radio />}
                            label="No refund after a specific date"
                        />
                        {selectedPolicy === "no_refund_date" && (
                            <TextField
                                type="date"
                                size="small"
                                value={cutoffDate}
                                onChange={(e) => setCutoffDate(e.target.value)}
                                sx={{ ml: 4, mt: 1, width: "200px" }}
                            />
                        )}
                    </RadioGroup>

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