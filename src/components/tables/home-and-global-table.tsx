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
    onApply,
    onViewDetails
}: {
    headers: string[];
    type: string;
    data: any[];
    onApply?: (row: any) => void;
    onViewDetails?: (row: any) => void;
}) {

    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const [modalOpen, setModalOpen] = useState(false);

    const handleViewDetails = (row: any) => {
        setSelectedItem(row);
        setModalOpen(true);
        onViewDetails?.(row);
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
                                    {type === "2" ? (
                                        <>
                                            <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                                                {row.serviceRequestId?.serviceType}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.eventId?.location}
                                            </TableCell>
                                            <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                                                {row.eventId.date}
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell align="center" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                                                {row.service || row.eventId.eventName}
                                            </TableCell>
                                            <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                                                {row.organizer || row.location || row.client || row.organizerId.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.amountDue || row.datePosted || row.dateTime || row.lastMessage || row.eventId.date}
                                            </TableCell>
                                        </>
                                    )}


                                    {
                                        type === "2" ? null : (
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
                                    {type === "1" && (
                                        <TableCell align="center" sx={{ width: "24%" }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleViewDetails(row)}
                                                sx={{
                                                    marginX: 0.5,
                                                    color: "white",
                                                    borderColor: "gray",
                                                    backgroundColor: "#0B2E4C"
                                                }}
                                            >
                                                View Details
                                            </Button>
                                            {row.providerHasProposed ? (
                                                <Button
                                                    onClick={() => onApply?.(row)}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        marginX: 0.5,
                                                        color: "white",
                                                        borderColor: "gray",
                                                        backgroundColor: "#0B2E4C"
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => onApply?.(row)}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        marginX: 0.5,
                                                        color: "white",
                                                        borderColor: "gray",
                                                        backgroundColor: "#0B2E4C"
                                                    }}
                                                >
                                                    Apply
                                                </Button>
                                            )}

                                        </TableCell>
                                    )}

                                    {type === "2" && (
                                        <TableCell align="center" sx={{ width: "35%" }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => console.log("Contact Client", row)}
                                                sx={{
                                                    marginX: 0.5,
                                                    color: "white",
                                                    borderColor: "gray",
                                                    backgroundColor: "#0B2E4C"
                                                }}
                                            >
                                                Contact Client
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => console.log("Mark as Completed", row)}
                                                sx={{
                                                    marginX: 0.5,
                                                    color: "white",
                                                    borderColor: "gray",
                                                    backgroundColor: "#0B2E4C"
                                                }}
                                            >
                                                Mark as Completed
                                            </Button>
                                        </TableCell>
                                    )}
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
