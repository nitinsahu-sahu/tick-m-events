import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";

import { TicketScanner } from "../ticket-scanner";
import { EnterTicketCode } from "../enter-ticket-code";
import { EntryListView } from "../entry-list-view";
import { RealTimeStatistics } from "../real-time-statistics";
import { Mode } from "../mode";

export function EventValidationView() {

  return (
    <DashboardContent>
      <PageTitleSection
        title="Entry Validation (QR Code Scan)"
        desc="Lorem ipsum dolor sit amet"
      />

      {/* Ticket Scanner Section */}
      <TicketScanner />

      {/* Ticket Code Section */}
      <EnterTicketCode />

      {/* Entry List Section */}
      <EntryListView />

      {/* Statistics Section */}
      <RealTimeStatistics />

      {/* Offline Mode Section */}
      <Mode />
    </DashboardContent>
  );
}