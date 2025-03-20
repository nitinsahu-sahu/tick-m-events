import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Service Provider & Manage Contracts - ${CONFIG.appName}`}</title>
      </Helmet>

      <BlogView />
    </>
  );
}
