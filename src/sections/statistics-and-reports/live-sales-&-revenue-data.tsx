import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { ToggleButtonGroup, ToggleButton, Box, Grid, Button, Stack } from "@mui/material";
import { useState } from "react";

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function LiveSalesRevenueData() {
  // Define valid timeframes
  type Timeframe = "monthly" | "weekly" | "daily";

  // Bar Chart (Performance Graph)
  const barChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false } // Hides download toolbar
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",  // Increase bar width (Adjust as needed)
        borderRadius: 4       // Optional: Rounded corners for bars
      }
    },
    colors: ["#2395D4"], // Set bar color
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "Today"],
      labels: {
        style: {
          colors: "#2395D4", // Set text color
          fontSize: "12px",
          fontWeight: 500,
        }
      }
    },
    tooltip: { enabled: true }
  };


  const barChartSeries = [{ name: "Performance", data: [30, 50, 20, 60, 50, 20, 30] }];

  // Sales Comparison Chart
  const salesComparisonOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: true } },
    xaxis: {
      categories: ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
      labels: {
        style: {
          colors: "#FFFFFF", // Set text color
        }
      }
    },
    yaxis: {
      show: false
    },
    colors: ["#FFFFFF", "#0B2E4C"], // White and Blue bars
    legend: {
      show: false // Hide legend series
    },
    tooltip: { enabled: true },
  };

  const salesComparisonSeries = [
    { name: "White", data: [10, 20, 15, 30, 25, 10, 20, 30, 5, 25] },
    { name: "Black", data: [15, 10, 20, 25, 30, 15, 25, 10, 30, 20] },
  ];

  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");

  const handleTimeframeChange = (event: React.MouseEvent<HTMLElement>, newTimeframe: Timeframe | null) => {
    if (newTimeframe) setTimeframe(newTimeframe);
  };

  // Define different data series for Monthly, Weekly, and Daily
  const lineChartSeries: Record<Timeframe, { name: string; data: number[] }[]> = {
    monthly: [{ name: "Sales", data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200] }],
    weekly: [{ name: "Sales", data: [50, 80, 120, 150, 200, 250, 300, 350, 400, 12, 23, 34] }],
    daily: [{ name: "Sales", data: [10, 15, 20, 30, 50, 60, 20, 50, 34, 22, 34, 12] }],
  };


  const lineChartOptions: ApexOptions = {
    chart: { type: "line", height: 250, toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#2395D4"], // Change line color
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          colors: "#2395D4", // Set text color
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#2395D4", // Set text color
        }
      }
    },
    tooltip: { enabled: true }
  };


  return (
    <Box boxShadow={3} borderRadius={3} p={{ xs: 1, md: 3 }} mt={3} bgcolor="white">

      <HeadingCommon title="Live Sales & Revenue Data" mb={0} />

      {/* Row 1: Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box boxShadow={3} borderRadius={3} p={{ xs: 1, sm: 1.5, md: 2 }} bgcolor="white">
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
              <HeadingCommon title="Sales Revenue" baseSize="20px" color="primary" />
              {/* Toggle Buttons */}
              <ToggleButtonGroup
                value={timeframe}
                exclusive
                onChange={handleTimeframeChange}
                sx={{ mb: { xs: 1, md: 2 } }} // Adjust spacing on smaller screens
              >
                <ToggleButton value="monthly">Monthly</ToggleButton>
                <ToggleButton value="weekly">Weekly</ToggleButton>
                <ToggleButton value="daily">Daily</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            {/* Chart */}
            <Chart options={lineChartOptions} series={lineChartSeries[timeframe]} type="line" height={235} width="100%" />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box boxShadow={3} borderRadius={3} p={2} bgcolor="white">
              <HeadingCommon title="Trends & Performance Graph" baseSize="20px" color="primary" />

            <Chart options={barChartOptions} series={barChartSeries} type="bar" height={250} width="100%" />
          </Box>
        </Grid>
      </Grid>

      {/* Row 2: Sales Comparison Chart */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Box boxShadow={3} borderRadius={3} p={2} bgcolor="#2395D4" color="white">
            <Box display="flex" justifyContent="space-between">
              <HeadingCommon title="Sales Comparison" baseSize="20px" color="white" />
              <HeadingCommon title="94%" baseSize="20px" color="white"/>
            </Box>

              <HeadingCommon variant="body2" title="Than last day" weight={300} baseSize="20px" color="white"/>

            <Chart options={salesComparisonOptions} series={salesComparisonSeries} type="bar" height={200} width="100%" />
          </Box>
        </Grid>
      </Grid>

      {/* Row 3: Buttons - Responsive Scroll on Mobile */}
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
            <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", minWidth: "150px" }}>Download PDF</Button>
            <Button variant="contained" sx={{ backgroundColor: "#1D8DCA", minWidth: "150px" }}>Download Excel</Button>
            <Button variant="contained" sx={{ backgroundColor: "#868686", minWidth: "150px" }}>Download CSV</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>

  )
}