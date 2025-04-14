import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell,Button
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function HomeAndGlobalTable({
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
                                {row.service}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.organizer || row.location || row.client}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.amountDue || row.datePosted || row.dateTime || row.lastMessage}
                            </TableCell>
                            {
                                type === "4" ? <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    {row.method}
                                </TableCell>

                                    : null
                            }
                            {
                                type === "4" ? <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    {row.status}
                                </TableCell>

                                    : null
                            }

                            {
                                type === "3"||type==="4" ? null : <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    {row.budget || row.finalBudget}
                                </TableCell>
                            }

                            <TableCell align="center" sx={{ width: type === "2" ? "46%" : "25%" }}>
                                {row.actions?.map((action: any) => (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            marginX: 0.5,
                                            color: "white",
                                            borderColor: "gray",
                                            backgroundColor: "#0B2E4C"
                                        }}>{action}
                                    </Button>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
