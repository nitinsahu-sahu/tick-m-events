import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-number-input'
import type { E164Number } from 'libphonenumber-js';

import { RootState } from "src/redux/store";

import { HeadProcess } from "./head-process";
import 'react-phone-number-input/style.css'


interface FormData {
  name: string;
  email: string;
  number: string;
  city: string;
  gender: string;
  age: string;
  hearAboutEvent: string;
  eventSpecificInfo: string;
}

interface FormData {
  name: string;
  email: string;
  number: string;
  city: string;
  gender: string;
  age: string;
  hearAboutEvent: string;
  eventSpecificInfo: string;
}

export function ProcessTwo({ onOrderDetailsUpdate, onBack, onNext, ticketCount }: any) {
  console.log(ticketCount);
  // Get user data from Redux store
  const { name, email, number, gender } = useSelector((state: RootState) => state.auth.user);
  const [phoneNumber, setPhoneNumber] = useState(number || '');

  // Initialize form state with user data
  const [formData, setFormData] = useState<FormData[]>(
    Array.from({ length: ticketCount }, () => ({
      name: '',
      email: '',
      number: '',
      city: '',
      gender: '',
      age: '',
      hearAboutEvent: '',
      eventSpecificInfo: ''
    }))
  );

  const handlePhoneChange = (value: E164Number | undefined) => {
    const phoneValue = value as string; // or String(value)
    setPhoneNumber(phoneValue);
    setFormData((prevData: any) => ({ ...prevData, number: phoneValue }));
  };
  // Update form if user data changes
  useEffect(() => {
    setFormData(prev => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        name: name || '',
        email: email || '',
        number: number || '',
        gender: gender || '',
      };
      return updated;
    });
  }, [name, email, number, gender]);

  const handleChange = (
    index: number,
    field: keyof FormData,
    value: string
  ) => {
    setFormData(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract participants data
    const participants = formData.map(({ name: participantName, age, gender: participantGender }) => ({
      name: participantName,
      age,
      gender: participantGender
    }));

    const orderAddress = {
      email: formData[0].email,
      number: formData[0].number || phoneNumber,
      city: formData[0].city,
      hearAboutEvent: formData[0].hearAboutEvent,
      eventSpecificInfo: formData[0].eventSpecificInfo
    };

    onOrderDetailsUpdate({
      participants,
      orderAddress
    });

    onNext();
  };


  return (
    <Box mt={6}>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2, position: "relative" }}>
          <HeadProcess title="Participant Details" step="2" />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Box display="flex" fontWeight="bold" px={2}>
                <Box width="33%">Full Name</Box>
                <Box width="33%">Age</Box>
                <Box width="33%">Gender</Box>
              </Box>
            </Grid>

            {formData.map((participant, index) => (
              <Grid item xs={12} key={index}>
                <Box display="flex" gap={2}>
                  {/* Name */}
                  <TextField
                    fullWidth
                    name={`name-${index}`}
                    value={participant.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder="Full Name"
                    variant="outlined"
                  />

                  {/* Age */}
                  <TextField
                    fullWidth
                    name={`age-${index}`}
                    value={participant.age}
                    onChange={(e) => handleChange(index, 'age', e.target.value)}
                    placeholder="Age"
                    type="number"
                    variant="outlined"
                  />

                  {/* Gender */}
                  <TextField
                    select
                    fullWidth
                    name={`gender-${index}`}
                    value={participant.gender}
                    onChange={(e) => handleChange(index, 'gender', e.target.value)}
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </TextField>
                </Box>
              </Grid>
            ))}
            <Grid container spacing={3} mt={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  value={formData[0]?.email || ''}
                  onChange={(e) => handleChange(0, 'email', e.target.value)}
                  type="email"
                  variant="outlined"
                  placeholder="Enter your email"
                  sx={fieldStyles}
                />
              </Grid>
              <Grid item xs={12} sx={{
                '& .PhoneInput': {
                  width: '100%',
                  '& input': {
                    width: '100%',
                    padding: '16.5px 14px',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    borderRadius: '4px',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: 'black',
                    },
                    '&:focus': {
                      borderColor: 'black',
                      borderWidth: '2px',
                      outline: 'none',
                    },
                  },
                  '& .PhoneInputCountry': {
                    marginRight: '8px',
                  },
                  '& .PhoneInputCountrySelect': {
                    marginRight: '8px',
                  },
                },
                '& .PhoneInput--focus': {
                  '& input': {
                    borderColor: 'black',
                    borderWidth: '2px',
                  },
                },
              }}>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                  sx
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="city"
                  value={formData[0]?.city || ''}
                  onChange={(e) => handleChange(0, 'city', e.target.value)}
                  type="text"
                  variant="outlined"
                  placeholder="Enter your full address"
                  sx={fieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="hearAboutEvent"
                  value={formData[0]?.hearAboutEvent || ''}
                  onChange={(e) => handleChange(0, 'hearAboutEvent', e.target.value)}
                  type="text"
                  variant="outlined"
                  placeholder="How did you hear about the event?"
                  sx={fieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="eventSpecificInfo"
                  value={formData[0]?.eventSpecificInfo || ''}
                  onChange={(e) => handleChange(0, 'eventSpecificInfo', e.target.value)}
                  type="text"
                  variant="outlined"
                  placeholder="Event-specific information (e.g., meal preference)"
                  sx={fieldStyles}
                />
              </Grid>
            </Grid>

          </Grid>
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            gap={2}  // Adds consistent spacing between buttons
            sx={{
              width: '100%',
              flexDirection: { xs: 'column', sm: 'row' }  // Stack vertically on mobile, horizontal on desktop
            }}
          >
            {/* <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                py: 1.5,  // Better vertical padding
                bgcolor: '#0B3558',
                '&:hover': {
                  bgcolor: '#0A2D4D',  // Slightly darker on hover
                  boxShadow: 2         // Subtle elevation on hover
                },
                flex: { sm: 1 }  // Equal width in row layout
              }}
              onClick={onBack}  // Add your back handler
            >
              Back
            </Button> */}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                py: 1.5,
                bgcolor: '#0B3558',
                '&:hover': {
                  bgcolor: '#0A2D4D',
                  boxShadow: 2
                },
                flex: { sm: 1 }
              }}
            // disabled={!isValid}  // Add validation state
            >
              Proceed to Participant Details
            </Button>
          </Box>

        </Paper>
      </form>
    </Box>
  );
}

// Reusable styles
const fieldStyles = {
  backgroundColor: "#fff",
  borderRadius: "15px",
  '& .MuiOutlinedInput-root': { borderRadius: '15px' },
};