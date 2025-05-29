import { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TabButton } from 'src/components/button/multiple-button';
import { AppDispatch, RootState } from 'src/redux/store';
import { providersListFetch } from 'src/redux/actions/searchSelect';

import { SearchAndAdvanceFilter } from '../SearchAndAdvanceFilter';
import ProviderCardList from '../ProviderCardList';
import { CompareProviders } from '../CompareProviders';
import { ProfileCard } from '../ProfileCard';

export function SearchAndSelectServiceProvidersView() {
  const { providersList } = useSelector((state: RootState) => state?.providers);
  const [select, setSelected] = useState({})
  const handleSelct = (row: any) => {
    setSelected(row)
  }

  const dispatch = useDispatch<AppDispatch>();
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ["Global Search", "List of Providers", "Profile Display"];
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(providersListFetch())
  }, [dispatch, providersList])

  return (
    <DashboardContent>
      <PageTitleSection title="Search & Select Service Providers" />

      <>
        <Box
          display='flex'
          justifyContent='center'
        >
          <TabButton providersList={providersList} tabValue={tabValue} tabLabels={tabLabels} onChange={handleTabChange} />
        </Box>


        {tabValue === 0 && (
          <SearchAndAdvanceFilter onChange={handleTabChange} />
        )}
        {tabValue === 1 && (
          <>
            <ProviderCardList handleSelct={handleSelct} providersList={providersList} />
            <CompareProviders />
          </>
        )}
        {tabValue === 2 && (
          <ProfileCard selectedProvider={select} />
        )}
      </>
    </DashboardContent>
  );
}
