import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// import { SingleEventView } from 'src/sections/event/single-event';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Event - ${CONFIG.appName}`}</title>
      </Helmet>

      {/* <SingleEventView /> */}
    </>
  );
}
