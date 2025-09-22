import { Container, Grid, Card, CardContent, Typography, Button, Divider, Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { LoyaltyProgramTable } from "src/components/tables/loyalty-program-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { fetchAvailableRewards, fetchRewardHistory } from "src/redux/actions/rewardActions";

type Reward = {
    name: string;
    pointsRequired: number;
    description: string;
};


export const AvailableRewards = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { rewards, loading } = useSelector((state: RootState) => state.reward);

    useEffect(() => {
        dispatch(fetchAvailableRewards() as any);
    }, [dispatch]);

    const avalableRewardTableHeaders = ["Reward", "Points Required ", "Details", "Action"];

    const rewardTableData = rewards?.map((reward: Reward) => ({
        reward: reward.name,
        PointsRequired: `${reward.pointsRequired.toLocaleString()} pts`,
        details: reward.description,
        action: "Redeem",
    }));
    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                            Available Rewards
                        </Typography>
                        <Button fullWidth variant="contained" sx={{ bgcolor: "#0B3558", mb: 2 }}>
                            Show Only Available Rewards
                        </Button>

                        <Box boxShadow={3} borderRadius={3} >
                            {/* Card Wrapper */}
                            <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 2, maxWidth: "1000px", mx: "auto" }}>
                                {/* Table with filtered data */}
                                <LoyaltyProgramTable
                                    headers={avalableRewardTableHeaders}
                                    data={rewardTableData || []}
                                    type="1"
                                    loading={loading}
                                    emptyMessage="No rewards available yet"
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