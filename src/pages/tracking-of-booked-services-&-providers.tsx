import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TrackingBookedServicesAndProvidersView } from 'src/sections/tracking-of-booked-services-&-providers/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Tracking Booked Services & Providers - ${CONFIG.appName}`}</title>
      </Helmet>

      <TrackingBookedServicesAndProvidersView />
    </>
  );
}
