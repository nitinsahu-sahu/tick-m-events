import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { SingleCategoriesView } from 'src/sections/category/single-category/single-category';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Category - ${CONFIG.appName}`}</title>
      </Helmet>

      <SingleCategoriesView />
    </>
  );
}
