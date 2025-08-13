import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { fatchOrgEvents } from "src/redux/actions/organizer/pageEvents";
import { AppDispatch, RootState } from "src/redux/store";

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
  const { __events } = useSelector((state: RootState) => state?.organizer);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    dispatch(fatchOrgEvents());
  }, [dispatch]);
  const handleEventSelect = (event: Event | null) => {
    setSelectedEvent(event);
  };
  return (
    <>
      <EventBreadCrum events={__events} view={view} onEventSelect={handleEventSelect} setView={setView} />

      <DashboardContent>

        <PageTitleSection
          title="Entry Validation (QR Code Scan)"
        />
        {
          view === 'scan' ? <TicketScanner /> : <EnterTicketCode setEventInformation={setEventInformation} />
        }

        {/* Entry List Section */}
        <EntryListView />

        {/* Statistics Section */}
        <RealTimeStatistics />
      </DashboardContent>
    </>
  );
}