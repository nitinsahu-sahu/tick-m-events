import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";
import { LiveSalesRevenueData } from "../live-sales-&-revenue-data";
import { MainDashboardStatistics } from "../main-dashboard-statistics";
import { TicketDetailsAndCategories } from "../ticket-details-&-categories";
import { MainChartComponents } from "../small-charts/main-chart-componets";
import { ReportDataExport } from "../report-data-export";

export function StatisticsAndReportsView() {

  return (
    <DashboardContent>
      <PageTitleSection
        title="Sales & Revenue Overviews"
      />
      <LiveSalesRevenueData />

      <MainDashboardStatistics />

      <TicketDetailsAndCategories />

      <MainChartComponents />

      <ReportDataExport />
    </DashboardContent>
  )
}