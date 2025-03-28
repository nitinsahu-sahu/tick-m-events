import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const TicketSalesChartSeries = [50, 5, 25, 5, 10, 5]

const TicketSalesChartOptions: ApexOptions = {
  chart: { type: "pie" },
  labels: [
    "Browsing TICK-M EVENTS",
    "Social Media Shares",
    "Push/Email Notifications",
    "Official Website",
    "Word of Mouth",
    "Paid Ads",
  ],
  colors: ["#4CAF50", "#E53935", "#FFC107", "#9575CD", "#F06292", "#FF7043"],
  legend: { position: "right" },
};

const GenderChartOptions:ApexOptions = {
  chart: { type: "pie" },
    labels: ["Male", "Female"],
    colors: ["#4CAF50", "#FFC107"],
    dataLabels: { enabled: true, style: { fontSize: "16px" } },
    legend: { position: "right" },
};

const GenderChartSeries = [3000, 2000]

const geographicalDistributionOptions: ApexOptions = {
  chart: { type: "bar" },
  // plotOptions: { bar: { columnWidth: "45%" } },
  dataLabels: { enabled: false },
  xaxis: { categories: ["USA", "UK", "Germany", "France", "India"] },
  colors: ["#1976D2"],
};

const geographicalDistributionSeries = [{ data: [800, 500, 400, 350, 300] }]

const ageGroupsOptions: ApexOptions = {
  chart: { type: "bar" },
  plotOptions: { bar: { columnWidth: "50%" } },
  dataLabels: { enabled: false },
  xaxis: { categories: ["Youth (17-24)", "Adults (25-50)", "Seniors (50+)"] },
  colors: ["#1976D2"],
};

const ageGroupsSeries = [{ data: [400, 850, 400] }]

const deviceUsageOptions: ApexOptions = {
  chart: { type: "pie" },
  labels: ["Smartphones", "Tablets", "Laptops", "Desktops"],
  colors: ["#4CAF50", "#E53935", "#FFC107", "#1976D2"],
  legend: { position: "right" },
};

const deviceUsageSeries = [3000, 1000, 2000, 800]

const clickRatesOptions: ApexOptions = {
  chart: { type: "pie" },
  labels: ["Clicked", "Purchased"],
  colors: ["#4CAF50", "#FFC107"],
  legend: { position: "right" },
};

const clickRatesSeries = [3000, 2000]

// 🛠 Reusable ChartCard Component
const ChartCard = ({ title, options, series, type, height,width }:any) => (
  <Grid item xs={12} md={6}>
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Chart options={options} series={series} type={type} height={height} width={width} />
    </Card>
  </Grid>
);

export function MainChartComponents() {
  // 📊 Chart Data Configuration
  const chartData = [
    { title: "Ticket Sales Distribution", options: TicketSalesChartOptions, series: TicketSalesChartSeries, type: "pie", height: 300,  },
    { title: "Gender Breakdown", options: GenderChartOptions, series: GenderChartSeries, type: "pie", height: 300, width:300 },
    { title: "Geographical Distribution", options: geographicalDistributionOptions, series: geographicalDistributionSeries, type: "bar", height: 220 },
    { title: "Device Usage", options: deviceUsageOptions, series: deviceUsageSeries, type: "pie", height: 230 },
    { title: "Age Groups", options: ageGroupsOptions, series: ageGroupsSeries, type: "bar", height: 260 },
    { title: "Email & Notification Click Rates", options: clickRatesOptions, series: clickRatesSeries, type: "pie", height: 300 },
  ];

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        {chartData.map((chart, index) => (
          <ChartCard key={index} {...chart} />
        ))}
      </Grid>
    </Box>
  );
}
