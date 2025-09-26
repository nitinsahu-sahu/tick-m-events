// UpcomingEvents.tsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Chip,
  useTheme,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  LocationOn,
  AccessTime,
  Person,
  Event,
  Star,
} from "@mui/icons-material";

const events = [
  {
    id: 1,
    title: "The Live Vibe",
    location: "New South Wales, Australia",
    time: "12:00 PM - 6:00 AM",
    person: "Single Person",
    venue: "Burj Khalifa - Dubai",
    date: "20 Jan 2025",
    price: "$498.25",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
    rating: "4.95",
    reviews: 672,
  },
  {
    id: 2,
    title: "The Live Vibe",
    location: "New South Wales, Australia",
    time: "12:00 PM - 6:00 AM",
    person: "Single Person",
    venue: "Burj Khalifa - Dubai",
    date: "20 Jan 2025",
    price: "$498.25",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1400&q=80",
    rating: "4.95",
    reviews: 672,
  },
  {
    id: 3,
    title: "The Live Vibe",
    location: "New South Wales, Australia",
    time: "12:00 PM - 6:00 AM",
    person: "Single Person",
    venue: "Burj Khalifa - Dubai",
    date: "20 Jan 2025",
    price: "$498.25",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1400&q=80",
    rating: "4.95",
    reviews: 672,
  },
   {
    id: 4,
    title: "The Live Vibe",
    location: "New South Wales, Australia",
    time: "12:00 PM - 6:00 AM",
    person: "Single Person",
    venue: "Burj Khalifa - Dubai",
    date: "20 Jan 2025",
    price: "$498.25",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1400&q=80",
    rating: "4.95",
    reviews: 672,
  },
];

export default function UpcomingEvents({title,des}:any) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, md: 10 },
        bgcolor: "background.default",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: { xs: 4, md: 6 },
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {des}
          </Typography>
        </Box>

        {/* small nav arrows like screenshot */}
        <Box>
          <IconButton
            aria-label="prev"
            size="small"
            sx={{
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
              mr: 1,
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="next"
            size="small"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Grid of cards */}
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {events.map((ev) => (
          <Grid key={ev.id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                position: "relative",
                overflow: "visible",
              }}
            >
              {/* image area (use CardMedia or a Box with backgroundImage) */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 180, sm: 200, md: 220 },
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={ev.image}
                  alt={ev.title}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/* rating badge */}
                <Chip
                  icon={<Star sx={{ fontSize: 16 }} />}
                  label={`${ev.rating} (${ev.reviews} reviews)`}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: 12,
                    bgcolor: "background.paper",
                    boxShadow: 2,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                />
              </Box>

              {/* content */}
              <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {ev.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary", mt: 0.5 }}>
                  <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {ev.location}
                  </Typography>
                </Box>

                {/* details grid */}
                <Grid container spacing={1} sx={{ mt: 2, color: "text.secondary", fontSize: 13 }}>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTime fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{ev.time}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Person fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{ev.person}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOn fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{ev.venue}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Event fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">{ev.date}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* footer with price and button */}
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: `1px solid ${theme.palette.divider}`,
                    mt: 3,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    From {ev.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      px: 3,
                      py: 0.8,
                      textTransform: "none",
                      boxShadow: 0,
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
