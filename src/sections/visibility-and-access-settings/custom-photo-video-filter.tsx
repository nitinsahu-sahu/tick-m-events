import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Input,
  FormGroup,
} from '@mui/material'

interface SocialPlatforms {
  facebook: boolean;
  instagram: boolean;
  tiktok: boolean;
  whatsapp: boolean;
  // Add other platforms if needed
}

export const CustomPhotoVideoFilter = () => {
  const [selectedSocial, setSelectedSocial] = useState<SocialPlatforms>({
    facebook: false,
    instagram: false,
    tiktok: false,
    whatsapp: false,
  });

  const handleSocialChange = (event: any) => {
    setSelectedSocial({
      ...selectedSocial,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box boxShadow={3} borderRadius={3} p={{ xs: 2, sm: 3, md: 4 }} bgcolor="white" mt={3}>
      <Typography variant="h6" fontSize={{ xs: 15, sm: 20, md: 26 }} fontWeight={500} gutterBottom>
        Custom Photo & Video Filters
      </Typography>

      {/* Enable Checkbox */}
      <Box mb={2}>
        <FormControlLabel
          control={<Checkbox />}
          label="Enable Custom Filters"
        />
      </Box>

      {/* Filter Templates */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Choose Filter Template
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box
                borderRadius={2}
                overflow="hidden"
                textAlign="center"
                sx={{ cursor: 'pointer' }}
              >
                <img
                  src="./assets/images/cover/1.png" // Replace with your filter image URLs
                  alt="Filter"
                  style={{ width: '100%', height: 'auto' }}
                />
                <Typography
                  fontSize={{ xs: 12, sm: 14, md: 16 }} fontWeight={400}
                  variant="caption"
                  display="block"
                  p={1}
                  position="relative"
                  top="-30px"
                  sx={{
                    backgroundColor: '#DBDBDBE5',
                  }}
                >
                  {['Contrast', 'Black & White', 'Green', 'Contrast'][index]}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Upload Custom Filter */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Upload Custom Filter
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">

          <Input type="file" disableUnderline sx={{ border: "1px solid black", padding: "8px", borderRadius: 2 }} />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0B2E4C",
              color: "#fff",
              padding: "11px",
              width: "70%",
            }}
          >
            Apply Upload Filter
          </Button>
        </Box>
      </Box>

      {/* Live Preview */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Live Preview
        </Typography>
        <Box
          bgcolor="#E5E5E5"
          borderRadius={2}
          height={{ xs: 180, sm: 220 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            No media selected
          </Typography>
        </Box>
      </Box>

      {/* Automatic Social Sharing */}

      {/* Apply Filters Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#072F4A',
          color: 'white',
          py: 1.5,
          borderRadius: 3,
          textTransform: 'none',
          fontWeight: 'bold',
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};