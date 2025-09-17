import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

type MetricCardProps = {
  selectedEvent: any;
};

export function MetricCard({ selectedEvent }: MetricCardProps) {
  const theme = useTheme();

  // Helper to format money
  const formatCurrency = (value: number | undefined | null) => {
    const amount = typeof value === "number" && !Number.isNaN(value) ? value : 0;
    return `${amount.toLocaleString()} XAF`;
  };

  // Safe fallback for orders array
  const orders = selectedEvent?.orders || [];

  // 1. Total Sales (confirmed payments)
  const totalSales = orders
    .filter((order: any) => order.paymentStatus === "confirmed")
    .reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);

  // 2. Refunded Amount (if you ever track actual refunds)
  const refundedAmount = orders
    .filter((order: any) => order.refundStatus === "refunded")
    .reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);

  // 3. Pending Funds (paymentStatus === "pending")
  const pendingFunds = orders
    .filter((order: any) => order.paymentStatus === "pending")
    .reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);

  // 4. Available Balance = Total Sales - Refunded Amount
   const commission = totalSales * 0.10;
  const netSales = totalSales - refundedAmount;
  const availableBalance = netSales * 0.90;

  // Final metrics array
  const metrics = [
    {
      title: "Total Sales",
      value: formatCurrency(totalSales),
      color: "#2295D4",
      light: "rgb(75, 162, 209)",
    },
    {
      title: "Available Balance",
      value: formatCurrency(availableBalance),
      color: "#2C8743",
      light: "rgba(104, 196, 127, 0.5)",
    },
    {
      title: "Pending Funds",
      value: formatCurrency(pendingFunds),
      color: "#F9D000",
      light: "rgb(191, 178, 112)",
    },
    {
      title: "Refunded Amounts",
      value: formatCurrency(refundedAmount),
      color: "#F90004",
      light: "rgb(163, 74, 75)",
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={3} key={index} sx={{ textAlign: "center" }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              border: `2px solid ${metric.color}`,
              boxShadow: `-5px 0px 0px 0px ${metric.color}`,
              "&:hover": {
                boxShadow: `-12px 0 16px -5px ${metric.light}`,
              },
              transition: "box-shadow 0.3s ease",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                color="black"
                fontSize={20}
                fontWeight={600}
                gutterBottom
              >
                {metric.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: metric.color, fontWeight: 600 }}
              >
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
