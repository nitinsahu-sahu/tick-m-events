import { useState } from 'react';
import { Box, Paper } from "@mui/material";

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TabButton } from 'src/components/button/multiple-button';

import { SearchAndAdvanceFilter } from '../SearchAndAdvanceFilter';
import ProviderCardList from '../ProviderCardList';
import ProfileCard from '../ProfileCard';
import { CompareProviders } from '../CompareProviders';

export function SearchAndSelectServiceProvidersView() {
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ["Global Search", "List of Providers", "Profile Display"];
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <DashboardContent>
      <PageTitleSection title="Search & Select Service Providers" />

      <>
        <Box
          display='flex'
          justifyContent='center'
        >
          <TabButton tabValue={tabValue} tabLabels={tabLabels} onChange={handleTabChange} />
        </Box>


        {tabValue === 0 && (
          <SearchAndAdvanceFilter />
        )}
        {tabValue === 1 && (
          <ProviderCardList />

        )}
        {tabValue === 2 && (
          <ProfileCard />

        )}

      </>
      <CompareProviders />
    </DashboardContent>
  );
}
