import { Box, Button, Grid, Paper, TextField, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-number-input'
import type { E164Number } from 'libphonenumber-js';

import { RootState } from "src/redux/store";
import axios from "axios";
import { HeadProcess } from "./head-process";
import 'react-phone-number-input/style.css'


interface FormData {
  name: string;
  email: string;
  number: string;
  country: string;
  state: string;
  city: string;
  address: string;
  gender: string;
  age: string;
  hearAboutEvent: string;
  eventSpecificInfo: string;
}

export function ProcessTwo({ onOrderDetailsUpdate, onBack, onNext, ticketCount }: any) {
  // Get user data from Redux store
  const { name, email, number, gender } = useSelector((state: RootState) => state.auth.user);
  const [phoneNumber, setPhoneNumber] = useState(number || '');

  // Location data
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Initialize form state with user data
  const [formData, setFormData] = useState<FormData[]>(
    Array.from({ length: ticketCount }, () => ({
      name: '',
      email: '',
      number: '',
      country: '',
      state: '',
      city: '',
      address: '',
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

  // 📌 Fetch countries on mount
  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/positions")
      .then(res => {
        setCountries(res.data.data.map((c: any) => c.name));
      })
      .catch(err => console.error(err));
  }, []);

  // 📌 Fetch states when country changes
  const fetchStates = (country: string) => {
    axios.post("https://countriesnow.space/api/v0.1/countries/states", { country })
      .then(res => setStates(res.data.data.states.map((s: any) => s.name)))
      .catch(err => console.error(err));
  };

  // 📌 Fetch cities when state changes
  const fetchCities = (country: string, state: string) => {
    axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", { country, state })
      .then(res => setCities(res.data.data))
      .catch(err => console.error(err));
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
    // Trigger dependent data loads
    if (field === "country") {
      fetchStates(value);
      setStates([]);
      setCities([]);
    }
    if (field === "state") {
      fetchCities(formData[index].country, value);
      setCities([]);
    }
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
      country: formData[0].country,
      state: formData[0].state,
      city: formData[0].city,
      address: formData[0].address,
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
          <Grid container rowSpacing={2} mt={2}>
            <Grid item xs={12}>
              <Box display="flex" fontWeight="bold">
                <Box width="33%">Full Name</Box>
                <Box width="33%" pl={1}>Age</Box>
                <Box width="33%" pl={2}>Gender</Box>
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
            <Grid container spacing={3} mt={2}>
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

              {/* Country */}
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Country"
                  value={formData[0]?.country || ''}
                  onChange={(e) => handleChange(0, "country", e.target.value)}
                >
                  <MenuItem value="">Select Country</MenuItem>
                  {countries.map((c, i) => (
                    <MenuItem key={i} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* State */}
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="State"
                  value={formData[0]?.state || ''}
                  onChange={(e) => handleChange(0, "state", e.target.value)}
                  disabled={!states.length}
                >
                  <MenuItem value="">Select State</MenuItem>
                  {states.map((s, i) => (
                    <MenuItem key={i} value={s}>{s}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* City */}
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="City"
                  value={formData[0]?.city || ''}
                  onChange={(e) => handleChange(0, "city", e.target.value)}
                  disabled={!cities.length}
                >
                  <MenuItem value="">Select City</MenuItem>
                  {cities.map((c, i) => (
                    <MenuItem key={i} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Grid>


              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  value={formData[0]?.address || ''}
                  onChange={(e) => handleChange(0, 'address', e.target.value)}
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
  borderRadius: 1,
  '& .MuiOutlinedInput-root': { borderRadius: 1 },
};