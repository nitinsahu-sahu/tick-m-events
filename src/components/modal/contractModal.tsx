import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Avatar,
  Box,
  Paper,
  Grid,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface ContractDetailsModalProps {
  open: boolean;
  onClose: () => void;
  contract: any;
}

export const ContractDetailsModal: React.FC<ContractDetailsModalProps> = ({
  open,
  onClose,
  contract
}) => {
  if (!contract) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'ongoing': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 2,
        position: 'relative'
      }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Service Contract Agreement
          </Typography>
          <Typography variant="subtitle1">
            Contract ID: {contract._id}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
        
        {/* Tick-M Events Stamp */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 60,
            opacity: 0.9,
            transform: 'rotate(5deg)',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #ff6b6b 0%, #ff8e53 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
              border: '2px solid white',
              textAlign: 'center',
              lineHeight: 1.1
            }}
          >
            TICK-M<br />EVENTS
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3, position: 'relative' }}>
        {/* Watermark Stamp */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-30deg)',
            opacity: 0.03,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontSize: '120px',
              color: '#667eea',
              whiteSpace: 'nowrap'
            }}
          >
            TICK-M EVENTS
          </Typography>
        </Box>

        {/* Header Status Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
            sx={{textTransform:'capitalize'}}
              label={`Provider: ${contract.providerStatus}`}
              color={getStatusColor(contract.providerStatus)}
              variant="outlined"
            />
            <Chip
            sx={{textTransform:'capitalize'}}
              label={`Organizer: ${contract.orgStatus}`}
              color={getStatusColor(contract.orgStatus)}
              variant="outlined"
            />
            <Chip
            sx={{textTransform:'capitalize'}}
              label={`Project: ${contract.projectStatus}`}
              color={getStatusColor(contract.projectStatus)}
              variant="outlined"
            />
          </Box>
          <Chip
            label={contract.isSigned ? "Contract Signed" : "Pending Signature"}
            color={contract.isSigned ? "success" : "warning"}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Grid container spacing={3} position="relative" zIndex={1}>
          {/* Left Column - Parties Information */}
          <Grid item xs={12} md={6}>
            {/* Organizer Information */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, position: 'relative' }}>
              {/* Small stamp on organizer section */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '10px',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                TM
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <PersonIcon sx={{ mr: 1 }} /> Client Information
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={contract.organizerId?.avatar?.url}
                  alt={contract.organizerId?.name}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{contract.organizerId?.name}</Typography>
                  <Typography variant="body2">{contract.organizerId?.email}</Typography>
                </Box>
              </Box>
            </Paper>

            {/* Event Information */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <EventIcon sx={{ mr: 1 }} /> Event Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Event Name</Typography>
                <Typography>{contract.eventId?.eventName || 'Not specified'}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                <Typography 
                  dangerouslySetInnerHTML={{ __html: contract.eventId?.description || 'No description' }}
                  sx={{ fontSize: '0.9rem' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                <Typography>{contract.eventId?.location || 'Not specified'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                  <Typography>{formatDate(contract.eventId?.date)}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Time</Typography>
                  <Typography>{contract.eventId?.time || '-'}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Service & Contract Details */}
          <Grid item xs={12} md={6}>
            {/* Service Information */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <AssignmentIcon sx={{ mr: 1 }} /> Service Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Service Type</Typography>
                <Typography>{contract.serviceRequestId?.serviceType}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Service Description</Typography>
                <Typography 
                  dangerouslySetInnerHTML={{ __html: contract.serviceRequestId?.description }}
                  sx={{ fontSize: '0.9rem' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Budget Range</Typography>
                <Typography>{contract.serviceRequestId?.budget}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Additional Options</Typography>
                <Typography>{contract.serviceRequestId?.additionalOptions || 'None'}</Typography>
              </Box>
            </Paper>

            {/* Contract Terms */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, position: 'relative' }}>
              {/* Small stamp on terms section */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #ff6b6b 0%, #ff8e53 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '10px',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                TM
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <AttachMoneyIcon sx={{ mr: 1 }} /> Financial Terms
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Agreed Budget</Typography>
                <Typography variant="h6" color="primary">{contract.orgBudget} XAF</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Provider&apos;s Proposal</Typography>
                <Typography>{contract.providerProposal?.amount} XAF ({contract.providerProposal?.days} days)</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Provider&apos;s Message</Typography>
                <Typography sx={{ fontStyle: 'italic' }}>&quot;{contract.providerProposal?.message}&quot;</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Requirements Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3, position: 'relative', zIndex: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            <DescriptionIcon sx={{ mr: 1 }} /> Requirements & Specifications
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Main Requirements</Typography>
                <Typography>{contract.orgRequirement}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Additional Requirements</Typography>
                <Typography>{contract.orgAdditionalRequirement || 'None specified'}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Service Location</Typography>
                <Typography>{contract.eventLocation}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Service Time</Typography>
                <Typography>{formatDateTime(contract.serviceTime)}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Timeline Information */}
        <Paper elevation={2} sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            <ScheduleIcon sx={{ mr: 1 }} /> Timeline
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Contract Created</Typography>
                <Typography>{formatDateTime(contract.createdAt)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Last Updated</Typography>
                <Typography>{formatDateTime(contract.updatedAt)}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, position: 'relative', zIndex: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        {!contract.isSigned && (
          <Button variant="contained" color="primary">
            Sign Contract
          </Button>
        )}
        
        {/* Footer Stamp */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 16,
            opacity: 0.7,
            fontSize: '10px',
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '8px',
              marginRight: '4px'
            }}
          >
            TM
          </Box>
          Tick-M Events Official Document
        </Box>
      </DialogActions>
    </Dialog>
  );
};