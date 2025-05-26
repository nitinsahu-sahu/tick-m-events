import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell,
} from "@mui/material";
import { formatTimeToAMPM } from "src/hooks/formate-time";

import { headerStyle, cellStyle } from "./utils";

interface TableData {
    _id: string,
    name: string;
    ticketType: string;
    entryTime: string;
    status: string;
    // Assuming your data might also have these fields based on your example
    userId: {
        name: string;
    };
    verifyEntry: boolean;
    tickets?: Array<{
        ticketType: string;
        // other ticket properties...
    }>;
}

interface EventValidationTableProps {
    headers: string[];
    data: TableData[];
}



export function EventValidationTable({ headers, data }: EventValidationTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header} align="center" sx={headerStyle}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {
                    data?.length ? <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} sx={{
                                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                            }}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {row.ticketType || 'N/A'}
                                </TableCell>
                                <TableCell align="center">{formatTimeToAMPM(row.entryTime || 'N/A')}</TableCell>
                                <TableCell align="center">
                                    {row.verifyEntry ? 'Validated' : 'Invalid'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody> : 'No entry yet'
                }

            </Table>
        </TableContainer>
    );
}