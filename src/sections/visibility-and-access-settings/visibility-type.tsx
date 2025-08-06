import { Box, Button, Tooltip, FormControl, IconButton, FormControlLabel, Grid, InputLabel, MenuItem, Radio, SelectChangeEvent, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { AppDispatch, RootState } from 'src/redux/store';
import { eventUpdate } from 'src/redux/actions/event.action';
import { promotionEvents } from 'src/redux/actions';

export function VisibilityType({ eventId, visibility }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { eventsWithOrdersAndParticiapnt } = useSelector((state: RootState) => state?.promotionList);

  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [eventType, setEventType] = useState<'public' | 'private'>();


  const [error, setError] = useState<string | null>(null);

  const link = eventType === "private" ?
    `${import.meta.env.VITE_Live_URL || 'https://tick-m-events.vercel.app'}/our-event/${selectedEventId}` :
    `${import.meta.env.VITE_Live_URL || 'https://tick-m-events.vercel.app'}/our-event`
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    } catch (err) {
      toast.error(err);
    }
  };
  // Find the selected event
  const selectedEvent = eventsWithOrdersAndParticiapnt.find((event: any) => event._id === selectedEventId);

  const handleEventChange = (event: SelectChangeEvent<string>) => {
    setSelectedEventId(event.target.value);
    setError(null);

    // Update radio button based on selected event's type
    if (event.target.value) {
      const eventTy = eventsWithOrdersAndParticiapnt.find((e: any) => e._id === event.target.value);

      setEventType(eventTy?.visibility?.visibilitySettings?.publicEvent ? 'public' : 'private');
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventType(event.target.value as 'public' | 'private');
  };


  const handleSaveSettings = async () => {
    if (!selectedEvent) {
      setError('Please select an event first');
      return;
    }

    // Check if user is trying to change from private to public
    if (selectedEvent.visibility.visibilitySettings.publicEvent === false &&
      eventType === 'public') {
      setError('Cannot change private event to public. Please create a new public event.');
      return;
    }

    // Here you would typically dispatch an action to save the settings
    const updatedEvent = {
      _id: selectedEventId,
      eventType,
    }
    const result = await dispatch(eventUpdate(updatedEvent));

    if (result?.status === 200) {
      toast.success("Setting Saved Successfully...");
      setTimeout(() => setSelectedEventId('')
        , 2000);

    } else {
      toast.error(result?.message);
    }
    // Reset error on successful save
    setError(null);
  };

  useEffect(() => {
    dispatch(promotionEvents());
  }, [dispatch]);
  return (
    <Box
      boxShadow={3}
      borderRadius={3}
      p={{ xs: 2, sm: 3, md: 4 }}
      mt={3}
      bgcolor="white"
    >
      <Box display="flex" justifyContent="space-between">
        <HeadingCommon title="Visibility Type" />
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Select Event</InputLabel>
            <Select
              value={selectedEventId}
              onChange={handleEventChange}
              label="Select Event"
              sx={{ minWidth: 200, textTransform: "capitalize" }}
            >
              {eventsWithOrdersAndParticiapnt.map((event: any) => (
                <MenuItem key={event._id} value={event._id} sx={{ textTransform: "capitalize" }}>
                  {event.eventName} ({event.date})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Box>

      {/* Error message */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Visibility Options - Disabled until event is selected */}
      <RadioGroup
        value={eventType}
        onChange={handleRadioChange}
        defaultValue="private"
        sx={{ mt: 2 }}
      >
        <FormControlLabel
          value="public"
          control={<Radio />}
          label="Public - Accessible to everyone"
          disabled={!selectedEventId}
        />
        <FormControlLabel
          value="private"
          control={<Radio />}
          label="Private - Only via direct link"
          disabled={!selectedEventId}
        />
      </RadioGroup>

      {/* Custom Event URL - Disabled until event is selected */}
      {
        !selectedEventId ? null : <Box mt={3} >
          <Typography variant="subtitle2" mb={1}>
            Event URL
          </Typography>
          <Typography
            variant="subtitle2"
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {link}
          </Typography>
          <Tooltip title={copied ? 'Copied!' : 'Copy'}>
            <IconButton size="small" onClick={handleCopy} sx={{ ml: 1 }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>

        </Box>
      }


      {/* Save Button - Disabled until event is selected */}
      <Box mt={4}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#072F4A',
            color: '#fff',
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
          onClick={handleSaveSettings}
          disabled={!selectedEventId}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

