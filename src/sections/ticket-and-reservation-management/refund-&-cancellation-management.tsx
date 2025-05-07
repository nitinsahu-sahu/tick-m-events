import { Box, Button, Checkbox, TextField, FormControlLabel, Typography } from "@mui/material";
import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";

export function RefundAndCancellationManangement() {
  const refundCancelationTableHeaders = ["Name", "Email", "Ticket Type", "Purchase Date", "Status", "Actions"];
  const refundCancelationTableData = [
    { name: "Jean M", email: "jean@email.com", resrvationTicketType: "Standard", purchaseDate: "02/02/2025", status: ["Pending", "Inprocess"], refundAction: ["Approve", "Deny"] },
    { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/03/2025", status: ["Pending", "Inprocess"], refundAction: ["Approve", "Deny"] },
    { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/04/2025", status: ["Pending", "Inprocess"], refundAction: ["Approve", "Deny"] },
  ];

  return (
    <Box mt={3} mb={5} boxShadow={3} borderRadius={3} p={3} bgcolor="white">

      {/* Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Refund & Cancellation Management
      </Typography>

      {/* Table */}
      <TicketReservationManagementTable headers={refundCancelationTableHeaders} data={refundCancelationTableData} type="4" />

      {/* Refund Policy Configuration */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold">
          Refund Policy Configuration
        </Typography>

        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <FormControlLabel control={<Checkbox />} label="Full Refund available up to X days before the event" />
          <TextField size="small" placeholder="Enter number of days" />

          <FormControlLabel control={<Checkbox defaultChecked />} label="Partial Refund with Fee (% of ticket price retained)" />
          <TextField size="small" placeholder="Enter percentage" />

          <FormControlLabel control={<Checkbox />} label="No Refund after purchasing the ticket" />

          <FormControlLabel control={<Checkbox />} label="No Refunds after a set date" />
          <TextField type="date" size="small" />

          <Button variant="contained" sx={{ bgcolor: "#0B2E4C", color: "white", mt: 2, width: "200px" }}>
            Save Changes
          </Button>
        </Box>
      </Box>

    </Box>
  )
}