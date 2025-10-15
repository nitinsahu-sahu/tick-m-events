import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Chart } from "src/components/chart";
import { ApexOptions } from "apexcharts";

type WalletBalanceProps = {
    selectedEvent: any;
};

export function WalletBalance({ selectedEvent }: WalletBalanceProps) {
      const navigate = useNavigate();
    
    // Calculate total confirmed sales
    const totalConfirmedSales = selectedEvent?.order
        ?.filter((order: any) => order.paymentStatus === "confirmed")
        .reduce((sum: number, order: any) => sum + order.totalAmount, 0) || 0;

    // Calculate base balance (90% of confirmed sales)
    const baseBalance = totalConfirmedSales * 0.9;

    // Calculate total approved withdrawals
    const totalApprovedWithdrawals = selectedEvent?.withdrawals
        ?.filter((withdrawal: any) => withdrawal.status === "approved")
        .reduce((sum: number, withdrawal: any) => sum + withdrawal.amount, 0) || 0;

    // Calculate final wallet balance
    const walletBalance = baseBalance - totalApprovedWithdrawals;

    // Prepare revenue chart data
    const orders = selectedEvent?.order ?? [];
    const revenueByMonth: Record<string, number> = {};

    orders.forEach((order: any) => {
        if (order.paymentStatus === "confirmed") {
            const date = new Date(order.createdAt);
            const monthYear = date.toLocaleString("default", {
                month: "short",
                year: "numeric",
            });

            revenueByMonth[monthYear] = (revenueByMonth[monthYear] || 0) + order.totalAmount;
        }
    });

    const labels = Object.keys(revenueByMonth);
    const seriesData = Object.values(revenueByMonth);

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
                <Typography variant="h4" fontWeight="bold">
                    {walletBalance.toFixed(2)} XAF
                </Typography>

                <Box display="flex" gap={2} mt={1}>
                    <Button variant="contained" color="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/transaction-and-payment', { state: { scrollTo: 't&pay' } });
                        }}
                    >
                        Withdraw
                    </Button>
                    {/* <Button variant="contained" color="warning">
                        Top Up
                    </Button> */}
                </Box>

                <Typography variant="body2" mt={1}>
                    Transaction History:
                </Typography>
                <Typography variant="body2">
                    • +{totalConfirmedSales.toFixed(2)} XAF (Total Sales)
                </Typography>
                <Typography variant="body2">
                    • -{(totalConfirmedSales * 0.1).toFixed(2)} XAF (10% Platform Fee)
                </Typography>
                {totalApprovedWithdrawals > 0 && (
                    <Typography variant="body2">
                        • -{totalApprovedWithdrawals.toFixed(2)} XAF (Withdrawals)
                    </Typography>
                )}
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
                <Chart
                    options={chartrevenuOptions}
                    series={chartrevenuSeries}
                    type="line"
                    height={200}
                />
                <Link to="/marketing-engagement">
                    <Button
                        variant="contained"
                        sx={{
                            mt: 1,
                            backgroundColor: "#0B2E4E",
                            width: "100%",
                        }}
                    >
                        Boost Sales
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}