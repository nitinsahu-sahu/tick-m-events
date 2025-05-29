import { Typography, Grid, Box, Paper, Card, CardContent, Button, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TicketCard } from 'src/components/event-card/event-card';

import { UpComingCard } from '../UpComingCard';
import { PopularEvent } from '../PopularEvent';
import { ExploreMoreSection } from '../ExploreMore';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { recommTrandingPopularEventFetch } from 'src/redux/actions/home-recommendation.action';

export function HomeAndRecommendationsView() {
  const { upcomingEvents, popularEvents, recommendedEvents } = useSelector((state: RootState) => state?.homeRecom);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(recommTrandingPopularEventFetch())
  }, [dispatch]);

  const events = [
    { title: 'Tech Conference 2025', location: 'New York, USA', date: 'April 15, 2025' },
    { title: 'Music Festival', location: 'New York, USA', date: 'April 15, 2025' },
    { title: 'Startup Expo', location: 'New York, USA', date: 'April 15, 2025' },
  ];

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
      viewPromo: true,
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
      viewPromo: true,
    },
  ];

  return (
    <DashboardContent>
      <PageTitleSection title="Home & Recommendations" />
      {/* UpComingCard component */}
      <Box >
        <HeadingCommon title="My Active Tickets" weight={600} baseSize="34px" variant="h5" />
        <Grid container spacing={3}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <UpComingCard {...event} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* EventCard component */}
      <Box mt={3}>
        <HeadingCommon title="Recommended Events for You" weight={600} baseSize="34px" variant="h5" />
        {/* Main Grid Layout */}
        <Grid container spacing={3} mt={3}>
          {ticketst.map((ticketc, index) => (
            <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
              <TicketCard ticket={ticketc} key={index} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* PopularEvent component */}
      <Box mt={3}>

        <HeadingCommon title="Popular & Trending Events" weight={600} baseSize="34px" variant="h5" />
        {/* Main Grid Layout */}
        <Grid container spacing={3} mt={3}>
          {eventsTickets.map((ticketc, index) => (
            <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
              <PopularEvent ticket={ticketc} key={index} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box boxShadow={3} borderRadius={3} mt={3}>
        <Paper
          sx={{
            width: '100%',
            p: { xs: 2, sm: 3 },
            maxWidth: { xs: '100%', sm: '800px', md: '100%' },
            borderRadius: 2,
          }}
        >
          {/* Section Title */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <HeadingCommon title="Notifications & Personalized Alerts" weight={600} baseSize="34px" variant="h5" />
            <IconButton
              sx={{
                backgroundColor: '#2196f3',
                color: '#fff',
                width: 36,
                height: 36,
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              <NotificationsIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Scrollable List */}
          <Box
            sx={{
              maxHeight: { xs: '250px', sm: '300px' },
              overflowY: 'auto',
              pr: 1,
              scrollbarWidth: 'thin', // Firefox
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c1c1c1',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
            }}
          >
            {[
              { text: 'Your concert starts in 2h!' },
              { text: '-20% on VIP tickets today!' },
              { text: 'New date for Startup Summit 2025' },
              { text: 'A festival is happening 2km from you!', disabled: false },
              { text: 'Reminder: DJ Party this weekend!' },
              { text: 'Exclusive Pass offer expires soon!' },
              { text: 'Your venue has changed!' },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  borderRadius: 1,
                  backgroundColor: item.disabled ? '#f9f9f9' : '#F3F3F3',
                  color: item.disabled ? 'text.disabled' : 'text.primary',
                  p: 2,
                  mb: 2,
                  opacity: item.disabled ? 0.5 : 1,
                }}
              >
                {/* Message */}
                <Typography sx={{ fontWeight: 500, mb: { xs: 1, sm: 0 } }}>{item.text}</Typography>


                <Box
                  mt={{ xs: 1, sm: 0 }}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    display: 'flex',
                    justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                    flexGrow: 1,
                  }}
                >
                  <Grid container spacing={1} sx={{ maxWidth: { sm: 360, md: 400 } }}>
                    {[
                      { text: 'View Event', color: 'primary' as const },
                      { text: 'Mark as Read', custom: true },
                    ].map(({ text, color, custom }) => (
                      <Grid item xs={12} sm={4} key={text}>
                        <Button
                          fullWidth
                          size="small"
                          variant="contained"
                          color={color || undefined}
                          disabled={item.disabled}
                          sx={{
                            fontSize: { xs: '10px', sm: '12px' },
                            fontWeight: 500,
                            textTransform: 'none',
                            backgroundColor: custom ? '#0b2e4c' : undefined,
                            '&:hover': {
                              backgroundColor: custom ? '#093047' : undefined,
                            },
                          }}
                        >
                          {text}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

              </Box>
            ))}
          </Box>
        </Paper>
      </Box>


      <ExploreMoreSection />

    </DashboardContent>
  );
}
