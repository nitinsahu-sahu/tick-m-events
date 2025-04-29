import { Paper,Box, Button,useTheme, useMediaQuery, Grid, Typography } from "@mui/material";
import Chart from "react-apexcharts";

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { CHART_OPTIONS, CHART_SERIES, STATS_DATA } from "./utills";

export function RealTimeStatistics() {
      const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">

            <HeadingCommon title="Real-Time Statistics" color="#0B2E4C" weight={600} baseSize="33px" />

            <Grid container spacing={2} sx={{ mt: 1 }}>
                {STATS_DATA.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Button
                            fullWidth
                            sx={{
                                backgroundColor: "#0B2A4A",
                                padding: {
                                    xs: "12px",  // Smaller padding on mobile
                                    sm: "15px"   // Standard padding on larger screens
                                },
                                borderRadius: "8px",
                                textAlign: "center",
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,        // Space between label and value
                                minHeight: {
                                    xs: "80px",  // Compact on mobile
                                    sm: "auto"   // Natural height on larger screens
                                },
                                '&:hover': {
                                    backgroundColor: "#0A1E36" // Darker shade on hover
                                }
                            }}
                        >
                            <Typography variant="body2" fontWeight="bold" sx={{
                                fontSize: {
                                    xs: "0.875rem",  // Slightly smaller on mobile
                                    sm: "1rem"       // Standard size on larger screens
                                }
                            }}>
                                {stat.label}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" sx={{
                                fontSize: {
                                    xs: "1.25rem",  // Smaller on mobile
                                    sm: "1.5rem"    // Standard size on larger screens
                                }
                            }}>
                                {stat.value}
                            </Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <Paper
                sx={{
                    mt: 2,
                    padding: "15px",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                }}
            >
                <HeadingCommon title="Entry Data Visualization" baseSize="33px" />
                <Chart
                    options={CHART_OPTIONS}
                    series={CHART_SERIES}
                    type="pie"
                    height={isMobile ? 280 : 320}
                />
            </Paper>
        </Box>
    )
}