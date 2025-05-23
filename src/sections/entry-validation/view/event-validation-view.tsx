import { useState } from "react";

import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";


import { TicketScanner } from "../ticket-scanner";
import { EnterTicketCode } from "../enter-ticket-code";
import { EntryListView } from "../entry-list-view";
import { RealTimeStatistics } from "../real-time-statistics";
import { EventBreadCrum } from "../event-status";

interface Ticket {
  _id: string;
  eventId: string;
  tickets: Array<{
    ticketType: string;
    // add other ticket properties as needed
  }>;
  eventName: Array<{
    _id: string;
    eventName: string;
    // add other ticket properties as needed
  }>;
  verifyEntry: boolean;
  entryTime?: string;
  userId?: {
    name: string;
    email: string;
    _id: string;
  };
}

interface FlagState {
  counter: string;
  message: string;
  eventName: Partial<Ticket>;
  ticket: Partial<Ticket>; // Partial makes all properties optional
}


export function EventValidationView() {

  const [view, setView] = useState('scan');
  
  return (
    <DashboardContent>
      <PageTitleSection
        title="Entry Validation (QR Code Scan)"
      />
      <EventBreadCrum setView={setView} view={view} />
      {
        view === 'scan' ? <TicketScanner /> : <EnterTicketCode  />
      }

      {/* Entry List Section */}
      <EntryListView />

      {/* Statistics Section */}
      <RealTimeStatistics />
    </DashboardContent>
  );
}