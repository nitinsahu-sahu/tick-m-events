import { Box, Button, Paper, Typography } from "@mui/material";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { InvoiceTableData, InvoiceTableHeaders } from "./utils";

export function InvoiceHistory() {
    return (
        <Box mt={3} boxShadow={3} bgcolor="white" borderRadius={3} sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
            <HeadingCommon title="Invoices" variant="h5"  weight={600}/>
            {/* Card Wrapper */}
            <Paper sx={{borderRadius:3}}>
                {/* Table with filtered data */}
                <TransactionAndPaymentTable
                    headers={InvoiceTableHeaders}
                    data={InvoiceTableData}
                    type="3"
                />
            </Paper>
        </Box>
    )
}