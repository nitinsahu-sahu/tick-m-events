import { useState } from "react";

import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";


import { TicketScanner } from "../ticket-scanner";
import { EnterTicketCode } from "../enter-ticket-code";
import { EntryListView } from "../entry-list-view";
import { RealTimeStatistics } from "../real-time-statistics";
import { EventBreadCrum } from "../event-status";

interface EventInformation {
    eventName?: any;
    _id?: any;
    // Add other expected fields
}


export function EventValidationView() {

  const [view, setView] = useState('scan');
 const [eventInformation, setEventInformation] = useState<EventInformation>({});
    
  return (
    <DashboardContent>
      <EventBreadCrum setView={setView} view={view} eventInformation={eventInformation}/>

      <PageTitleSection
        title="Entry Validation (QR Code Scan)"
      />
      {
        view === 'scan' ? <TicketScanner /> : <EnterTicketCode  setEventInformation={setEventInformation}/>
      }

      {/* Entry List Section */}
      <EntryListView />

      {/* Statistics Section */}
      <RealTimeStatistics />
    </DashboardContent>
  );
}