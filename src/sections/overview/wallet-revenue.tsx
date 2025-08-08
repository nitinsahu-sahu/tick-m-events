import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Chart } from "src/components/chart";
import { ApexOptions } from "apexcharts";

type WalletBalanceProps = {
  selectedEvent: any;
};

export function WalletBalance({ selectedEvent }: WalletBalanceProps) {
  const orders = selectedEvent?.order ?? [];

  const revenueByMonth: Record<string, number> = {};

orders.forEach((order: any) => {
    if (order.paymentStatus === "confirmed") {
      const date = new Date(order.createdAt);
      const monthYear = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }); // e.g. "Aug 2025"
      
      revenueByMonth[monthYear] = (revenueByMonth[monthYear] || 0) + order.totalAmount;
    }
  });

  const labels = Object.keys(revenueByMonth);       // ["Aug 2025", ...]
  const seriesData = Object.values(revenueByMonth); // [900, ...]

  const chartrevenuSeries = [
    {
      name: "Monthly Revenue (XAF)",
      data: seriesData,
    },
  ];

  const chartrevenuOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth" },
    xaxis: {
      categories: labels,
      title: { text: "Month" },
    },
    yaxis: {
      title: { text: "Revenue (XAF)" },
    },
    colors: ["#0B2E4E"],
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        my: 4,
      }}
    >
      {/* Wallet Balance */}
      <CardContent
        sx={{
          flex: 1,
          backgroundColor: "#2395D4",
          color: "#fff",
          borderRadius: 2,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Wallet Balance</Typography>
        <Typography variant="h4" fontWeight="bold">100.00 XAF</Typography>

        <Box display="flex" gap={2} mt={1}>
          <Button variant="contained" color="secondary">Withdraw</Button>
          <Button variant="contained" color="warning">Top Up</Button>
        </Box>

        <Typography variant="body2" mt={1}>Transaction History:</Typography>
        <Typography variant="body2">• +50 XAF (Top-up)</Typography>
        <Typography variant="body2">• -10 XAF (TXN + 4% Commission)</Typography>
      </CardContent>

      {/* Sales Revenue Chart */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Sales Revenue</Typography>
        <Chart options={chartrevenuOptions} series={chartrevenuSeries} type="line" height={200} />
        <Link to='/marketing-engagenment'>
          <Button
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: '#0B2E4E',
              width: "100%"
            }}
          >
            Boost Sales
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
