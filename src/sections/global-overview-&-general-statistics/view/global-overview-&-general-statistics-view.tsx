import { useState } from 'react';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TopNavButtons } from '../TopNavButtons';
import GlobalStatistics from '../GlobalStatistics';
import PlatformStatistics from '../PlatformStatistics'
import { TicketingActivityTable } from '../TicketingActivityTable';
import { MarketplaceActivity } from '../MarketplaceActivity';
import { AlertsSection } from '../AlertsSection';

export function GlobalOverviewAndGeneralStatisticsView() {
      const [activeTab, setActiveTab] = useState('Global Statistics');
  return (
    <DashboardContent>
      <PageTitleSection title="Global Overview & General Statistics" />
            <TopNavButtons active={activeTab} onChange={setActiveTab} />
            <GlobalStatistics />
            <PlatformStatistics />
            <TicketingActivityTable />
            <MarketplaceActivity />
            <AlertsSection />
    </DashboardContent>
  );
}
