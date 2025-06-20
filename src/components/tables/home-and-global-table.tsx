import {
    TableContainer,
    Typography,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell, Button,
    Box
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { ServiceRequestModal } from "../modal/service-request-modal";

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
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleViewDetails = (row: any) => {
        setSelectedItem(row);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
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
                            data.map((row, index) => (
                                <TableRow
                                    key={row._id || index}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                                    }}
                                >
                                    <TableCell align="center" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                                        {row.service || row.eventId.eventName}
                                    </TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                                        {row.organizer || row.location || row.client || row.organizerId.name}
                                    </TableCell>
                                    <TableCell align="center" >
                                        {row.amountDue || row.datePosted || row.dateTime || row.lastMessage || row.eventId.date}
                                    </TableCell>
                                    {
                                        type === "4" ? <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                            {row.method}
                                        </TableCell>

                                            : null
                                    }
                                    {
                                        type === "4" ? <TableCell align="center">
                                            {row.status}
                                        </TableCell>

                                            : null
                                    }

                                    {
                                        type === "3" || type === "4" ? null : (
                                            <TableCell align="center">
                                                <Box display="flex" alignItems="center" justifyContent="center">
                                                    <Typography variant="body2">
                                                        {`${row.orgBudget} XAF`}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{ ml: 0.5 }}
                                                        fontWeight={700}
                                                    >
                                                        (NB)
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        )
                                    }
                                    {
                                        type === "1" ? <TableCell align="center" sx={{ width: "24%" }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleViewDetails(row)}
                                                sx={{
                                                    marginX: 0.5,
                                                    color: "white",
                                                    borderColor: "gray",
                                                    backgroundColor: "#0B2E4C"
                                                }}>View Details
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    marginX: 0.5,
                                                    color: "white",
                                                    borderColor: "gray",
                                                    backgroundColor: "#0B2E4C"
                                                }}>Apply
                                            </Button>
                                        </TableCell> :
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
                                    }

                                </TableRow>
                            ))
                        )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <ServiceRequestModal
                open={modalOpen}
                onClose={handleCloseModal}
                data={selectedItem}
            />
        </>
    );
}
