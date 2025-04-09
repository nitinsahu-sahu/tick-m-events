import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell,
    Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function ReservationsAndContractsTable({
    headers,
    data,
    type
}: {
    headers: string[];
    type: string;
    data: any[];

}) {
    const theme = useTheme();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
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
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                backgroundColor: "#e0e0e0",
                                position: "relative",
                                '&:not(:last-child)': {
                                    '&::after': {
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)", // Center the line
                                        width: "96%",         // You can adjust this to change the line length
                                        borderBottom: "1px solid #C3C3C3", // The border itself
                                    },
                                },
                            }}
                        >
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.organizer || row.service}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.requestedService || row.location}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.budget || row.date || row.paymentMethod}
                            </TableCell>
                            {
                                type !== "1" ? <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    {row.amount}
                                </TableCell> : null
                            }
                            {
                                type !== "1" ? <TableCell align="center" sx={{ fontWeight: "bold", color: row.status === "Pending Execution" ? "#F69809" : "#46B800" }}>
                                    {row.status}
                                </TableCell> : null
                            }
                            <TableCell align="center" >
                                {row.actions?.map((action: any) => (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            marginX: 0.5,
                                            color: action === "View Details" || action === "Confirm Completion" || action === "View Contract" ? "black" : "white",
                                            borderColor: "gray",
                                            backgroundColor: action === "View Details" || action === "Confirm Completion" || action === "View Contract" ? "white" : "#0B2E4C"
                                        }}>{action}</Button>
                                ))}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
