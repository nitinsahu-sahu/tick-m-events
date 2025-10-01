import { Box, Typography, Grid } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ChatIcon from "@mui/icons-material/Chat";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CampaignIcon from "@mui/icons-material/Campaign";
import PaymentIcon from "@mui/icons-material/Payment";
import BarChartIcon from "@mui/icons-material/BarChart";

const steps = [
  {
    icon: <SmartphoneIcon sx={{ fontSize: 40, color: "#000" }} />,
    title: "Hybrid ticketing",
    description: "Digital ticket, physical point of sale, WhatsApp",
  },
  {
    icon: <CameraAltIcon sx={{ fontSize: 40, color: "#000" }} />,
    title: "Personalized filter for each event",
    description: "Participants can take a photo of themselves with an exclusive filter",
  },
  {
    icon: <QrCodeScannerIcon sx={{ fontSize: 40, color: "#000" }} />,
    title: "Event Entry",
    description: "Entry via QR Code and/or Manual verification.",
  },
  {
    icon: <ChatIcon sx={{ fontSize: 40, color: "#000" }} />,
    title: "Contact",
    description: "Chat organizer ↔ providers",
  },
  {
    icon: <LiveTvIcon sx={{ fontSize: 40, color: "#000" }} />,
    title: "Built-in Live Streaming",
    description: "To stream your physical events online",
  },
  {
    icon: <CampaignIcon sx={{ fontSize: 40, color: "#000" }} />,
    title: "Integrated marketing",
    description: "Push notifications, email campaigns, etc.",
  },
  {
    icon: <PaymentIcon sx={{ fontSize: 40, color: "#000" }} />,
    title: "Secure payments",
    description: "Mobile Money, credit card, bank transfer, cash",
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 40, color: "#000" }} />,
    title: "Real-time statistics",
    description: "Sales, attendance, rates.",
  },
];

export default function HowItWorks() {
  return (
    <Box sx={{ textAlign: "center", py: 8, bgcolor: "#f9f9f9" }}>
      <Box sx={{ maxWidth: "1050px", mx: "auto", px: 2 }}>
        {/* Section Header */}
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: "#000" }}>
          OUR FLAGSHIP FEATURES – All-in-one
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, color: "#555" }}>
          TICK-M EVENTS gives you more than just tools.
          <br />
          It gives you the power to succeed in your events.
        </Typography>

        {/* Features Grid */}
        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  p: 3,
                  height: "100%",
                  transition: "0.3s",
                  bgcolor: "#fff",
                  textAlign: "center",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{step.icon}</Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#000", mb: 1 }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", fontSize: "14px" }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
