import { Box, Typography, Button, Avatar, Grid, Paper } from '@mui/material';

export function ProfileCard({ selectedProvider }: any) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2.5,
        overflow: 'hidden',
        mt: 3,
        mb: 4,
      }}
    >
      {/* Cover Image */}
      <Box
        sx={{
          height: { xs: 150, sm: 170, md: 200 },
          backgroundImage: `url(${selectedProvider.cover.url || '/assets/images/home-and-recommendations/tech.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Profile Section */}
      <Box sx={{ p: { xs: 2, sm: 2, md: 3 }, position: 'relative' }}>
        <Avatar
          src={selectedProvider.avatar.url || '/assets/images/Profile.jpg'}
          sx={{
            width: 100,
            height: 100,
            position: 'absolute',
            top: -30,
            left: { xs: 'calc(50% - 40px)', sm: 'calc(50% - 40px)', md: 24 },
          }}
        />
        <Box sx={{
          ml: { xs: 0, sm: 15, md: 15 },
          mt: { xs: 8, sm: 8, md: -2 },
          textAlign: { xs: 'center', sm: 'center', md: 'left' }
        }}
        >
          <Typography variant="h6" fontWeight={600}>
            {selectedProvider.name}
          </Typography>
          <Typography variant="body2" >
            {selectedProvider.username}
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid
          container
          spacing={0}
          sx={{
            mt: 3,
            p: 2,
            display: 'flex',
            justifyContent: 'space-around',
            border: '1px solid #ccc',
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Box>
            <Typography variant="subtitle2">Overall Rating</Typography>
            <Typography fontWeight={600}>{selectedProvider.averageRating}/5 ({selectedProvider.reviewCount} reviews)</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Completed Gigs</Typography>
            <Typography fontWeight={600}>120</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Response Time</Typography>
            <Typography fontWeight={600}>within 1h</Typography>
          </Box>
        </Grid>

        {/* Action Buttons */}
        <Grid item mt={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              const profileUrl = `${import.meta.env.VITE_FRONT_URL}/pro/${selectedProvider?._id}`;
              const whatsappMessage = `Check out my profile: ${profileUrl}`;
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
              window.open(whatsappUrl, '_blank');
            }}
            sx={{
              backgroundColor: '#0B2E4C',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2.3,
              py: 1,
              '&:hover': {
                backgroundColor: '#093255',
              },
            }}
          >
            Share Profile
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
};
