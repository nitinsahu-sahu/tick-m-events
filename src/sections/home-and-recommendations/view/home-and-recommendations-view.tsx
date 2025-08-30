import { Typography, Grid, Box, Paper, Button, IconButton, CircularProgress } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { EmojiEvents, ConfirmationNumber } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { RootState } from 'src/redux/store';

import { UpComingCard } from '../UpComingCard';
import { PopularEvent } from '../PopularEvent';
import { ExploreMoreSection } from '../ExploreMore';
import axios from "../../../redux/helper/axios";

interface EventDetails {
  eventName: string;
  date: string;
}

interface TicketItem {
  ticketType: string;
}

// You can reuse this for each ticket in the list
interface Ticket {
  eventDetails?: EventDetails;
  tickets: TicketItem[];
  qrCode: string;
  verifyEntry: string;
}


export function HomeAndRecommendationsView() {
  const { popularEvents, recommendedEvents } = useSelector((state: RootState) => state?.homeRecom);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { _id } = useSelector((state: RootState) => state?.auth?.user);
  const [upcomingQrTicket, setUpcomingQrTicket] = useState<Ticket | null>(null);
  const navigate = useNavigate();
const handleClick = () => {
    navigate('/our-event');
  };

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get(`/event-order/user/${_id}`);

        const allTickets: Ticket[] = response.data;
        setTickets(allTickets);

        const upcomingTicket = allTickets
          .filter(ticket => {
            const dateStr = ticket.eventDetails?.date;
            const eventDate = dateStr ? new Date(dateStr) : null;
            return eventDate !== null &&
              !Number.isNaN(eventDate.getTime()) &&
              eventDate > new Date() &&
              ticket.qrCode;
          })
          .sort((a, b) => {
            const dateA = new Date(a.eventDetails?.date || '');
            const dateB = new Date(b.eventDetails?.date || '');
            return dateA.getTime() - dateB.getTime();
          })[0];
        setUpcomingQrTicket(upcomingTicket || null);

      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }

    if (_id) {
      fetchTickets();
    }
  }, [_id]);

  return (
    <DashboardContent>
      <PageTitleSection title="Home & Recommendations" />
      {/* UpComingCard component */}

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <HeadingCommon title="My Active Tickets" weight={600} baseSize="34px" variant="h5" />

        {tickets?.length ? (
          <Grid
            container
            spacing={3}
            sx={{
              flexWrap: 'nowrap',
              paddingBottom: '16px',
              width: 'max-content',
              direction: 'rtl',
              '& > *': {
                direction: 'ltr'
              }
            }}
          >
            {tickets?.slice()?.reverse()?.map((ticket, index) => (
              <Grid item key={index} sx={{ minWidth: 400 }}>
                <UpComingCard ticket={ticket} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              padding: 3,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            <Box
              sx={{
                position: 'relative',
                marginBottom: 3
              }}
            >
              <ConfirmationNumber
                sx={{
                  fontSize: 80,
                  color: '#e0e0e0',
                  opacity: 0.7
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <EmojiEvents
                  sx={{
                    fontSize: 40,
                    color: '#ffd700'
                  }}
                />
              </Box>
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#424242',
                marginBottom: 1
              }}
            >
              No Active Tickets
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                marginBottom: 3,
                maxWidth: '400px'
              }}
            >
              You don&apos;t have any active tickets at the moment. Explore events and purchase tickets to get started!
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  borderRadius: 2,
                  padding: '10px 20px'
                }}
                      onClick={handleClick}

              >
                Browse Events
              </Button>

              {/* <Button
                variant="outlined"
                sx={{
                  borderColor: '#2196F3',
                  color: '#2196F3',
                  borderRadius: 2,
                  padding: '10px 20px',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                View History
              </Button> */}
            </Box>
          </Box>
        )}
      </Box>

      {/* EventCard component */}
      <Box mt={3}>
        <HeadingCommon title="Recommended Events for You" weight={600} baseSize="34px" variant="h5" />
        {/* Main Grid Layout */}
        <Grid container spacing={3} mt={3}>
          {
            recommendedEvents?.length > 0 ? (
              recommendedEvents?.slice(0, 2).map((ticketc: any, index: any) => (
                <Grid item xs={12} sm={6} md={6} key={ticketc._id || index}>
                  <PopularEvent event={ticketc} key={index} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50
              }}>
                <CircularProgress color="primary" size={50} />
              </Grid>
            )
          }
        </Grid>
      </Box>

      {/* PopularEvent component */}
      <Box mt={3}>
        <HeadingCommon title="Popular & Trending Events" weight={600} baseSize="34px" variant="h5" />
        {/* Main Grid Layout */}
        <Grid container spacing={3} mt={3}>
          {popularEvents?.length > 0 ? (
            popularEvents?.slice(0, 2).map((ticketc: any, index: any) => (
              <Grid item xs={12} sm={6} md={6} key={ticketc._id || index}>
                <PopularEvent event={ticketc} key={index} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 100
            }}>
              <CircularProgress color="primary" />
            </Grid>
          )}
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
