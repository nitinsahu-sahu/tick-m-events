import { Container, Grid, Card, CardContent, Typography, Button, Divider, Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


export const HeroSection = () => {
    const rewards = [
        { name: "10% Discount", points: "+100 Points" },
        { name: "Free Ticket", points: "+100 Points" },
        { name: "VIP Lounge Access", points: "+100 Points" },
    ];
    const rewardHistory = [
        { name: "10% Discount", points: "-100 Points", date: "02/05/2025" },
        { name: "10% Discount", points: "-100 Points", date: "02/05/2025" },
        { name: "10% Discount", points: "-100 Points", date: "02/05/2025" },
    ];
    return (
        <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1, width: "100%" }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                            Available Rewards
                        </Typography>

                        {rewards.map((reward, index) => (
                            <Box key={index}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                                    <Typography fontWeight="bold">{reward.name}</Typography>
                                    <Typography fontWeight="bold">{reward.points}</Typography>
                                    <Button variant="contained" sx={{ bgcolor: "#0B3558", borderRadius: 1, fontWeight: 400 }}>
                                        Redeem
                                    </Button>
                                </Box>
                                {index < rewards.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1, width: "100%" }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                            Reward History
                        </Typography>

                        {rewardHistory.map((history, index) => (
                            <Box key={index}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                                    <Typography fontWeight="bold">{history.name}</Typography>
                                    <Typography fontWeight="bold">{history.points}</Typography>
                                    <Typography fontWeight="bold">(Used on {history.date})</Typography>
                                </Box>
                                {index < rewardHistory.length - 1 && <Divider />}
                            </Box>
                        ))}
                        <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "#0B3558", borderRadius: 1, minWidth: "180px", flexGrow: 1, fontWeight: 500 }}
                            >
                                View My History
                            </Button>
                            <Button variant="outlined" sx={{ borderRadius: 1, minWidth: "230px", flexGrow: 1, fontWeight: 500, color: "#0B2E4C", borderColor: "#0B2E4C" }}>
                                Discover How to Earn More Points
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}