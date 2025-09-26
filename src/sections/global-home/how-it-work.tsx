import { Box, Typography, Grid } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const steps = [
  {
    icon: <EventAvailableIcon sx={{ fontSize: 40, color: "#002D5B" }} />,
    title: "Event Discovery",
    description: "Select the ideal destination to begin your journey with ease",
  },
  {
    icon: <PlaylistAddCheckIcon sx={{ fontSize: 40, color: "#002D5B" }} />,
    title: "Event Selection",
    description: "Browse our fleet and find the perfect car for your needs",
  },
  {
    icon: <ConfirmationNumberIcon sx={{ fontSize: 40, color: "#002D5B" }} />,
    title: "Choosing Tickets",
    description: "Review your information and confirm your booking",
  },
  {
    icon: <AddShoppingCartIcon sx={{ fontSize: 40, color: "#002D5B" }} />,
    title: "Adding to Cart",
    description: "Start your adventure with confidence and ease",
  },
];

export default function HowItWorks() {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      {/* Section Header */}
      <Typography variant="body2" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
        HOW IT WORKS
      </Typography>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 6 }}>
        Presenting Your New <br /> Go-To Car Rental Experience
      </Typography>

      {/* Steps Grid */}
      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                p: 3,
                height: "100%",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
              }}
            >
              <Box sx={{ mb: 2 }}>{step.icon}</Box>
              <Typography fontWeight={600} color="primary" sx={{ mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
