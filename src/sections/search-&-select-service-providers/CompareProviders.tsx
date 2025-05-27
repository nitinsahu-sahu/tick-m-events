import { Box, Typography, Grid, Button, Paper } from '@mui/material';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

const providers = [
  {
    name: 'DJ Max',
    rating: 4.8,
    price: '200,000 XAF',
    location: 'Douala, Yaoundé',
    events: '50+ Events',
  },
  {
    name: 'EventPro',
    rating: 4.5,
    price: '500,000 XAF',
    location: 'Yaoundé',
    events: '100+ Events',
  },
];

export function CompareProviders () {
  return (
    <Box
      sx={{
        p: 3,
        my:3,
        borderRadius: 3,
        backgroundColor: '#fff',
        border: '1px solid #E0E0E0',
        boxShadow: 3,
      }}
    >
              <HeadingCommon title="Compare Providers" variant="h6" weight={600} />
      
      

      <Grid container spacing={3} justifyContent="center">
        {providers.map((provider, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                borderRadius: '20px',
                border: '1px solid #E0E0E0',
                boxShadow: '0 0 10px rgba(0,0,0,0.15)',
              }}
            >
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                {provider.name}
              </Typography>
              <Typography>{provider.rating}</Typography>
              <Typography fontWeight="600">{provider.price}</Typography>
              <Typography>{provider.location}</Typography>
              <Typography>{provider.events}</Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: '#0A2647',
                  borderRadius: '20px',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#083358' },
                }}
              >
                Contact
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Bottom buttons */}
      <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#0A2647',
              borderRadius: '20px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#083358' },
            }}
          >
            Contact All Providers at Once
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#0A2647',
              borderRadius: '20px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#083358' },
            }}
          >
            Finalize My Choice
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

