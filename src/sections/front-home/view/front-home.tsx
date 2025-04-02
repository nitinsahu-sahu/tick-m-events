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
    Card
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share'; // Import the Share icon

import { styled } from "@mui/material/styles";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
// import { NavHomeTwo } from "../nav-two";
import { Breadcrumb } from "src/components/breadcrumb/breadcrumb";
import { BannerGallery } from "../banner-gallery";
import { TextField } from "@mui/material";

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
    const [vipCount, setVipCount] = useState(0);
    const [standardCount, setStandardCount] = useState(0);

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

                <Box mt={3}>
                    {/* Ticketing Section */}
                    <Typography variant="h4" fontWeight="bold">
                        Ticketing System
                    </Typography>

                    <Grid container spacing={3} mt={2}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ p: 3 }}>
                                <Typography fontWeight="bold">
                                    VIP Ticket <span style={{ color: "blue" }}>(Sold Out)</span>
                                </Typography>
                                <Typography>10,000 XAF</Typography>
                                <Box display="flex" alignItems="center" mt={1}>
                                    <IconButton disabled>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography mx={1}>{vipCount}</Typography>
                                    <IconButton disabled>
                                        <AddIcon />
                                    </IconButton>
                                </Box>

                                <Typography fontWeight="bold" mt={2}>
                                    Standard Ticket
                                </Typography>
                                <Typography>100 XAF</Typography>
                                <Box display="flex" alignItems="center" mt={1}>
                                    <IconButton onClick={() => setStandardCount(Math.max(0, standardCount - 1))}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography mx={1}>{standardCount}</Typography>
                                    <IconButton onClick={() => setStandardCount(standardCount + 1)}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>

                                <Typography mt={2}>Total: {standardCount * 100} XAF</Typography>
                                <Typography sx={{ color: "green" }}>Discount Applied: 10,000 XAF</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Enter Promo Code"
                                    sx={{ my: 2 }}
                                />
                                <Button variant="contained">Apply Promo Code</Button>

                                <Typography mt={2}>
                                    <strong>Net Amount To Pay:</strong> {standardCount * 100} XAF
                                </Typography>

                                {/* Purchase Buttons */}
                                <Grid container spacing={2} mt={2}>
                                    <Grid item xs={4}>
                                        <Button fullWidth variant="contained">
                                            Buy Online
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button fullWidth variant="outlined">
                                            Buy At a Physical Store
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button fullWidth variant="contained" sx={{ backgroundColor: "green" }}>
                                            Buy Via WhatsApp
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Typography mt={2} fontSize="small" textAlign="center">
                                    Event Time: March 28, 2025, 19:00 GMT
                                </Typography>
                            </Card>
                        </Grid>

                        {/* Location Map Section */}
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ p: 3 }}>
                                <Typography fontWeight="bold">Location</Typography>
                                <Typography>
                                    <strong>Full Address:</strong> Palais des Papes Convention Center, Avignon, France
                                </Typography>
                                <iframe
                                    title="Google Map"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0, marginTop: "10px" }}
                                    src="https://www.google.com/maps/embed?..."
                                    allowFullScreen
                                ></iframe>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Contact and Sharing Section */}
                    <Card variant="outlined" sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h5" fontWeight="bold">
                            Contact and Sharing
                        </Typography>

                        <Typography fontWeight="bold" mt={2}>Organizer Contact Information</Typography>
                        <Typography>Name: Jhon Doe</Typography>
                        <Typography>Email: johndoe@example.com</Typography>

                        <Button fullWidth variant="contained" sx={{ my: 2, backgroundColor: "#0a2940" }}>
                            Contact the Organizer
                        </Button>

                        {/* Social Media Buttons */}
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Button fullWidth variant="contained" sx={{ backgroundColor: "#1877F2" }}>
                                    Facebook
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button fullWidth variant="contained" sx={{ backgroundColor: "black" }}>
                                    Twitter
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button fullWidth variant="contained" sx={{ backgroundColor: "#0A66C2" }}>
                                    LinkedIn
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button fullWidth variant="contained" sx={{ backgroundColor: "green" }}>
                                    WhatsApp
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </Box>
        </>
    );
}