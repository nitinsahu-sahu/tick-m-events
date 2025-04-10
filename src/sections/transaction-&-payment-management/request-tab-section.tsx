import { Paper, Typography, Box, Button } from "@mui/material";

import { TransactionAndPaymentManagementTable } from "src/components/tables/transaction-&-payment-management-table";


function Detail({ label, value }: { label: string; value: string }) {
    return (
        <Box display="flex" mb={1}>
            <Typography fontWeight="bold" minWidth={145}>
                {label}:
            </Typography>
            <Typography sx={{ fontSize: "15px", fontWeight: "600", marginLeft: 2, }}>{value}</Typography>
        </Box>
    );
}

interface RequestSectionProps {
    title: string;
    headers: any[];
    data: any[];
    type: string;
}

export function RequestTabSection({
    title,
    headers,
    data,
    type,
}: RequestSectionProps) {
    return (
        <>
            {
                type === "1" ? null : <Typography variant="h5" fontSize={{ xs: "18px", sm: "22px", md: "26px" }} fontWeight={600} gutterBottom>
                    {title}
                </Typography>
            }
            <TransactionAndPaymentManagementTable headers={headers} data={data} type={type} />
        </>
    );
};

