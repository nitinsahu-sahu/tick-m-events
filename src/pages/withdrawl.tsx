import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { TransactionAndPaymentManagementView } from 'src/sections/transaction-&-payment-management/view';
import { WithDrawl } from 'src/sections/withdrawl';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`WithDrawl - ${CONFIG.appName}`}</title>
      </Helmet>

      <WithDrawl />
    </>
  );
}
