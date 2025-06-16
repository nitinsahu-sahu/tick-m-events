// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   FormControlLabel,
//   Checkbox,
//   Grid,
//   Button,
//   Input,
//   FormGroup,
// } from '@mui/material'

// interface SocialPlatforms {
//   facebook: boolean;
//   instagram: boolean;
//   tiktok: boolean;
//   whatsapp: boolean;
//   // Add other platforms if needed
// }

// export const CustomPhotoVideoFilter = () => {
//   const [selectedSocial, setSelectedSocial] = useState<SocialPlatforms>({
//     facebook: false,
//     instagram: false,
//     tiktok: false,
//     whatsapp: false,
//   });

//   const handleSocialChange = (event: any) => {
//     setSelectedSocial({
//       ...selectedSocial,
//       [event.target.name]: event.target.checked,
//     });
//   };

//   return (
//     <Box boxShadow={3} borderRadius={3} p={{ xs: 2, sm: 3, md: 4 }} bgcolor="white" mt={3}>
//       <Typography variant="h6" fontSize={{ xs: 15, sm: 20, md: 26 }} fontWeight={500} gutterBottom>
//         Custom Photo & Video Filters
//       </Typography>

//       {/* Enable Checkbox */}
//       <Box mb={2}>
//         <FormControlLabel
//           control={<Checkbox />}
//           label="Enable Custom Filters"
//         />
//       </Box>

//       {/* Filter Templates */}
//       <Box mb={3}>
//         <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
//           Choose Filter Template
//         </Typography>
//         <Grid container spacing={2}>
//           {[1, 2, 3, 4].map((item, index) => (
//             <Grid item xs={6} sm={3} key={index}>
//               <Box
//                 borderRadius={2}
//                 overflow="hidden"
//                 textAlign="center"
//                 sx={{ cursor: 'pointer' }}
//               >
//                 <img
//                   src="./assets/images/cover/1.png" // Replace with your filter image URLs
//                   alt="Filter"
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//                 <Typography
//                   fontSize={{ xs: 12, sm: 14, md: 16 }} fontWeight={400}
//                   variant="caption"
//                   display="block"
//                   p={1}
//                   position="relative"
//                   top="-30px"
//                   sx={{
//                     backgroundColor: '#DBDBDBE5',
//                   }}
//                 >
//                   {['Contrast', 'Black & White', 'Green', 'Contrast'][index]}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* Upload Custom Filter */}
//       <Box mb={3}>
//         <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
//           Upload Custom Filter
//         </Typography>
//         <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">

//           <Input type="file" disableUnderline sx={{ border: "1px solid black", padding: "8px", borderRadius: 2 }} />
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#0B2E4C",
//               color: "#fff",
//               padding: "11px",
//               width: "70%",
//             }}
//           >
//             Apply Upload Filter
//           </Button>
//         </Box>
//       </Box>

//       {/* Live Preview */}
//       <Box mb={3}>
//         <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
//           Live Preview
//         </Typography>
//         <Box
//           bgcolor="#E5E5E5"
//           borderRadius={2}
//           height={{ xs: 180, sm: 220 }}
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Typography variant="body2" color="text.secondary">
//             No media selected
//           </Typography>
//         </Box>
//       </Box>

//       {/* Automatic Social Sharing */}

//       {/* Apply Filters Button */}
//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           backgroundColor: '#072F4A',
//           color: 'white',
//           py: 1.5,
//           borderRadius: 3,
//           textTransform: 'none',
//           fontWeight: 'bold',
//         }}
//       >
//         Apply Filters
//       </Button>
//     </Box>
//   );
// };

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

interface SocialPlatforms {
  facebook: boolean;
  instagram: boolean;
  tiktok: boolean;
  whatsapp: boolean;
  // Add other platforms if needed
}

export const CustomPhotoVideoFilter = () => {
  const { fullData } = useSelector((state: RootState) => state?.event);
  console.log(fullData);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterImages, setFilterImages] = useState<string[]>([
    '/assets/images/cover/7.png',
    '/assets/images/cover/8.png',
    '/assets/images/cover/9.png',
    '/assets/images/cover/10.png',
  ]);
  const [frameAspectRatio, setFrameAspectRatio] = useState<number | null>(null);

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
  const handleEventChange = (event: any) => {
    setSelectedEventId(event.target.value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); 
      setFilterImages((prev) => [...prev, fileURL]);
    }
  };
 
  const selectedEvent = fullData.find((event: any) => event._id === selectedEventId);
const eventCoverImage = selectedEvent?.customization?.eventLogo?.url || '/assets/images/cover/1.png';

  return (
    <Box boxShadow={3} borderRadius={3} p={{ xs: 2, sm: 3, md: 4 }} bgcolor="white" mt={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontSize={{ xs: 15, sm: 20, md: 26 }} fontWeight={500}>
          Custom Photo & Video Filters
        </Typography>

        <FormControl fullWidth size="small" sx={{ maxWidth: 300 }}>
          <InputLabel>Select Event</InputLabel>
          <Select value={selectedEventId} onChange={handleEventChange} label="Select Event">
            {fullData.map((event: any) => (
              <MenuItem key={event._id} value={event._id}>
                {event.eventName} ({event.date})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
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


          <Grid container spacing={2}>
            {filterImages.map((filename, index) => (
              <Grid item xs={6} sm={3} mt={3} key={index}>
                <Box
                  borderRadius={2}
                  overflow="hidden"
                  textAlign="center"
                  sx={{
                    cursor: 'pointer',
                    border: selectedFilter === filename ? '3px solid #0B2E4C' : 'none',
                  }}
                  onClick={() => setSelectedFilter(filename)}
                >
                  <img
                    src={filename}
                    alt={`Filter ${index + 1}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

        </Grid>
      </Box>

      {/* Upload Custom Filter */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontSize={{ xs: 12, sm: 16, md: 20 }} fontWeight={500} gutterBottom>
          Upload Custom Filter
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">
          <Input
            type="file"
            onChange={handleFileUpload}
            disableUnderline
            sx={{ border: "1px solid black", padding: "8px", borderRadius: 2 }}
          />

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
        <Typography
          variant="subtitle1"
          fontSize={{ xs: 12, sm: 16, md: 20 }}
          fontWeight={500}
          gutterBottom
        >
          Live Preview
        </Typography>

        <Box
          bgcolor="#E5E5E5"
          borderRadius={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          overflow="hidden"
          sx={{
            aspectRatio: frameAspectRatio ? `${frameAspectRatio}` : '1 / 1',
            maxWidth: 320, 
            mx: 'auto', 
            width: '100%',
          }}
        >

          {selectedFilter ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                maxWidth: 300,
                maxHeight: 300,
              }}
            >
              {/* Base image (e.g., user image or static preview image) */}
              <img
                  src={eventCoverImage}
                alt="Base Preview"
                style={{
                  width: '45%',        
                  height: '70%',
                  objectFit: 'cover', 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)', 
                  zIndex: 1,
                }}
              />

              {/* Frame overlay */}
              <img
                src={selectedFilter}
                alt="Frame Overlay"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  const ratio = img.naturalWidth / img.naturalHeight;
                  setFrameAspectRatio(ratio);
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />

            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No filter selected
            </Typography>
          )}
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