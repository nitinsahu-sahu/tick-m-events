import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Container, Grid, Typography, Card, CardContent, CardMedia, Button, Box, Slider, Checkbox, FormControlLabel, Rating, Pagination,
  useTheme,useMediaQuery,Paper,Divider,IconButton,Collapse, Tabs, Tab, FormControl,InputLabel,Select,
  MenuItem, Stack, TextField
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FaxOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from 'src/redux/store';
import { eventFetch } from 'src/redux/actions/event.action';
import { useNavigate } from "react-router-dom";

type EventTicketDetail = {
  ticketType?: string;
  id?: string;
  price?: string | number;
  totalTickets?: string;
  description?: string;
  isLimitedSeat?: boolean;
  isLinkPramotion?: boolean;
};

type EventTicketGroup = {
  _id?: string;
  eventId?: string;
  payStatus?: "free" | "paid";
  tickets?: EventTicketDetail[];
};

type Event = {
  _id: string;
  eventName?: string;
  coverImage?: { url?: string };
  portraitImage?: { url?: string };
  averageRating?: number;
  reviewCount?: number;
  location?: string;
  date?: string;
  time?: string;
  eventType?: string;
  tickets?: EventTicketGroup[];
};

const EventBooking: React.FC = () => {
  const theme = useTheme();
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showMap, setShowMap] = useState(true);
  const [eventTypeOpen, setEventTypeOpen] = useState(true);
  const [eventLocationOpen, setEventLocationOpen] = useState(true);
  const [reviewOpen, setReviewOpen] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventPricing, setEventPricing] = useState("");
  const navigate = useNavigate();

  const { fullData } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [showEvents, setShowEvents] = useState(false);

  const approvedEvents = useMemo(
    () => fullData?.filter((event: any) => event.status === "approved") || [],
    [fullData]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [approvedEvents]);

  useEffect(() => {
    dispatch(eventFetch());
  }, [dispatch]);

  useEffect(() => {
    if (approvedEvents.length === 0) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      setShowEvents(true);
    }, 1000);

    // Cleanup function for timer
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [approvedEvents]);


  // State for filtered events
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [price, setPrice] = useState<number>(5000); // max by default
  const [showPrice, setShowPrice] = useState<boolean>(false);

  useEffect(() => {
    setFilteredEvents(approvedEvents); 
    setCurrentPage(1);
  }, [approvedEvents])
  const applyPriceFilter = () => {
    console.log("Selected Price:", price);

    const filtered = approvedEvents.filter((event: Event) => {
      const mainTicketGroup = event.tickets?.[0];
      if (!mainTicketGroup) return true; // keep event if no tickets

      if (mainTicketGroup.payStatus === "free") return price >= 0;

      if (mainTicketGroup.payStatus === "paid" && Array.isArray(mainTicketGroup.tickets)) {
        const prices = mainTicketGroup.tickets
          .map((t: any) => parseFloat(String(t.price).replace(/[^\d.]/g, "")))
          .filter((p: number) => !Number.isNaN(p));

        if (prices.length === 0) return true;

        const minPrice = Math.min(...prices);
        return minPrice <= price;
      }

      return true;
    });

    setFilteredEvents(filtered);
    setCurrentPage(1); // reset pagination
  };

  const clearPriceFilter = () => {
    setPrice(500); // Reset slider
    setFilteredEvents(approvedEvents);
    setCurrentPage(1);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 7;

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);

    eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
          {/* Show on Map */}
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                Show on map
              </Typography>
              <IconButton size="small" onClick={() => setShowMap(!showMap)}>
                {showMap ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={showMap}>
              <Box
                component="img"
                src="https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/google-maps-street-view-dead-body-1129572.jpg?r=1686998680160"
                alt="Map"
                sx={{ width: "100%", height: 150, borderRadius: 1, objectFit: "cover" }}
              />
            </Collapse>
          </Paper>

          {/* Filter Price */}
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                Filter Price
              </Typography>
              <IconButton size="small" onClick={() => setShowPrice(!showPrice)}>
                {showPrice ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={showPrice}>
              <Slider
                value={price}
                min={0}
                max={5000}
                step={10}
                onChange={(e, val) => setPrice(val as number)}
                valueLabelDisplay="auto"
                sx={{ mt: 2 }}
              />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">${0}</Typography>
                <Typography variant="body2">${price}</Typography> {/* dynamic */}
              </Box>

              <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="outlined" size="small" onClick={clearPriceFilter}>
                  Clear
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ bgcolor: "#0A2647", color: "#fff" }}
                  onClick={applyPriceFilter}
                >
                  Apply
                </Button>
              </Box>
            </Collapse>
          </Paper>

          {/* Event Type */}
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Event Type
              </Typography>
              <IconButton size="small" onClick={() => setEventTypeOpen(!eventTypeOpen)}>
                {eventTypeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={eventTypeOpen}>
              {[
                "Cultural and Artistic Events",
                "Professional Events",
                "Social and Festive Events",
                "Sports Events",
                "Academic Educational Event",
                "Charitable Events",
                "Corporate Events",
              ].map((type) => (
                <FormControlLabel key={type} control={<Checkbox size="small" />} label={type} />
              ))}
            </Collapse>
          </Paper>

          {/* Events Location */}
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Events Location
              </Typography>
              <IconButton size="small" onClick={() => setEventLocationOpen(!eventLocationOpen)}>
                {eventLocationOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={eventLocationOpen}>
              {[
                "Iconic Buildings",
                "Hotels with Event Spaces",
                "Entertainment Arenas",
                "Cultural and Historical Venues",
                "Beach and Island",
                "Unique Venues",
                "Castles and Palaces",
              ].map((loc) => (
                <FormControlLabel key={loc} control={<Checkbox size="small" />} label={loc} />
              ))}
            </Collapse>
          </Paper>

          {/* Review Score */}
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Review Score
              </Typography>
              <IconButton size="small" onClick={() => setReviewOpen(!reviewOpen)}>
                {reviewOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={reviewOpen}>
              {[5, 4, 3, 2, 1].map((val) => (
                <FormControlLabel
                  key={val}
                  control={<Checkbox size="small" />}
                  label={<Rating value={val} readOnly size="small" />}
                />
              ))}
            </Collapse>
          </Paper>

          <Paper elevation={1} sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 2
          }}
          >
            {/* Header */}
            <Box sx={{ bgcolor: "#2296D4", p: 2 }}>
              <Typography variant="subtitle1" color="#fff" fontWeight="bold">
                Book This Event
              </Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", pt: 1, mt: 2 }}>
              <Tabs
                value={tabValue}
                onChange={(e, val) => setTabValue(val)}
                variant="fullWidth"
                TabIndicatorProps={{ style: { display: "none" } }} // hide default indicator
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    color: "#555",
                    borderRadius: "20px",
                    minHeight: "32px",
                    margin: "0 4px",
                    padding: "6px 12px",
                    transition: "all 0.3s ease",
                    backgroundColor: "#f5f5f5",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#2296D4",
                    color: "#fff !important",
                  },
                }}
              >
                <Tab label="All Events" />
                <Tab label="Online Events" />
                <Tab label="Live Events" />
              </Tabs>
            </Box>


            {/* Form Fields */}
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Event Type */}
              <FormControl fullWidth size="small">
                <InputLabel shrink sx={{ fontWeight: "bold", color: "#555" }}>
                  Event Type
                </InputLabel>
                <Select
                  displayEmpty
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  renderValue={(selected) =>
                    selected || (
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnOutlinedIcon fontSize="small" sx={{ color: "#777" }} />
                        <Typography variant="body2" color="#777">
                          Select Event Type
                        </Typography>
                      </Box>
                    )
                  }
                >
                  <MenuItem value="Concert">Concert</MenuItem>
                  <MenuItem value="Festival">Festival</MenuItem>
                  <MenuItem value="Conference">Conference</MenuItem>
                </Select>
              </FormControl>

              {/* Event Location */}
              <FormControl fullWidth size="small">
                <InputLabel shrink sx={{ fontWeight: "bold", color: "#555" }}>
                  Event Location
                </InputLabel>
                <Select
                  displayEmpty
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  renderValue={(selected) =>
                    selected || (
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnOutlinedIcon fontSize="small" sx={{ color: "#777" }} />
                        <Typography variant="body2" color="#777">
                          Select Event Location
                        </Typography>
                      </Box>
                    )
                  }
                >
                  <MenuItem value="London">London</MenuItem>
                  <MenuItem value="Dubai">Dubai</MenuItem>
                  <MenuItem value="Paris">Paris</MenuItem>
                </Select>
              </FormControl>

              {/* Event Date */}
              <FormControl fullWidth size="small">
                <InputLabel shrink sx={{ fontWeight: "bold", color: "#555" }}>
                  Event Date
                </InputLabel>
                <Select
                  displayEmpty
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  renderValue={(selected) =>
                    selected || (
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: "#777" }} />
                        <Typography variant="body2" color="#777">
                          Select Event Date
                        </Typography>
                      </Box>
                    )
                  }
                >
                  <MenuItem value="Today">Today</MenuItem>
                  <MenuItem value="Tomorrow">Tomorrow</MenuItem>
                  <MenuItem value="This Week">This Week</MenuItem>
                </Select>
              </FormControl>

              {/* Event Pricing */}
              <FormControl fullWidth size="small">
                <InputLabel shrink sx={{ fontWeight: "bold", color: "#555" }}>
                  Event Pricing
                </InputLabel>
                <Select
                  displayEmpty
                  value={eventPricing}
                  onChange={(e) => setEventPricing(e.target.value)}
                  renderValue={(selected) =>
                    selected || (
                      <Box display="flex" alignItems="center" gap={1}>
                        <MonetizationOnOutlinedIcon fontSize="small" sx={{ color: "#777" }} />
                        <Typography variant="body2" color="#777">
                          Select Pricing
                        </Typography>
                      </Box>
                    )
                  }
                >
                  <MenuItem value="Free">Free</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                </Select>
              </FormControl>

              {/* Find Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 1,
                  bgcolor: "#0A2647",
                  textTransform: "none",
                  fontWeight: "bold",
                  py: 1,
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#073366" },
                }}
                startIcon={<i className="fa fa-search" />}
              >
                Find a Event
              </Button>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #eee",
              width: "100%",
              maxWidth: 340,
              mb: 2
            }}
          >
            {/* Heading */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Get in touch
            </Typography>

            {/* Form Fields */}
            <Stack spacing={2}>
              <TextField
                fullWidth
                placeholder="Your name"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 1, fontSize: "0.9rem" },
                  startAdornment: (
                    <Box component="span" sx={{ mr: 1, color: "#888" }}>
                      <i className="ri-user-line" />
                    </Box>
                  ),
                }}
              />
              <TextField
                fullWidth
                placeholder="Your email"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 1, fontSize: "0.9rem" },
                  startAdornment: (
                    <Box component="span" sx={{ mr: 1, color: "#888" }}>
                      <i className="ri-mail-line" />
                    </Box>
                  ),
                }}
              />
              <TextField
                fullWidth
                placeholder="Message"
                variant="outlined"
                multiline
                rows={4}
                InputProps={{
                  sx: { borderRadius: 1, fontSize: "0.9rem" },
                }}
              />

              {/* Submit Button */}
              <Button
                variant="contained"
                fullWidth
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#0A2647",
                  borderRadius: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#073362" },
                }}
              >
                Send message
              </Button>
            </Stack>

            {/* Contact Info */}
            <Box mt={3}>
              <Stack spacing={1.5}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIphoneOutlinedIcon fontSize="small" />
                  <Typography variant="body2">
                    <strong>Mobile:</strong> 1-222-333-4444
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailOutlinedIcon fontSize="small" />
                  <Typography variant="body2">
                    <strong>Email:</strong> sale@eucarrental.com
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <WhatsAppIcon fontSize="small" />
                  <Typography variant="body2">
                    <strong>WhatsApp:</strong> 1-222-333-4444
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <FaxOutlinedIcon fontSize="small" />
                  <Typography variant="body2">
                    <strong>Fax:</strong> 1-222-333-4444
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} ref={eventsRef}>
            {loading ? (
              <Typography>Loading events...</Typography>
            ) : showEvents && approvedEvents.length > 0 ? (
              currentEvents.map((event: Event, index: number) => {
                const isHighlighted = index === 0;
                const image = event.coverImage?.url || event.portraitImage?.url;
                const artist = event.eventName || "Untitled Event";
                const rating = event.averageRating || 0;
                const reviews = event.reviewCount || 0;

                const venue = event.location || "Venue not available";
                const date = event.date || "Date not available";
                const time = event.time || "Time not available";
                const audience = event.eventType || "General";
                let priceLabel = "Free";

                const mainTicketGroup = event.tickets?.[0];
                if (mainTicketGroup) {
                  if (mainTicketGroup.payStatus === "free") {
                    priceLabel = "Free";
                  } else if (mainTicketGroup.payStatus === "paid" && Array.isArray(mainTicketGroup.tickets)) {
                    // Extract numeric prices safely
                    const prices = mainTicketGroup.tickets
                      .map((t: any) => {
                        const numericPrice = parseFloat(String(t.price).replace(/[^\d.]/g, ""));
                        return Number.isNaN(numericPrice) ? null : numericPrice;
                      })
                      .filter((p: number | null): p is number => p !== null);

                    if (prices.length > 0) {
                      const minPrice = Math.min(...prices);
                      priceLabel = `${minPrice} XAF`; // or `${minPrice} ${currency}`
                    }
                  }
                }

                return (
                  <Grid item xs={12} key={event._id}>
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
                        image={image}
                        alt={artist}
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
                          <Typography component="span" sx={{ fontWeight: 600, color: isHighlighted ? "#fff" : "#1E1E1E", mr: 0.5 }}>
                            {rating.toFixed(2)}
                          </Typography>
                          <Typography component="span" sx={{ color: isHighlighted ? "#E0E0E0" : "#777", fontWeight: 400 }}>
                            ({reviews} reviews)
                          </Typography>
                        </Box>

                        {/* Event Name */}
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                          {artist}
                        </Typography>

                        {/* Location */}
                        <Typography variant="body2" sx={{ mb: 2, color: isHighlighted ? "#fff" : "text.secondary" }}>
                          📍 {venue}
                        </Typography>

                        {/* Details */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <AccessTimeIcon sx={{ fontSize: 18, color: isHighlighted ? "#fff" : "#1E1E1E" }} />
                              <Typography variant="body2" sx={{ color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                                {time}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <PersonIcon sx={{ fontSize: 18, color: isHighlighted ? "#fff" : "#1E1E1E" }} />
                              <Typography variant="body2" sx={{ color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                                {audience}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <EventIcon sx={{ fontSize: 18, color: isHighlighted ? "#fff" : "#1E1E1E" }} />
                              <Typography variant="body2" sx={{ color: isHighlighted ? "#fff" : "#1E1E1E" }}>
                                {date}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Divider sx={{ borderColor: isHighlighted ? "#ffffff44" : "#DDE1DE", my: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                          <Typography variant="h6" fontWeight="bold" sx={{ color: isHighlighted ? "#fff" : "#000" }}>
                            From: {" "}{priceLabel}

                            {/* <Typography component="span" fontWeight="bold" sx={{ color: isHighlighted ? "#E0E0E0" : "text.secondary",fontSize:'1.3rem' }}>
                              {priceLabel}
                            </Typography> */}
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
                            onClick={() => navigate(`/our-event/${event._id}`)}
                          >
                            Book Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Typography>No events available.</Typography>
            )}

          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventBooking;
