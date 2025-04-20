import { Box, Typography, Paper, Stack } from '@mui/material';
import { RoundedButton } from './RoundedButton';

export function SearchCard() {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Search & Advanced Filters
      </Typography>

      <Paper
        sx={{
          p: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2.5,
          border: '1px solid #ccc',
          my: 4,
        }}
      >
        <Typography variant="body2" sx={{ mr: 1 }}>
          New accounts pending validation:
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          12
        </Typography>
      </Paper>

      <Stack sx={{ my: 2 }} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RoundedButton label="Validate an Account" variant="outlined" />
        <RoundedButton label="Verify a Account" variant="outlined" />
        <RoundedButton label="Block a User" variant="outlined" />
        <RoundedButton label="Contact a User" variant="contained" />
      </Stack>
    </Paper>
  );
}
