import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "src/redux/store";
import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { promotionEvents } from "src/redux/actions";
import { EventBreadCrum } from "src/sections/entry-validation/event-status";

import { HelpCenterAndSecurity } from "../help-center-and-security";
import { InvoiceHistory } from "../invoices-&-reports";
import { MetricCard } from "../metric-card";
import { PaymentHistory } from "../payment-history";
import { PaymentSettingAndPrefrenceHistory } from "../payment-settings-&-prefrences";
import { RefundManagementHistory } from "../refund-management";
import { WithdrawalRequest } from "../withdrawal-request";
import { WithdrawalTableHistory } from "../withdrawal-table-history";
import { EventData } from "../utils";


export function TransectionAndPaymentView() {
  const dispatch = useDispatch<AppDispatch>();
  const { eventsWithOrdersAndParticiapnt } = useSelector((state: RootState) => state?.promotionList);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    dispatch(promotionEvents())
  }, [dispatch])

  const handleEventSelect = (event: EventData | null) => {
    if (!event) {
      setSelectedEvent(null);
      return;
    }

    // Calculate availableBalance by summing confirmed orders
    const availableBalance = event.orders
      ?.filter(order => order.paymentStatus === "confirmed")
      .reduce((sum, order) => sum + order.totalAmount, 0) || 0;

    setSelectedEvent({
      ...event,
      availableBalance,
    });
  };

  return (
    <>
      <EventBreadCrum events={eventsWithOrdersAndParticiapnt} onEventSelect={handleEventSelect} eventInformation={selectedEvent} />

      <DashboardContent>
        <PageTitleSection
          title="Transaction And Payment"
          rightCom={`Available Funds: ${selectedEvent?.availableBalance?.toLocaleString() || 0} XAF`}
        />

        {/* Metric Cards */}
        <MetricCard selectedEvent={selectedEvent} />

        {/* Payment History */}
        <PaymentHistory selectedEvent={selectedEvent} />

        {/* Payment History */}
        <WithdrawalRequest availableBalance={selectedEvent?.availableBalance || 0} />

        {/* Withdrawal Table History */}
        <WithdrawalTableHistory />

        {/* Refund Management History */}
        <RefundManagementHistory selectedEvent={selectedEvent} />
        {/* Invoice History */}
        <InvoiceHistory selectedEvent={selectedEvent}/>

        {/* Payment Setting and Prefrence History */}
        <PaymentSettingAndPrefrenceHistory />

        {/* Help Center and security */}
        <HelpCenterAndSecurity />
      </DashboardContent>
    </>
  );
}