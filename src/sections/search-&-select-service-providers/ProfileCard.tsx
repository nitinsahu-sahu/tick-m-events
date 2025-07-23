import {
  Box, Select, MenuItem, InputLabel, FormControl, Typography,
  Grid, Paper, Divider, SelectChangeEvent
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { promotionEvents } from 'src/redux/actions';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { AppDispatch, RootState } from 'src/redux/store';

import { ServiceCard } from './ServiceCard';

export function ProfileCard({ selectedProvider, onRequestService }: any) {
  const { eventsWithOrdersAndParticiapnt } = useSelector((state: RootState) => state?.promotionList);
  const { services } = selectedProvider
    const dispatch = useDispatch<AppDispatch>();
  
  const [selectedEventId, setSelectedEventId] = useState<string>('');

  useEffect(() => {
    dispatch(promotionEvents())
  }, [dispatch])

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
        overflow: 'hidden',
        mt: 3,
        mb: 4,
      }}
    >
      <Box px={3}>
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
                    {eventsWithOrdersAndParticiapnt?.map((event: any) => (
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
                <Grid item xs={12} sm={6} key={service._id} sx={{ my: 3 }}>
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
    </Paper >
  );
}



