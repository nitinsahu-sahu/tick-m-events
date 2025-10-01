import React from "react";
import {
  Container, Grid, Typography, Card, CardContent, CardMedia, Button, Box, Slider, Checkbox, FormControlLabel, Rating, Pagination,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";

// Define Event type
interface Event {
  id: number;
  artist: string;
  location: string;
  venue: string;
  audience: string;
  date: string;
  time: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

const EventBooking: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const events: Event[] = [
    {
      id: 1,
      artist: "Armin van Buuren",
      location: "Dubai, UAE",
      venue: "Burj Khalifa - Dubai",
      audience: "Single Person",
      date: "2025-01-20",
      time: "12:00 PM - 6:00 AM",
      price: 928.41,
      rating: 4.95,
      reviews: 672,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      artist: "Bryan Adams",
      location: "Manchester, England",
      venue: "Manchester Arena",
      audience: "Single Person",
      date: "2025-01-20",
      time: "12:00 PM - 6:00 AM",
      price: 202.87,
      rating: 4.95,
      reviews: 672,
      image: "https://images.unsplash.com/photo-1541445976433-f466f228a409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
    {
      id: 3,
      artist: "DJ Snake",
      location: "Las Vegas, USA",
      venue: "XS Nightclub - Vegas",
      audience: "Single Person",
      date: "2025-01-20",
      time: "12:00 PM - 6:00 AM",
      price: 450.5,
      rating: 4.95,
      reviews: 672,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 4,
      artist: "Coldplay",
      location: "London, England",
      venue: "Wembley Stadium",
      audience: "Single Person",
      date: "2025-01-20",
      time: "12:00 PM - 6:00 AM",
      price: 675.25,
      rating: 4.95,
      reviews: 672,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1100, py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "left" }}>
        <Typography variant="h2" component="h1" color="#000">
          Our events list
        </Typography>
        <Typography color="#737373" gutterBottom>
          Turning dreams into reality with versatile events.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Location
              </Typography>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1524661135-42399cbf7f7b?auto=format&fit=crop&w=1170&q=80"
                alt="Map"
                sx={{ width: "100%", height: 150, borderRadius: 1, objectFit: "cover" }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Price
              </Typography>
              <Slider value={[200, 900]} min={0} max={1000} valueLabelDisplay="auto" sx={{ mt: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="body2">$200</Typography>
                <Typography variant="body2">$900</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Event Type
              </Typography>
              {["Concert", "Festival", "Club", "Theater"].map((type) => (
                <FormControlLabel key={type} control={<Checkbox size="small" />} label={type} />
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Location
              </Typography>
              {["Dubai", "Manchester", "Las Vegas", "London"].map((loc) => (
                <FormControlLabel key={loc} control={<Checkbox size="small" />} label={loc} />
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Rating
              </Typography>
              <Rating value={4} precision={0.5} readOnly />
            </Box>
          </Paper>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {events.map((event, index) => {
              const isHighlighted = index === 0;

              return (
                <Grid item xs={12} key={event.id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 3,
                      backgroundColor: isHighlighted ? "#2296D4" : "#fff",
                      color: isHighlighted ? "#fff" : "#000",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={event.image}
                      alt={event.artist}
                      sx={{
                        width: { xs: "100%", md: 300 },
                        height: { xs: 200, md: 325 },
                        objectFit: "cover",
                      }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 3,
                        borderRadius: 2,
                        flex: 1,
                      }}
                    >
                      {/* Rating */}
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          px: 1.5,
                          py: 0.25,
                          borderRadius: "20px",
                          backgroundColor: isHighlighted ? "#1E81C3" : "#F6F9FF",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: isHighlighted ? "#fff" : "#1E1E1E",
                          width: "fit-content",
                          mb: 1.5,
                        }}
                      >
                        <StarIcon sx={{ fontSize: 18, color: isHighlighted ? "#fff" : "#007AFF", mr: 0.5 }} />
                        <Typography
                          component="span"
                          sx={{ fontWeight: 600, color: isHighlighted ? "#fff" : "#1E1E1E", mr: 0.5 }}
                        >
                          {event.rating.toFixed(2)}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{ color: isHighlighted ? "#E0E0E0" : "#777", fontWeight: 400 }}
                        >
                          ({event.reviews} reviews)
                        </Typography>
                      </Box>

                      {/* Artist */}
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                        {event.artist}
                      </Typography>

                      {/* City */}
                      <Typography variant="body2" sx={{ mb: 2, color: isHighlighted ? "#fff" : "text.secondary" }}>
                        📍 {event.location}
                      </Typography>

                      {/* Details */}
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AccessTimeIcon sx={{ fontSize: 18, color: isHighlighted ? "#fff" : "#1E1E1E" }} />
                            <Typography variant="body2" sx={{ color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                              {event.time}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <PersonIcon sx={{ fontSize: 18, color: isHighlighted ? "#fff" : "#1E1E1E" }} />
                            <Typography variant="body2" sx={{ color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                              {event.audience}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LocationOnIcon sx={{ fontSize: 18, color: isHighlighted ? "#fff" : "#1E1E1E" }} />
                            <Typography variant="body2" sx={{ color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                              {event.venue}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <EventIcon sx={{ fontSize: 18, color: isHighlighted ? "#fff" : "#1E1E1E" }} />
                            <Typography variant="body2" sx={{ color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                              {event.date}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Divider sx={{ borderColor: isHighlighted ? "#ffffff44" : "#DDE1DE", my: 2 }} />

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: isHighlighted ? "#fff" : "#000" }}>
                          From ${event.price.toFixed(2)}{" "}
                          <Typography component="span" fontSize="0.875rem" sx={{ color: isHighlighted ? "#E0E0E0" : "text.secondary" }}>
                            / night
                          </Typography>
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: isHighlighted ? "#fff" : "#002E66",
                            color: isHighlighted ? "#2296D4" : "#fff",
                            textTransform: "none",
                            fontWeight: 500,
                            px: 3,
                            py: 1,
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: isHighlighted ? "#e0e0e0" : "#001f47",
                            },
                          }}
                        >
                          Book Now
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination count={5} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventBooking;
