import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { serviceRequestTableHeaders } from "../../sections/search-&-select-service-providers/Utills";
import { ServiceRequestModal } from "../modal/service-request-modal";

interface RequestTableProps {
  requests: any[];
  onActionClick?: (row: any) => void;
}

export function ServiceRequestTable({ requests, onActionClick }: RequestTableProps) {
  const data = requests;

  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleViewDetails = (row: any) => {
    setSelectedRequest(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRequest(null);
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
                  <CircularProgress size={15} />
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
                  <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                    {row.eventId?.eventName || "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                    {row.organizerId?.name || "-"}
                  </TableCell>
                  <TableCell align="center">
                    {row.serviceRequestId?.budget || row.orgBudget || "-"}
                  </TableCell>
                  <TableCell align="center">
                    {row.eventId?.date
                      ? new Date(row.eventId.date).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell align="center">
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
