import { useNavigate } from 'react-router-dom';

import {
  Box, Typography, Avatar, Grid, Button, Paper, Divider, Tooltip
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { SocialLinks } from './socialLinks';

export function ProposalsCard({ proposals }: any) {
  const navigate = useNavigate();

  return (
    <>
      {proposals?.length > 0 ? (
        proposals?.map((__i: any, index: any) => (
          <Paper elevation={3} key={index || __i._id} sx={{
            borderRadius: 2.5,
            p: 4,
            mt: 3,
            mb: 4,
            backgroundColor: '#f9f9f9',

          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <Avatar
                  src={__i?.providerId?.avatar?.url}
                  alt="Provider"
                  sx={{ width: 80, height: 80 }}
                />
              </Grid>

              <Grid item xs={12} sm={10}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {__i?.providerId?.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {__i?.providerId?.username}
                    </Typography>
                    {__i?.providerId?.isVerified ? (
                      <Tooltip title="Verified">
                        <span> {/* or <Box> or <div> */}
                          <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not Verified">
                        <span> {/* or <Box> or <div> */}
                          <CancelIcon sx={{ color: '#F44336' }} />
                        </span>
                      </Tooltip>
                    )}
                  </Box>

                  <Typography variant="h6" color="primary">
                    {__i?.orgBudget} XAF
                  </Typography>
                </Grid>

                <Grid container justifyContent="space-between" alignItems="center">
                  <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {__i?.providerId?.serviceCategory}
                    </Typography>
                  </Box>
                </Grid>

                <Box mt={1} display="flex" alignItems="center" gap={1}>
                  <Box display="flex" alignItems="center">
                    {[...Array(5)].map((_, _idx) => (
                      <StarIcon
                        key={_idx}
                        fontSize="small"
                        sx={{
                          color: _idx < Math.floor(__i?.providerId?.averageRating || 0) ? '#f39c12' : '#ddd',
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2">| {__i?.providerId?.reviewCount} Reviews</Typography>
                  <Typography variant="body2">| 90% Completion</Typography>
                  <Typography variant="body2" textTransform="capitalize">| {__i?.providerId?.address}</Typography>
                </Box>

                <Grid container justifyContent="space-between"  >
                  <Grid item xs={12} sm={10} md={10}>
                    <Typography variant="body2" mt={2} minHeight={60}>
                      {__i?.providerId?.experience}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={10} md={2}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"  // Horizontal centering
                      justifyContent="center"  // Vertical centering
                      height="100%"  // Ensure the Box takes full height of Grid item
                    >
                      {/* <Typography variant="body2" color="text.secondary">
                        in 50 days
                      </Typography> */}
                      <Button
                        variant="outlined"
                        startIcon={<ChatIcon />}
                        onClick={() => {
                          navigate("/messaging-relationship");
                          sessionStorage.setItem('currentChatProvider', JSON.stringify(__i?.providerId));
                        }}
                        size="small"
                        sx={{ mt: 1 }}  // Add some margin top for spacing
                      >
                        Chat
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Social Links */}
            <SocialLinks socialLinks={__i?.providerId?.socialLinks} />
          </Paper>
        ))

      ) : (
        // Show "No Proposals" when length is 0 or undefined
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2.5,
            p: 4,
            mt: 3,
            mb: 4,
            backgroundColor: '#f9f9f9',
            display: 'flex',           // Added for centering
            alignItems: 'center',      // Vertical centering
            justifyContent: 'center',  // Horizontal centering
            height: 200,               // Set your desired height (in pixels)
            textAlign: 'center'        // Ensures text alignment is centered
          }}
        >
          <Typography variant="body1" color="blue">No Proposals Found Yet...</Typography>
        </Paper>
      )}
    </>

  );
}
