import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControlLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';

import { AppDispatch } from 'src/redux/store';
import { saveReminderSettings } from 'src/redux/actions/reminderActions';

export function NotificationAutomaticReminders() {
  const dispatch = useDispatch<AppDispatch>();

  // Form states
  const [reminderTime, setReminderTime] = useState("1hr");
  const [recipient, setRecipient] = useState("all");
  const [customMessage, setCustomMessage] = useState("");
  const [ctaButton, setCtaButton] = useState("");
  const [notificationMethod, setNotificationMethod] = useState("email");

  // const handleSave = () => {
  //   const now = new Date();
  //   const eventDate = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes from now

  //   const payload = {
  //     eventDate, // dynamically set to 2 minutes later
  //     reminderTime: parseInt(reminderTime), // make sure it's a number
  //     recipient,
  //     customMessage,
  //     ctaButton,
  //     notificationMethod,
  //     notificationType: "reminder" // static field (if required)
  //   };
  //   dispatch(saveReminderSettings(payload));
  // };

  const handleSave = () => {
    const now = new Date();
    const eventDate = new Date(now.getTime() + 2 * 60 * 1000); 
    const payload = {
      eventDate, // Current system date and time
      reminderTime: 1, // 1 hour before event
      notificationMethod: "email",
      recipient: "nitinsahu911111@gmail.com", // Recipient email
      customMessage: "This is your reminderee!",
      ctaButton: "Click here for more info",
      notificationType: "reminder" // Assuming this is required
    };
    dispatch(saveReminderSettings(payload));
  };

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
        <RadioGroup value={reminderTime} onChange={(e) => setReminderTime(e.target.value)}>
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

        <Typography variant="subtitle2" mt={2} mb={1}>
          Recipients:
        </Typography>
        <TextField
          select
          fullWidth
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="all">All attendees</MenuItem>
          <MenuItem value="vip">VIP guests</MenuItem>
          <MenuItem value="custom">Custom list</MenuItem>
        </TextField>

        <Typography variant="subtitle2" mt={3} mb={1}>
          Custom Message:
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="The event is starting soon! Get ready."
          variant="outlined"
        />

        <Typography variant="subtitle2" mt={3} mb={1}>
          CTA Button:
        </Typography>
        <TextField
          fullWidth
          value={ctaButton}
          onChange={(e) => setCtaButton(e.target.value)}
          placeholder="View My Ticket"
          variant="outlined"
        />
      </Box>

      {/* Notification Methods */}
      <Box mt={4}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Notification Methods
        </Typography>
        <RadioGroup value={notificationMethod} onChange={(e) => setNotificationMethod(e.target.value)}>
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
          onClick={handleSave}
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
}
