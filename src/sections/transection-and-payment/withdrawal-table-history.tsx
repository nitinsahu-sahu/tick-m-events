import { Box, Paper, Typography } from "@mui/material";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { WithdrawalTableData, WithdrawalTableHeaders } from "./utils";

export function WithdrawalTableHistory() {
    return (
        <>
            <Typography variant="h5" fontSize={{ xs: 20, sm: 25, md: 33 }} fontWeight={600} sx={{ mt: 3 }} >
                Withdrawal Table History
            </Typography>

            <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, boxShadow:3 }}>
                {/* Table with filtered data */}
                <TransactionAndPaymentTable
                    headers={WithdrawalTableHeaders}
                    data={WithdrawalTableData}
                    type="1"
                />
            </Paper>
        </>

    )
}