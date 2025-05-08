import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { FrontHome } from 'src/sections/front-home/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Event - ${CONFIG.appName}`}</title>
      </Helmet>

      <FrontHome />
    </>
  );
}
