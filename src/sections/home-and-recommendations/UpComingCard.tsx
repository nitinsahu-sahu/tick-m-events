import { Card, CardContent, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { formatTimeTo12Hour } from 'src/hooks/formate-time';

export function UpComingCard({ ticket }: any) {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: '100%' }}>

      <CardContent>
        <HeadingCommon variant="h6" color="#0B2E4C" weight={600} baseSize="25px" title={ticket.eventDetails.eventName} />
        <HeadingCommon variant="body2" weight={400} baseSize="16px" title={`${ticket.eventDetails.location} | ${ticket.eventDetails.date} | ${formatTimeTo12Hour(ticket.eventDetails.time)}`} />

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
                  onClick={(e) => {
                    e.stopPropagation();
                    if (text === "Explore More") {
                      window.open("/our-event", "_blank"); // Opens in new tab
                    }
                    if (text === "View Ticket") {
                      navigate("/ticket-validation-at-entry"); // Opens in new tab
                    }
                  }}
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
  )

}
