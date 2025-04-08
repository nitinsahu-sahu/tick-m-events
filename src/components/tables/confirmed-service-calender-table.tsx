import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell,
    Box,
    Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function ConfirmedserviceCalendarTable({
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
                {/* Table Header */}
                <TableHead>
                    <TableRow sx={{ bgcolor: "#E1E1E1" }}>
                        {headers.map((header: string) => (
                            <TableCell
                                key={header}
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: theme.palette.common.white,
                                    backgroundColor: "#1F8FCD",
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {data.map((row: any, index: number) => (
                        <TableRow key={index} sx={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #E1E1E1" }}>
                            {Object.keys(row).map((key, idx) => (
                                <TableCell
                                    key={idx}
                                    sx={{
                                        fontSize: { xs: "0.8rem", sm: "1rem" },
                                        fontWeight: "normal",
                                        ...(key === 'status' && {
                                            color: 'black',
                                            fontWeight: 'bold',
                                            borderRadius: '4px',
                                            textAlign: 'center',
                                            ...(row[key] === 'Used' && {
                                                color: '#2B9A58',
                                            }),
                                            ...(row[key] === 'Pending Use' && {
                                                color: '#FFA50F',
                                            }),
                                            ...(row[key] === 'Pending' && {
                                                color: '#ff9800',
                                            }),
                                            ...(row[key] === 'Confirmed' && {
                                                color: '#41B900',
                                            }),
                                        }),
                                    }}
                                >
                                    {key === "action" ? (
                                        type === "2" ? (
                                            // Render two buttons
                                            <Box display="flex" flexDirection="row" gap={1} flexWrap="wrap">

                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: theme.palette.blue.dark,
                                                        color: theme.palette.common.white,
                                                        "&:hover": { backgroundColor: "#0b243d" },
                                                        fontSize: { xs: "0.7rem", sm: "1rem" },
                                                    }}
                                                >
                                                    View Contract
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        color: '#000',
                                                        borderColor: '#ccc',
                                                        backgroundColor: '#f5f5f5',
                                                        fontSize: { xs: "0.9rem", sm: "1rem" },
                                                        "&:hover": { backgroundColor: '#e0e0e0' },
                                                    }}
                                                >
                                                    Cancel/Modify
                                                </Button>
                                            </Box>
                                        ) : (
                                            // For expectedPaymentsTableData: render just one button
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: theme.palette.blue.dark,
                                                    color: theme.palette.common.white,
                                                    "&:hover": { backgroundColor: "#0b243d" },
                                                    fontSize: { xs: "0.7rem", sm: "1rem" },
                                                }}
                                            >
                                                View Contract
                                            </Button>
                                        )
                                    ) : (
                                        row[key]
                                    )}

                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
