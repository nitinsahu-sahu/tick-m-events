import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const ReviewSection = () => {
  const reviews = [
    {
      rating: 5,
      comment: 'Excellent service, top-tier DJ!',
      date: '11/02/2025',
    },
    {
      rating: 4,
      comment: 'Very good, just a little late.',
      date: '10/31/2025',
    },
  ];
  return (
    <Box
      sx={{
        p: 3,
        mt: 3,
        backgroundColor: '#fff',
        borderRadius: 2.5,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Validation & Feedback */}
      <Paper
        sx={{
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Validation & Feedback
        </Typography>
        <Box
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: '#fff',
            borderRadius: 2.5,
            border: '1px solid #E0E0E0',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          <Typography fontWeight="bold" sx={{ mb: 3 }}>
            Service Completion Confirmation
          </Typography>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }} // Only stack on mobile
            justifyContent="space-between"
            gap={2}
            mt={3}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0D274D',
                borderRadius: '25px',
                px: 2,
                py: 1,
                fontWeight: 600,
                '&:hover': { backgroundColor: '#0b223f' },
                width: { xs: '100%', md: '40%', lg: '50%' }, // Full width only on mobile
              }}
            >
              Confirm Service Completion
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderRadius: '25px',
                px: 2,
                py: 1,
                fontWeight: 600,
                borderColor: '#0D274D',
                color: '#0D274D',
                '&:hover': { backgroundColor: '#f1f1f1' },
                width: { xs: '100%', md: '40%', lg: '50%' }, // Full width only on mobile
              }}
            >
              Report an Issue
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Customer Rating & Review */}
      <Paper sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Customer Rating & Review
        </Typography>

        <Box sx={{ overflowX: 'auto', borderRadius: 2 }}>
          <Box sx={{ minWidth: 700 }}>
            {/* Table Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr 1fr',
                backgroundColor: '#0077C8',
                color: 'white',
                py: 1.5,
                px: 2,
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              <div>Rating</div>
              <div>Comment</div>
              <div>Date</div>
            </Box>

            {/* Scrollable Table Body */}
            <Box
              sx={{
                maxHeight: 300,
                overflowY: 'auto',
                borderTop: '1px solid #ddd',
                '&::-webkit-scrollbar': {
                  width: '1px',

                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#0B2E4C',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#e0e0e0',
                  borderRadius: '10px',
                },
              }}
            >
              {reviews.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 3fr 1fr',
                    alignItems: 'center',
                    textAlign: 'center',
                    py: 1.5,
                    px: 2,
                    borderBottom:
                      idx !== reviews.length - 1 ? '1px solid rgba(195, 195, 195, 1)' : 'none',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <div>
                    {[...Array(item.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#FFD700', fontSize: '20px' }} />
                    ))}
                  </div>
                  <div>{item.comment}</div>
                  <div>{item.date}</div>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Leave a Review */}
      <Paper sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Leave a Review
        </Typography>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Overall Rating (e.g. 5 Stars)"
            variant="outlined"
            size="small"
            InputLabelProps={{
                sx: { color: 'black' }, // Label color
              }}
              InputProps={{
                sx: { color: 'black' }, // Input text color
              }}
          />
          <TextField
            fullWidth
            label="Write your review here..."
            multiline
            rows={4}
            variant="outlined"
            InputLabelProps={{
                sx: { color: 'black' }, // Label color
              }}
              InputProps={{
                sx: { color: 'black' }, // Input text color
              }}
          />


          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
            <ResponsiveActionButton>Submit Review</ResponsiveActionButton>
            <ResponsiveActionButton>Contact Support</ResponsiveActionButton>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};
function ResponsiveActionButton({ children }: { children: React.ReactNode }) {
    return (
      <Button
        fullWidth
        sx={{
          borderRadius: '20px',
          backgroundColor: '#0B2E4C',
          color: 'white',
          height: 45,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#071E33',
          },
        }}
      >
        {children}
      </Button>
    );
  }

export default ReviewSection;
