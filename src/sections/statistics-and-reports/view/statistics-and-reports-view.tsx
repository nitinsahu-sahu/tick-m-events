import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Grid } from "@mui/material";

import { eventFetch } from "src/redux/actions/event.action";
import { AppDispatch, RootState } from "src/redux/store";
import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";

import { LiveSalesRevenueData } from "../live-sales-&-revenue-data";
import { MainDashboardStatistics } from "../main-dashboard-statistics";
import { TicketDetailsAndCategories } from "../ticket-details-&-categories";
import { MainChartComponents } from "../small-charts/main-chart-componets";
import { ReportDataExport } from "../report-data-export";
import { TicketDetails } from "../ticket-details";

export function StatisticsAndReportsView() {
  const [activeTab, setActiveTab] = useState("Overview");
  const { fullData } = useSelector((state: RootState) => state?.event);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch immediately on mount
    dispatch(eventFetch());

    // Set up polling every 5 minutes (300,000 ms)
    const intervalId = setInterval(() => {
      dispatch(eventFetch());
    }, 300000); // 5 minutes in milliseconds

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const tabs = [
    "Overview",
    "Ticket Details",
    "Participant Engagement",
    "Comparisons",
    "Reports",
  ];

  return (
    <DashboardContent>
      <PageTitleSection title="Sales & Revenue Overviews" />

      {/* Row 3: Tab Buttons */}
      <Grid container spacing={2} mt={1} justifyContent="center">
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { md: "center" },
              flexWrap: { xs: "nowrap", sm: "wrap" },
              overflowX: { xs: "auto", sm: "visible" },
              gap: 2,
              pb: 1,
            }}
          >
            {tabs.map((text) => (
              <Button
                key={text}
                onClick={() => setActiveTab(text)}
                variant="contained"
                sx={{
                  backgroundColor: activeTab === text ? '#002b5b' : '#0B2E4C',
                  color: activeTab === text ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  fontWeight: activeTab === text ? 600 : 500,
                  whiteSpace: 'nowrap',
                  minWidth: '150px',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none', // If you prefer normal case
                  letterSpacing: '0.5px',
                  '&:hover': {
                    backgroundColor: activeTab === text ? '#001a3d' : '#083358',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  },
                  '&:active': {
                    backgroundColor: '#001a3d',
                    transform: 'scale(0.98)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: activeTab === text
                    ? '0 4px 12px rgba(0, 42, 91, 0.3)'
                    : 'none',

                }}
              >
                {text}
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Conditional Tab Content */}
      {activeTab === "Overview" && (
        <>
          <LiveSalesRevenueData />
          <MainDashboardStatistics />
        </>
      )}

      {activeTab === "Ticket Details" && <TicketDetails events={fullData} />}

      {activeTab === "Participant Engagement" && <TicketDetailsAndCategories />}

      {activeTab === "Comparisons" && <MainChartComponents />}

      {activeTab === "Reports" && <ReportDataExport />}
    </DashboardContent>
  );
}