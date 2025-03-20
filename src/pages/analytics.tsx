import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { AnalyticsView } from 'src/sections/analytics/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Analytics - ${CONFIG.appName}`}</title>
      </Helmet>

      <AnalyticsView />
    </>
  );
}
