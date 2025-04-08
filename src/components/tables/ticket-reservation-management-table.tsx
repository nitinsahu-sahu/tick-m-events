import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell,
    TextField,
    Button,
    Select,
    MenuItem
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function TicketReservationManagementTable({
    headers,
    data,
    type,
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
                                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                            }}
                        >
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.type || row.ticketType || row.name}
                            </TableCell>

                            {/* Conditionally Render based on type */}
                            {
                                type === "1" ?
                                    <>
                                        {[row.price, row.total, row.remaining].map((value, i) => (
                                            <TableCell key={i} align="center">
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    value={value}
                                                    sx={{
                                                        minWidth: "80px",
                                                        "& .MuiInputBase-input": { textAlign: "center" },
                                                    }}
                                                    inputProps={{ style: { textAlign: "center" } }}
                                                />
                                            </TableCell>
                                        ))}
                                    </>
                                    :
                                    type === "3" || type === "4" ?
                                        <>
                                            {[row.email, row.resrvationTicketType, row.purchaseDate].map((value, i) => (
                                                <TableCell key={i} align="center">
                                                    {value}
                                                </TableCell>
                                            ))}
                                        </>
                                        :
                                        <>
                                            {[row.price, row.totalStock, row.remainingStock].map((value, i) => (
                                                <TableCell key={i} align="center">
                                                    {value}
                                                </TableCell>
                                            ))}
                                        </>
                            }


                            {
                                row.status ? <TableCell align="center">
                                    <Select
                                        size="small"
                                        value="Pending"
                                    >
                                        {row.status.map((statusOption: any) => (
                                            <MenuItem key={statusOption} value={statusOption}>
                                                {statusOption}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell> : <TableCell align="center">{row.sold || row.ticketSold || row.reservationStatus}</TableCell>
                            }


                            <TableCell align="center">
                                {
                                    type === "1" || type === "3" ? <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: type === "3" ? "#FF0000" : theme.palette.blue.dark,
                                            color: theme.palette.common.white,
                                            "&:hover": {
                                                backgroundColor: type === "3" ? "darkred" : "#0b243d"
                                            },
                                            fontSize: { xs: "0.7rem", sm: "1rem" },
                                            width: { xs: "100%", sm: "auto" },
                                        }}
                                    >
                                        {row.action}
                                    </Button>
                                        : type === "4" ?
                                            row.refundAction.map((action: any) => (
                                                <Button variant="outlined" size="small" sx={{ marginX: 0.5, color: action === "Deny" ? "white" : "black", borderColor: "gray", backgroundColor: action === "Deny" ? "#FF0000" : "white" }}>{action}</Button>
                                            ))
                                            // <>
                                            //     <Button variant="outlined" size="small" sx={{ marginX: 0.5, color: "black", borderColor: "gray" }}>Small</Button>
                                            //     <Button variant="contained" size="small" sx={{ marginX: 0.5, backgroundColor: "#FF0000", borderColor: "gray" }} >Small</Button>
                                            // </>

                                            :
                                            row.revenue || row.revenueGenerated

                                }

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
