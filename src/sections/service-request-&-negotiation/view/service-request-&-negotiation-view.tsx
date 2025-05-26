import { useState } from 'react';
import { Box } from '@mui/material';

import { TabButton } from 'src/components/button/multiple-button';
import { DashboardContent } from 'src/layouts/dashboard';

import ServiceNegotiationCard from '../ServiceNegotiationCard';
import ServiceRequestForm from '../ServiceRequestForm';
import LiveChatComponent from '../LiveChatComponent';
import FinalValidationCard from '../FinalValidationCard';


export function ServiceRequestAndNegotiationView() {
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ["Service Request Form", "Messaging & Negotiation", "Tracking & Final Validation"];
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <DashboardContent>
      <Box
        display='flex'
        justifyContent='center'
      >
        <TabButton tabValue={tabValue} tabLabels={tabLabels} onChange={handleTabChange} />
      </Box>
      {tabValue === 0 && (
        <>
          <ServiceNegotiationCard />
          <ServiceRequestForm />
        </>
      )}
      {tabValue === 1 && (
        <LiveChatComponent />
      )}
      {tabValue === 2 && (
        <FinalValidationCard />
      )}
    </DashboardContent>
  );
}
