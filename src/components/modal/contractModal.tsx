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
  Paper
} from '@mui/material';

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Contract Details
        <Chip 
          label={contract.contractStatus.toUpperCase()} 
          color={
            contract.contractStatus === 'signed' ? 'primary' :
            contract.contractStatus === 'ongoing' ? 'secondary' :
            'success'
          }
          sx={{ ml: 2 }}
        />
      </DialogTitle>
      
      <DialogContent dividers>
        {/* Event Information Section */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Event Information
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar 
              src={contract.organizerId?.avatar?.url} 
              alt={contract.organizerId?.name}
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography><strong>Organizer:</strong> {contract.organizerId?.name}</Typography>
              <Typography variant="body2">{contract.organizerId?.email}</Typography>
            </Box>
          </Box>
          
          <Typography><strong>Event Name:</strong> {contract.eventId?.eventName}</Typography>
          <Typography><strong>Date:</strong> {formatDate(contract.eventTime)}</Typography>
          <Typography><strong>Location:</strong> {contract.eventId?.location}</Typography>
        </Paper>

        {/* Service Details Section */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Service Details
          </Typography>
          <Typography><strong>Service Type:</strong> {contract.serviceRequestId?.serviceType}</Typography>
          <Typography><strong>Original Budget Range:</strong> {contract.serviceRequestId?.budget}</Typography>
          <Typography><strong>Final Agreed Budget:</strong> {contract.finalBudget} XAF</Typography>
        </Paper>

        {/* Contract Terms Section */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Contract Terms
          </Typography>
          <Typography><strong>Requirements:</strong> {contract.explainReq || 'Not specified'}</Typography>
          <Typography mt={2}><strong>Contract Created:</strong> {formatDate(contract.createdAt)}</Typography>
          <Typography><strong>Last Updated:</strong> {formatDate(contract.updatedAt)}</Typography>
        </Paper>

        {/* Status Information */}
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Status Information
          </Typography>
          <Typography><strong>Request Status:</strong> 
            <Chip 
              label={contract.eventReqId?.status?.replace(/-/g, ' ')} 
              color="info" 
              size="small" 
              sx={{ ml: 1, textTransform: 'capitalize' }}
            />
          </Typography>
        </Paper>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};