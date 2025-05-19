import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";

import { TicketManagement } from "../ticket-management";
import { SalesAndStockTracking } from "../sales-&-stock-tracking";
import { ReservationManagement } from "../reservation-management";
import { RefundAndCancellationManangement } from "../refund-&-cancellation-management";

import("../style.css")

export function TicketAndReservationManagementView() {

  return (
    <DashboardContent>
      <PageTitleSection
        title="Ticket & Reservation Management"
        desc=""
      />
      <TicketManagement />
      {/* <TicketCreationAndConfiguration /> */}
      <SalesAndStockTracking />
      <ReservationManagement />
      <RefundAndCancellationManangement />
    </DashboardContent>
  )
}