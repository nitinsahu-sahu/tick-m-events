import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Avatar, Grid, Button, Paper, Divider, Tooltip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { SocialLinks } from './socialLinks';

// TabPanel component for rendering tab content
function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`proposals-tabpanel-${index}`}
      aria-labelledby={`proposals-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export function ProposalsCard({ proposals }: any) {
  const navigate = useNavigate();
  

  // Sample data for demonstration - in a real app, this would come from props
  const manualBids = proposals || [];
  return (
    <Box>
      {manualBids?.length > 0 ? (
        manualBids.map((proposal: any, index: any) => (
          <ProposalItem key={index || proposal._id} proposal={proposal} />
        ))
      ) : (
        <EmptyProposals message="No Manual Bids Found Yet..." />
      )}
    </Box>
  );
}

// Component for individual proposal item
function ProposalItem({ proposal }: any) {
  const navigate = useNavigate();

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

            <Typography variant="h6" color="primary">
              {proposal?.orgBudget} {proposal?.isCustom ? '' : 'XAF'}
            </Typography>
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
            <Grid item xs={12} sm={10} md={10}>
              <Typography variant="body2" mt={2} minHeight={60}>
                {proposal?.providerId?.experience}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} md={2}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
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
                  sx={{ mt: 1 }}
                >
                  Chat
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