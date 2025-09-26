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
    Paper,
} from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

const eventTypes = ['Concert', 'Sports', 'Theater'];
const locations = ['New York', 'London', 'Tokyo'];
const pricingOptions = ['Low to High', 'High to Low'];

const brands = [
    { name: "trivago", img: "/assets/home-global-img/trivago.png" },
    { name: "amadeus", img: "/assets/home-global-img/amadeus.png" },
    { name: "Skyscanner", img: "/assets/home-global-img/Skyscanner.png" },
    { name: "Expedia", img: "/assets/home-global-img/Expedia.png" },
    { name: "Tripadvisor", img: "/assets/home-global-img/tripadvisor.png" },
    { name: "Hotels.com", img: "/assets/home-global-img/Hotels.png" },
    { name: "priceline", img: "/assets/home-global-img/priceline.png" },
];

export default function HeroSection() {
    const [tab, setTab] = React.useState(0);

    return (
        <Box>
            {/* HERO SECTION */}
            <Box
                sx={{
                    backgroundImage: 'url(/assets/home-global-img/banner.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    color: '#fff',
                    py: 12,
                    px: 2,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(120deg, #0d1f69, #071c5a)',
                        opacity: 0.85,
                        zIndex: 0,
                    },
                }}
            >
                <Box position="relative" zIndex={1}>
                    <Typography variant="h6" fontWeight="medium" gutterBottom>
                        Organize. Book. Save time. TICK-M EVENTS is revolutionizing events in Africa
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        }}
                    >
                        A single platform to manage your events, sell your tickets,<br/> find quality service 
providers and live unforgettable experiences.
                    </Typography>

                    <Grid container justifyContent="center" spacing={4} mt={3}>
                        {[
                            "High quality at a low cost.",
                            "Premium services.",
                            "24/7 Customer support.",
                        ].map((text, index) => (
                            <Grid item key={index}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CheckCircleIcon sx={{ color: "white", fontSize: 20 }} />
                                    <Typography sx={{ color: "white" }}>{text}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* SEARCH BOX */}
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 4,
                    p: 3,
                    mt: -8,
                    maxWidth: 1050,
                    mx: 'auto',
                    position: 'relative',
                    zIndex: 2,
                    bgcolor: '#fff',
                    color: '#000',
                }}
            >
               
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Tabs
                        value={tab}
                        onChange={(e, val) => setTab(val)}
                        textColor="inherit"
                        TabIndicatorProps={{ style: { display: 'none' } }}
                    >
                        <Tab
                            label="All Events"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                mr: 1,
                                backgroundColor: tab === 0 ? '#00AEEF' : 'transparent',
                                color: tab === 0 ? '#fff' : '#000', // black text for inactive tabs
                            }}
                        />
                        <Tab
                            label="Online Events"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: 3,
                                px: 3,
                                py: 1,
                                mr: 1,
                                backgroundColor: tab === 1 ? '#00AEEF' : 'transparent',
                                color: tab === 1 ? '#fff' : '#000',
                            }}
                        />
                        <Tab
                            label="Live Events"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: 3,
                                px: 3,
                                py: 1,
                                backgroundColor: tab === 2 ? '#00AEEF' : 'transparent',
                                color: tab === 2 ? '#fff' : '#000',
                            }}
                        />
                    </Tabs>

                    <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon fontSize="small" sx={{ color: '#000' }} />
                        <Typography variant="body2" color="text.primary">
                            Need more information?
                        </Typography>
                    </Box>
                </Box>

                {/* Search Form */}
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    border="1px solid #e0e0e0"
                    borderRadius={3}
                    gap={2}
                >
                    {/* Event Type */}
                    <TextField
                        select
                        fullWidth
                        label="Event Type"
                        defaultValue=""
                        variant="standard"
                        InputProps={{ disableUnderline: true, style: { color: '#000' } }}
                        InputLabelProps={{ style: { color: '#000' } }}
                        sx={{ minWidth: 150 }}
                    >
                        {eventTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Event Location */}
                    <TextField
                        select
                        fullWidth
                        label="Event Location"
                        defaultValue=""
                        variant="standard"
                        InputProps={{ disableUnderline: true, style: { color: '#000' } }}
                        InputLabelProps={{ style: { color: '#000' } }}
                        sx={{ minWidth: 150 }}
                    >
                        {locations.map((loc) => (
                            <MenuItem key={loc} value={loc}>
                                {loc}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Event Date */}
                    <TextField
                        fullWidth
                        type="date"
                        label="Event Date"
                        variant="standard"
                        InputLabelProps={{ shrink: true, style: { color: '#000' } }}
                        InputProps={{ disableUnderline: true, style: { color: '#000' } }}
                        sx={{ minWidth: 150 }}
                    />

                    {/* Pricing */}
                    <TextField
                        select
                        fullWidth
                        label="Pricing"
                        defaultValue=""
                        variant="standard"
                        InputProps={{ disableUnderline: true, style: { color: '#000' } }}
                        InputLabelProps={{ style: { color: '#000' } }}
                        sx={{ minWidth: 150 }}
                    >
                        {pricingOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Search Button */}
                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        sx={{
                            minWidth: 160,
                            bgcolor: '#002d72',
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: '#001f4f',
                            },
                        }}
                    >
                        Find a Event
                    </Button>
                </Box>
            </Paper>


            {/* BRANDS SECTION */}
            <Box textAlign="center" mt={8}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Premium Brands
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Unveil the Finest Selection of High-End Vehicles
                </Typography>
                <Grid container justifyContent="center" spacing={2} mt={2}>
                    {brands.map((brand) => (
                        <Grid item key={brand.name}>
                            <Paper sx={{ p: 2, borderRadius: 2 }}>
                                <Box
                                    component="img"
                                    src={brand.img}
                                    alt={brand.name}
                                    sx={{
                                        width: 100,
                                        height: "auto",
                                        objectFit: "contain",
                                    }}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
