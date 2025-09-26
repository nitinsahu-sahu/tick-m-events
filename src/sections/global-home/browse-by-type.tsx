import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const eventTypes = [
  { title: "Beach Party", events: 180, image: "/assets/home-global-img/Card/img.png" },
  { title: "Music Concerts", events: 24, image: "/assets/home-global-img/Card/img-1.png" },
  { title: "Theater", events: 16, image: "/assets/home-global-img/Card/img-2.png" },
  { title: "Sports", events: 150, image: "/assets/home-global-img/Card/img-3.png" },
  { title: "Festivals", events: 25, image: "/assets/home-global-img/Card/img-4.png" },
  { title: "Private Family Events", events: 56, image: "/assets/home-global-img/Card/img-5.png"},
  { title: "DJ Nights", events: 25, image: "/assets/home-global-img/Card/img-6.png" },
  { title: "Art Exhibitions", events: 125, image: "/assets/home-global-img/Card/img-7.png" },
];

export default function BrowseByType() {
  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Browse by Type
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Find the perfect ride for any occasion
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: "#002D5B",
            textTransform: "none",
            px: 3,
            py: 1,
          }}
          endIcon={<ArrowForwardIosIcon />}
        >
          View More
        </Button>
      </Box>

      {/* Event Cards */}
      <Grid container spacing={3}>
        {eventTypes.map((event, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                position: "relative",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={event.image}
                alt={event.title}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography fontWeight={600}>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.events} Events
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  bgcolor: "primary.main",
                  borderRadius: "50%",
                  p: 1,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
