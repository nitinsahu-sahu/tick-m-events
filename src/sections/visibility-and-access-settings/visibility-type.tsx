import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
  Button,
  FormGroup,
  Container
} from '@mui/material';

export function VisibilityType() {
  return (
    <Box
      boxShadow={3}
      borderRadius={3}
      p={{ xs: 2, sm: 3, md: 4 }}
      mt={3}
      bgcolor="white"
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Visibility Type
      </Typography>

      {/* Visibility Options */}
      <RadioGroup defaultValue="private">
        <FormControlLabel
          value="public"
          control={<Radio />}
          label="Public - Accessible to everyone"
        />
        <FormControlLabel
          value="private"
          control={<Radio />}
          label="Private - Only via direct link"
        />
        <FormControlLabel
          value="invitation"
          control={<Radio />}
          label="Invitation-Only - Only added guests"
        />
      </RadioGroup>

      {/* Custom Event URL */}
      <Box mt={3}>
        <Typography variant="subtitle2" mb={1}>
          Custom Event URL
        </Typography>
        <TextField
          fullWidth
          placeholder="tickm.com/myevent2025"
          variant="outlined"
          size="medium"
        />
      </Box>

      {/* Secure Access */}
      <Box mt={3}>
        <Typography variant="subtitle2" mb={1}>
          Secure Access
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter access code"
          variant="outlined"
          size="medium"
        />
      </Box>

      {/* Two-Factor Checkbox */}
      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Checkbox />}
          label="Enable Two-Factor Authentication (Email/SMS OTP)"
        />
      </FormGroup>

      {/* Participant Limit */}
      <Box mt={3}>
        <Typography variant="subtitle2" mb={1}>
          Participant Limit
        </Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="498"
          variant="outlined"
          size="medium"
        />
      </Box>

      {/* Enable Waitlist */}
      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Checkbox />}
          label="Enable Waitlist"
        />
      </FormGroup>

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

