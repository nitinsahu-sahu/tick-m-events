import { Box, Button, Paper, Typography } from "@mui/material";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { PaymentSettingTableData, PaymentSettingTableHeaders } from "./utils";

export function PaymentSettingAndPrefrenceHistory() {
    return (
        <>
            <Typography variant="h5" fontSize={{ xs: 20, sm: 25, md: 33 }} fontWeight={600} sx={{ mt: 3 }} >
                Payment Settings & Prefrences
            </Typography>

            <Box mt={2} boxShadow={3} borderRadius={3} >
                {/* Card Wrapper */}
                <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 2, maxWidth: "1000px", mx: "auto" }}>
                    {/* Table with filtered data */}
                    <TransactionAndPaymentTable
                        headers={PaymentSettingTableHeaders}
                        data={PaymentSettingTableData}
                        type="1"
                    />
                </Paper>
                <Box textAlign="center" px={3} pb={3} borderRadius={3}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: "#0B2E4C", color: "white", py: 1.5 }}
                    >
                        Add a payment method
                    </Button>
                    <Typography variant="h5" fontSize={{ xs: 12, sm: 14, md: 16 }} fontWeight={500} my={1}>
                        Quickly add a new bank account, Mobile Money, or credit card<br />
                        * KYC verification if necessary (ID required to validate the account)
                    </Typography>
                </Box>
            </Box>
        </>
    )
}