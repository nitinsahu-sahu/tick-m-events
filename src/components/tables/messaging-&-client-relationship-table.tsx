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

export function MessagingAndClientRelationshipTable({
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
                    {data.map((row, index) => {
                        const backgroundColor = index % 2 === 0 ? "#f5f5f5" : "#e0e0e0";

                        return (
                            <TableRow key={index} sx={{ backgroundColor }}>
                                {/* Conditional cells based on type */}
                                {(type === "1" || type === "2" || type === "5") && (
                                    <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                        {row.service || row.oganizer || row.file}
                                    </TableCell>
                                )}

                                <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                    {row.location || row.serviceConcerned || row.sdate}
                                </TableCell>

                                <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                    {row.datetime || row.lastMessage || row.type}
                                </TableCell>

                                {type === "1" && (
                                    <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                        {row.payment}
                                    </TableCell>
                                )}

                                {type !== "5" && (
                                    <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                        {row.status || row.budget}
                                    </TableCell>
                                )}

                                {type === "3" && (
                                    <TableCell sx={{ fontWeight: 600, align: "center" }}>
                                        {row.describe}
                                    </TableCell>
                                )}

                                {(type === "1" || type === "2" || type === "5") && (
                                    <TableCell sx={{ fontWeight: 600, align: "center",textAlign:"center" }} width="36%">
                                        {row.actions?.map((action: any, actionIndex: any) => (
                                            <Button
                                                key={actionIndex}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    marginX: 0.5,
                                                    color: "white",
                                                    borderColor: "gray",
                                                    backgroundColor: "#0B2E4C"
                                                }}
                                            >
                                                {action}
                                            </Button>
                                        ))}
                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
