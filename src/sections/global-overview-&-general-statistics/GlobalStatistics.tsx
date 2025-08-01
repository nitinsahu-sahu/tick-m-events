import { Box, Typography, Grid, Button } from '@mui/material';

const GlobalStatistics = () => (
    <Box
      sx={{
        p: 3,
        borderRadius: 2.5,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#fff',
        mb:3,
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Global Statistics
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={2} mt={0.5} mb={2}  justifyContent="center">
          {[
            { label: 'Users', value: '12,345' },
            { label: 'Events', value: '567' },
            { label: 'Revenue', value: '$1,234,567' },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  backgroundColor: '#B3D9F3',
                  borderRadius: 2,
                  py: 5,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" fontWeight="500" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      {/* Action Buttons */}

      <Grid container spacing={2} justifyContent="center">
        {['Moderate an Event', 'Validate a Provider', 'Verify a Suspicious Transaction'].map(
          (label, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Button
                fullWidth
                sx={{
                  backgroundColor: '#0B2E4C',
                  color: 'white',
                  fontWeight: '500',
                  borderRadius: 2,
                  py: 1.2,
                  '&:hover': {
                    backgroundColor: '#09304e',
                  },
                }}
              >
                {label}
              </Button>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );


export default GlobalStatistics;
