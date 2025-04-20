import { useState } from 'react';
import { Box, Typography } from '@mui/material';
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
      <PageTitleSection title="user-management" />
      <TopNavButtons active={activeTab} onChange={setActiveTab} />
      <SearchCard />
      <Box mt={3}>
        <OverviewTableCard />
      </Box>
      <Box mt={4}>
        <KycDocumentTableCard />
      </Box>
      <Box mt={4}>
        <ActionAndSectionTable />
      </Box>
      <Box mt={4}>
        <UserActivityCard/>
      </Box>

    </DashboardContent>
  );
}
