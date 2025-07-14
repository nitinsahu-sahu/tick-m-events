import { Box, Button, Paper, Typography } from "@mui/material";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { PaymentSettingTableData, PaymentSettingTableHeaders } from "./utils";
import { PaymentMethodForm } from "../transaction-&-payment-management/PaymentMethodForm";

export function PaymentSettingAndPrefrenceHistory() {
    return (
        <Box mt={3} boxShadow={3} bgcolor="white" borderRadius={3} sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>

            <Typography variant="h5" fontSize={{ xs: 20, sm: 25, md: 33 }} fontWeight={600}  >
                Payment Settings & Prefrences
            </Typography>

            <PaymentMethodForm />
        </Box>
    )
}