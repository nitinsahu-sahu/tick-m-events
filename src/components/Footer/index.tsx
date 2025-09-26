import { Box, Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X"; // Twitter/X

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0d0d0d", color: "#fff", mt: 6, pt: 6, pb: 3, px: { xs: 3, md: 8 } }}>
      <Grid container spacing={6}>
        {/* Newsletter Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Subscribe To See Secret Deals Prices <br /> Drop The Moment You Sign Up!
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
          <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
            <img src="/visa.png" alt="Visa" height={30} />
            <img src="/mastercard.png" alt="MasterCard" height={30} />
            <img src="/amex.png" alt="Amex" height={30} />
            <img src="/paypal.png" alt="PayPal" height={30} />
            <img src="/applepay.png" alt="Apple Pay" height={30} />
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
          <Typography variant="body2" sx={{ mt: 1 }}>support@carento.com</Typography>
          <Typography sx={{ mt: 1 }}>
            Need help? Call us <br />
            <Typography component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
              +1 222-555-33-99
            </Typography>
          </Typography>
        </Grid>

        {[
          { title: "Company", links: ["About Us", "Our Awards", "Agencies", "Copyright Notices", "Terms of Use", "Privacy Notice", "Lost & Found"] },
          { title: "Customer", links: ["My Booking", "My Account", "Ticket Calculator", "Refunds Terms", "Privacy Policy"] },
          { title: "Our Partners", links: ["Affiliates", "Travel Agents", "AARP Members", "Points Programs", "Military & Veterans", "Work with us", "Advertise with us"] },
          { title: "Support", links: ["Forum support", "Help Center", "Live chat", "How it works", "Security", "Refund Policy"] },
        ].map((section, idx) => (
          <Grid item xs={6} md={2} key={idx}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              {section.title}
            </Typography>
            {section.links.map((link, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ mb: 1, cursor: "pointer", "&:hover": { color: "primary.main" } }}
              >
                {link}
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
