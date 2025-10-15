import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

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
  const withdrawalReqSectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => {
    dispatch(promotionEvents())
  }, [dispatch])

  const handleEventSelect = (event: EventData | null) => {
    if (!event) {
      setSelectedEvent(null);
      return;
    }

    // Calculate availableBalance by summing confirmed orders
    const totalConfirmedSales = event.orders
      ?.filter(order => order.paymentStatus === "confirmed")
      .reduce((sum, order) => sum + order.totalAmount, 0) || 0;

    const baseBalance = totalConfirmedSales * 0.9;
    const withdrawals = event.totalApprovedWithdrawals || 0;

    const availableBalance = baseBalance - withdrawals;
    setSelectedEvent({
      ...event,
      availableBalance,
    });
  };

  useEffect(() => {
    if (location.state?.scrollTo === 't&pay' && withdrawalReqSectionRef.current) {
      withdrawalReqSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      // Clear the state to prevent scrolling on every render
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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
        <div ref={withdrawalReqSectionRef}>
          <WithdrawalRequest availableBalance={selectedEvent?.availableBalance || 0} eventId={selectedEvent?._id} />
        </div>


        {/* Withdrawal Table History */}
        <WithdrawalTableHistory selectedEvent={selectedEvent} />

        {/* Refund Management History */}
        <RefundManagementHistory selectedEvent={selectedEvent} />
        {/* Invoice History */}
        <InvoiceHistory selectedEvent={selectedEvent} />

        {/* Payment Setting and Prefrence History */}
        <PaymentSettingAndPrefrenceHistory />

        {/* Help Center and security */}
        <HelpCenterAndSecurity />
      </DashboardContent>
    </>
  );
}