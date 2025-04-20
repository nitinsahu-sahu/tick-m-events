import {
  Box,
  Slider,
  TextField,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import { useState } from 'react';

const categories = ['Web Development', 'Graphic Design', 'Marketing', 'Consulting'];

export const SearchAndAdvanceFilter = () => {
  const [budget, setBudget] = useState(0);
  const [rating, setRating] = useState(3);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleApplyFilters = () => {
    const filters = {
      searchQuery,
      category,
      budget,
      rating,
      certifiedOnly,
      location,
    };
    console.log('Applied Filters:', filters);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 2.5,
        p: { xs: 2, sm: 3, md: 4 },
        boxShadow: 4,
        maxWidth: '100%',
        
        mx: 'auto',
        my: { xs: 3, md: 5 },
      }}
    >
      <Typography variant="h3" gutterBottom textAlign="center">
        Search & Advanced Filters
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Name, Service, City..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            
            sx={{

              // Wrap all outline states under .MuiOutlinedInput-root
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                // Default border
                '& fieldset': {
                  borderColor: 'black',
                  borderRadius: '20px',
                },
                // Hover state
                '&:hover fieldset': {
                  borderColor: 'black',
                  borderRadius: '20px',
                },
                // Focused state
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                  borderRadius: '20px',
                },
              },
              // Label color
              '& .MuiInputLabel-root': {
                color: 'black',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'black',
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Select Service Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            InputLabelProps={{
              sx: {
                
                color: 'black',
                '&.Mui-focused': { color: 'black' },
              },
            }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
              '& .MuiSelect-icon': { color: 'black' },
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Service Category</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ color: 'black' }}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            Estimated Budget: ${budget}
          </Typography>

          <Slider
            value={budget}
            onChange={(_, val) => setBudget(val as number)}
            min={0}
            max={10000}
            step={100}
            valueLabelDisplay="auto"
            sx={{
              width: '100%',
              '& .MuiSlider-track': {
                backgroundColor: 'rgba(11, 46, 76, 1)', // Custom track color
                height: 8, // Thicker track
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#e0e0e0',
                height: 8, // Thicker rail
              },
              '& .MuiSlider-thumb': {
                width: 20, // Larger thumb
                height: 20, // Larger thumb
                backgroundColor: 'rgba(11, 46, 76, 1)', // Thumb color
                border: '2px solid white', // Thumb border color
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: 'none', // Remove box shadow on hover/focus
                },
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: 'rgba(11, 46, 76, 1)', // Background color for value label
                color: '#fff', // White text color for the label
                fontWeight: 'bold',
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Location (City, Region)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{
              // Wrap all outline states under .MuiOutlinedInput-root
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                // Default border
                '& fieldset': {
                  borderColor: 'black',
                  borderRadius: '20px',
                },
                // Hover state
                '&:hover fieldset': {
                  borderColor: 'black',
                  borderRadius: '20px',
                },
                // Focused state
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                  borderRadius: '20px',
                },
              },
              // Label color
              '& .MuiInputLabel-root': {
                color: 'black',
                borderRadius: '20px',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'black',
                borderRadius: '20px',
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            Minimum Rating: {rating}★
          </Typography>

          <Slider
            value={rating}
            onChange={(_, val) => setRating(val as number)}
            min={1}
            max={5}
            step={0.5}
            marks
            valueLabelDisplay="auto"
            sx={{
              width: '100%',
              '& .MuiSlider-track': {
                backgroundColor: 'rgba(11, 46, 76, 1)', // Custom track color
                height: 8, // Thicker track
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#e0e0e0',
                height: 8, // Thicker rail
              },
              '& .MuiSlider-thumb': {
                width: 20, // Larger thumb
                height: 20, // Larger thumb
                backgroundColor: 'rgba(11, 46, 76, 1)', // Thumb color
                border: '2px solid white', // Thumb border color
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: 'none', // Remove box shadow on hover/focus
                },
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: 'rgba(11, 46, 76, 1)', // Background color for value label
                color: '#fff', // White text color for the label
                fontWeight: 'bold',
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={certifiedOnly}
                onChange={(e) => setCertifiedOnly(e.target.checked)}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: '#0B2E4C',
                  },
                }}
              />
            }
            label="Certified Providers Only"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            fullWidth
            sx={{
              bgcolor: '#002244',
              borderRadius: '20px',
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              '&:hover': {
                bgcolor: '#003366',
              },
            }}
          >
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
