import { Typography } from '@mui/material';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import RealTimeTracking from '../RealTimeTracking';
import BookedServicesTable from '../BookedServicesTable';
import ContractCommitmentTracker from '../ContractCommitmentTracker';
import ReviewSection from '../ReviewSection';

export function TrackingBookedServicesAndProvidersView() {
  return (
    <DashboardContent>
      <PageTitleSection title="Tracking of Booked Services & Providers" />
      <RealTimeTracking />
      <BookedServicesTable />
      <ContractCommitmentTracker />
      <ReviewSection />
    </DashboardContent>
  );
}
