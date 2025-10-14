import {
  Box, Grid, InputLabel, FormControl, TextField, MenuItem, Typography,
  Slider, FormControlLabel, Checkbox, Button, SelectChangeEvent, Select, Divider
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { fetchAllServiceCategories } from 'src/redux/actions';
import { providersCateFetch, providersListFetch } from 'src/redux/actions/searchSelect';
import { AppDispatch, RootState } from 'src/redux/store';


interface FilterState {
  search: string;
  serviceCategory: string;
  budget: number;
  rating: number;
  certified: boolean;
  location: string;
}

export const SearchAndAdvanceFilter = ({ onChange, onFiltersApplied }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state?.serviceReqCategories);

  useEffect(() => {
    dispatch(fetchAllServiceCategories());
  }, [dispatch]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    serviceCategory: '',
    budget: 0,
    rating: 0,
    certified: false,
    location: '',
  });

  useEffect(() => {
    dispatch(providersCateFetch());
  }, [dispatch]);

  const handleApplyFilters = async () => {
    await dispatch(providersListFetch(filters));
    onFiltersApplied(); // Notify parent that filters were applied
    onChange(null, 1); // Switch to provider list tab
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setFilters(prev => ({
      ...prev,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setFilters(prev => ({
      ...prev,
      serviceCategory: e.target.value
    }));
  };

  const handleSliderChange = (name: keyof FilterState) =>
    (_: Event, value: number | number[]) => {
      setFilters(prev => ({
        ...prev,
        [name]: Array.isArray(value) ? value[0] : value
      }));
    };

  return (
    <Box sx={{
      p: 3,
      my: 3,
      borderRadius: 3,
      backgroundColor: '#fff',
      border: '1px solid #E0E0E0',
      boxShadow: 3,
    }}>
      <Box textAlign="center">
        <HeadingCommon baseSize="30px" weight={700} variant="h3" title="Search & Advanced Filters" />
      </Box>

      <Grid container spacing={2}>
        {/* Search Field */}
        <Grid item xs={12}>
          <FormControl fullWidth>

            <TextField
              fullWidth
              name="search"
              label="Search by Name..."
              variant="outlined"
              value={filters.search}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>

        {/* Service Category */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="service-category-label">Select Service Category</InputLabel>
            <Select
              labelId="service-category-label"
              name="serviceCategory"
              label="Select Service Category"
              value={filters.serviceCategory}
              onChange={handleCategoryChange}
              sx={{
                '& .MuiSelect-select': {
                  py: {
                    xs: 1.5, // More padding for touch on mobile
                    sm: 1.75,
                    md: 2
                  }
                }
              }}
            >
              <MenuItem value="" disabled>
                <em>Select Service Category</em>
              </MenuItem>
              {categories?.map((category: any) => (
                <div key={category._id}>
                  {/* Main Category Item */}
                  <MenuItem
                    value={category.name}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: {
                        xs: '0.9rem', // Slightly smaller on mobile
                        sm: '1rem'     // Normal on larger screens
                      },
                      py: {
                        xs: 1.5, // More padding for touch
                        sm: 1.25 // Less padding on larger screens
                      }
                    }}
                  >
                    {category.name}
                  </MenuItem>

                  {/* Subcategories as disabled items */}
                  {category.subcategories?.map((subcategory: any) => (
                    <MenuItem
                      key={subcategory._id}
                      value={subcategory.name}
                      disabled
                      sx={{
                        pl: {
                          xs: 3, // Less indentation on mobile
                          sm: 4  // More indentation on larger screens
                        },
                        fontSize: {
                          xs: '0.8rem', // Smaller font on mobile
                          sm: '0.9rem'  // Slightly larger on larger screens
                        },
                        fontStyle: 'italic',
                        color: 'text.disabled',
                        py: {
                          xs: 1, // Less padding for subcategories
                          sm: 0.75
                        },
                        minHeight: 'auto', // Reduce height for subcategories
                        // Visual separator for better hierarchy on mobile
                        borderLeft: {
                          xs: '2px solid',
                          sm: 'none'
                        },
                        borderColor: 'divider',
                        mx: {
                          xs: 1, // Add margin on mobile
                          sm: 0  // No margin on larger screens
                        }
                      }}
                    >
                      {subcategory.name}
                    </MenuItem>
                  ))}

                  {/* Divider between categories for better mobile readability */}
                  <Box
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      my: {
                        xs: 0.5, // Less space on mobile
                        sm: 1    // More space on larger screens
                      },
                      mx: {
                        xs: 1,   // Horizontal margin on mobile
                        sm: 0    // No margin on larger screens
                      }
                    }}
                  />
                </div>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Budget Slider */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            Estimated Budget: {filters.budget} XAF
          </Typography>
          <Slider
            value={filters.budget}
            onChange={handleSliderChange('budget')}
            min={0}
            max={10000}
            step={100}
            valueLabelDisplay="auto"
          />
        </Grid>

        {/* Location Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location (City, Region)"
            name="location"
            variant="outlined"
            value={filters.location}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Rating Slider */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            Minimum Rating: {filters.rating}★
          </Typography>
          <Slider
            value={filters.rating}
            onChange={handleSliderChange('rating')}
            min={1}
            max={5}
            step={0.5}
            marks
            valueLabelDisplay="auto"
          />
        </Grid>

        {/* Certified Checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="certified"
                checked={filters.certified}
                onChange={handleInputChange}
                sx={{
                  color: 'black',
                  '&.Mui-checked': { color: '#0B2E4C' },
                }}
              />
            }
            label="Certified Providers Only"
          />
        </Grid>

        {/* Apply Button */}
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
              '&:hover': { bgcolor: '#003366' },
            }}
          >
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};