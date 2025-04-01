import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Avatar, IconButton, ToggleButtonGroup, ToggleButton, Box, Grid, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import { Iconify } from "src/components/iconify";

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


  const trendingItems = [
    {
      id: 1,
      title: "International Meetup 2020",
      sales: 454,
      trend: "up",
    },
    {
      id: 2,
      title: "Jakarta Indie Music Festival 2025",
      sales: 341,
      trend: "down",
    },
    {
      id: 3,
      title: "Live Choir in Sydney 2025",
      sales: 225,
      trend: "up",
    },
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
    <Box minHeight="100vh" boxShadow={3} borderRadius={3} p={{ xs: 1, md: 3 }} mt={3} bgcolor="white">
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Live Sales & Revenue Data
      </Typography>

      {/* Row 1: Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box boxShadow={3} borderRadius={3} p={{ xs: 1, sm: 1.5, md: 2 }} bgcolor="white">
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
              <Typography variant="h6" color="primary" sx={{ fontSize: { xs: "15px", sm: "17px", md: "20px" } }}>Sales Revenue</Typography>

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
            <Typography variant="h6" color="#1D8DCA">Trends & Performance Graph</Typography>
            <Chart options={barChartOptions} series={barChartSeries} type="bar" height={250} width="100%" />
          </Box>
        </Grid>
      </Grid>

      {/* Row 2: Sales Comparison Chart */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Box boxShadow={3} borderRadius={3} p={2} bgcolor="#2395D4" color="white">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Sales Comparison</Typography>
              <Typography variant="h6" sx={{ textAlign: "right", mt: 1 }}>
                94%
              </Typography>
            </Box>
            <Typography variant="body2">Than last day</Typography>
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

      {/* Row 4: Trending Items */}
      <Box boxShadow={3} borderRadius={3} p={3} mt={3} bgcolor="white">
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
          Trending Items
        </Typography>

        {trendingItems.map((item) => (
          <Grid container key={item.id} justifyContent="space-between" alignItems="center" py={2} flexWrap="wrap">

            {/* Rank & Icon */}
            <Grid item xs={6} sm={6} md={6} display="flex" alignItems="center" flexWrap="wrap">
              <Typography fontWeight="bold" color="#0B2E4C" mr={1} sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}>
                #{item.id}
              </Typography>
              <Avatar sx={{ bgcolor: "#f0f8ff", mx: 1, width: { xs: 30, sm: 35 }, height: { xs: 30, sm: 35 } }}>
                <IconButton sx={{ color: "#0B2E4C" }}>
                  <Iconify width={20} icon="ix:ticket-filled" />
                </IconButton>
              </Avatar>
              <Typography color="#0B2E4C" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                {item.title}
              </Typography>
            </Grid>

            {/* Sales & Trend */}
            <Grid item xs={6} sm={6} md={6} display="flex" alignItems="center" justifyContent="end">
              <Box textAlign="center" mx={2}>
                <Typography color="#0B2E4C" fontWeight="bold" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                  {item.sales}
                </Typography>
                <Typography variant="body2" color="#759791" sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  Sales
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "#f0f8ff", mx: "10px", width: { xs: 30, sm: 35 }, height: { xs: 30, sm: 35 } }}>
                <IconButton sx={{ color: "#0B2E4C" }}>
                  <Iconify width={20} icon="material-symbols-light:bar-chart-rounded" />
                </IconButton>
              </Avatar>
              {item.trend === "up" ? (
                <Box component="img" src="./assets/icons/dashboard/ic_arrow_up.svg" width={16} height={16} />
              ) : (
                <Box component="img" src="./assets/icons/dashboard/ic_arrow_down.svg" width={16} height={16} />
              )}
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>

  )
}