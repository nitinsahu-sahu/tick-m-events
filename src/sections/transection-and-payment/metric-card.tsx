import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme
} from "@mui/material";

export function MetricCard() {
     const theme = useTheme();
    
      // Data for metric cards
      const metrics = [
        { title: "Total Sales", value: "50,000 XAF", color: "#2295D4", light:"rgb(75, 162, 209)" },
        { title: "Available Balance", value: "45,000 XAF", color: "#2C8743",light:"rgba(104, 196, 127, 0.5)" },
        { title: "Pending Funds", value: "5,200 XAF", color: "#F9D000",light:"rgb(191, 178, 112)" },
        { title: "Refunded Amounts", value: "5,200 XAF", color: "#F90004",light:"rgb(163, 74, 75)" },
      ];

    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {metrics.map((metric, index) => (
                <Grid item xs={12} sm={6} md={3} key={index} sx={{ textAlign: "center" }}>
                    <Card sx={{
                        height: "100%",
                        borderRadius: 2,
                        border: `2px solid ${metric.color}`,
                        boxShadow: `-5px 0px 0px 0px ${metric.color}`, // Left green shadow
                        "&:hover": {
                            boxShadow: `-12px 0 16px -5px ${metric.light}`, // Stronger on hover
                        },
                        transition: "box-shadow 0.3s ease", // Smooth transition
                    }}>
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
    )
}