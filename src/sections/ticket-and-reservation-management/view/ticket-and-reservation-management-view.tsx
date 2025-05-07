import { useState } from "react";
import { useTheme } from '@mui/material/styles';

import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";
import { SearchBar } from "../search-bar";
import { TicketManagement } from "../ticket-management";
import { TicketCreationAndConfiguration } from "../ticket-creation-&-onfiguration";
import { SalesAndStockTracking } from "../sales-&-stock-tracking";
import { ReservationManagement } from "../reservation-management";
import { RefundAndCancellationManangement } from "../refund-&-cancellation-management";

import("../style.css")

export function TicketAndReservationManagementView() {

  return (
    <DashboardContent>
      <PageTitleSection
        title="Ticket & Reservation Management"
        desc="Lorem ipsum dolor sit amet"
        rightCom={<SearchBar />} // Passing SearchBar component as a prop
      />
      <TicketManagement />
      {/* <TicketCreationAndConfiguration /> */}
      <SalesAndStockTracking />
      <ReservationManagement />
      <RefundAndCancellationManangement />
    </DashboardContent>
  )
}