import { Box, Select, MenuItem, InputLabel, FormControl, Typography, Button, Avatar, Grid, Paper, Divider, SelectChangeEvent } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { RootState } from 'src/redux/store';

import { ServiceCard } from './ServiceCard';

export function ProfileCard({ selectedProvider, onRequestService }: any) {
  const { services } = selectedProvider
  const { fullData } = useSelector((state: RootState) => state?.event);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const handleEventChange = (event: SelectChangeEvent<string>) => {
    setSelectedEventId(event.target.value);
  };
  // Check if selectedProvider is empty or invalid
  const isEmptyProvider = !selectedProvider ||
    (typeof selectedProvider === 'object' &&
      Object.keys(selectedProvider).length === 0);

  if (isEmptyProvider) {
    return (
      <Paper elevation={3} sx={{
        borderRadius: 2.5,
        p: 4,
        textAlign: 'center',
        mt: 3,
        mb: 4,
        backgroundColor: '#f9f9f9'
      }}>
        <Box sx={{ mb: 2 }}>
          <PersonOutlineIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
        </Box>
        <Typography variant="h6" color="textSecondary">
          No profile available
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {!selectedProvider ? 'Select a provider to view details' : 'No providers details your current filters'}
        </Typography>
      </Paper>
    );
  }

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
          backgroundImage: `url(${selectedProvider?.cover?.url || '/assets/images/home-and-recommendations/tech.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Profile Section */}
      <Box sx={{ p: { xs: 2, sm: 2, md: 3 }, position: 'relative' }}>
        <Avatar
          src={selectedProvider?.avatar?.url || '/assets/images/Profile.jpg'}
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

        {/* Services Section */}
        {services.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <HeadingCommon variant="h6" mb={1} baseSize="24px" weight={600} title='Offered Services' />

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Event</InputLabel>
                  <Select
                    value={selectedEventId}
                    onChange={handleEventChange}
                    label="Select Event"
                    sx={{ minWidth: 200, textTransform: "capitalize" }}
                  >
                    {fullData.map((event: any) => (
                      <MenuItem key={event._id} value={event._id} sx={{ textTransform: "capitalize" }}>
                        {event.eventName} ({event.date})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Box>
            <Grid container spacing={2}>
              {services.map((service: any) => (
                <Grid item xs={12} sm={6} key={service._id}>
                  <ServiceCard
                    eventId={selectedEventId}
                    service={service}
                    onRequest={() => onRequestService(service._id)}
                    disabled={!selectedEventId} // Disable if no event selected
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

      </Box>
    </Paper>
  );
}

