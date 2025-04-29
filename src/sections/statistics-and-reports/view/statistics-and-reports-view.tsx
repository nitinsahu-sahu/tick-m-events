import { Button,Box, Grid } from "@mui/material";
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

      {/* Row 3: Buttons */}
      <Grid container spacing={2} mt={1} justifyContent="center">
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent:{md:"center"},
              flexWrap: { xs: "nowrap", sm: "wrap" }, // No wrap on mobile, wrap on tablets and up
              overflowX: { xs: "auto", sm: "visible" }, // Horizontal scroll on mobile
              gap: 2,
              pb: 1, // Padding bottom to prevent scrollbar hiding buttons
            }}
          >
            {["Overview", "Ticket Details", "Participant Engagement", "Comparisons", "Reports"].map((text) => (
              <Button
                key={text}
                variant="contained"
                sx={{
                  backgroundColor: "#0B2E4C",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  fontWeight: 500,
                  whiteSpace: "nowrap", // Prevent text wrapping
                  minWidth: "150px", // Ensures equal button width
                }}
              >
                {text}
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>

      <LiveSalesRevenueData />

      <MainDashboardStatistics />

      <TicketDetailsAndCategories />

      <MainChartComponents />

      <ReportDataExport />
      
    </DashboardContent>
  )
}