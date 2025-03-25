import { Box, Card, Typography, Link, useMediaQuery, useTheme } from "@mui/material";

export function NavUpgrade() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Responsive check

  return (
    <Card
      sx={{
        p: { xs: 2, sm: 3 },
        width: { xs: "90%", sm: 245 },
        minHeight: { xs: 140, sm: 160 }, // Use minHeight instead of fixed height
        aspectRatio: "16 / 9", // Keeps a responsive height
        borderRadius: "15px",
        color: "common.white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/assets/icons/ticket-sale/ticket-sale-bg.png')",
        backgroundPosition: "center",
      }}
    >
      {/* Top Left SVG Icon */}
      <Box
        component="img"
        src="/assets/icons/ticket-sale/ic-wave.svg"
        alt="Wave Icon"
        sx={{
          width: { xs: 20, sm: 24 },
          height: { xs: 12, sm: 15 },
          position: "absolute",
          top: { xs: 10, sm: 16 },
          left: { xs: 15, sm: 25 },
        }}
      />

      {/* Title */}
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: { xs: "16px", sm: "18px" }, // Adjust font size
          }}
        >
          Ticket Sales
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: { xs: "16px", sm: "18px" }, // Adjust font size
          }}
        >
          Weekly Report
        </Typography>
      </Box>

      {/* Link and Icon Inline Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Space out link and icon
          width: "100%", // Ensure it takes full width
          mt: 1,
          mb: 1,
        }}
      >
        {/* "Learn more" link */}
        <Link
          href="#"
          underline="hover"
          sx={{
            color: "common.white",
            fontWeight: 700,
            fontSize: { xs: "12px", sm: "14px" }, // Adjust font size for mobile
            fontFamily: "Open Sans, sans-serif",
            display: "inline-block",
          }}
        >
          Learn more
        </Link>

        {/* Bottom Right SVG Icon */}
        <Box
          component="img"
          src="/assets/icons/ticket-sale/ic-point-burger.svg"
          alt="Dots Icon"
          sx={{
            width: { xs: 16, sm: 20 },
            height: { xs: 20, sm: 26 },
            opacity: 0.5,
          }}
        />
      </Box>

    </Card>
  );
}
