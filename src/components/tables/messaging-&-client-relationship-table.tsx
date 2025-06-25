import {
    Typography, TableContainer, Table, TableRow, TableBody, Paper,
    TableHead, TableCell, Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function MessagingAndClientRelationshipTable({
    headers,
    data,
    type,
    handleOpenModal
}: {
    headers: string[];
    type: string;
    data: any[];
    handleOpenModal: (row: any) => void; // Add proper typing
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
                    {!data || data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={headers.length} align="center" sx={{ py: 4 }}>
                                <Typography variant="body1" color="textSecondary">
                                    No Reqest available
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, index) => {
                            const backgroundColor = index % 2 === 0 ? "#f5f5f5" : "#e0e0e0";

                            return (
                                <TableRow key={row._id} sx={{ backgroundColor }}>
                                    {/* Conditional cells based on type */}
                                    {(type === "2" || type === "5") && (
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }}>
                                            {row.service || row?.organizerId?.name || row.file}
                                        </TableCell>
                                    )}

                                    <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }}>
                                        {row.location || row?.serviceRequestId?.serviceType || row.sdate}
                                    </TableCell>

                                    <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }}>
                                        {row.datetime || `-` || row.type}
                                    </TableCell>


                                    {type !== "5" && (
                                        <TableCell sx={{
                                            textTransform: 'capitalize',
                                            verticalAlign: 'middle',
                                            textAlign: 'center',
                                            align: "center",
                                            fontWeight: 600,
                                            color:
                                                row.contractStatus === "pending" ? "#F69809" :
                                                    row.contractStatus === "signed" ? "#3A86FF" :
                                                        row.contractStatus === "ongoing" ? "#8338EC" :
                                                            "#46B800" // default for completed
                                        }}>
                                            {row.contractStatus || row.budget}
                                        </TableCell>
                                    )}

                                    {type === "3" && (
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }}>
                                            {row.describe}
                                        </TableCell>
                                    )}

                                    {
                                        type === '2' ? <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }} width="25%">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    marginX: 0.5,
                                                    color: "white",
                                                    borderColor: "gray",
                                                    backgroundColor: "#0B2E4C"
                                                }}
                                                onClick={() => handleOpenModal(row)}
                                            >
                                                Open Conversation
                                            </Button>
                                        </TableCell> : null
                                    }
                                    {(type === "5") && (
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }} width="36%">
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
                        })
                    )}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
