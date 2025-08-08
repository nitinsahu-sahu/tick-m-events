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
import { useDispatch } from "react-redux";
import { StatusConfirmationModal } from "src/components/modal/contract-confirmation-modal";
import { ContractDetailsModal } from "src/components/modal/contractModal";
import { updateContractStatus } from "src/redux/actions/homeAndGlobal.action";
import { AppDispatch } from "src/redux/store";

export const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return "-";

    const date = new Date(dateTimeString);

    // Format options
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-US', options);
};

export function ContractTable({
    headers,
    data,
    type,
}: {
    headers: string[];
    type: string;
    data: any[];
}) {

    const theme = useTheme();
    const [selectedContract, setSelectedContract] = useState<any>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [selectedContractForStatus, setSelectedContractForStatus] = useState<any>(null);
   
    const dispatch = useDispatch<AppDispatch>();

    const handleViewContract = (contract: any) => {
        setSelectedContract(contract);
        setModalOpen(true);
    };

    const handleStatusChangeClick = (contract: any) => {
        setSelectedContractForStatus(contract);
        setStatusModalOpen(true);
    };

    const handleStatusConfirm = async (newStatus: string) => {
        try {
            await dispatch(updateContractStatus({ id: selectedContractForStatus?._id, newStatus, eventReqId: selectedContractForStatus?.eventReqId?._id }))
        } catch (error) {
            console.error('Error updating status:', error);
        }
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
                                        No projects avalable
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
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>{row.service}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>{row.eventId?.eventName}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>{row.location}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>{row.finalBudget}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>{row.contractStatus}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>{formatDateTime(row.eventTime)}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize", display: "flex", justifyContent: "center" }}>
                                        <Button
                                            onClick={() => handleViewContract(row)}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                marginX: 0.5,
                                                color: "white",
                                                borderColor: "gray",
                                                backgroundColor: "#0B2E4C"
                                            }}
                                        >
                                            View Contract
                                        </Button>

                                        {type !== "2" && (
                                            <Button
                                                onClick={() => handleStatusChangeClick(row)}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    marginX: 0.5,
                                                    color: "white",
                                                    borderColor: "gray",
                                                    backgroundColor: "#0B2E4C"
                                                }}
                                            >
                                                Change Status
                                            </Button>
                                        )}
                                    </TableCell>

                                </TableRow>
                            ))
                        )
                        }
                    </TableBody>
                    <ContractDetailsModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        contract={selectedContract}
                    />
                    <StatusConfirmationModal
                        open={statusModalOpen}
                        onClose={() => setStatusModalOpen(false)}
                        onConfirm={handleStatusConfirm}
                        currentStatus={selectedContractForStatus?.contractStatus || "ongoing"}
                    />
                </Table>
            </TableContainer>
        </>
    );
}
