import React from "react";
import { Box, Card, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const TicketSalesChartSeries = [50, 5, 25, 5, 10, 5];

const TicketSalesChartOptions: ApexOptions = {
  chart: {
    type: "pie",
    animations: { enabled: false } // Improves performance on resize
  },
  labels: [
    "Browsing TICK-M EVENTS",
    "Social Media Shares",
    "Push/Email Notifications",
    "Official Website",
    "Word of Mouth",
    "Paid Ads",
  ],
  colors: ["#4CAF50", "#E53935", "#FFC107", "#9575CD", "#F06292", "#FF7043"],
  responsive: [{
    breakpoint: 600,
    options: {
      legend: {
        position: "bottom",
        horizontalAlign: "center"
      }
    }
  }]
};

const GenderChartOptions: ApexOptions = {
  chart: {
    type: "pie",
    animations: { enabled: false }
  },
  labels: ["Male", "Female"],
  colors: ["#4CAF50", "#FFC107"],
  dataLabels: { enabled: true, style: { fontSize: "16px" } },
  responsive: [{
    breakpoint: 600,
    options: {
      legend: {
        position: "bottom"
      },
      dataLabels: {
        style: {
          fontSize: "12px"
        }
      }
    }
  }]
};

const GenderChartSeries = [3000, 2000];

const geographicalDistributionOptions: ApexOptions = {
  chart: {
    type: "bar",
    animations: { enabled: false }
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["USA", "UK", "Germany", "France", "India"],
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  colors: ["#1976D2"],
  responsive: [{
    breakpoint: 600,
    options: {
      plotOptions: {
        bar: {
          columnWidth: '60%'
        }
      }
    }
  }]
};

const geographicalDistributionSeries = [{ data: [800, 500, 400, 350, 300] }];

const ageGroupsOptions: ApexOptions = {
  chart: {
    type: "bar",
    animations: { enabled: false }
  },
  plotOptions: { bar: { columnWidth: "50%" } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Youth (17-24)", "Adults (25-50)", "Seniors (50+)"],
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  colors: ["#1976D2"],
  responsive: [{
    breakpoint: 600,
    options: {
      plotOptions: {
        bar: {
          columnWidth: '60%'
        }
      }
    }
  }]
};

const ageGroupsSeries = [{ data: [400, 850, 400] }];

const deviceUsageOptions: ApexOptions = {
  chart: {
    type: "pie",
    animations: { enabled: false }
  },
  labels: ["Smartphones", "Tablets", "Laptops", "Desktops"],
  colors: ["#4CAF50", "#E53935", "#FFC107", "#1976D2"],
  responsive: [{
    breakpoint: 600,
    options: {
      legend: {
        position: "bottom"
      }
    }
  }]
};

const deviceUsageSeries = [3000, 1000, 2000, 800];

const clickRatesOptions: ApexOptions = {
  chart: {
    type: "pie",
    animations: { enabled: false }
  },
  labels: ["Clicked", "Purchased"],
  colors: ["#4CAF50", "#FFC107"],
  responsive: [{
    breakpoint: 600,
    options: {
      legend: {
        position: "bottom"
      }
    }
  }]
};

const clickRatesSeries = [3000, 2000];

interface ChartCardProps {
  title: string;
  options: ApexOptions;
  series: any;
  type: "pie" | "bar" | "line" | "area" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "treemap";
}

const ChartCard: React.FC<ChartCardProps> = ({ title, options, series, type }) => (
  <Grid item xs={12} sm={6} md={6}>
    <Card sx={{
      p: { xs: 1, sm: 2, md: 3 },
      borderRadius: 3,
      boxShadow: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, minHeight: 300 }}>
        <Chart
          options={options}
          series={series}
          type={type}
          height="100%"
          width="100%"
        />
      </Box>
    </Card>
  </Grid>
);

export function MainChartComponents() {
  const chartData = [
    { title: "Ticket Sales Distribution", options: TicketSalesChartOptions, series: TicketSalesChartSeries, type: "pie" as const },
    { title: "Gender Breakdown", options: GenderChartOptions, series: GenderChartSeries, type: "pie" as const },
    { title: "Geographical Distribution", options: geographicalDistributionOptions, series: geographicalDistributionSeries, type: "bar" as const },
    { title: "Device Usage", options: deviceUsageOptions, series: deviceUsageSeries, type: "pie" as const },
    { title: "Age Groups", options: ageGroupsOptions, series: ageGroupsSeries, type: "bar" as const },
    { title: "Email & Notification Click Rates", options: clickRatesOptions, series: clickRatesSeries, type: "pie" as const },
  ];

  return (
    <Box mt={3}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {chartData.map((chart, index) => (
          <ChartCard key={index} {...chart} />
        ))}
      </Grid>
    </Box>
  );
}