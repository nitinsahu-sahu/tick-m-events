import { Container, Grid, Card, CardContent, Typography, Button, Divider, Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { LoyaltyProgramTable } from "src/components/tables/loyalty-program-table";


export const RewardsHistory = () => {
    // Withdrawal Table History 
    const rewardRecordsTableHeaders = ["Reward", "Redemption Date ", "Status ", " Action"];

    const rewardRecordsTableData = [
        { Reward: "10% Discount on a Ticket", date: "01/02/2025", status: "Used", action: "View Details" },
        { Reward: "Free Standard Ticket", date: "1000 pts", status: "Pending Use", action: "View Details" },
    ];

    return (
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                            Reward History
                        </Typography>
                        <Box mt={2} boxShadow={3} borderRadius={3} >
                            {/* Card Wrapper */}
                            <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 2, maxWidth: "1000px", mx: "auto" }}>
                                {/* Table with filtered data */}
                                <LoyaltyProgramTable
                                    headers={rewardRecordsTableHeaders}
                                    data={rewardRecordsTableData}
                                    type="1"
                                />
                            </Paper>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}