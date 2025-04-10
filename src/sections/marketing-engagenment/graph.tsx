import { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import Chart from "react-apexcharts";

const chartData = {
  categories: [
    "April", "May", "June", "July", "August", "September", "October", "November",
  ],
  before: [200000, 400000, 500000, 900000, 700000, 500000, 400000, 456000],
};

export const BookingTrends = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (_: any, newValue: number) => {
    setTabValue(newValue);
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "booking-trends",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 4,
      colors: ["#3AACE7"],
    },
    markers: {
      size: 6,
      strokeColors: "#0B2E4C",
      strokeWidth: 2,
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: "#7C7C7C",
        },
      },
    },
    yaxis: {
      min: 200000,
      max: 1000000,
      tickAmount: 5,
      labels: {
        formatter: val => `${val / 1000}k`,
        style: {
          colors: "#7C7C7C",
        },
      },
    },
    tooltip: {
      custom({ series, seriesIndex, dataPointIndex }) {
        return `
          <div style="background:#0B2E4C;padding:10px 12px;border-radius:10px;color:white;min-width:140px;">
            <div style="font-size:16px;font-weight:bold;">
              ${series[seriesIndex][dataPointIndex]} <span style="font-weight:normal;">Sales</span>
            </div>
            <div style="font-size:13px;margin-top:5px;">
              Nov 18th, 2020
            </div>
          </div>
        `;
      },
    },
    colors: ["#3AACE7"],
    legend: { show: false },
    grid: {
      strokeDashArray: 5,
    },
  };

  const series = [
    {
      name: "Sales",
      data: chartData.before,
    },
  ];

  return (
    <Paper
      sx={{
        p: isMobile ? 2 : 4,
        borderRadius: "20px",
        background: "#FFFFFF",
        boxShadow: "0px 0px 15px 0px #0000003B",
        mb: 4,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        spacing={isMobile ? 2 : 4}
        mb={3}
        flexWrap="wrap"
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          spacing={isMobile ? 2 : 4}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mr: 2 }}>
            Booking Trends
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 30,
                height: 14,
                borderRadius: 10,
                backgroundColor: "#3AACE7",
                border: "2px solid #3AACE7",
              }}
            />
            <Typography variant="caption" color="#333">
              Booking Before Promotion
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 30,
                height: 14,
                borderRadius: 10,
                backgroundColor: "#fff",
                border: "2px solid #3AACE7",
              }}
            />
            <Typography variant="caption" color="#333">
              Booking After Promotion
            </Typography>
          </Stack>
        </Stack>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              minWidth: 80,
              fontSize: 14,
              color: "#7C7C7C",
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#3AACE7",
              fontWeight: "bold",
            },
            "& .MuiTabs-indicator": {
              height: "2px",
              borderRadius: "2px",
              backgroundColor: "#3AACE7",
            },
          }}
        >
          <Tab label="Monthly" />
          <Tab label="Weekly" />
          <Tab label="Daily" />
        </Tabs>
      </Stack>

      <Chart
        options={options}
        series={series}
        type="line"
        height={isMobile ? 300 : 350}
        width="100%"
      />
    </Paper>
  );
};
