import { Box, Typography } from '@mui/material';

export default function ReservedServiceBoxes() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* First box (standalone) */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2.5,
          border: '1px solid #E0E0E0',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
          p: 2,
        }}
      >
        <Typography>List of Reserved Services Content</Typography>
      </Box>

      {/* Second box inside Real-time Tracking */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2.5,
          border: '1px solid #E0E0E0',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Real-time Tracking
        </Typography>

        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            border: '1px solid #E0E0E0',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
            p: 2,
          }}
        >
          <Typography>List of Reserved Services Content</Typography>
        </Box>
      </Box>
    </Box>
  );
}
