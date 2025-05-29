import { Box } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import EventManagementTable from '../EventManagementTable';
import { PaymentMonitoringTable } from '../PaymentMonitoringTable';
import RefundManagementTable from '../RefundManagementTable';
import FroudDetectionTable from '../FroudDetectionTable';
import { InfoCard } from '../InfoCard';

export function TicketingAndTransactionsSupervisionView() {
  return (
    <DashboardContent>

      <InfoCard />
      <Box mt={3}>
        <EventManagementTable />
      </Box>
      <Box mt={3}>
        <PaymentMonitoringTable />
      </Box>
      <Box mt={3}>
        <RefundManagementTable />
      </Box>
      <Box mt={3}>
        <FroudDetectionTable />
      </Box>
    </DashboardContent>
  );
}
