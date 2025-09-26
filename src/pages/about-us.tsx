import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { AboutUs } from 'src/sections/about-us';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`About Us - ${CONFIG.appName}`}</title>
      </Helmet>

      <AboutUs />
    </>
  );
}
