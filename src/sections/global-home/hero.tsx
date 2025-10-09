import React, { useState, useEffect, useRef } from 'react';
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
    IconButton,
} from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { PromotionLogoBar } from 'src/components/brands-logo';

// Carousel items with your specified points
const carouselItems = [
    {
        type: 'image',
        src: '/assets/home-banner/01.jpg',
        title: 'Beautiful Wedding Events',
        description: 'A smiling bride in a beautifully decorated room',
    },
    {
        type: 'image',
        src: '/assets/home-banner/02.jpg',
        title: 'Digital E-Tickets',
        description: 'Participants smiling with their phones displaying their e-ticket'
    },
    {
        type: 'image',
        src: '/assets/home-banner/04.jpg',
        title: 'Professional Conferences',
        description: 'Host and attend high-quality professional conferences'
    }
];

// Static options for filters
const eventTypes = ['All', 'Public', 'Private'];
const pricingOptions = ['All', 'Free', 'Paid'];

interface HeroSectionProps {
    events: any[];
    onEventsFiltered?: (events: any[]) => void;
}

export default function HeroSection({ events, onEventsFiltered }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const videoRef = useRef(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { promotionLogos, loading } = useSelector((state: RootState) => state.customization);

    // Auto-scroll functionality
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
            }, 5000); // 5 seconds
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying]);

    const currentItem = carouselItems[currentSlide];

    const [tab, setTab] = useState(0);
    const [filters, setFilters] = useState({
        eventType: '',
        location: '',
        date: '',
        pricing: ''
    });

    const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
    const [locations, setLocations] = useState<string[]>(['All']);

    useEffect(() => {
        if (onEventsFiltered) {
            onEventsFiltered(filteredEvents);
        }
    }, [filteredEvents, onEventsFiltered]);

    // Extract unique locations from events
    useEffect(() => {
        if (events && events.length > 0) {
            const uniqueLocations = [...new Set(events.map((event: any) => {
                const locationParts = event.location.split(',');
                return locationParts[0]?.trim() || event.location;
            }))];
            setLocations(['All', ...uniqueLocations]);
        }
    }, [events]);

    // Apply filters whenever filters or tab change
    useEffect(() => {
        if (!events) return;

        let result = [...events];

        // Tab filter (Online vs Live events)
        if (tab === 1) {
            result = result.filter(event => event.format === 'Online');
        } else if (tab === 2) {
            result = result.filter(event => event.format === 'In-person');
        }

        // Event Type filter
        if (filters.eventType && filters.eventType !== 'All') {
            result = result.filter(event => event.eventType === filters.eventType);
        }

        // Location filter
        if (filters.location && filters.location !== 'All') {
            result = result.filter(event => {
                const eventLocation = event.location.split(',')[0]?.trim();
                return eventLocation === filters.location;
            });
        }

        // Date filter
        if (filters.date) {
            result = result.filter(event => event.date === filters.date);
        }

        // Pricing filter
        if (filters.pricing && filters.pricing !== 'All') {
            if (filters.pricing === 'Free') {
                result = result.filter(event => event.payStatus === 'free');
            } else if (filters.pricing === 'Paid') {
                result = result.filter(event => event.payStatus === 'paid');
            }
        }

        setFilteredEvents(result);
    }, [events, tab, filters]);

    const handleFilterChange = (filterType: any, value: any) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleSearch = () => {
        console.log('Search triggered with filters:', filters);
    };

    const clearFilters = () => {
        setFilters({
            eventType: '',
            location: '',
            date: '',
            pricing: ''
        });
        setTab(0);
    };

    // Function to handle button clicks (redirect to registration/login)
    const handleButtonClick = (buttonType: string) => {
        // Replace with your actual routing logic
        console.log(`Redirecting to ${buttonType} page`);
        // Example: router.push('/auth/register') or window.location.href = '/auth/login'
    };

    return (
        <Box>
            {/* HERO SECTION WITH VIDEO/CAROUSEL BACKGROUND */}
            <Box
                sx={{
                    position: 'relative',
                    height: '100vh',
                    minHeight: '600px',
                    overflow: 'hidden',
                    color: '#fff',
                }}
            >
                {/* Background Video/Image with better visibility */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                    }}
                >
                    <Box
                        component="img"
                        src={currentItem.src}
                        alt={currentItem.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    {/* Reduced overlay opacity for better background visibility */}
                    {/* <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(120deg, #0d1f69, #071c5a)',
                            opacity: 0.5, // Reduced from 0.7 to 0.5 for better background visibility
                        }}
                    /> */}
                </Box>

                {/* Content */}
                <Box
                    position="relative"
                    zIndex={2}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        px: 2,
                    }}
                >
                    {/* Main Title */}
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            mb: 2,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Added text shadow for better readability
                        }}
                    >
                        Organize. Book. Save time. TICK-M EVENTS is revolutionizing events in Africa
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h6"
                        fontWeight="medium"
                        sx={{
                            mb: 4,
                            maxWidth: '800px',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Added text shadow for better readability
                        }}
                    >
                        A single platform to manage your events, sell your tickets, find quality service
                        providers and live unforgettable experiences.
                    </Typography>

                    {/* Three Action Buttons in Rounded Rectangle */}
                    <Paper
                        elevation={6}
                        sx={{
                            borderRadius: 4,
                            p: 3,
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            mb: 4,
                        }}
                    >
                        <Grid container justifyContent="center" spacing={3}>
                            {[
                                { text: "Create my event", path: "/auth/register" },
                                { text: "I'm looking for an event", path: "/auth/register" },
                                { text: "I find a service provider", path: "/auth/register" },
                            ].map((item, index) => (
                                <Grid item key={index}>
                                    <Button
                                        variant="contained"
                                        startIcon={<CheckCircleIcon sx={{ color: "white" }} />}
                                        onClick={() => handleButtonClick(item.text)}
                                        sx={{
                                            bgcolor: '#00AEEF',
                                            color: 'white',
                                            borderRadius: 3,
                                            px: 4,
                                            py: 1.5,
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            minWidth: '220px',
                                            '&:hover': {
                                                bgcolor: '#0088cc',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {item.text}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>

                    {/* Removed individual slide titles and descriptions as requested */}
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
                                color: tab === 0 ? '#fff' : '#000',
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
                            {filteredEvents.length} events found
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
                        value={filters.eventType}
                        onChange={(e) => handleFilterChange('eventType', e.target.value)}
                        variant="standard"
                        InputProps={{ disableUnderline: true, style: { color: '#000' } }}
                        InputLabelProps={{ style: { color: '#000' } }}
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">All Types</MenuItem>
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
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        variant="standard"
                        InputProps={{ disableUnderline: true, style: { color: '#000' } }}
                        InputLabelProps={{ style: { color: '#000' } }}
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">All Locations</MenuItem>
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
                        value={filters.date}
                        onChange={(e) => handleFilterChange('date', e.target.value)}
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
                        value={filters.pricing}
                        onChange={(e) => handleFilterChange('pricing', e.target.value)}
                        variant="standard"
                        InputProps={{ disableUnderline: true, style: { color: '#000' } }}
                        InputLabelProps={{ style: { color: '#000' } }}
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">All Pricing</MenuItem>
                        {pricingOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Action Buttons */}
                    <Box display="flex" gap={1}>
                        <Button
                            variant="outlined"
                            onClick={clearFilters}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 2,
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
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
                            Find Events
                        </Button>
                    </Box>
                </Box>
            </Paper>

            {/* BRANDS SECTION */}
            <PromotionLogoBar
                brands={promotionLogos}
                mainHead="Premium Brands"
                subHead="Unveil the Finest Selection of High-End Vehicles"
            />
        </Box>
    );
}