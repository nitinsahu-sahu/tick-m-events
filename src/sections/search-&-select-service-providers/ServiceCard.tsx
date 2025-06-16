import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Chip, Button, Paper, SelectChangeEvent, Divider, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { organizerRequstToProvider } from 'src/redux/actions/service-request';
import { AppDispatch } from 'src/redux/store';

function truncateHtmlText(html: string, wordCount: number) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const text = temp.textContent || '';
  const words = text.trim().split(/\s+/);
  const truncated = words.slice(0, wordCount).join(' ');
  return words.length > wordCount ? `${truncated}...` : truncated;
}

interface ApiResult {
  status: number;
  type: string;
  message: any;
}

// ServiceCard.tsx (new component)
export function ServiceCard({ service, onRequest, eventId, disabled = false }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [negotiation, setNegotiation] = useState('');

  const handleRequest = async () => {
    if (!eventId || !service?._id) return;

    setIsLoading(true);
    setError(null);

    const request = {
      serviceId: service._id,
      eventId,
      message: negotiation
    }
    try {
      const result = await dispatch(organizerRequstToProvider(request));
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      if (result?.status === 201) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }

    } catch (err) {
      toast.error(err.message || 'Failed to send request');
    } finally {
      setIsLoading(false);
    }
  };

  if (!service) {
    return (
      <Paper elevation={2} sx={{
        p: 3,
        borderRadius: 2,
        height: '100%',
        textAlign: 'center',
        backgroundColor: '#fafafa'
      }}>
        <Typography variant="body1" color="text.secondary">
          No service information available
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{
      p: 2,
      borderRadius: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      opacity: disabled ? 0.7 : 1,
      filter: disabled ? 'grayscale(50%)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      {/* Status Chip and Service Type */}
      <Box sx={{ mt: 'auto' }} display='flex' justifyContent="space-between">
        <HeadingCommon
          variant="subtitle1"
          mb={1}
          baseSize="15px"
          weight={600}
          title={service.serviceType}
          sx={{ color: disabled ? 'text.disabled' : 'inherit' }}
        />

        <Chip
          label={service.status}
          size="small"
          color={service.status === 'active' ? 'success' : 'default'}
          sx={{
            mb: 0,
            textTransform: 'capitalize',
            opacity: disabled ? 0.7 : 1
          }}
        />
      </Box>

      {/* Service Details */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1,
        color: disabled ? 'text.disabled' : 'inherit'
      }}>
        <EventIcon color={disabled ? 'disabled' : 'action'} sx={{ mr: 1, fontSize: '18px' }} />
        <Typography variant="body2">
          {new Date(service.dateAndTime).toLocaleString()}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1,
        color: disabled ? 'text.disabled' : 'inherit'
      }}>
        <LocationOnIcon color={disabled ? 'disabled' : 'action'} sx={{ mr: 1, fontSize: '18px' }} />
        <Typography variant="body2">
          {service.eventLocation}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        color: disabled ? 'text.disabled' : 'inherit'
      }}>
        <AttachMoneyIcon color={disabled ? 'disabled' : 'action'} sx={{ mr: 1, fontSize: '18px' }} />
        <Typography variant="body2" fontWeight={500}>
          {service.budget}
        </Typography>
      </Box>

      {/* Description */}
      <Divider sx={{ my: 1 }} />
      <Box sx={{
        mb: 2,
        color: disabled ? 'text.disabled' : 'text.secondary'
      }}>
        <Typography variant="body2">
          {truncateHtmlText(service.description, 25)}
        </Typography>
      </Box>

      {/* Request Button */}
      <Button
        fullWidth
        variant="contained"
        size="small"
        startIcon={<CheckCircleIcon />}
        onClick={handleRequest}
        sx={{
          mt: 1,
          backgroundColor: disabled ? '#e0e0e0' : '#4CAF50',
          color: disabled ? '#9e9e9e' : 'white',
          '&:hover': {
            backgroundColor: disabled ? '#e0e0e0' : '#388E3C',
            boxShadow: 'none'
          },
          '& .MuiSvgIcon-root': {
            color: disabled ? '#9e9e9e' : 'white'
          }
        }}
        disabled={disabled || service.status !== 'active'}
      >
        {disabled ? 'Select an event first' :
          service.status === 'active' ? 'Request Service' : 'Not Available'}
      </Button>
    </Paper>
  );
}