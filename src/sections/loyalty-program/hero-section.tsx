import { useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Divider, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/redux/store";
import { fetchAvailableRewards, fetchRewardHistory } from "src/redux/actions/rewardActions"; 

type Reward = {
    name: string;
    pointsRequired: number;
    description: string;
};

type RewardHistory = {
    id: string;
    name: string;
    points: string;
    date: string;
};

export const HeroSection = () => {
    const dispatch = useDispatch();
    const rewards = useSelector((state: RootState) => state.reward.rewards as Reward[]);
    const rewardHistory = useSelector((state: RootState) => state.reward.history as RewardHistory[]);
    const loading = useSelector((state: RootState) => state.reward.loading);
    // Fetch rewards on component mount
    useEffect(() => {
        dispatch(fetchAvailableRewards() as any);
    }, [dispatch]);

    //   const rewardHistory = [
    //     { name: "10% Discount", points: "-100 Points", date: "02/05/2025" },
    //     { name: "10% Discount", points: "-100 Points", date: "02/05/2025" },
    //     { name: "10% Discount", points: "-100 Points", date: "02/05/2025" },
    //   ];

    return (
        <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1, width: "100%" }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Available Rewards
                        </Typography>

                        {rewards.length === 0 ? (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                                <Typography color="text.secondary">No rewards available yet.</Typography>
                            </Box>
                        ) : (
                            rewards.map((reward, index) => (
                                <Box key={index} mb={2}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                                        <Typography fontWeight="bold">{reward.name}</Typography>
                                        <Typography fontWeight="bold">{reward.pointsRequired.toLocaleString()} pts</Typography>
                                        <Button variant="contained" sx={{ bgcolor: "#0B3558", borderRadius: 1 }}>
                                            Redeem
                                        </Button>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1, width: "100%" }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                            Reward History
                        </Typography>
                        {loading ? (
                            <Typography color="text.secondary">Loading history...</Typography>
                        ) : rewardHistory.length === 0 ? (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                                <Typography color="text.secondary">No reward history found.</Typography>
                            </Box>
                        ) : (
                            rewardHistory.map((history, index) => (
                                <Box key={history.id}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                                        <Typography fontWeight="bold">{history.name}</Typography>
                                        <Typography fontWeight="bold">{history.points}</Typography>
                                        <Typography fontWeight="bold">
                                            (Used on {new Date(history.date).toLocaleDateString()})
                                        </Typography>
                                    </Box>
                                    {index < rewardHistory.length - 1 && <Divider />}
                                </Box>
                            ))
                        )}
                        <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "#0B3558", borderRadius: 1, minWidth: "180px", flexGrow: 1, fontWeight: 500 }}
                            >
                                View My History
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ borderRadius: 1, minWidth: "230px", flexGrow: 1, fontWeight: 500, color: "#0B2E4C", borderColor: "#0B2E4C" }}
                            >
                                Discover How to Earn More Points
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

