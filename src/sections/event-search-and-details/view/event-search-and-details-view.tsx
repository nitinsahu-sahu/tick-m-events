import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { ticketst } from '../utills';
import { DiscoverEvent } from '../discover-event';
import { FindYourEvent } from '../find-your-event';
import { MusicFestival } from '../music-festival';
import { EventShare } from '../event-share';
import { MusicFestivalTwo } from '../music-festival-two';

export function EventSearchAndDetailsView() {
  return (
    <DashboardContent>
      <PageTitleSection title="Discover Events" />

      <DiscoverEvent list={ticketst} />

      <FindYourEvent />

      {/* urban festival 2025 */}
      <MusicFestival />

      {/* urban festival 2025 */}
      <MusicFestivalTwo />

      {/* share this event */}
      <EventShare />
    </DashboardContent>
  );
}
