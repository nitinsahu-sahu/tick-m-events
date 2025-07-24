// src/components/notifications/NotificationAndReminder.tsx
import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export function NotificationAndReminder() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <Box p={3} boxShadow={3} mt={3} borderRadius={3} sx={{ border: "1px solid black" }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Notifications & Automatic Reminders
      </Typography>

      <Button
        fullWidth
        sx={{
          bgcolor: "#0B2E4C",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          "&:hover": { bgcolor: "#083048" },
        }}
        onClick={() => setShowCreateForm(true)}
      >
        Create a New Notification
      </Button>

      {showCreateForm && (
        <Paper sx={{ p: 3, borderRadius: '10px', background: '#f5f5f5', mt: 3 }}>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Select Notification Type
          </Typography>
          <Select fullWidth defaultValue="Web Push" sx={{ mb: 3 }}>
            <MenuItem value="Web Push">Web Push</MenuItem>
            <MenuItem value="sms">SMS</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>

          <Typography variant="body1" fontWeight="bold" mb={1}>
            Recipient Selection
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px", mb: 3 }}>
            {[
              "All registered participants (Ticket holders)",
              "Interested participants (Waitlist but no purchase yet)",
              "Pending payment participants (Unfinished reservations)",
            ].map((label) => (
              <label key={label} htmlFor={`checkbox-${label}`} className="flex items-center gap-2">
                <input id={`checkbox-${label}`} type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                <span className="text-gray-700 text-sm">{label}</span>
              </label>
            ))}
          </Box>

          <Typography fontWeight="bold" mb={1}>
            Enter Message
          </Typography>
          <TextField
            fullWidth
            placeholder="Example: 'Don’t miss the festival! Only 100 tickets left!'"
            sx={{ mb: 3 }}
          />

          <Typography fontWeight="bold" mb={1}>
            Add CTA Button
          </Typography>
          <TextField
            fullWidth
            placeholder="CTA Button (e.g., 'Buy Now', 'Reserve', 'Share')"
            sx={{ mb: 3 }}
          />

          <Typography fontWeight="bold" mb={1}>
            Schedule Options
          </Typography>
          <RadioGroup defaultValue="send-now">
            <FormControlLabel value="send-now" control={<Radio />} label="Send now" />
            <FormControlLabel
              value="schedule"
              control={<Radio />}
              label="Schedule for a specific date/time"
            />
          </RadioGroup>

          <Box sx={{ display: "flex", gap: "16px", mt: 2, mb: 3 }}>
            <Box sx={{ position: "relative", flex: 1 }}>
              select date
              <TextField fullWidth placeholder="mm/dd/yyyy" type="date" />
            </Box>
            <Box sx={{ flex: 1 }}>
              select time
              <TextField fullWidth placeholder="00:00" type="time" />
            </Box>
          </Box>

          <Button
            fullWidth
            sx={{
              bgcolor: "#0B2E4C",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              "&:hover": { bgcolor: "#083048" },
            }}
          >
            Send Notifications
          </Button>
        </Paper>
      )}
    </Box>
  );
}
