import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Box, Grid, Typography, Button } from "@mui/material";

export function LiveSalesRevenueData() {
  // Line Chart (Sales Revenue)
  const lineChartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    colors: ["#2395D4"], // Set line color
    xaxis: {
      categories: ["April", "May", "June", "July", "August", "September", "October"],
      labels: {
        style: {
          colors: "#2395D4", // Set text color
          fontSize: "12px",
          fontWeight: 500,
        }
      }
    },
    yaxis: {
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

  const lineChartSeries = [{ name: "Sales Revenue", data: [600, 400, 700, 500, 800, 900, 300] }];

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
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15"] },
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
  return (
    <Box minHeight="100vh" boxShadow={3} borderRadius={3} p={3} mt={3} bgcolor="white">
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Live Sales & Revenue Data
      </Typography>

      {/* Row 1: Line Chart & Bar Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box boxShadow={3} borderRadius={3} p={2} bgcolor="white">
            <Typography variant="h6" color="primary">
              Sales Revenue
            </Typography>
            <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={250} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box boxShadow={3} borderRadius={3} p={2} bgcolor="white">
            <Typography variant="h6" color="#1D8DCA">
              Trends & Performance Graph
            </Typography>
            <Chart options={barChartOptions} series={barChartSeries} type="bar" height={250} />
          </Box>
        </Grid>
      </Grid>

      {/* Row 2: Sales Comparison Chart */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Box boxShadow={3} borderRadius={3} p={2} bgcolor="#2395D4" color="white">
            <Typography variant="h6">Sales Comparison</Typography>
            <Typography variant="body2">Than last day</Typography>
            <Chart options={salesComparisonOptions} series={salesComparisonSeries} type="bar" height={200} />
            <Typography variant="h6" sx={{ textAlign: "right", mt: 1 }}>
              94%
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Row 3: Buttons */}
      <Grid container spacing={2} mt={3} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary">Download PDF</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">Download Excel</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={{ bgcolor: "gray" }}>Download CSV</Button>
        </Grid>
      </Grid>

      <Box boxShadow={3} borderRadius={3} p={3} mt={3} bgcolor="white">
        <Typography variant="h6" fontWeight="bold">
          Trending Items
        </Typography>

        {trendingItems.map((item, index) => (
          <Grid container key={item.id} alignItems="center" py={2} borderBottom={index !== trendingItems.length - 1 ? "1px solid #E0E0E0" : "none"}>
            {/* Rank & Icon */}
            <Grid item xs={2} sm={1}>
              <Typography fontWeight="bold">#{item.id}</Typography>
            </Grid>

            {/* Item Name */}
            <Grid item xs={6} sm={7}>
              <Typography>{item.title}</Typography>
            </Grid>

            {/* Sales & Trend */}
            <Grid item xs={4} sm={3} textAlign="right">
              <Typography fontWeight="bold">{item.sales}</Typography>
              <Typography variant="body2" color="textSecondary">
                Sales
              </Typography>
              {item.trend === "up" ? (
                <Box>
                  <Box
                    alt="Arrow"
                    component="img"
                    src="./assets/icons/dashboard/ic_arrow_up.svg"
                    width={16}
                    height={16}
                    color="green"
                  />
                </Box>

              ) : (
                <Box>
                  <Box
                    alt="Arrow"
                    component="img"
                    src="./assets/icons/dashboard/ic_arrow_down.svg"
                    width={16}
                    height={16}
                    color="red"
                  />
                </Box>
              )}
            </Grid>

            {/* More Options */}
            {/* <Grid item xs={12} sm={1} textAlign="right">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Grid> */}
          </Grid>
        ))}
      </Box>
    </Box>
  )
}