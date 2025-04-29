import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { SearchAndAdvanceFilter } from '../SearchAndAdvanceFilter';
import ProviderCardList from '../ProviderCardList';
import ProfileCard from '../ProfileCard';
import { CompareProviders } from '../CompareProviders';

export function SearchAndSelectServiceProvidersView() {
  return (
    <DashboardContent>
        <PageTitleSection title="Search & Select Service Providers" />
        <SearchAndAdvanceFilter/>
        <ProviderCardList/>
        <ProfileCard />
        <CompareProviders/>
    </DashboardContent>
  );
}
