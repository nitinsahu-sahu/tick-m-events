import { Box, Typography, Grid, Button } from '@mui/material';
import { memo } from 'react';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

interface StatBoxProps {
  label: string;
  value: string;
}

const StatBox = memo(({ label, value }: StatBoxProps) => (
  <Box
    sx={{
      backgroundColor: '#B3D9F3',
      borderRadius: 2,
      py: 5,
      px: 4,
      mx: 1,
      textAlign: 'center',
      boxShadow: 1,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3,
      },
    }}
  >
    <Typography variant="h5" fontWeight={500} mb={1}>
      {label}
    </Typography>
    <Typography variant="h4" fontWeight="bold" color="#0A2540">
      {value}
    </Typography>
  </Box>
));

const GlobalStatistics = ({ statistics }: any) => (
  <Box
    sx={{
      p: 3,
      borderRadius: 2.5,
      border: '1px solid #E0E0E0',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
      backgroundColor: '#fff',
      mb: 3,
      transition: 'box-shadow 0.3s',
      '&:hover': {
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
      },
    }}
  >
    {/* Title */}
      <HeadingCommon variant="h5" title=" Global Statistics" color="#0A2540" mb={3} />

    {/* Stat Cards */}
    <Grid container spacing={2} mt={0.5} mb={2} justifyContent="center">
      {[
        { label: 'Users', value: statistics?.totalUsers },
        { label: 'Events', value: statistics?.totalEvents },
        { label: 'Revenue', value: statistics?.totalRevenue },
      ].map((stat, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <StatBox label={stat.label} value={stat.value} />
        </Grid>
      ))}
    </Grid>
    {/* Action Buttons */}

    {/* <Grid container spacing={2} justifyContent="center">
      {['Moderate an Event', 'Validate a Provider', 'Verify a Suspicious Transaction'].map(
        (label, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Button
              onClick={() => {
                if (label === 'Validate a Provider') {
                  window.location.href = '/user-management';
                }
                // Add other click handlers here if needed
              }}
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
    </Grid> */}
  </Box>
);


export default memo(GlobalStatistics);
