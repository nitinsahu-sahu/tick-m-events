import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";
import { AppDispatch, RootState } from "src/redux/store";
import { fetchTicketType } from "src/redux/actions/ticket-&-reservation-management.action";

import { TicketManagement } from "../ticket-management";
import { SalesAndStockTracking } from "../sales-&-stock-tracking";
import { ReservationManagement } from "../reservation-management";
import { RefundAndCancellationManangement } from "../refund-&-cancellation-management";

import("../style.css")

export function TicketAndReservationManagementView() {
  const { tickets } = useSelector((state: RootState) => state?.ticketReservationMang);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchTicketType());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <DashboardContent>
      <PageTitleSection
        title="Ticket & Reservation Management"
        desc=""
      />
      <TicketManagement tickets={tickets}/>
      {/* <TicketCreationAndConfiguration /> */}
      <SalesAndStockTracking tickets={tickets}/>
      <ReservationManagement />
      <RefundAndCancellationManangement />
    </DashboardContent>
  )
}