import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function EventValidationTable({
    headers,
    data,
}: any) {
    const theme = useTheme();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header: any) => (
                            <TableCell
                                key={header}
                                align="center"
                                sx={{
                                    bgcolor: "#1F8FCD",
                                    fontWeight: "bold",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: theme.palette.common.white,
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row: any, index: any) => {
                        const backgroundColor = index % 2 === 0 ? "#f5f5f5" : "#e0e0e0";

                        return (
                            <TableRow key={index} sx={{ backgroundColor }}>
                                <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                    {row.ticketType}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                    {row.entryTime}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
