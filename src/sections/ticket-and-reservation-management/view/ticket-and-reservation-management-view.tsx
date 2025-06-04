import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";
import { AppDispatch, RootState } from "src/redux/store";
import { fetchTicketType } from "src/redux/actions/ticket-&-reservation-management.action";
import { EventBreadCrum } from "src/sections/entry-validation/event-status";
import { eventFetch } from "src/redux/actions/event.action";

import { TicketManagement } from "../ticket-management";
import { SalesAndStockTracking } from "../sales-&-stock-tracking";
import { ReservationManagement } from "../reservation-management";
import { RefundAndCancellationManangement } from "../refund-&-cancellation-management";


import("../style.css")


export function TicketAndReservationManagementView() {
  const { tickets } = useSelector((state: RootState) => state?.ticketReservationMang);
  const { fullData } = useSelector((state: RootState) => state?.event);
console.log('====fullData================================');
console.log(fullData);
console.log('====================================');
  const dispatch = useDispatch<AppDispatch>();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const handleEventSelect = (event: Event | null) => {
    setSelectedEvent(event);
    // Do something with the selected event data
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchTicketType());
      dispatch(eventFetch());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <DashboardContent>
      <EventBreadCrum events={fullData} onEventSelect={handleEventSelect} />

      <PageTitleSection
        title="Ticket & Reservation Management"
        desc=""
      />
      <TicketManagement tickets={tickets} />
      {/* <TicketCreationAndConfiguration /> */}
      <SalesAndStockTracking tickets={tickets} />
      {/* {selectedEvent && <ReservationManagement orderList={selectedEvent} />} */}
      {selectedEvent ? (
        <ReservationManagement orderList={selectedEvent} />
      ) : (
        <Box
          sx={{
            width: '100%',
            border: '1px solid #e0e0e0',
            borderRadius: 3,
            p: 3,
            mt: 3,
            textAlign: 'center',
            backgroundColor: '#fafafa'
          }}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No Event Selected
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please select an event to view reservation details
          </Typography>
          {/* <EventIcon sx={{ fontSize: 60, color: '#bdbdbd' }} /> */}
        </Box>
      )}
      {selectedEvent ? (
        <RefundAndCancellationManangement orderList={selectedEvent} />
      ) : (
        <Box
          sx={{
            width: '100%',
            border: '1px solid #e0e0e0',
            borderRadius: 3,
            p: 3,
            mt: 3,
            textAlign: 'center',
            backgroundColor: '#fafafa'
          }}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No Event Selected
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please select an event to view reservation details
          </Typography>
          {/* <EventIcon sx={{ fontSize: 60, color: '#bdbdbd' }} /> */}
        </Box>
      )}
    </DashboardContent>
  )
}