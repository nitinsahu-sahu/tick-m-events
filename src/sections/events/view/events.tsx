import { Grid, Box } from '@mui/material';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { TicketCard } from 'src/components/event-card/event-card';

// Sample event data (replace this with real data or Redux state)
const events = [
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
  {
    id: 3,
    title: 'Tech Expo 2025',
    image: 'tech.png',
    location: 'Douala',
    date: '15/02/2025',
    time: '6:00 PM',
    status: '$50',
    statusColor: '#0B2E4C',
    rating: 5.0,
    viewPromo: false,
  },
];

export function EventsView() {
  return (
    <Box p={2}>
      <HeadingCommon title="Events List" weight={600} baseSize="34px" variant="h5" />

      <Grid container spacing={3} mt={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <TicketCard ticket={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
