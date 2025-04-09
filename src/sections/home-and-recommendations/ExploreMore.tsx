// ExploreMore.jsx

import { Box, Grid, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const categories = [
  {
    title: "Music",
    subtitle: "Concerts, Festivals...",
    events: 110,
    image: "/assets/images/home-and-recommendations/concert.jpg",
  },
  {
    title: "Conferences & Business",
    subtitle: "Seminars, Forums...",
    events: 24,
    image: "/assets/images/home-and-recommendations/confrence.jpg",
  },
  {
    title: "Sports & Leisure",
    subtitle: "Matches, Competitions...",
    events: 16,
    image: "/assets/images/home-and-recommendations/sports.jpg",
  },
  {
    title: "Arts & Culture",
    subtitle: "Theater, Cinema...",
    events: 29,
    image: "/assets/images/home-and-recommendations/arts.jpg",
  },
];

export function ExploreMoreSection() {
  return (
    <Box boxShadow={3} borderRadius={4} p={4} mt={4} bgcolor="#fff">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Explore More
      </Typography>

      <Grid container spacing={3}>
        {categories.map((cat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ borderRadius: 3, height: "100%", position: "relative" }}>
              <CardMedia
                component="img"
                height="140"
                image={cat.image}
                alt={cat.title}
                sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <CardContent sx={{ bgcolor: "#f5f5f5", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                <Typography variant="subtitle1" fontWeight="600" sx={{ color:"#0B2E4C" }}>
                  {cat.title}
                </Typography>
                <Typography variant="body2" mb={2} sx={{ color:"#0B2E4C" }}>
                  {cat.subtitle}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ borderRadius: 1, fontSize: "12px", px: 2, py: 0.5, backgroundColor:"#0B2E4C" }}
                  >
                    {cat.events} Events
                  </Button>

                  <Button size="small" sx={{ minWidth: "30px", backgroundColor:"white", borderRadius:"15px", color:"#0B2E4C" }}>
                    <ArrowForwardIcon />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottom CTA */}
      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "999px",
            px: 5,
            py: 1.5,
            fontWeight: 600,
            bgcolor: "#0B2E4C",
            "&:hover": {
              bgcolor: "#05406b",
            },
          }}
        >
          View All Available Events
        </Button>
      </Box>
    </Box>
  );
}
