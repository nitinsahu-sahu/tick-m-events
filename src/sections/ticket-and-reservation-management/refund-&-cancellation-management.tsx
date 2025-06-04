import {
  Box,
  Button,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
  Typography
} from "@mui/material";
import { useState } from "react";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";

export function RefundAndCancellationManangement({ orderList }: any) {
    const { order } = orderList

  const refundCancelationTableHeaders = ["Name", "Email", "Ticket Type", "Purchase Date", "Status", "Actions"];
  const refundCancelationTableData = [
    { name: "Jean M", email: "jean@email.com", resrvationTicketType: "Standard", purchaseDate: "02/02/2025", status: "Process", refundAction: ["Approve", "Deny"] },
    { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/03/2025", status: "Denied", refundAction: ["Approve", "Deny"] },
    { name: "Jean M", email: "jean@email.com", resrvationTicketType: "VIP", purchaseDate: "02/04/2025", status: "Pending", refundAction: ["Approve", "Deny"] },
  ];

  const [selectedPolicy, setSelectedPolicy] = useState("fullRefund");
  const [daysBeforeEvent, setDaysBeforeEvent] = useState("");
  const [partialRefundPercent, setPartialRefundPercent] = useState("");
  const [cutoffDate, setCutoffDate] = useState("");

  return (
    <Box mt={3} mb={5} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
      {/* Title */}
      <HeadingCommon
        baseSize="33px"
        weight={700}
        variant="h5"
        title="Refund & Cancellation Management"
        color="#0B2E4E"
      />

      {/* Table */}
      <TicketReservationManagementTable headers={refundCancelationTableHeaders} data={order} type="4" />

      {/* Refund Policy Configuration */}
      <Box mt={4}>
        <HeadingCommon
          baseSize="30px"
          weight={700}
          variant="h5"
          title="Refund Policy Configuration"
          color="#0B2E4E"
        />
        <RadioGroup
          value={selectedPolicy}
          onChange={(e) => setSelectedPolicy(e.target.value)}
          sx={{ mt: 2 }}
        >
          <FormControlLabel
            value="fullRefund"
            control={<Radio />}
            label="Full Refund available up to X days before the event"
          />
          {selectedPolicy === "fullRefund" && (
            <TextField
              size="small"
              placeholder="Enter number of days"
              value={daysBeforeEvent}
              onChange={(e) => setDaysBeforeEvent(e.target.value)}
              sx={{ ml: 4, mt: 1, width: "200px" }}
            />
          )}

          <FormControlLabel
            value="partialRefund"
            control={<Radio />}
            label="Partial Refund with Fee (% of ticket price retained)"
          />
          {selectedPolicy === "partialRefund" && (
            <TextField
              size="small"
              placeholder="Enter percentage"
              value={partialRefundPercent}
              onChange={(e) => setPartialRefundPercent(e.target.value)}
              sx={{ ml: 4, mt: 1, width: "200px" }}
            />
          )}

          <FormControlLabel
            value="noRefund"
            control={<Radio />}
            label="No Refund after purchasing the ticket"
          />

          <FormControlLabel
            value="noRefundAfterDate"
            control={<Radio />}
            label="No Refunds after a set date"
          />
          {selectedPolicy === "noRefundAfterDate" && (
            <TextField
              type="date"
              size="small"
              value={cutoffDate}
              onChange={(e) => setCutoffDate(e.target.value)}
              sx={{ ml: 4, mt: 1, width: "200px" }}
            />
          )}
        </RadioGroup>

        <Button
          variant="contained"
          sx={{ bgcolor: "#0B2E4C", color: "white", mt: 3, width: "200px" }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

