import React, { useCallback, useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Grid,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { serviceReqCreate } from 'src/redux/actions/service-request.action';
import { AppDispatch } from 'src/redux/store';

interface ApiResult {
  status: number;
  type: string;
  message: any;
  // Add other properties if needed
}

const ServiceRequestForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [eventBanner, setEventBanner] = useState(null); // Correct initialization
  const fullDesRef = useRef<ReactQuill>(null);
  const addOptionRef = useRef<ReactQuill>(null);

  const [formData, setFormData] = useState({
    serviceType: '',
    location: '',
    dateTime: '',
    budget: '',
    status: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    setFormData((prev) => ({ ...prev, serviceType: e.target.value }));
  };

  const handleEventBanner = (e: any) => {
    if (e.target.files?.[0]) { // Check if a file exists
      setEventBanner(e.target.files[0]); // Store the File object directly
    }
  };
  const handleSubmit = useCallback(async (event: any) => {
    event.preventDefault();
    const formServiceData = new FormData();
    formServiceData.append("serviceType", formData.serviceType);
    formServiceData.append("eventLocation", formData.location);
    formServiceData.append("dateAndTime", formData.dateTime);
    formServiceData.append("budget", formData.budget);
    formServiceData.append("description", fullDesRef?.current?.value as string);
    formServiceData.append("additionalOptions", addOptionRef?.current?.value as string);
    formServiceData.append("status", formData.status);
    if (eventBanner) {
      formServiceData.append("coverImage", eventBanner);
    }
    try {
      const result = await dispatch(serviceReqCreate(formServiceData));
      if ((result as ApiResult)?.status === 201) {
        toast.success(result?.message);
        setFormData({
          serviceType: '',
          location: '',
          dateTime: '',
          budget: '',
          status: ''
        })
        // Replace the empty array with a valid Delta object
        if (fullDesRef.current) {
          fullDesRef.current.getEditor().setText('');
        }
        if (addOptionRef.current) {
          addOptionRef.current.getEditor().setText('');
        }
        setEventBanner(null)
      } else {
        toast.error(result?.message);
      }

    } catch (error) {
      toast.error("Service creation failed");
    }
  }, [eventBanner, formData, dispatch])

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 3,
        p: 3,
        my: 3,
        border: '1px solid #E0E0E0',
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        Service Request Form
      </Typography>

      <Stack spacing={3}>
        <form encType='multipart/form-data' onSubmit={handleSubmit}>

          {/* Service Type */}
          <Box mt={2}>
            <Typography fontWeight={600} color="text.primary" mb={1}>
              Type of Service Needed
            </Typography>
            <FormControl fullWidth sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' }
              }
            }}>
              <Select
                required
                value={formData.serviceType}
                onChange={handleSelectChange}
                displayEmpty
              >
                <MenuItem value="">Select Services</MenuItem>
                <MenuItem value="Catering">Catering</MenuItem>
                <MenuItem value="Photography">Photography</MenuItem>
                <MenuItem value="Decoration">Decoration</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Location */}
          <Box mt={2}>
            <Typography fontWeight={600} color="text.primary" mb={1}>
              Event Location
            </Typography>
            <TextField
              required
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
            />
          </Box>

          {/* Date & Time */}
          <Box mt={2}>
            <Typography fontWeight={600} color="text.primary" mb={1}>
              Date & Time of the Service
            </Typography>

            <TextField
              name="dateTime"
              required
              type="datetime-local"
              value={formData.dateTime}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
            />
          </Box>

          {/* Budget */}
          <Box mt={2}>
            <Typography fontWeight={600} color="text.primary" mb={1}>
              Estimated Budget
            </Typography>
            <TextField
              required
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
            />
          </Box>

          {/* Requirements */}
          <Box my={2}>
            <Typography fontWeight={600} color="text.primary" mb={1}>
              Full Description of Requirements
            </Typography>
            <ReactQuill
              placeholder='Description...'
              theme="snow"
              className="custom-quill" // Add a custom class
              ref={fullDesRef}
            />
          </Box>

          {/* File Upload */}
          <Grid item xs={12} mt={2}>
            <Typography fontWeight={600} color="text.primary" mb={1}>
              File Upload (Optional)
            </Typography>
            <TextField
              type="file"
              fullWidth
              name="coverImage"
              onChange={handleEventBanner}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
              InputProps={{
                inputProps: {
                  accept: "image/*"
                }
              }}
            />
          </Grid>

          {/* Additional Options */}
          <Box mt={2}>
            <Typography fontWeight={600} color="text.primary" mb={1}>
              Additional Options
            </Typography>
            <ReactQuill
              placeholder='Add Additional...'
              theme="snow"
              className="custom-quill" // Add a custom class
              ref={addOptionRef}
            />
          </Box>

          {/* Buttons */}

          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }} // Only stack on mobile
            justifyContent="space-between"
            gap={2}
            mt={4}
          >
            <Button
              variant="contained"
              type='submit'
              onClick={() => {
                setFormData({ ...formData, status: 'active' });
              }}
              sx={{
                backgroundColor: '#0D274D',
                borderRadius: '25px',
                px: 2,
                py: 1,
                fontWeight: 600,
                '&:hover': { backgroundColor: '#0b223f' },
                width: { xs: '100%', md: '40%', lg: '50%' }, // Full width only on mobile
              }}
            >
              Send Request
            </Button>

            <Button
              variant="outlined"
              type='submit'
              onClick={() => {
                setFormData({ ...formData, status: 'draft' });
              }}
              sx={{
                borderRadius: '25px',
                px: 2,
                py: 1,
                fontWeight: 600,
                borderColor: '#0D274D',
                color: '#0D274D',
                '&:hover': { backgroundColor: '#f1f1f1' },
                width: { xs: '100%', md: '40%', lg: '50%' }, // Full width only on mobile
              }}
            >
              Save as Draft
            </Button>
          </Box>
        </form>
      </Stack>
    </Box>
  );
};

export default ServiceRequestForm;
