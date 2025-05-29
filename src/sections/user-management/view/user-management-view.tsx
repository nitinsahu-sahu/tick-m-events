import { useState } from 'react';
import { Box } from '@mui/material';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TopNavButtons } from '../TopNavButtons';
import { SearchCard } from '../SearchCard';
import { OverviewTableCard } from '../OverviewTableCard';
import { KycDocumentTableCard } from '../KycDocumentTableCard';
import { ActionAndSectionTable } from '../ActionAndSectionTable';
import UserActivityCard from '../UserActivityCard';
 
export function UserManagementView() {
  const [activeTab, setActiveTab] = useState('User List');
 
  return (
    <DashboardContent>
      <PageTitleSection />
      <TopNavButtons active={activeTab} onChange={setActiveTab} />
 
      {activeTab === 'User List' && (
        <>
          <SearchCard />
            <OverviewTableCard />
        </>
      )}
 
      {activeTab === 'KYC Verification' && (
          <KycDocumentTableCard />
      )}
 
      {activeTab === 'Actions & Sanctions' && (
          <ActionAndSectionTable />
      )}
 
      {activeTab === 'Activity History' && (
          <UserActivityCard />
      )}
    </DashboardContent>
  );
}