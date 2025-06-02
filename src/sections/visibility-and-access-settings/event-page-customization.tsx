import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box, Grid, FormControl, InputLabel, Select, MenuItem,
  Button,
  Typography,
  TextField,
  Input,SelectChangeEvent
} from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { AppDispatch, RootState } from 'src/redux/store';
import { eventCustomizationPageUpdate, eventUpdate } from 'src/redux/actions/event.action';

export const EventCustomization = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fullData } = useSelector((state: RootState) => state?.event);
  const [selectedEventId, setSelectedEventId] = useState<string>('');

  const [primaryColor, setPrimaryColor] = useState('#072F4A');
  const [secondaryColor, setSecondaryColor] = useState('#3F51B5');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [eventLogoPreview, setEventLogoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const eventBannerRef = useRef<HTMLInputElement>(null);

  const handleEventChange = (event: SelectChangeEvent<string>) => {
    setSelectedEventId(event.target.value);
  };

  const handleEventThemeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      // Create object URL for preview
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setEventLogoPreview(previewUrl);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => () => {
    if (eventLogoPreview) {
      URL.revokeObjectURL(eventLogoPreview);
    }
  }, [eventLogoPreview]);

  const handleEventBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      // Create object URL for preview
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(previewUrl);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
  }, [previewImage]);

  const handleSubmit = useCallback(async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    const eventLogo = fileInputRef.current?.files;
    const eventBanner = eventBannerRef.current?.files;

    formData.append('themeColor', primaryColor);
    formData.append('customColor', secondaryColor);
    if (eventLogo && eventLogo.length > 0) {
      const selectedFile = eventLogo[0];
      formData.append("eventLogo", selectedFile);
    }
    if (eventBanner && eventBanner.length > 0) {
      const selectedFile = eventBanner[0];
      formData.append("coverImage", selectedFile);
    }
    const updatedEvent = {
      _id: selectedEventId,
      formData
    }
    const result = await dispatch(eventCustomizationPageUpdate(updatedEvent));

    if (result?.status === 200) {
      toast.success("Chaanges applied Successfully...");
      // setTimeout(() => setSelectedEventId('')
      //   , 2000);

    } else {
      toast.error(result?.message);
    }
  }, [dispatch,primaryColor,secondaryColor,selectedEventId]);


  return (
    <Box
      boxShadow={3}
      borderRadius={3}
      p={{ xs: 2, sm: 3, md: 4 }}
      bgcolor="white"
      mt={3}
    >
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <Box display="flex" justifyContent="space-between">
          <HeadingCommon title="Event Page Customization" />

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Event</InputLabel>
              <Select
                value={selectedEventId}
                onChange={handleEventChange}
                label="Select Event"
                sx={{ minWidth: 200 }}
              >
                {fullData.map((event: any) => (
                  <MenuItem key={event._id} value={event._id}>
                    {event.eventName} ({event.date})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Box>

        {/* Theme Color Selection */}
        <Box mt={3}>
          <HeadingCommon title="Theme Color Selection" baseSize="20px" />
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={4} mt={2}>
            <Box flex={1}>
              <HeadingCommon title="Primary Color:" baseSize="16px" />
              <Input
                type="color"
                name="primaryColor"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                sx={{ width: '100%', height: '40px', border: 'none' }}
              />
            </Box>
            <Box flex={1}>
              <HeadingCommon title="Secondary Color:" baseSize="16px" />
              <Input
                type="color"
                name="secondaryColor"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                style={{ width: '100%', height: '40px', border: 'none' }}
              />
            </Box>
          </Box>
        </Box>

        {/* Background Image Upload */}
        <Box mt={4}>
          <HeadingCommon title="Background Image Upload" baseSize="20px" />
          <Input
            type="file"
            fullWidth
            disableUnderline
            name="eventBanner"
            onChange={handleEventBanner}
            inputRef={eventBannerRef}
            inputProps={{ accept: 'image/*' }}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              padding: '8px',
              marginBottom: 2
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "250px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFF",
              boxShadow: 2,
              border: "1px solid #D3D3D3",
              overflow: "hidden",
              marginBottom: 4,
            }}
          >
            {previewImage ? (
              <img src={previewImage}
                alt="Logo Preview"
                style={{
                  width: '100%',
                  borderRadius: 8,
                  maxHeight: '300px',
                  objectFit: 'cover'
                }} />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Event Banner
              </Typography>
            )}
          </Box>
        </Box>

        {/* Event Logo Upload */}
        <Box mt={3}>
          <HeadingCommon title="Event Logo Upload" baseSize="20px" />
          <TextField
            type="file"
            fullWidth
            required
            name="eventLogo"
            onChange={handleEventThemeLogo}
            inputRef={fileInputRef}
            InputProps={{
              sx: {
                borderRadius: '10px',
                border: '1px solid #ccc',
                backgroundColor: '#F9F9F9',
              },
              inputProps: {
                accept: "image/*",
              },
            }}
          />
          <Box
            sx={{
              width: "120px",
              height: "120px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFF",
              boxShadow: 2,
              border: "1px solid #D3D3D3",
              overflow: "hidden",
              marginBottom: 4,
            }}
          >
            {eventLogoPreview ? (
              <img src={eventLogoPreview}
                alt="Logo Preview"
                style={{
                  width: '100%',
                  borderRadius: 8,
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #eee'
                }} />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Logo
              </Typography>
            )}
          </Box>
        </Box>

        {/* Save Button */}
        <Box mt={3}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#072F4A',
              color: 'white',
              py: 1.5,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Apply Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};


