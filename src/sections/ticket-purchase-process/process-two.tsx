import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "src/redux/store";

import { HeadProcess } from "./head-process";


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

export function ProcessTwo({ onOrderDetailsUpdate, onBack, onNext }: any) {
  // Get user data from Redux store
  const { name, email, number, gender } = useSelector((state: RootState) => state.auth.user);

  // Initialize form state with user data
  const [formData, setFormData] = useState<FormData>({
    name: name || '',
    email: email || '',
    number: number || '',
    city: '',
    gender: gender || '',
    age: '',
    hearAboutEvent: '',
    eventSpecificInfo: ''
  });

  // Update form if user data changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: name || '',
      email: email || '',
      number: number || '',
      gender: gender || ''
    }));
  }, [name, email, number, gender]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target;  // Renamed to fieldName
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderDetailsUpdate(formData);
    onNext()
  };

  return (
    <Box mt={6}>
      <Paper sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2, position: "relative" }}>
        <HeadProcess title="Participant Details" step="2" />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                type='text'
                variant="outlined"
                required
                placeholder='Full Name'
                sx={fieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                variant="outlined"
                required
                placeholder='Enter your email'
                sx={fieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="number"
                value={formData.number}
                onChange={handleChange}
                type="text"
                variant="outlined"
                required
                placeholder='Enter your number'
                sx={fieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                required
                variant="outlined"
                placeholder='Enter your full address'
                sx={fieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                type="string"
                variant="outlined"
                placeholder='Enter your Gender'
                sx={fieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="text"
                variant="outlined"
                placeholder='Enter your Age'
                sx={fieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="hearAboutEvent"
                value={formData.hearAboutEvent}
                onChange={handleChange}
                type="text"
                variant="outlined"
                placeholder='How did you hear about the event?'
                sx={fieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="eventSpecificInfo"
                value={formData.eventSpecificInfo}
                onChange={handleChange}
                type="text"
                variant="outlined"
                placeholder='Event-specific information (e.g., meal preference)'
                sx={fieldStyles}
              />
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

        </form>
      </Paper>
    </Box>
  );
}

// Reusable styles
const fieldStyles = {
  backgroundColor: "#fff",
  borderRadius: "15px",
  '& .MuiOutlinedInput-root': { borderRadius: '15px' },
};