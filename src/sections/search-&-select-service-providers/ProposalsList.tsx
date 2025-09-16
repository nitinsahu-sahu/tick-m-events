import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Avatar, Grid, Button, Paper, Divider, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, Chip, IconButton
} from '@mui/material';
import { useCallback, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { SocialLinks } from './socialLinks';

export function ProposalsCard({ proposals }: any) {
  const navigate = useNavigate();
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAwardClick = (proposal: any) => {
    setSelectedProposal(proposal);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProposal(null);
  };

  const handleAwardedProject = useCallback((status: any) => {
    // Handle accept logic here
    console.log('Accepting proposal:', selectedProposal);
    handleDialogClose();
  }, [selectedProposal])

  const manualBids = proposals || [];

  return (
    <Box>
      {manualBids?.length > 0 ? (
        manualBids.map((proposal: any, index: any) => (
          <ProposalItem
            key={index || proposal._id}
            proposal={proposal}
            onAwardClick={handleAwardClick}
          />
        ))
      ) : (
        <EmptyProposals message="No Manual Bids Found Yet..." />
      )}

      {/* Award Proposal Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Review Proposal</Typography>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedProposal && (
            <ProposalDetails proposal={selectedProposal} />
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleAwardedProject('rejected')}
            sx={{ minWidth: 120 }}
          >
            Reject Request
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAwardedProject('accepted')}
            sx={{ minWidth: 120 }}
          >
            Award Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Component for individual proposal item
function ProposalItem({ proposal, onAwardClick }: any) {
  const navigate = useNavigate();
  const [selectedBid, setSelectedBid] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleBidSelect = (bid: any) => {
    setSelectedBid(bid);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedBid(null);
  };
  return (
    <Paper elevation={3} sx={{
      borderRadius: 2.5,
      p: 4,
      mt: 3,
      mb: 4,
      backgroundColor: '#f9f9f9',
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Avatar
            src={proposal?.providerId?.avatar?.url}
            alt="Provider"
            sx={{ width: 80, height: 80 }}
          />
        </Grid>

        <Grid item xs={12} sm={10}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
              <Typography variant="h6" fontWeight="bold">
                {proposal?.providerId?.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {proposal?.providerId?.username}
              </Typography>
              {proposal?.providerId?.isVerified ? (
                <Tooltip title="Verified">
                  <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                </Tooltip>
              ) : (
                <Tooltip title="Not Verified">
                  <CancelIcon sx={{ color: '#F44336' }} />
                </Tooltip>
              )}
            </Box>

            {
              proposal.providerStatus === 'pending' || proposal.providerStatus === 'rejected' ?
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    marginX: 0.5,
                    borderColor: "gray",
                    color: proposal.providerStatus === 'rejected' ? '#b71c1c' :
                      proposal.providerStatus === 'pending' ? '#2e7d32' : '#2e4e7dff',
                  }}
                >
                  {proposal.providerStatus}
                </Typography> : <Box>
                  <Typography variant="h6" color="primary">
                    {proposal?.providerProposal.amount} XAF
                  </Typography>
                  <Typography variant="subtitle2" color="#2e7d32" fontSize={10} textTransform="capitalize">
                    {proposal.providerStatus}
                  </Typography>
                </Box>
            }
          </Grid>

          <Grid container justifyContent="space-between" alignItems="center">
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
              <Typography variant="h6" fontWeight="bold">
                {proposal?.providerId?.serviceCategory}
              </Typography>
            </Box>
          </Grid>

          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <Box display="flex" alignItems="center">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  fontSize="small"
                  sx={{
                    color: index < Math.floor(proposal?.providerId?.averageRating || 0) ? '#f39c12' : '#ddd',
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2">| {proposal?.providerId?.reviewCount} Reviews</Typography>
            <Typography variant="body2">| 90% Completion</Typography>
            <Typography variant="body2" textTransform="capitalize">| {proposal?.providerId?.address}</Typography>
          </Box>

          <Grid container justifyContent="space-between">
            <Grid item xs={12} sm={10} md={9}>
              <Typography variant="body2" mt={2} minHeight={60}>
                {proposal?.providerId?.experience}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} md={3}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                height="100%"
              >
                <Button
                  variant="outlined"
                  startIcon={<ChatIcon />}
                  onClick={() => {
                    navigate("/messaging-relationship");
                    sessionStorage.setItem('currentChatProvider', JSON.stringify(proposal?.providerId));
                  }}
                  size="small"
                >
                  Chat
                </Button>
                <Button
                  variant="outlined"
                  sx={{ border: "1px solid green", color: "green" }}
                  startIcon={<EmojiEventsIcon />}
                  onClick={() => onAwardClick(proposal)}
                  size="small"
                  disabled={proposal?.isSigned}
                >
                  Award
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <SocialLinks socialLinks={proposal?.providerId?.socialLinks} />
    </Paper>
  );
}

// Component to display proposal details in the dialog
function ProposalDetails({ proposal }: any) {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar
          src={proposal?.providerId?.avatar?.url}
          alt="Provider"
          sx={{ width: 60, height: 60 }}
        />
        <Box>
          <Typography variant="h6">{proposal?.providerId?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {proposal?.providerId?.username}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">Service Category</Typography>
          <Typography variant="body2" mb={1}>{proposal?.providerId?.serviceCategory}</Typography>

          <Typography variant="subtitle2" fontWeight="bold">Service Location</Typography>
          <Typography variant="body2" mb={1}>{proposal?.eventLocation}</Typography>

          <Typography variant="subtitle2" fontWeight="bold">Service Time</Typography>
          <Typography variant="body2" mb={1}>
            {new Date(proposal?.serviceTime).toLocaleString()}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">Proposed Budget</Typography>
          <Typography variant="h6" color="primary" mb={1}>
            {proposal?.providerProposal?.amount} XAF
          </Typography>

          <Typography variant="subtitle2" fontWeight="bold">Estimated Days</Typography>
          <Typography variant="body2" mb={1}>{proposal?.providerProposal?.days} days</Typography>

          <Typography variant="subtitle2" fontWeight="bold">Provider Status</Typography>
          <Chip
            sx={{ textTransform: "capitalize" }}
            label={proposal?.providerStatus}
            color={
              proposal?.providerStatus === 'accepted' ? 'success' :
                proposal?.providerStatus === 'rejected' ? 'error' : 'default'
            }
            size="small"
          />
        </Grid>
      </Grid>

      <Box mt={2}>
        <Typography variant="subtitle2" fontWeight="bold">Provider&apos;s Message</Typography>
        <Typography variant="body2" sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          {proposal?.providerProposal?.message || "No message provided"}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2" fontWeight="bold">Your Requirements</Typography>
        <Typography variant="body2" sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          {proposal?.orgRequirement}
        </Typography>
      </Box>

      {proposal?.orgAdditionalRequirement && (
        <Box mt={2}>
          <Typography variant="subtitle2" fontWeight="bold">Additional Requirements</Typography>
          <Typography variant="body2" sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            {proposal?.orgAdditionalRequirement}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
// Component for empty state
function EmptyProposals({ message }: any) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2.5,
        p: 4,
        mt: 3,
        mb: 4,
        backgroundColor: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        textAlign: 'center'
      }}
    >
      <Typography variant="body1" color="blue">{message}</Typography>
    </Paper>
  );
}