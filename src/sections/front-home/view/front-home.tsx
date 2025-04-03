import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
    useMediaQuery,
    useTheme,
    Grid,
    Card,
    TextField
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share'; // Import the Share icon

import { styled } from "@mui/material/styles";
import { useState } from "react";

// import { NavHomeTwo } from "../nav-two";
import { Breadcrumb } from "src/components/breadcrumb/breadcrumb";
import { BannerGallery } from "../banner-gallery";
import { TrackingSystem } from "../tracking-system";
import { ContactAndSharing } from "../contact-and-sharing";
import { CountDownCounter } from "../count-down-counter";
import { RateAndReview } from "../rate-and-review";
import { CompanyMarquee } from "../company-marquee";
import { FriendWhoBooked } from "../friend-who-booked";
import { LiveChat } from "../live-chat";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
}));

const LogoSection = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
}));

const NavItems = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));

export function NavHomeOne() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Sell Your Event', path: '/sell' },
        { label: 'Advertise Your Event', path: '/advertise' },
        { label: 'Contact', path: '/contact' }
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="1.1222-5553-33-99" secondary="Sales@cammo.com" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="2.1 USD" secondary="Become Seller" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="static" elevation={0} sx={{ bgcolor: "background.paper" }}>
                <StyledToolbar>
                    <LogoSection>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            Tick-m
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>
                            CYCLING
                        </Typography>
                    </LogoSection>

                    <NavItems>
                        {navItems.map((item) => (
                            <Button key={item.label} color="inherit" sx={{ textTransform: 'none' }}>
                                {item.label}
                            </Button>
                        ))}
                    </NavItems>

                    <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                        Create Your Event
                    </Button>

                    <MobileMenuButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </MobileMenuButton>
                </StyledToolbar>
            </AppBar>

            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

export function FrontHome() {


    return (
        <>
            {/* <NavHomeTwo />
            <NavHomeOne /> */}
            <Box sx={{ p: 3 }}>
                {/* Breadcrumb */}
                <Breadcrumb />

                {/* Main Event Banner */}
                <BannerGallery />

                {/* Event Description */}
                <Card sx={{ mt: 3, p: 3, borderRadius: "15px", backgroundColor: "#2296D4", color: "white" }}>
                    <Box maxWidth={900}>
                        <Typography variant="h5" fontWeight="bold">
                            Event Description
                        </Typography>
                        <Typography mt={1}>
                            Welcome to the Avignon Convention 2025! Join us for an exciting day of innovation, networking, and learning.
                            Our objective is to gather professionals worldwide to discuss agile methodologies and international collaboration.
                        </Typography>
                        <Typography mt={2}>
                            Registration is required before November 10, 2025. Don’t miss out on this incredible event!
                        </Typography>
                    </Box>
                    {/* Action Buttons */}
                    <Box display="flex" justifyContent="end" gap={2} mt={2}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: "white",
                                borderColor: "white",
                                borderRadius: 8,
                                "&:hover": {
                                    borderColor: "white", // Ensures border stays white on hover
                                    backgroundColor: "rgba(255, 255, 255, 0.1)" // Optional: subtle hover effect
                                }
                            }}
                            startIcon={<ShareIcon />} // Add icon to the left of text
                        >
                            Share
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{
                                color: "white",
                                borderColor: "white",
                                borderRadius: 8,
                                "&:hover": {
                                    borderColor: "white", // Ensures border stays white on hover
                                    backgroundColor: "rgba(255, 255, 255, 0.1)" // Optional: subtle hover effect
                                }
                            }}
                            startIcon={<FavoriteIcon />} // Add icon to the left of text
                        >
                            Wishlist
                        </Button>
                    </Box>
                </Card>

                {/* Tracking system */}
                <TrackingSystem />

                {/* Contact and Sharing Section */}
                <ContactAndSharing />

                {/* Count Down System */}
                <CountDownCounter />

                {/* Rate and Review */}
                <RateAndReview />

                {/* Rate and Review */}
                <CompanyMarquee />

                {/* Rate and Review */}
                <FriendWhoBooked />
                
                {/* Rate and Review */}
                <LiveChat />
            </Box>
        </>
    );
}