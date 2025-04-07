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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function TicketReservationManagementTable({
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
                                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                            }}
                        >
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.type}
                            </TableCell>

                            {/* Conditionally Render based on type */}
                            {row.type === "1" ? (
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
                            ) : (
                                <>
                                    {[row.price, row.total, row.remaining].map((value, i) => (
                                        <TableCell align="center" key={i}>
                                            {value}
                                        </TableCell>
                                    ))}
                                </>

                            )}

                            <TableCell align="center">{row.sold}</TableCell>

                            <TableCell align="center">
                                {
                                    type === "1" ? <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: theme.palette.blue.dark,
                                            color: theme.palette.common.white,
                                            "&:hover": { backgroundColor: "#0b243d" },
                                            fontSize: { xs: "0.7rem", sm: "1rem" },
                                            width: { xs: "100%", sm: "auto" },
                                        }}
                                    >
                                        {row.action}
                                    </Button> :
                                        <TableCell align="center">{row.revenue}</TableCell>

                                }

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
