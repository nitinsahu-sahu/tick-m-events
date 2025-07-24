import { useState } from 'react';
import { Box } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import EventManagementTable from '../EventManagementTable';
import { PaymentMonitoringTable } from '../PaymentMonitoringTable';
import RefundManagementTable from '../RefundManagementTable';
import FroudDetectionTable from '../FroudDetectionTable';
import { InfoCard } from '../InfoCard';

export function TicketingAndTransactionsSupervisionView() {
  const [activeTab, setActiveTab] = useState('Approve Event');

  return (
    <DashboardContent>
      {/* Pass props to InfoCard for tab state */}
      <InfoCard activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Show content based on tab */}
      {activeTab === 'Approve Event' && (
        <Box mt={3}>
          <EventManagementTable />
        </Box>
      )}

      {activeTab === 'Manage Dispute' && (
        <>
          <Box mt={3}>
            <RefundManagementTable />
          </Box>
          <Box mt={3}>
            <FroudDetectionTable />
          </Box>
        </>
      )}

      {activeTab === 'Verify Transaction' && (
        <>
          <Box mt={3}>
            <PaymentMonitoringTable />
          </Box>

        </>
      )}
    </DashboardContent>
  );
}
