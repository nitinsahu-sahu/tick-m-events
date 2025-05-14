import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";

import { HelpCenterAndSecurity } from "../help-center-and-security";
import { InvoiceHistory } from "../invoices-&-reports";
import { MetricCard } from "../metric-card";
import { PaymentHistory } from "../payment-history";
import { PaymentSettingAndPrefrenceHistory } from "../payment-settings-&-prefrences";
import { RefundManagementHistory } from "../refund-management";
import { WithdrawalRequest } from "../withdrawal-request";
import { WithdrawalTableHistory } from "../withdrawal-table-history";

export function TransectionAndPaymentView() {
  return (
    <DashboardContent>
      <PageTitleSection
        title="Transaction And Payment"
        rightCom="Available Funds: 1,500,000 XAF"
      />

      {/* Metric Cards */}
      <MetricCard />

      {/* Payment History */}
      <PaymentHistory />

      {/* Payment History */}
      <WithdrawalRequest />

      {/* Withdrawal Table History */}
      <WithdrawalTableHistory />

      {/* Refund Management History */}
      <RefundManagementHistory />

      {/* Invoice History */}
      <InvoiceHistory />

      {/* Payment Setting and Prefrence History */}
      <PaymentSettingAndPrefrenceHistory />

      {/* Help Center and security */}
      <HelpCenterAndSecurity />
    </DashboardContent>
  );
}