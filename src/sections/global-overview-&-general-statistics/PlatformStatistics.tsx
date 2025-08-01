import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';

const stats = [
  { label: 'Total Users', value: '12,345' },
  { label: 'Total Events', value: '567' },
  { label: 'Total Revenue', value: '$1,234,567' },
  { label: 'Active Providers', value: '12,345' },
  { label: 'Processed Transactions', value: '12,345' },
];

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <Box
    sx={{
      backgroundColor: '#B3D9F3',
      borderRadius: 2,
      py: 5,
      px: 4,
      mx: 1,
      textAlign: 'center',
      boxShadow: 1,
    }}
  >
    <Typography variant="h4" fontWeight={500} mb={1}>
      {label}
    </Typography>
    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
  </Box>
);

const PlatformStatistics = () => (
  <Box
    sx={{
      p: 3,
      borderRadius: 2.5,
      border: '1px solid #E0E0E0',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
      backgroundColor: '#fff',
      mb: 3,
    }}
  >
    <Typography variant="h6" fontWeight="bold" mb={3}>
      Global Platform Statistics
    </Typography>

    <Grid container spacing={2} mb={3}>
        {stats.slice(0, 3).map((stat, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <StatBox label={stat.label} value={stat.value} />
          </Grid>
        ))}
      </Grid>

      {/* Second Row: 2 boxes centered with spacing */}
      <Grid container spacing={2} justifyContent="space-between" mb={3}>
        {stats.slice(3).map((stat, i) => (
          <Grid item xs={12} sm={6} md={4} key={i + 3}>
            <StatBox label={stat.label} value={stat.value} />
          </Grid>
        ))}
      </Grid>

      {/* Action Buttons */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }} // column on xs, row on sm+
        justifyContent="center"
        gap={2}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#0A2540',
            borderRadius: 2.5,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            width: { xs: '100%', sm: '200px', md: '300px' }, // full width on mobile, fixed on tablet+
          }}
        >
          View Full Report
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#0A2540',
            borderRadius: 2.5,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            width: { xs: '100%', sm: '200px', md: '300px' }, // full width on mobile, fixed on tablet+
          }}
        >
          Export Data
        </Button>
      </Box>
  </Box>
);

export default PlatformStatistics;
