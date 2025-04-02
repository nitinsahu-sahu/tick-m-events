import { Box, Button, Paper, Typography } from "@mui/material";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { InvoiceTableData, InvoiceTableHeaders } from "./utils";

export function InvoiceHistory() {
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
            <Typography variant="h5" fontSize={{ xs: 15, sm: 20, md: 26 }} fontWeight={600} my={1}>
                Invoices & Reports
            </Typography>
            {/* Card Wrapper */}
            <Paper sx={{ borderRadius: 2, maxWidth: "1000px", mx: "auto" }}>
                {/* Table with filtered data */}
                <TransactionAndPaymentTable
                    headers={InvoiceTableHeaders}
                    data={InvoiceTableData}
                    type="3"
                />

                <Box textAlign="center" mt={3} p={3} sx={{ border: "1px solid #0B2E4C" }} borderRadius={3}>
                    <Typography variant="h5" fontSize={{ xs: 15, sm: 20, md: 26 }} fontWeight={600} my={1}>
                        Financial Reports
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: "#1C8BC8", color: "white", py: 1.5 }}
                    >
                        Download Full Financial Report
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}