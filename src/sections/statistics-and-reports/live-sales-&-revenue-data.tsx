import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { ToggleButtonGroup, ToggleButton, Box, Grid, Stack } from "@mui/material";
import { useState, useMemo } from "react";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { commonChartOptions, salesComparisonSeries } from "./utils";

type Timeframe = "monthly" | "weekly" | "daily";

function getMonthLabel(date: Date) {
  return date.toLocaleString("default", { month: "short" });
}

function getWeekLabel(date: Date) {
  // Get week number in the month: Week 1, Week 2, ...
  const day = date.getDate();
  return `Week ${Math.ceil(day / 7)}`;
}

function getDayHourLabel(date: Date) {
  return `${date.getHours()}:00`;
}

function filterOrdersByTimeframe(orders: any[], timeframe: Timeframe) {
  const now = new Date();
  switch (timeframe) {
    case "monthly":
      // last 12 months including current month
      return orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        const diffMonths = (now.getFullYear() - orderDate.getFullYear()) * 12 + (now.getMonth() - orderDate.getMonth());
        return diffMonths >= 0 && diffMonths < 12;
      });
    case "weekly":
      // last 4 weeks including current week
      return orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays < 28;
      });
    case "daily":
      // today (last 24 hours)
      return orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate.toDateString() === now.toDateString();
      });
    default:
      return [];
  }
}

function groupOrdersByTimeframe(orders: any[], timeframe: Timeframe) {
  const grouped: Record<string, number> = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    let key = "";

    if (timeframe === "monthly") {
      key = getMonthLabel(date);
    } else if (timeframe === "weekly") {
      key = getWeekLabel(date);
    } else if (timeframe === "daily") {
      key = getDayHourLabel(date);
    }

    if (!grouped[key]) grouped[key] = 0;

    let amount = order.totalAmount;

    // Subtract refundAmount only if refund confirmed
    if (order.refundStatus === "refunded" && order.refundAmount) {
      amount -= order.refundAmount;
    }

    grouped[key] += amount;
  });

  return grouped;
}


export function LiveSalesRevenueData({ selectedEvent }: { selectedEvent: any }) {
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");

  const handleTimeframeChange = (event: React.MouseEvent<HTMLElement>, newTimeframe: Timeframe | null) => {
    if (newTimeframe) setTimeframe(newTimeframe);
  };

  // Extract orders from event and filter by timeframe
  const filteredOrders = useMemo(() => {
    if (!selectedEvent || !selectedEvent.order) return [];
    return filterOrdersByTimeframe(selectedEvent.order, timeframe);
  }, [selectedEvent, timeframe]);

  // Group orders by timeframe label and sum revenue
  const groupedRevenue = useMemo(() => groupOrdersByTimeframe(filteredOrders, timeframe), [filteredOrders, timeframe]);

  // Generate categories (labels) depending on timeframe, ensuring fixed order
  const categories = useMemo(() => {
    if (timeframe === "monthly") {
      // Last 12 months from now
      const now = new Date();
      const months = [];
      let i = 0;
      while (i < 12) {
        const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
        months.push(getMonthLabel(d));
        i += 1;
      }
      return months;
    }

    if (timeframe === "weekly") {
      return ["Week 1", "Week 2", "Week 3", "Week 4"];
    }

    // daily - hours 0-23
    return Array.from({ length: 24 }, (_, i) => `${i}:00`);

  }, [timeframe]);

  // Map categories to revenue data, default 0 if no revenue
  const revenueData = categories.map((cat) => groupedRevenue[cat] || 0);

    const groupedPerformanceCount = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredOrders.forEach(order => {
      const date = new Date(order.createdAt);
      let key = "";
      if (timeframe === "monthly") key = getMonthLabel(date);
      else if (timeframe === "weekly") key = getWeekLabel(date);
      else if (timeframe === "daily") key = getDayHourLabel(date);

      grouped[key] = (grouped[key] || 0) + 1; // counting number of orders
    });
    return grouped;
  }, [filteredOrders, timeframe]);
  const performanceData = categories.map(cat => groupedPerformanceCount[cat] || 0);

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
    categories,
    labels: { style: { fontSize: "12px", fontWeight: 500 } }
  },
  yaxis: {
    min: 0,
    max: 60,
    tickAmount: 6,
    labels: {
      style: { fontSize: "12px", fontWeight: 500 }
    }
  }
}), [categories]);

  // Bar chart series uses performance data
  const barChartSeries = [{ name: "Orders Count", data: performanceData }];

  // Line chart options dynamically
  const lineChartOptions = useMemo<ApexOptions>(() => ({
    ...commonChartOptions,
    chart: { type: "line", height: 250 },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#2395D4"],
    xaxis: { categories },
    tooltip: { enabled: true },
  }), [categories]);

  const lineChartSeries = [{ name: "Sales", data: revenueData }];
  console.log("lineChartSeries",lineChartSeries);

  // The other charts remain unchanged (barChartOptions, salesComparisonOptions etc.)
 

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
