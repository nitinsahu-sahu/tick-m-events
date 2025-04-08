import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ServiceRequestAndNegotiationView } from 'src/sections/service-request-&-negotiation/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Service Request & Negotiation - ${CONFIG.appName}`}</title>
      </Helmet>

      <ServiceRequestAndNegotiationView />
    </>
  );
}
