import {
  Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";

import { serviceEventReqDelete } from "src/redux/actions/service-request";
import { AppDispatch } from "src/redux/store";
import { formatDateTimeCustom } from "src/hooks/formate-time";
import { ProjectConfirmationModal } from "src/sections/search-&-select-service-providers/project-status-modal";

import { serviceRequestTableHeaders } from "../../sections/search-&-select-service-providers/Utills";
import { ServiceRequestModal } from "../modal/service-request-modal";


interface RequestTableProps {
  requests: any[];
  onActionClick?: (row: any) => void;
  handleSignedContract?: (row: any) => void;
  type: string
}
interface ApiResult {
  status: number;
  type: string;
  message: any;
}

export function ServiceRequestTable({ handleSignedContract, requests, onActionClick, type }: RequestTableProps) {
  const data = requests;
  const dispatch = useDispatch<AppDispatch>();
  const [selectedContractForStatus, setSelectedContractForStatus] = useState<any>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleCancelReqByOrg = useCallback(async (row: any) => {
    try {
      const result = await dispatch(serviceEventReqDelete({ serviceId: row._id }));
      if ((result as ApiResult)?.status === 200) {
        toast.success("Request Cancelled...");
      } else {
        toast.error(result?.message || "Failed to delete service");
      }
    } catch (error) {
      toast.error("Server error");
    }
  }, [dispatch]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRequest(null);
  };
  const handleViewDetails = (row: any) => {
    setSelectedRequest(row);
    setOpenModal(true);
  };
  const handleStatusChangeClick = (contract: any) => {
    setSelectedContractForStatus(contract);
    setStatusModalOpen(true);
  };
  
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {serviceRequestTableHeaders.map((header) => (
                <TableCell
                  key={header.key}
                  align="center"
                  sx={{
                    bgcolor: "#1F8FCD",
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    color: "white",
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={serviceRequestTableHeaders.length} align="center" sx={{ py: 4 }}>
                  {/* <CircularProgress size={15} /> */}
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    No service requests found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0" }}
                >
                  <TableCell align="center" width={150} sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                    {row.eventId?.eventName || "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                    {row.providerId?.name || "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    {`${row.providerProposal?.amount} XAF` || row.orgBudget || "-"}
                  </TableCell>
                  <TableCell align="center">
                    {row.eventId?.date
                      ? formatDateTimeCustom(row.serviceTime)
                      : "-"}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        marginX: 0.5,
                        borderColor: "gray",
                        color: row.providerStatus === 'rejected' ? '#b71c1c' :
                          row.providerStatus === 'accepted' ? '#2e7d32' : '#2e4e7dff',
                      }}
                    >
                      {row.providerStatus}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        marginX: 0.5,
                        borderColor: "gray",
                        color:
                          row.projectStatus === 'pending' ? '#ff9800' : // Orange for pending
                            row.projectStatus === 'ongoing' ? '#2196f3' : // Blue for ongoing
                              row.projectStatus === 'completed' ? '#4caf50' : // Green for completed
                                row.projectStatus === 'cancelled' ? '#f44336' : // Red for cancelled
                                  '#9e9e9e', // Default gray
                        fontWeight: 600
                      }}
                    >
                      {row.projectStatus}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" width={300} >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        onActionClick?.(row);
                        handleViewDetails(row);
                      }}

                      sx={{
                        marginX: 0.5,
                        borderColor: "gray",
                        backgroundColor: row.providerHasProposed ? '#0B2E4E' : '#ff9800',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: row.providerHasProposed ? '#2e7d32' : '#b71c1c',
                        },

                      }}
                    >
                      {row.providerHasProposed ? 'View Details' : 'Pending'}
                    </Button>
                    {
                      row.projectStatus !== 'completed' && (
                        <Button
                          onClick={() => handleStatusChangeClick(row)}
                          variant="outlined"
                          size="small"
                          sx={{
                            marginX: 0.5,
                            color: "white",
                            borderColor: "gray",
                            backgroundColor: "#0B2E4C",
                            '&:hover': {
                              backgroundColor: '#9e3e3eff',
                            },
                          }}
                        >
                          Manage Status
                        </Button>
                      )
                    }

                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ProjectConfirmationModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        currentStatus={selectedContractForStatus?.projectStatus || ''}
        contract={selectedContractForStatus}
      />
      <ServiceRequestModal
        open={openModal}
        onClose={handleCloseModal}
        data={selectedRequest}
      />
    </>
  );
}
