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
  // serviceReqDelete
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
                  <TableCell align="center" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                    {row.eventId?.eventName || "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                    {row.providerId?.name || "-"}
                  </TableCell>
                  <TableCell align="center" sx={{fontWeight:600}}>
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
                  {/* <TableCell align="center">
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        marginX: 0.5,
                        borderColor: "gray",
                        // color: row.status === 'rejected-by-organizer' ? '#b71c1c' : '#2e7d32',
                      }}
                    >
                      {row.contractStatus}
                    </Typography>
                  </TableCell> */}
                  <TableCell align="center">
                    {
                      row.status === "rejected-by-organizer" ? <Button
                        variant="contained"
                        size="small"
                        disabled
                        sx={{

                          marginX: 0.5,
                          borderColor: "gray",
                          backgroundColor: "#b71c1c",
                          color: 'white',
                        }}
                      >
                        Rejected By You
                      </Button> : type === '2' ? <Button
                        variant="contained"
                        size="small"
                        disabled={row.status === 'accepted'}
                        sx={{
                          marginX: 0.5,
                          borderColor: "gray",
                          backgroundColor: "green",
                          color: 'white',
                        }}
                        onClick={() => {
                          if (handleSignedContract) {
                            handleSignedContract(row);
                          }
                        }}

                      >
                        {row.status === "accepted" ? 'Signed' : 'Contract Sign'}

                      </Button> : <TableCell align="center" width={200}>
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
                      </TableCell>
                    }

                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ServiceRequestModal
        open={openModal}
        onClose={handleCloseModal}
        data={selectedRequest}
      />
    </>
  );
}
