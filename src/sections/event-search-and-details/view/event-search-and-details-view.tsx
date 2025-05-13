import { useCallback, useState } from 'react';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { FindYourEvent } from '../find-your-event';
import { MusicFestival } from '../music-festival';
import { EventShare } from '../event-share';

export function EventSearchAndDetailsView() {
  const [selectedEvent, setSelectedEvent] = useState({}); // Toggle for edit mode
  const handleEventDetails = useCallback((selectedViewEvent: any) => {
    setSelectedEvent(selectedViewEvent?.selectedViewEvent)
  }, [])

  return (
    <DashboardContent>
      <PageTitleSection title="Discover Events" />

      {/* <DiscoverEvent list={ticketst} /> */}

      <FindYourEvent handleEventDetails={handleEventDetails} />

      {/* urban festival 2025 */}
      {
        Object.keys(selectedEvent).length === 0 ? null : <MusicFestival selectedEvent={selectedEvent} />
      }

      {/* share this event */}
      {
        Object.keys(selectedEvent).length === 0 ? null : <EventShare selectedEvent={selectedEvent} />
      }
    </DashboardContent>
  );
}
