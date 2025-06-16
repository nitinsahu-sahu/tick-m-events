import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Grid, InputLabel, ListSubheader
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { serviceReqCreate } from 'src/redux/actions/service-request.action';
import { AppDispatch, RootState } from 'src/redux/store';
import { fetchAllCategories } from 'src/redux/actions/event.action';


// Constants
const SERVICE_TYPES = [
  { value: 'Catering', label: 'Catering' },
  { value: 'Photography', label: 'Photography' },
  { value: 'themed birthday setups', label: 'Themed Birthday Setups (Kids/Adults)' },
  { value: 'balloon garlands & arches', label: 'Balloon Garlands & Arches' },
  { value: 'candy buffet & dessert table styling', label: 'Candy Buffet & Dessert Table Styling' },
  { value: 'Branded Stage & Backdrop Design', label: 'Branded Stage & Backdrop Design' },
  { value: 'Lounge & Networking Area Setup', label: 'Lounge & Networking Area Setup' },
  { value: 'Festival Stage Backdrops (Diwali, Christmas, Eid)', label: 'Festival Stage Backdrops (Diwali, Christmas, Eid)' },
  { value: 'Hanging Lights & Lanterns', label: 'Hanging Lights & Lanterns' },
];

const FORM_INITIAL_STATE = {
  serviceType: '',
  location: '',
  dateTime: '',
  budget: '',
  status: ''
};

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'black' },
    '&:hover fieldset': { borderColor: 'black' },
    '&.Mui-focused fieldset': { borderColor: 'black' }
  }
};

interface ApiResult {
  status: number;
  type: string;
  message: any;
}

const ServiceRequestForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [eventBanner, setEventBanner] = useState<File | null>(null);
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);
  const { categories } = useSelector((state: RootState) => state?.event);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  const fullDesRef = useRef<ReactQuill>(null);
  const addOptionRef = useRef<ReactQuill>(null);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: { target: { value: string } }) => {
    setFormData(prev => ({ ...prev, serviceType: e.target.value }));
  };

  const handleEventBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEventBanner(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData(FORM_INITIAL_STATE);
    setEventBanner(null);
    fullDesRef.current?.getEditor().setText('');
    addOptionRef.current?.getEditor().setText('');
  };

  const handleSubmit = useCallback(async (event: React.FormEvent, status: string) => {
    event.preventDefault();

    const formServiceData = new FormData();
    formServiceData.append("serviceType", formData.serviceType);
    formServiceData.append("eventLocation", formData.location);
    formServiceData.append("dateAndTime", formData.dateTime);
    formServiceData.append("budget", formData.budget);
    formServiceData.append("description", fullDesRef.current?.value as string);
    formServiceData.append("additionalOptions", addOptionRef.current?.value as string);
    formServiceData.append("status", status);

    if (eventBanner) {
      formServiceData.append("coverImage", eventBanner);
    }

    try {
      const result = await dispatch(serviceReqCreate(formServiceData)) as ApiResult;

      if (result?.status === 201) {
        toast.success("Requested Successfully...");
        resetForm();
      } else {
        toast.error(result?.message || "Service creation failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  }, [dispatch, formData, eventBanner]);

  // Form sections
  const renderServiceTypeField = () => (
    <Box mt={2}>
      <Typography fontWeight={600} color="text.primary" mb={1}>
        Type of Service Needed
      </Typography>
      <FormControl fullWidth sx={inputStyles}>
        <Select
          required
          value={formData.serviceType}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value="">Select Services</MenuItem>
          {SERVICE_TYPES.map((service) => (
            <MenuItem key={service.value} value={service.value}>
              {service.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const renderTextField = (label: string, name: string, type = 'text') => (
    <Box mt={2}>
      <Typography fontWeight={600} color="text.primary" mb={1}>
        {label}
      </Typography>
      <TextField
        required={name !== 'coverImage'}
        name={name}
        type={type}
        value={formData[name as keyof typeof formData] || ''}
        onChange={handleChange}
        fullWidth
        sx={inputStyles}
        InputLabelProps={type === 'datetime-local' ? { shrink: true } : undefined}
        InputProps={name === 'coverImage' ? {
          inputProps: { accept: "image/*" }
        } : undefined}
      />
    </Box>
  );

  const renderRichTextEditor = (label: string, ref: React.RefObject<ReactQuill>) => (
    <Box my={2}>
      <Typography fontWeight={600} color="text.primary" mb={1}>
        {label}
      </Typography>
      <ReactQuill
        placeholder={label.includes('Full') ? 'Description...' : 'Add Additional...'}
        theme="snow"
        className="custom-quill"
        ref={ref}
      />
    </Box>
  );

  const renderButtons = () => (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      gap={2}
      mt={4}
    >
      <Button
        variant="contained"
        type="submit"
        onClick={(e) => handleSubmit(e, 'active')}
        sx={{
          backgroundColor: '#0D274D',
          borderRadius: '25px',
          px: 2,
          py: 1,
          fontWeight: 600,
          '&:hover': { backgroundColor: '#0b223f' },
          width: { xs: '100%', md: '40%', lg: '50%' },
        }}
      >
        Send Request
      </Button>

      <Button
        variant="outlined"
        type="submit"
        onClick={(e) => handleSubmit(e, 'draft')}
        sx={{
          borderRadius: '25px',
          px: 2,
          py: 1,
          fontWeight: 600,
          borderColor: '#0D274D',
          color: '#0D274D',
          '&:hover': { backgroundColor: '#f1f1f1' },
          width: { xs: '100%', md: '40%', lg: '50%' },
        }}
      >
        Save as Draft
      </Button>
    </Box>
  );

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
        <form encType="multipart/form-data">
          {renderServiceTypeField()}
          {renderTextField('Event Location', 'location')}
          {renderTextField('Date & Time of the Service', 'dateTime', 'datetime-local')}
          {renderTextField('Estimated Budget', 'budget')}
          {renderRichTextEditor('Full Description of Requirements', fullDesRef)}

          <Grid item xs={12} mt={2}>
            <Typography fontWeight={600} color="text.primary" mb={1}>
              File Upload (Optional)
            </Typography>
            <TextField
              type="file"
              fullWidth
              name="coverImage"
              onChange={handleEventBanner}
              sx={inputStyles}
              InputProps={{
                inputProps: { accept: "image/*" }
              }}
            />
          </Grid>

          {renderRichTextEditor('Additional Options', addOptionRef)}
          {renderButtons()}
        </form>
      </Stack>
    </Box>
  );
};

export default ServiceRequestForm;