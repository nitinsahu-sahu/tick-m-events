import { Container, Grid, Card, CardContent, Typography, Button, Divider, Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


export const AccountPoints = () => (
    <Card sx={{ borderRadius: 3, boxShadow: 14, p: 3, mt: 4, mb: 4 }}>

        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
            My Accumulated Points
        </Typography>
        <Card sx={{ borderRadius: 3, boxShadow: 14, p: 2, mt: 2 }}>
            <CardContent>
                <Box textAlign="center" mt={2}>
                    <Typography fontWeight={500}>You currently have:</Typography>
                    <Typography variant="h5" fontWeight="bold" color="#2090CE">
                        1250 loyalty points
                    </Typography>
                    <LinearProgress variant="determinate" value={62.5} sx={{ height: 8, borderRadius: 1, my: 2 }} />
                    <Typography color="black">Next level at 2000 points</Typography>
                </Box>
            </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, boxShadow: 14, p: 2, mt: 2 }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    Ways to Earn More Points
                </Typography>
                <Box mt={2}>
                    {["Purchase of a Standard Ticket", "Purchase of a VIP Ticket", "Purchase of a Premium Ticket", "Sharing an event on social media", "Inviting a friend to buy a ticket"].map((item, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" py={1}>
                            <Typography fontWeight={500}>{item}</Typography>
                            <Typography color="#0B2E4C" fontWeight={600}>+10 pts</Typography>
                        </Box>
                    ))}
                </Box>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#0B3558", borderRadius: 2, mt: 2 }}>
                    Invite a Friend & Earn Points
                </Button>
            </CardContent>
        </Card>
    </Card>
);