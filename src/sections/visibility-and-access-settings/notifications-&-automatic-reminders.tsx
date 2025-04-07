import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
  FormGroup,
  Checkbox,
  Button,
  Container
} from '@mui/material';

export function NotificationAutomaticReminders  ()  {
  return (
    <Box
      boxShadow={3}
      borderRadius={3}
      p={{ xs: 2, sm: 3, md: 4 }}
      mt={3}
      bgcolor="white"
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Notifications & Automatic Reminders
      </Typography>

      {/* Scheduled Reminders */}
      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Scheduled Reminders
        </Typography>
        <RadioGroup defaultValue="1hr">
          <FormControlLabel
            value="24hr"
            control={<Radio />}
            label="Reminder 24 hours before the event"
          />
          <FormControlLabel
            value="1hr"
            control={<Radio />}
            label="Reminder 1 hour before the event"
          />
          <FormControlLabel
            value="changes"
            control={<Radio />}
            label="Notification in case of program changes"
          />
        </RadioGroup>
      </Box>

      {/* Customizable Notifications */}
      <Box mt={4}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Customizable Notifications
        </Typography>

        {/* Recipients */}
        <Typography variant="subtitle2" mt={2} mb={1}>
          Recipients:
        </Typography>
        <TextField
          select
          fullWidth
          defaultValue="all"
          size="medium"
          variant="outlined"
        >
          <MenuItem value="all">All attendees</MenuItem>
          <MenuItem value="vip">VIP guests</MenuItem>
          <MenuItem value="custom">Custom list</MenuItem>
        </TextField>

        {/* Custom Message */}
        <Typography variant="subtitle2" mt={3} mb={1}>
          Custom Message:
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="The event is starting soon! Get ready."
          variant="outlined"
        />

        {/* CTA Button */}
        <Typography variant="subtitle2" mt={3} mb={1}>
          CTA Button:
        </Typography>
        <TextField
          fullWidth
          placeholder="View My Ticket"
          variant="outlined"
        />
      </Box>

      {/* Notification Methods */}
      <Box mt={4}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Notification Methods
        </Typography>
        <RadioGroup defaultValue="email">
          <FormControlLabel
            value="push"
            control={<Radio />}
            label="Web or Mobile Push (via the TICK-M EVENTS app)"
          />
          <FormControlLabel
            value="email"
            control={<Radio />}
            label="Email (Sent with an access link)"
          />
          <FormControlLabel
            value="sms"
            control={<Radio />}
            label="SMS (Optional with extra cost)"
          />
        </RadioGroup>
      </Box>

      {/* Save Button */}
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
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

