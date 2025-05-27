import { TableContainer, Typography, Table, TableRow, TableBody, Paper, TableHead, TableCell, Button } from "@mui/material";

export function TicketReservationManagementTable({
    headers,
    data,
    type,
}: {
    headers: string[];
    type: string;
    data: any[];
}) {

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
                                    color: 'white',
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        !data || data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={headers.length} align="center" sx={{ py: 4 }}>
                                    <Typography variant="body1" color="textSecondary">
                                        No reservation yet...
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, index) => (
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
                                                        {value}
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
                                        row.status ? (
                                            <TableCell align="center">
                                                {row.status}
                                            </TableCell>
                                        ) : (
                                            <TableCell align="center">
                                                {row.sold || row.ticketSold || row.reservationStatus}
                                            </TableCell>
                                        )
                                    }

                                    {
                                        type === '3' ? null : <TableCell align="center">
                                            {
                                                type === "1" ? <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#0B2E4E',
                                                        color: 'white',
                                                        "&:hover": {
                                                            backgroundColor: "#0b243d"
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
                                    }


                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
