import { Typography } from "@mui/material";
import { ConfirmedServiceCalenderTable } from "src/components/tables/confirmed-service-calender-table";



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
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {title}
            </Typography>

            <ConfirmedServiceCalenderTable headers={headers} data={data} type={type} />
        </>
    );
};

