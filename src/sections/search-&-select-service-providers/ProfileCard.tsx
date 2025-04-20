import React from 'react';

import { Box, Typography, Button, Avatar, Grid, useMediaQuery, useTheme, Paper } from '@mui/material';

const ProfileCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2.5,
        overflow: 'hidden',
        mt:3,
        mb: 4,
      }}
    >
      {/* Cover Image */}
      <Box
        sx={{
          height: isMobile ? 150 : 200,
          backgroundImage: `url('/assets/images/home-and-recommendations/tech.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Profile Section */}
      <Box sx={{ p: isMobile ? 2 : 3, position: 'relative' }}>
        <Avatar
          src='/assets/images/Profile.jpg'
          sx={{
            width: 100,
            height: 100,
            /* border: '4px solid white', */
            position: 'absolute',
            top: -30,
            left: isMobile ? 'calc(50% - 40px)' : 24,
          }}
        />
        <Box sx={{ ml: isMobile ? 0 : 15, mt: isMobile ? 8 : -2, textAlign: isMobile ? 'center' : 'left' }}>
          <Typography variant="h6" fontWeight={600}>
            DJ Max – Sound & Lighting
          </Typography>
          <Typography variant="body2" >
            @djmaxofficial
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid
          container
          spacing={0}
          sx={{
            mt: isMobile ? 4 : 7,
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 2.5,
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Overall Rating</Typography>
            <Typography fontWeight={600}>4.8/5 (20 reviews)</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Completed Gigs</Typography>
            <Typography fontWeight={600}>120</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Profile Views</Typography>
            <Typography fontWeight={600}>250 this week</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Response Time</Typography>
            <Typography fontWeight={600}>within 1h</Typography>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Grid
          container
          spacing={2}
          sx={{ mt: 3, textAlign: 'center' }}
          justifyContent={isMobile ? 'center' : 'space-between'}
        >
          {['Modify Profile', 'Add a Service', 'Update Availability', 'Share Profile'].map((label) => (
            <Grid item xs={12} sm={3} key={label}>
              <Button
                fullWidth
                variant="contained"
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
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ProfileCard;