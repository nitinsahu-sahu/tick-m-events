import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  IconButton,
  CardContent,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  useTheme,
  useMediaQuery,
  Card,Stack,TableCell
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TicketCard } from 'src/sections/home-and-recommendations/EventCard';

import { PopularEvent } from '../PopularEvent';

export function EventSearchAndDetailsView() {
  const ticketst = [
    {
      id: 1,
      title: 'Festival Urban Music',
      image: 'festival.png',
      location: 'Douala',
      date: '10/02/2025',
      time: '5:00 PM',
      status: '5,000 XAF',
      statusColor: '#0B2E4C',
      rating: 4.8,
      viewPromo: false,
    },
    {
      id: 2,
      title: 'Startup Summit 2025',
      image: 'startup.png',
      location: 'Yaoundé',
      date: '10/02/2025',
      time: '5:00 PM',
      status: 'Free',
      statusColor: '#0B2E4C',
      rating: 4.8,
      viewPromo: false,
    },
  ];

  const eventsTickets = [
    {
      id: 1,
      title: 'Tech Expo 2025',
      image: 'tech.png',
      location: 'Douala',
      date: '10/02/2025',
      time: '5:00 PM',
      status: '$50',
      statusColor: '#0B2E4C',
      rating: 5.0,
      viewPromo: false,
    },
    {
      id: 2,
      title: 'Startup Summit 2025',
      image: 'startup1.png',
      location: 'Yaoundé',
      date: '10/02/2025',
      time: '5:00 PM',
      status: 'Free',
      statusColor: '#0B2E4C',
      rating: 4.8,
      viewPromo: false,
    },
  ];

  const ticketData = [
    {
      type: 'Standard',
      price: '10,000 XAF',
      benefits: 'General Access',
      availability: 'Available',
    },
    {
      type: 'Standard',
      price: '10,000 XAF',
      benefits: 'General Access',
      availability: 'Available',
    },
    {
      type: 'Standard',
      price: '10,000 XAF',
      benefits: 'General Access',
      availability: 'Available',
    },
  ];

  const reviews = [
    {
      name: 'David L.',
      rating: 3,
      date: '15/02/2024',
      comment: 'Good music, but expensive drinks.',
    },
    {
      name: 'Sarah K.',
      rating: 4,
      date: '15/02/2024',
      comment: 'Great event, but too crowded.',
    },
    {
      name: 'Sarah K.',
      rating: 4,
      date: '15/02/2024',
      comment: 'Great event, but too crowded.',
    },
  ];

  const [tab, setTab] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const friends = ['Alice W.', 'John D.', 'Emma R.', 'Michael S.'];
 
  return (
    <DashboardContent>
      <PageTitleSection title="Discover Events" />
      {/* Main Grid Layout */}
      <Grid container spacing={3} mt={2}>
          {ticketst.map((ticketc, index) => (
            <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
              <TicketCard ticket={ticketc} key={index} />
            </Grid>
          ))}
        </Grid>

      <Box boxShadow={3} borderRadius={2.5} mt={3}>
        {/* Top Bar with Search */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#002244"
          p={1}
          sx={{ px: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <Box display="flex" alignItems="center" bgcolor="#fff" borderRadius={1} px={2} flex={1}>
            <SearchIcon color="action" />
            <TextField
              variant="standard"
              placeholder="Search Event"
              InputProps={{ disableUnderline: true }}
              fullWidth
              sx={{ ml: 1 }}
            />
          </Box>
          <IconButton sx={{ ml: 1, color: '#fff' }}>
            <FilterListIcon />
          </IconButton>
        </Box>

        {/* Filter Fields */}
        <Box sx={{ mx: 3, my: 3 }}>
          <h2>Find Your Event</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel
                  id="category-label"
                  sx={{
                    color: 'black',
                    '&.Mui-focused': { color: 'black' },
                    fontWeight: 500,
                    // margin between label and select
                  }}
                >
                  Category
                </InputLabel>
                <Select
                  labelId="category-label"
                  defaultValue="concerts"
                  displayEmpty
                  sx={{
                    mt: 3,
                    borderRadius: 1, // rounded corners
                    bgcolor: '#fff',
                    color: 'black',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ccc', // light gray border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#aaa',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#000',
                    },
                    '.MuiSvgIcon-root': {
                      color: 'black', // dropdown arrow
                    },
                    fontSize: 16,
                  }}
                >
                  <MenuItem value="concerts">Concerts</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="comedy">Comedy</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Date */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel
                  id="Date"
                  sx={{
                    color: 'black',
                    '&.Mui-focused': { color: 'black' },
                    fontWeight: 500,
                    // margin between label and select
                  }}
                >
                  Date
                </InputLabel>
                <Select
                  labelId="Date"
                  defaultValue="today"
                  sx={{
                    mt: 3,
                    borderRadius: 1, // rounded corners
                    bgcolor: '#fff',
                    color: 'black',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ccc', // light gray border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#aaa',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#000',
                    },
                    '.MuiSvgIcon-root': {
                      color: 'black', // dropdown arrow
                    },
                    fontSize: 16,
                  }}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="this_week">This Week</MenuItem>
                  <MenuItem value="this_month">This Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel
                  shrink
                  sx={{
                    color: 'black',
                    '&.Mui-focused': { color: 'black' },
                    fontWeight: 500,
                  }}
                >
                  Location
                </InputLabel>
                <TextField
                  placeholder="Enter City or use geolocation"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 3,
                    bgcolor: '#fff',
                    borderRadius: 1,
                    fontSize: 16,
                    '& .MuiOutlinedInput-root': {
                      color: 'black',
                      borderRadius: 1,

                      '& fieldset': {
                        borderColor: 'black',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
              </FormControl>
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel
                  id="Price"
                  sx={{
                    color: 'black',
                    '&.Mui-focused': { color: 'black' },
                    fontWeight: 500,
                  }}
                >
                  Price
                </InputLabel>
                <Select
                  labelId="Price"
                  defaultValue="free"
                  sx={{
                    mt: 3,
                    borderRadius: 1, // rounded corners
                    bgcolor: '#fff',
                    color: 'black',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ccc', // light gray border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#aaa',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#000',
                    },
                    '.MuiSvgIcon-root': {
                      color: 'black', // dropdown arrow
                    },
                    fontSize: 16,
                  }}
                >
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Popularity */}
            <Grid item xs={12} sm={6} md={9}>
              <FormControl fullWidth>
                <InputLabel
                  id="Popularity"
                  sx={{
                    color: 'black',
                    '&.Mui-focused': { color: 'black' },
                    fontWeight: 500,
                  }}
                >
                  Popularity
                </InputLabel>
                <Select
                  labelId="Popularity"
                  defaultValue="Popularity"
                  sx={{
                    mt: 3,
                    borderRadius: 1, // rounded corners
                    bgcolor: '#fff',
                    color: 'black',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ccc', // light gray border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#aaa',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#000',
                    },
                    '.MuiSvgIcon-root': {
                      color: 'black', // dropdown arrow
                    },
                    fontSize: 16,
                  }}
                >
                  <MenuItem value="tickets_sold">Tickets Sold</MenuItem>
                  <MenuItem value="ratings">Ratings</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Checkbox */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: 'black',
                      '&.Mui-checked': {
                        color: 'black',
                      },
                    }}
                  />
                }
                label="Only show available tickets"
                sx={{
                  color: 'black',
                  fontWeight: 500,
                  mt: 1, // slight top margin for spacing consistency
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={1} p={{ xs: 1, md: 1 }}>
          {/* Main Grid Layout */}
          <Grid container spacing={3} mt={3}>
            {eventsTickets.map((ticketc, index) => (
              <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
                <PopularEvent ticket={ticketc} key={index} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* urban festival 2025 */}
      <Box>
        <Card sx={{ borderRadius: 4, boxShadow: 3, p: 1, mt: 3 }}>
          <CardContent>
            {/* Title */}
            <Typography variant="h5" fontWeight={600} mb={2}>
              Urban Music Festival 2025
            </Typography>

            {/* Banner */}
            <Box
              component="img"
              src="/assets/images/event/urbanfestival.png"
              alt="Urban Music Festival Banner"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 300,
                borderRadius: 2,
                objectFit: 'cover',
                mb: 2,
              }}
            />

            {/* Date & Location */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
              mb={2}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonthIcon fontSize="small" />
                <Typography fontSize="14px">February 10, 2025, 8 PM – 2 AM</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon fontSize="small" />
                <Typography fontSize="14px">Main Square, Douala</Typography>
              </Stack>
            </Stack>

            {/* Description */}
            <Typography fontSize="14px" mb={3}>
              Join us for the biggest Urban Music Festival featuring top artists, DJs, and an
              unforgettable nightlife experience.
            </Typography>

            {/* Organizer Section */}
            <Box
              sx={{
                backgroundColor: '#f3f3f3',
                p: 2,
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Typography fontWeight={600} mb={1}>
                Organizer: Music Events Africa
              </Typography>

              <Button variant="contained" size="small" sx={{ mb: 2, backgroundColor: '#0B2E4C' }}>
                View More Events
              </Button>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon sx={{ color: '#0B2E4C' }} fontSize="small" />
                  <Typography fontSize="14px">contact@musicevents.com</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon sx={{ color: '#0B2E4C' }} fontSize="small" />
                  <Typography fontSize="14px">+237 123 456 789</Typography>
                </Stack>
              </Stack>
            </Box>

            {/* Schedule */}
            <Typography variant="h6" fontWeight={600} mb={2}>
              Event Schedule
            </Typography>

            <Stack spacing={1.5}>
              {[
                { time: '8:00 PM', title: 'Doors Open' },
                { time: '9:00 PM', title: 'Main Artist Performance' },
                { time: '11:00 PM', title: 'DJ Set & After Party' },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#f5f5f5',
                    p: 1.5,
                    borderRadius: 1.5,
                  }}
                >
                  <Typography fontWeight={600}>{item.time}</Typography>
                  <Typography fontSize="14px">{item.title}</Typography>
                </Box>
              ))}
            </Stack>

            <Box sx={{ mx: 'auto', mt: 4 }}>
              {/* Section Title */}
              <Typography variant="h6" fontWeight={600} mb={2}>
                Available Tickets
              </Typography>

              {/* Responsive Table */}
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  overflowX: 'auto',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#1F8FCD' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Ticket</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Benefits</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Availability</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody sx={{ backgroundColor: '#1F8FCD' }}>
                    {ticketData.map((ticket, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
                          borderBottom: '1px solid #ddd',
                          '&:last-child td': {
                            borderBottom: 'none',
                          },
                          '&:hover': {
                            backgroundColor: '#f5faff',
                          },
                        }}
                      >
                        <TableCell>{ticket.type}</TableCell>
                        <TableCell sx={{ color: '#1976D2', fontWeight: 500 }}>
                          {ticket.price}
                        </TableCell>
                        <TableCell>{ticket.benefits}</TableCell>
                        <TableCell>{ticket.availability}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Book Now Button */}
              <Box mt={3}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#0B2E4C',
                    borderRadius: 2.5,
                    px: 1,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: '#1565C0',
                    },
                  }}
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* urban festival 2025 */}
      <Box
        mt={3}
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundColor: '#f0f0f0',
          borderRadius: 3,
          maxWidth: '100%',
        }}
      >
        <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ fontWeight: 'bold', mb: 1 }}>
          Participant Reviews & Experiences
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Overall Rating:{' '}
          <Box component="span" sx={{ color: '#f4b400', fontWeight: 600 }}>
            4.8/5
          </Box>{' '}
          (Based on 250 reviews)
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexDirection: isMobile ? 'column' : 'row',
            mb: 3,
          }}
        >
          {['Recent', 'Best', 'Latest'].map((label, index) => (
            <Button
              key={label}
              onClick={() => setTab(index)}
              sx={{
                flex: isMobile ? '1 1 auto' : 'unset',
                backgroundColor: tab === index ? '#0B2E4C' : '#ccc',
                color: tab === index ? '#fff' : '#000',
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '0.9rem',
                px: 2,
                py: 1,
                minWidth: 100,
                '&:hover': {
                  color:"black"
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {reviews.map((review, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: '#fff',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, fontSize: isMobile ? '0.95rem' : '1rem' }}
              >
                {review.name}
              </Typography>

              <Box display="flex" alignItems="center" sx={{ color: '#f4b400', fontSize: '14px' }}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <StarIcon key={i} fontSize="small" />
                ))}
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  ({review.rating}/5)
                </Typography>
              </Box>

              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: 'block', mt: 0.5 }}
              >
                {review.date}
              </Typography>

              <Typography variant="body2" mt={1} sx={{ fontSize: isMobile ? '0.85rem' : '1rem' }}>
                "{review.comment}"
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box mt={3} textAlign="center">
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#0B2E4C',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              mt: 2,
              '&:hover': {
                backgroundColor: '#08304c',
              },
            }}
          >
            Leave a review
          </Button>
        </Box>
      </Box>

      {/* share this event */}
      <Box
      sx={{
        p: isMobile ? 2 : 4,
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        mb: 4,
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Share This Event
      </Typography>

      {/* Social Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#25D366',
            color: '#fff',
            '&:hover': { backgroundColor: '#1da851' },
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          📲 Whatsapp
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1877F2',
            color: '#fff',
            '&:hover': { backgroundColor: '#165fcc' },
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          👍 Facebook
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': { backgroundColor: '#333' },
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          🎵 TikTok
        </Button>
      </Box>

      {/* Friends List */}
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          p: isMobile ? 2 : 3,
          borderRadius: 2,
        }}
      >
        <Typography fontWeight="bold" mb={2}>
          Friends Who Booked
        </Typography>

        {friends.map((name, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              px: 2,
              py: 1,
              mb: 1,
              fontWeight: 500,
              fontSize: isMobile ? '0.9rem' : '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            {name}
          </Box>
        ))}
      </Box>
    </Box>
    </DashboardContent>
  );
}
