import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { EventSearchAndDetailsView } from 'src/sections/event-search-and-details/view';
import { MarketplaceAndServiceProviderSupervisionView } from 'src/sections/marketplace-&-service-provider-supervision/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Marketplace & Service Provider Supervision - ${CONFIG.appName}`}</title>
      </Helmet>

      <MarketplaceAndServiceProviderSupervisionView />
    </>
  );
}
