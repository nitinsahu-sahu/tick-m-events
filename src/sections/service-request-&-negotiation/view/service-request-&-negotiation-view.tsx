import { useState } from 'react';
import { Typography } from '@mui/material';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TopNavButtons } from '../TopNavButtons';
import ServiceNegotiationCard from '../ServiceNegotiationCard';
import ServiceRequestForm from '../ServiceRequestForm';
import LiveChatComponent from '../LiveChatComponent';
import FinalValidationCard from '../FinalValidationCard';

export function ServiceRequestAndNegotiationView() {
  const [activeTab, setActiveTab] = useState('Service Request Form');

  return (
    <DashboardContent>
      <PageTitleSection title="Service Request & Negotiation" />
      <TopNavButtons active={activeTab} onChange={setActiveTab} />
      <ServiceNegotiationCard />
      <ServiceRequestForm />
      <LiveChatComponent />
      <FinalValidationCard />
    </DashboardContent>
  );
}
