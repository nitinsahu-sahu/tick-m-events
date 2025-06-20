import { Paper, Typography, Box, Button } from "@mui/material";

import { MessagingAndClientRelationshipTable } from "src/components/tables/messaging-&-client-relationship-table";


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
    description: string;
    headers: any[];
    data: any[];
    type: string;
handleOpenModal:any
}

export function RequestTabSection({
    title,
    description,
    headers,
    data,
    type,
    handleOpenModal,
    
}: RequestSectionProps) {
    return (
        <>
            <Typography variant="h5" fontWeight="bold" gutterBottom >
                {title}
            </Typography>
            <Typography variant="body2"
                fontWeight={500}
                mb={2}
                sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "17px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                }}>
                {description}
            </Typography>
            <MessagingAndClientRelationshipTable handleOpenModal={handleOpenModal} headers={headers} data={data} type={type} />
        </>
    );
};

