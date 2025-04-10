import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell,
    TextField,
    Box,
    Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function TransactionAndPaymentManagementTable({
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
                                {row.date}
                            </TableCell>

                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.requestedService}
                            </TableCell>
                            {
                                type === "3" ? (
                                    // Document Type column for type 3
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        {row.documentType}
                                    </TableCell>
                                ) : (

                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        {row.location || row.totalamount}
                                    </TableCell>
                                )
                            }

                            {/* Commission / Amount column (only if type !== 3) */}
                            {
                                type !== "3" && (
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        {row.amount || row.commission}
                                    </TableCell>
                                )
                            }

                            {/* Payment Method or Final Amount (only if type !== 3) */}
                            {
                                type !== "3" && (
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        {row.paymentMethod || row.finalAmount}
                                    </TableCell>
                                )
                            }

                            {/* Status column (only for type !== 2 && type !== 3) */}
                            {
                                type !== "2" && type !== "3" && (
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            color: row.status === "Pending" ? "#F69809" : "#46B800",
                                        }}
                                    >
                                        {row.status}
                                    </TableCell>
                                )
                            }

                            {/* Actions column (shown always) */}
                            <TableCell align="center">
                                {row.actions?.map((action: any, idx: number) => {
                                    const label = action.trim();
                                    const isContained = label === "View Details" || label === "Download";

                                    return (
                                        <Button
                                            key={idx}
                                            variant={isContained ? "contained" : "outlined"}
                                            size="small"
                                            sx={{
                                                marginX: 0.5,
                                                color: isContained ? "white" : "black",
                                                borderColor: "gray",
                                                backgroundColor: isContained ? "#0B2E4C" : "white",
                                            }}
                                        >
                                            {label}
                                        </Button>
                                    );
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
