import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { GlobalHome } from 'src/sections/global-home';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Home - ${CONFIG.appName}`}</title>
      </Helmet>

      <GlobalHome />
    </>
  );
}
