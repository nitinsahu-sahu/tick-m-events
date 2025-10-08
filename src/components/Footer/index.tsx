import { Box, Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X"; // Twitter/X
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from 'src/redux/store';

export default function Footer() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const currentRole = useSelector((state: RootState) => state.auth?.user?.role || 'participant');

  const handleMyBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      // If user is logged in, redirect to ticket management page
      navigate('/ticket-management');
    } else {
      // If user is not logged in, redirect to sign-in page
      navigate('/sign-in');
    }
  };

  const handleMyAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      // Redirect based on user role
      if (currentRole === 'organizer') {
        navigate('/organizer-dashboard');
      } else if (currentRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-profile'); // For participants
      }
    } else {
      // If user is not logged in, redirect to sign-in page
      navigate('/sign-in');
    }
  };

  return (
    <Box sx={{ bgcolor: "#0d0d0d", color: "#fff", mt: 6, pt: 6, pb: 3, px: { xs: 3, md: 8 } }}>
      <Grid container spacing={6}>
        {/* Newsletter Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Receive the best events and news every week
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              fullWidth
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: "gray" }} />,
                sx: {
                  bgcolor: "#fff",
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#002D5B",
                borderRadius: 2,
                px: 3,
                textTransform: "none",
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>
{/* Payment Methods */}
<Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
    Our Payment Methods
  </Typography>
  <Box
    sx={{
      display: "flex",
      gap: 2,
      justifyContent: { xs: "flex-start", md: "flex-end" },
      alignItems: "center",
      flexWrap: "wrap",
    }}
  >
    {/* Fapshi */}
   
   <Box
      component="img"
      src="/assets/images/payment-gateway-logo/fapshi.jpg"
      alt="Mobile Money"
      sx={{ 
        height:40, 
       
      }}
    />
    {/* Mtn */}
    <Box
      component="img"
      src="/assets/images/payment-gateway-logo/mtn-mobile-money.png"
      alt="PayPal"
      sx={{ 
        height:40, 
      }}/>

      {/* Orange */}
      <Box
      component="img"
      src="/assets/images/payment-gateway-logo/orange-money.png"
      alt="PayPal"
      sx={{ 
        height:40, 
      }}
    />
  </Box>
</Grid>

      </Grid>

      {/* Footer Links */}
      <Grid container spacing={4} sx={{ mt: 6 }}>
        <Grid item xs={12} md={3}>
          <Typography fontWeight={700} sx={{ mb: 2 }}>
            Tick-m events
          </Typography>
          <Typography variant="body2">2356 Oakwood Drive, Suite 18, San Francisco, California 94111, US</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Hours: 8:00 - 17:00, Mon - Sat</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>support@tickm-events.com</Typography>
          <Typography sx={{ mt: 1 }}>
            Need help? Call us <br />
            <>
              <Typography
                component="a"
                href="tel:+237655178302"
                sx={{ color: "primary.main", fontWeight: 600, mr: 1 }}
              >
                +237 655 178 302
              </Typography>
              /
              <Typography
                component="a"
                href="tel:+237673994445"
                sx={{ color: "primary.main", fontWeight: 600, ml: 1 }}
              >
                673 994 445
              </Typography>
            </>

          </Typography>
        </Grid>

        {[
          { 
            title: "Company", 
            links: [
              { name: "About Us", path: "/about-us" },
              { name: "Blog", path: "#" },
              { name: "FAQ", path: "#" },
              { name: "Terms of Use", path: "#" },
              { name: "Privacy Policy", path: "#" },
              { name: "Contact", path: "/contact-us" }
            ] 
          },
          { 
            title: "Customer", 
            links: [
              { 
                name: "My Booking", 
                path: isAuthenticated ? "/ticket-management" : "/sign-in",
                onClick: handleMyBookingClick
              },
              { 
                name: "My Account", 
                path: "/sign-in"   
              },
              { name: "Ticket Calculator", path: "#" },
              { name: "Refunds Terms", path: "#" },
              { name: "Privacy Policy", path: "#" }
            ] 
          },
          { 
            title: "Our Partners", 
            links: [
              { name: "Affiliates", path: "#" },
              { name: "Travel Agents", path: "#" },
              { name: "AARP Members", path: "#" },
              { name: "Points Programs", path: "#" },
              { name: "Military & Veterans", path: "#" },
              { name: "Work with us", path: "#" },
              { name: "Advertise with us", path: "#" }
            ] 
          },
          { 
            title: "Support", 
            links: [
              { name: "Forum support", path: "#" },
              { name: "Help Center", path: "/contact-us" },
              { name: "Live chat", path: "#" },
              { name: "How it works", path: "#" },
              { name: "Security", path: "#" },
              { name: "Refund Policy", path: "#" }
            ] 
          },
        ].map((section, idx) => (
          <Grid item xs={6} md={2} key={idx}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              {section.title}
            </Typography>
            {section.links.map((link, i) => (
              <Typography
                key={i}
                component={Link}
                to={link.path}
                onClick={link.onClick}
                variant="body2"
                sx={{ 
                  mb: 1, 
                  cursor: "pointer", 
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { color: "primary.main" } 
                }}
              >
                {link.name}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>

      {/* Bottom Bar */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          mt: 6,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Typography variant="body2" color="gray">
          © 2025 Tick-M Inc. All rights Reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton sx={{ color: "#fff" }}><FacebookIcon /></IconButton>
          <IconButton sx={{ color: "#fff" }}><InstagramIcon /></IconButton>
          <IconButton sx={{ color: "#fff" }}><XIcon /></IconButton>
          <IconButton sx={{ color: "#fff" }}><YouTubeIcon /></IconButton>
        </Box>
      </Box>
    </Box>
  );
}