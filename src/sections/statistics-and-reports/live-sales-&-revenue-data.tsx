import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { ToggleButtonGroup, ToggleButton, Box, Grid, Button, Stack } from "@mui/material";
import { useState, useMemo } from "react";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { downloadButtons, commonChartOptions, barChartSeries, salesComparisonSeries } from "./utils";

type Timeframe = "monthly" | "weekly" | "daily";

export function LiveSalesRevenueData() {
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");
  const handleTimeframeChange = (event: React.MouseEvent<HTMLElement>, newTimeframe: Timeframe | null) => {
    if (newTimeframe) setTimeframe(newTimeframe);
  };
  const lineChartData = useMemo(() => ({
    monthly: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200] },
    weekly: { categories: ["Week 1", "Week 2", "Week 3", "Week 4"], data: [50, 80, 120, 150] },
    daily: { categories: Array.from({ length: 24 }, (_, i) => `${i}:00`), data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)) }
  }), []);
  const barChartOptions = useMemo<ApexOptions>(() => ({
    ...commonChartOptions,
    chart: { type: "bar" },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 4
      }
    },
    colors: ["#2395D4"],
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "Today"],
      labels: { style: { fontSize: "12px", fontWeight: 500 } }
    }
  }), []);
  const salesComparisonOptions = useMemo<ApexOptions>(() => ({
    ...commonChartOptions,
    chart: { type: "bar" },
    xaxis: {
      categories: ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
      labels: { style: { colors: "#FFFFFF" } }
    },
    yaxis: { show: false },
    colors: ["#FFFFFF", "#0B2E4C"],
    legend: { show: false }
  }), []);
  const lineChartOptions = useMemo<ApexOptions>(() => ({
    ...commonChartOptions,
    chart: { type: "line", height: 250 },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#2395D4"],
    xaxis: { categories: lineChartData[timeframe].categories },
    tooltip: { enabled: true }
  }), [timeframe, lineChartData]);

  const lineChartSeries = [{ name: "Sales", data: lineChartData[timeframe].data }];

  return (
    <Box boxShadow={3} borderRadius={3} p={{ xs: 1, md: 3 }} mt={3} bgcolor="white">
      <HeadingCommon title="Live Sales & Revenue Data" mb={0} />

      {/* Charts Row */}
      <Grid container spacing={3}>
        {/* Sales Revenue Chart */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Sales Revenue"
            headerContent={
              <ToggleButtonGroup
                value={timeframe}
                exclusive
                onChange={handleTimeframeChange}
                sx={{ mb: { xs: 1, md: 2 } }}
              >
                <ToggleButton value="monthly">Monthly</ToggleButton>
                <ToggleButton value="weekly">Weekly</ToggleButton>
                <ToggleButton value="daily">Daily</ToggleButton>
              </ToggleButtonGroup>
            }
          >
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={235}
              width="100%"
            />
          </ChartCard>
        </Grid>

        {/* Performance Graph */}
        <Grid item xs={12} md={6}>
          <ChartCard title="Trends & Performance Graph">
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={250}
              width="100%"
            />
          </ChartCard>
        </Grid>
      </Grid>

      {/* Sales Comparison Chart */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Box boxShadow={3} borderRadius={3} p={2} bgcolor="#2395D4" color="white">
            <Box display="flex" justifyContent="space-between">
              <HeadingCommon title="Sales Comparison" baseSize="20px" color="white" />
              <HeadingCommon title="94%" baseSize="20px" color="white" />
            </Box>
            <HeadingCommon variant="body2" title="Than last day" weight={300} baseSize="20px" color="white" />
            <Chart
              options={salesComparisonOptions}
              series={salesComparisonSeries}
              type="bar"
              height={200}
              width="100%"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Download Buttons */}
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
              "&::-webkit-scrollbar": { height: 4 },
              "&::-webkit-scrollbar-thumb": { background: "#868686", borderRadius: 3 },
            }}
          >
            {downloadButtons.map((button) => (
              <Button
                key={button.label}
                variant="contained"
                sx={{
                  backgroundColor: button.color,
                  minWidth: "150px",
                  "&:hover": { backgroundColor: `${button.color}CC` }
                }}
              >
                {button.label}
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// Reusable Chart Card Component
const ChartCard = ({
  title,
  children,
  headerContent
}: {
  title: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
}) => (
  <Box boxShadow={3} borderRadius={3} p={{ xs: 1, sm: 1.5, md: 2 }} bgcolor="white">
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
      <HeadingCommon title={title} baseSize="20px" color="primary" />
      {headerContent}
    </Stack>
    {children}
  </Box>
);