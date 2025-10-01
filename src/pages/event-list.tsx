import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { EventList } from 'src/sections/events-list/index';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Events-List - ${CONFIG.appName}`}</title>
      </Helmet>

      <EventList/>
    </>
  );
}
