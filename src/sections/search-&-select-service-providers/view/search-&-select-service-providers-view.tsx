import { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
 
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TabButton } from 'src/components/button/multiple-button';
import { AppDispatch, RootState } from 'src/redux/store';
import { providersListFetch } from 'src/redux/actions/searchSelect';
import { eventFetch } from 'src/redux/actions/event.action';
import { getRequestsByOrganizer } from 'src/redux/actions/service-request';
import { SearchAndAdvanceFilter } from '../SearchAndAdvanceFilter';
import ProviderCardList from '../ProviderCardList';
import { CompareProviders } from '../CompareProviders';
import { ProfileCard } from '../ProfileCard';
import RequestService from '../RequestService';
 
 
export function SearchAndSelectServiceProvidersView() {
  const { providersList } = useSelector((state: RootState) => state?.providers);
  const { organizerRequests, orgLoading } = useSelector((state: RootState) => state?.serviceRequest);
  const [select, setSelected] = useState({})
  const [filtersApplied, setFiltersApplied] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ["Global Search", "List of Providers", "Profile Display", "Requested Sevice"];
 
  const handleSelct = (row: any) => {
    setSelected(row)
  }
 
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    // Only allow switching to provider list if filters are applied and providers exist
    if (newValue === 1 && (!filtersApplied || !providersList?.length)) {
      return;
    }
    setTabValue(newValue);
  };
 
  const handleFiltersApplied = () => {
    setFiltersApplied(true);
  };
 
  useEffect(() => {
    dispatch(providersListFetch())
    dispatch(eventFetch());
  }, [dispatch, providersList])
 
  useEffect(() => {
    if (tabValue === 3) {
    dispatch(getRequestsByOrganizer());
    }
  }, [dispatch, tabValue]);
 
  // In your organizer view component:
  const handleRequestService = (serviceId: string) => {
    // Implement your request logic here
    console.log(`Requesting service ${serviceId}`);
    // Typically would open a modal or make an API call
  };
 
  return (
    <DashboardContent>
      <PageTitleSection title="Search & Select Service Providers" />
 
      <Box display='flex' justifyContent='center'>
        <TabButton
          providersList={providersList}
          tabValue={tabValue}
          tabLabels={tabLabels}
          onChange={handleTabChange}
          filtersApplied={filtersApplied}
        />
      </Box>
 
 
      {tabValue === 0 && (
        <SearchAndAdvanceFilter
          onChange={handleTabChange}
          onFiltersApplied={handleFiltersApplied}
        />
      )}
      {tabValue === 1 && (
        <>
          <ProviderCardList handleSelct={handleSelct} providersList={providersList} />
          <CompareProviders />
        </>
      )}
      {tabValue === 2 && (
        <ProfileCard selectedProvider={select} onRequestService={handleRequestService} />
      )}
      {tabValue === 3 && (
        <RequestService requests={organizerRequests} />
      )}
    </DashboardContent>
  );
}