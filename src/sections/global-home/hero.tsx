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

const eventTypes = ['Concert', 'Sports', 'Theater'];
const locations = ['New York', 'London', 'Tokyo'];
const pricingOptions = ['Low to High', 'High to Low'];

export default function HeroSection() {
    const [tab, setTab] = React.useState(0);

    return (
        <Box>
            {/* Header Section */}
            <Box
                textAlign="center"
                mt={5}
                mb={3}
                sx={{
                    backgroundImage: 'url(/assets/home-global-img/banner.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    color: '#fff',
                    py: 10, // adds vertical padding
                    px: 2,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Looking For Tickets?
                </Typography>
                <Typography variant="h5" fontWeight="medium">
                    You’re in the Right Place!
                </Typography>
                <Box display="flex" justifyContent="center" gap={3} mt={2}>
                    <Typography>✔ High quality at a low cost.</Typography>
                    <Typography>✔ Premium services.</Typography>
                    <Typography>✔ 24/7 Customer support.</Typography>
                </Box>
            </Box>

            {/* Search Box */}
            <Paper
                sx={{ borderRadius: 3, boxShadow: 3, p: 3, mt: 4, mb: 4, maxWidth: 1000, mx: 'auto' }}
            >
                <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
                    <Tab label="All Events" />
                    <Tab label="Online Events" />
                    <Tab label="Live Events" />
                </Tabs>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            select
                            label="Event Type"
                            defaultValue=""
                        >
                            {eventTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            select
                            label="Event Location"
                            defaultValue=""
                        >
                            {locations.map((loc) => (
                                <MenuItem key={loc} value={loc}>
                                    {loc}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Event Date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            fullWidth
                            select
                            label="Pricing"
                            defaultValue=""
                        >
                            {pricingOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} display="flex" alignItems="center">
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ height: '100%' }}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Premium Brands Section */}
            <Box textAlign="center" mt={5}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Premium Brands
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Unveil the Finest Selection of High-End Vehicles
                </Typography>
                <Grid container justifyContent="center" spacing={2} mt={2}>
                    {['trivago', 'amadeus', 'Skyscanner', 'Expedia', 'Tripadvisor', 'Hotels.com', 'priceline'].map((brand) => (
                        <Grid item key={brand}>
                            <Paper sx={{ p: 2, borderRadius: 2 }}>
                                <Typography>{brand}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
