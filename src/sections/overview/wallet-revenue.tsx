import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { Chart } from "src/components/chart";
import { chartrevenuOptions, chartrevenuSeries } from "./utils";

export function WalletBalance() {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on larger screens
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                my: 4, // Adds top and bottom margin
            }}
        >
            {/* Left Section - Wallet Balance */}
            <CardContent
                sx={{
                    flex: 1, // 50% width for both sections
                    backgroundColor: "#2395D4",
                    color: "#fff",
                    borderRadius: 2,
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center content vertically
                    justifyContent: "center", // Center content horizontally
                    textAlign: "center", // Center text
                }}
            >
                <Typography variant="h6">Wallet Balance</Typography>
                <Typography variant="h4" fontWeight="bold">100.00 XAF</Typography>

                {/* Buttons */}
                <Box display="flex" gap={2} mt={1}>
                    <Button variant="contained" color="secondary">Withdraw</Button>
                    <Button variant="contained" color="warning">Top Up</Button>
                </Box>

                {/* Transaction History */}
                <Typography variant="body2" mt={1}>Transaction History:</Typography>
                <Typography variant="body2">• +50 XAF(Top-up)</Typography>
                <Typography variant="body2">• -10 XAF (TXN+4% Commission)</Typography>
            </CardContent>

            {/* Right Section - Sales Chart */}
            <CardContent
                sx={{
                    flex: 1, // 50% width for both sections
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center", // Center chart in column
                    // textAlign: "center",
                }}
            >
                <Typography variant="h6">Sales Revenue</Typography>
                <Chart options={chartrevenuOptions} series={chartrevenuSeries} type="line" height={200} />
                <Link to='/marketing-engagenment'>
                <Button
                    variant="contained"
                    sx={{
                        mt: 1,
                        backgroundColor: '#0B2E4E',
                        width: "100%"
                    }}
                >
                    Boost Sales
                    
                </Button></Link>
            </CardContent>
        </Card>
    )
}