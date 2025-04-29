import { Paper, Typography, Box, Button } from "@mui/material";

import { HomeAndGlobalTable } from "src/components/tables/home-and-global-table";


interface RequestSectionProps {
    title: string;
    description: string;
    headers: any[];
    data: any[];
    type: string;
}

export function RequestTabSection({
    title,
    description,
    headers,
    data,
    type
}: RequestSectionProps) {
    return (
        <>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" mb={2}>
                {description}
            </Typography>

            <HomeAndGlobalTable headers={headers} data={data} type={type} />
        </>
    );
};

