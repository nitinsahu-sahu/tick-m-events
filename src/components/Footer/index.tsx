import { Box, Grid, Typography, TextField, Button, IconButton, Tooltip } from "@mui/material";
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
import { Iconify } from "../iconify";

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
                height: 40,

              }}
            />
            {/* Mtn */}
            <Box
              component="img"
              src="/assets/images/payment-gateway-logo/mtn-mobile-money.png"
              alt="PayPal"
              sx={{
                height: 40,
              }} />

            {/* Orange */}
            <Box
              component="img"
              src="/assets/images/payment-gateway-logo/orange-money.png"
              alt="PayPal"
              sx={{
                height: 40,
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Footer Links */}
      <Grid container spacing={4} sx={{ mt: 6 }} justifyContent="space-around">
        <Grid item xs={12} md={3}>
          <Typography fontWeight={700} sx={{ mb: 2 }}>
            Tick-m events
          </Typography>
          <Typography variant="body2">Douala - Rue des pavés Nyalla, avant l&apos;hôtel ZZ</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Hours: 8:00 - 17:00, Mon - Sat</Typography>
          <Typography
            variant="body2"
            component="a"
            href="mailto:tickmevents@gmail.com?subject=Inquiry&body=Hello, I would like to know more about..."
            sx={{
              mt: 1,
              display: "block",
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                color: "primary.main",
                textDecoration: "underline"
              }
            }}
          >
            tickmevents@gmail.com
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Need help? Call us <br />
            <>
              <Typography
                component="a"
                href="tel:+237 697 182 551"
                sx={{ color: "primary.main", fontWeight: 600, mr: 1 }}
              >
                +237 697 182 551
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
            title: "Support",
            links: [
              { name: "Help Center", path: "/contact-us" },
              { name: "How it works", path: "/about-us" },
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
          {/* Email */}
          <Tooltip title="Email: tickmevents@gmail.com">
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => window.open('mailto:tickmevents@gmail.com')}
            >
              <Iconify width={24} icon="ic:outline-email" />
            </IconButton>
          </Tooltip>

          {/* Fax */}
          <Tooltip title="Fax: +237 652 590 797">
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => window.open('tel:+237652590797', '_blank')}
            >
              <Iconify width={24} icon="emojione-monotone:fax-machine" />
            </IconButton>
          </Tooltip>

          {/* WhatsApp */}
          <Tooltip title="WhatsApp: +237 697 182 551">
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => window.open('https://wa.me/237697182551', '_blank')}
            >
              <Iconify width={24} icon="ic:baseline-whatsapp" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}