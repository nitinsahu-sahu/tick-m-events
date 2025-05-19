import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material"
import { Iconify } from "src/components/iconify"
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

const trendingItems = [
    {
        id: 1,
        title: "International Meetup 2020",
        sales: 454,
        trend: "up",
    },
    {
        id: 2,
        title: "Jakarta Indie Music Festival 2025",
        sales: 341,
        trend: "down",
    },
    {
        id: 3,
        title: "Live Choir in Sydney 2025",
        sales: 225,
        trend: "up",
    },
];

export function TicketDetails() {
    return (
        <Box boxShadow={3} borderRadius={3} p={3} mt={3} bgcolor="white">
            <HeadingCommon variant="h6" title="Trending Items" baseSize="20px" color="#0B2E4D" />
            {trendingItems.map((item) => (
                <Grid container key={item.id} justifyContent="space-between" alignItems="center" py={2} flexWrap="wrap">

                    {/* Rank & Icon */}
                    <Grid item xs={6} sm={6} md={6} display="flex" alignItems="center" flexWrap="wrap">
                        <HeadingCommon variant="h6" title={`#${item.id}`} baseSize="18px" color="#0B2E4D" />

                       
                        <Avatar sx={{ bgcolor: "#f0f8ff", mx: 1, width: { xs: 30, sm: 35 }, height: { xs: 30, sm: 35 } }}>
                            <IconButton sx={{ color: "#0B2E4C" }}>
                                <Iconify width={20} icon="ix:ticket-filled" />
                            </IconButton>
                        </Avatar>
                        <Typography color="#0B2E4C" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                            {item.title}
                        </Typography>
                    </Grid>

                    {/* Sales & Trend */}
                    <Grid item xs={6} sm={6} md={6} display="flex" alignItems="center" justifyContent="end">
                        <Box textAlign="center" mx={2}>
                            <Typography color="#0B2E4C" fontWeight="bold" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                                {item.sales}
                            </Typography>
                            <Typography variant="body2" color="#759791" sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                                Sales
                            </Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: "#f0f8ff", mx: "10px", width: { xs: 30, sm: 35 }, height: { xs: 30, sm: 35 } }}>
                            <IconButton sx={{ color: "#0B2E4C" }}>
                                <Iconify width={20} icon="material-symbols-light:bar-chart-rounded" />
                            </IconButton>
                        </Avatar>
                        {item.trend === "up" ? (
                            <Box component="img" src="./assets/icons/dashboard/ic_arrow_up.svg" width={16} height={16} />
                        ) : (
                            <Box component="img" src="./assets/icons/dashboard/ic_arrow_down.svg" width={16} height={16} />
                        )}
                    </Grid>
                </Grid>
            ))}
        </Box>
    )
}