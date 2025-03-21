import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ServiceProviderAndManageContractView } from 'src/sections/service-provider-and-manage-contracts/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Service Provider & Manage Contracts - ${CONFIG.appName}`}</title>
      </Helmet>

      <ServiceProviderAndManageContractView />
    </>
  );
}
