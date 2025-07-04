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

interface RequestTableProps {
  requests: any[];
  onActionClick?: (row: any) => void;
}

export function ServiceRequestTable({ requests, onActionClick }: RequestTableProps) {
  const data = requests;

  return (
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
                    onClick={() => onActionClick?.(row)}
                    sx={{
                      backgroundColor: "#0B2E4E",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#0b243d",
                      },
                      fontSize: { xs: "0.7rem", sm: "1rem" },
                      padding: { xs: "4px 8px", sm: "6px 12px" },
                      minWidth: "auto",
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
