import React from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    TextField,
    MenuItem,
    Button,
    Grid,
    Paper, InputAdornment,
} from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const eventTypes = ['Concert', 'Sports', 'Theater'];
const locations = ['New York', 'London', 'Tokyo'];
const pricingOptions = ['Low to High', 'High to Low'];

export default function HeroSection() {
    const [tab, setTab] = React.useState(0);

    return (
        <Box mt={4}>
            {/* HERO SECTION */}
            <Box
                sx={{
                    maxWidth: 1100,
                    mx: "auto",
                    px: 2,
                    borderRadius: 1,
                    overflow: "hidden",
                    backgroundImage: 'url(/assets/images/event/eventList-hero.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    color: '#fff',
                    py: { xs: 8, md: 12 },
                    textAlign: 'center',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: '#0C2E4EE5',
                        opacity: 0.91,
                        zIndex: 0,
                    },
                }}
            >
                <Box position="relative" zIndex={1} px={2}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#2296D4",
                            color: "#fff",
                            fontWeight: "medium",
                            textTransform: "none", // keeps the original casing
                            px: 3,
                            py: 1.5,
                            fontSize: "1rem",
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: "#1a7cb3", // optional: slightly darker on hover
                            },
                        }}
                    >
                        Find The Best Event Near You
                    </Button>

                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        }}
                    >
                        Uncover Your Dream Events
                    </Typography>
                    <Typography variant="h6" fontWeight="medium" gutterBottom>
                        Search and find your best event with easy way
                    </Typography>

                </Box>
            </Box>

            {/* SEARCH BOX */}
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 2,
                    p: 3,
                    mt: -6,
                    maxWidth: 1000,
                    mx: "auto",
                    position: "relative",
                    zIndex: 2,
                    bgcolor: "#fff",
                    color: "#000",
                    border: "1px solid #e0e0e0",
                }}
            >
                {/* Top Bar with Tabs and Info */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                    flexWrap="wrap"
                >
                    {/* Tabs */}
                    <Tabs
                        value={tab}
                        onChange={(e, val) => setTab(val)}
                        textColor="inherit"
                        TabIndicatorProps={{ style: { display: "none" } }}
                    >
                        {["All Events", "Online Events", "Live Events"].map((label, i) => (
                            <Tab
                                key={label}
                                label={label}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                    mr: 1,
                                    backgroundColor: tab === i ? "#00AEEF" : "transparent",
                                    color: tab === i ? "#fff" : "#000",
                                    minHeight: "auto",
                                }}
                            />
                        ))}
                    </Tabs>

                    {/* Info Text */}
                    <Box display="flex" alignItems="center" gap={1} mt={{ xs: 2, md: 0 }}>
                        <PersonIcon fontSize="small" sx={{ color: "#000" }} />
                        <Typography variant="body2" color="text.primary">
                            Need more information?
                        </Typography>
                    </Box>
                </Box>

                {/* Filters Grid */}
                <Grid container spacing={2}>
                    {/* Event Type */}
                    <Grid item xs={12} sm={6} md={2.5}>
                        <TextField
                            select
                            fullWidth
                            label="Event Type"
                            defaultValue=""
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CategoryIcon fontSize="small" sx={{ color: "#737373" }} />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            {eventTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Event Location */}
                    <Grid item xs={12} sm={6} md={2.5}>
                        <TextField
                            select
                            fullWidth
                            label="Event Location"
                            defaultValue=""
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnIcon fontSize="small" sx={{ color: '#737373' }} />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            {locations.map((loc) => (
                                <MenuItem key={loc} value={loc}>
                                    {loc}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Event Date */}
                    <Grid item xs={12} sm={6} md={2.5}>
                        <TextField
                            select
                            fullWidth
                            label="Event Date"
                            defaultValue=""
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarTodayIcon fontSize="small" sx={{ color: '#737373' }} />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            {["Today", "This Weekend", "This Month"].map((d) => (
                                <MenuItem key={d} value={d}>
                                    {d}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Pricing */}
                    <Grid item xs={12} sm={6} md={2.5}>
                        <TextField
                            select
                            fullWidth
                            label="Pricing"
                            defaultValue=""
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CreditCardIcon fontSize="small" sx={{ color: '#737373' }} />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            {pricingOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Find Event Button */}
                    <Grid item xs={12} md={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<SearchIcon />}
                            sx={{
                                bgcolor: "#002d72",
                                color: "#fff",
                                fontWeight: "bold",
                                textTransform: "none",
                                px: 2,
                                py: 1.2,
                                borderRadius: 2,
                                height: "40px",
                                "&:hover": {
                                    bgcolor: "#001f4f",
                                },
                            }}
                        >
                            Find a Event
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
