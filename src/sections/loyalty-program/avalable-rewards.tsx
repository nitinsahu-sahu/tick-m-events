import { Container, Grid, Card, CardContent, Typography, Button, Divider, Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { LoyaltyProgramTable } from "src/components/tables/loyalty-program-table";


export const AvailableRewards = () => {

    const avalableRewardTableHeaders = ["Reward", "Points Required ", "Details", "Action"];
    const avalableRewardTableData = [
        { reward: "10% Discount on a Ticket", PointsRequired: "500 pts", details: "Applicable on any ticket", action: "Redeem" },
        { reward: "Free Standard Ticket", PointsRequired: "1000 pts", details: "Valid for partner events", action: "Redeem" },
        { reward: "Free VIP Access", PointsRequired: "2500 pts", details: "Upgrade from a Standard ticket", action: "Insufficient Points" },
    ];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                            Available Rewards
                        </Typography>
                        <Button fullWidth variant="contained" sx={{ bgcolor: "#0B3558", mb: 2 }}>
                            Show Only Available Rewards
                        </Button>

                        <Box  boxShadow={3} borderRadius={3} >
                            {/* Card Wrapper */}
                            <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 2, maxWidth: "1000px", mx: "auto" }}>
                                {/* Table with filtered data */}
                                <LoyaltyProgramTable
                                    headers={avalableRewardTableHeaders}
                                    data={avalableRewardTableData}
                                    type="1"
                                />
                            </Paper>
                        </Box>

                        <Button fullWidth variant="contained" sx={{ bgcolor: "#0B3558", mt: 2 }}>
                            Redeem My Points
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}