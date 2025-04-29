import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function MusicFestivalTable({
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
                                {row.ticket}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.price}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.benefits}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                {row.availability}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
