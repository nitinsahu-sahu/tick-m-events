import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { formatTimeTo12Hour } from 'src/hooks/formate-time';

export const UpComingCard = ({ticket}: any) => (
  <Card sx={{ height: '100%' }}>

    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {ticket.eventDetails.eventName}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {ticket.eventDetails.location} | {ticket.eventDetails.date} | {formatTimeTo12Hour(ticket.eventDetails.time)}
      </Typography>
      <Box mt={2}>
        <Grid container spacing={1}>
          {[
            { text: 'View Ticket', color: 'primary' as 'primary' },
            { text: 'Explore More', custom: true },
            { text: 'Share', custom: true },
          ].map(({ text, color, custom }) => (
            <Grid item xs={4} key={text}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                color={color || undefined}
                sx={{
                  fontSize: { xs: '10px', sm: '12px' },
                  fontWeight: 500,
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

    </CardContent>
  </Card>
);
