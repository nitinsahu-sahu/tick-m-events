import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';

export const UpComingCard = ({
  title,
  location,
  date,
}: {
  title: string;
  location: string;
  date: string;
}) => (
  <Card sx={{ height: '100%' }}>
    
    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {location} | {date}
      </Typography>
      <Box mt={2}>
        <Grid container spacing={1}>
          {[
            { text: 'View Ticket', color: 'primary'  as 'primary' },
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
