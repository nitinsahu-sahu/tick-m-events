import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "src/redux/store";
import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { promotionEvents } from "src/redux/actions";

import { HelpCenterAndSecurity } from "../help-center-and-security";
import { InvoiceHistory } from "../invoices-&-reports";
import { MetricCard } from "../metric-card";
import { PaymentHistory } from "../payment-history";
import { PaymentSettingAndPrefrenceHistory } from "../payment-settings-&-prefrences";
import { RefundManagementHistory } from "../refund-management";
import { WithdrawalRequest } from "../withdrawal-request";
import { WithdrawalTableHistory } from "../withdrawal-table-history";
import { TrnsAndPaymentBreadCrum } from "../breadcrum-trnsandpay";
import { EventData } from "../utils";

export function TransectionAndPaymentView() {
  const dispatch = useDispatch<AppDispatch>();

  const { eventsWithOrdersAndParticiapnt } = useSelector((state: RootState) => state?.promotionList);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    dispatch(promotionEvents())
  }, [dispatch])

  const handleEventSelect = (event: EventData | null) => {
    setSelectedEvent(event);
    // Here you can add any additional logic you need when an event is selected
  };
  return (
    <DashboardContent>
      <TrnsAndPaymentBreadCrum
        events={eventsWithOrdersAndParticiapnt}
        onEventSelect={handleEventSelect}
        selectedEvent={selectedEvent}
      />

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