
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Container,
} from '@mui/material';

export function InfoCard() {
  return (
    <>
      <Paper elevation={3} sx={{ boxShadow: 3 }}>
        <Grid container spacing={3} p={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{ p: 3, bgcolor: '#cce7f9', borderRadius: 2, textAlign: 'center' }}
            >
              <Typography variant="subtitle1">Total Sales</Typography>
              <Typography variant="h5" fontWeight="bold">
                $45,000
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{ p: 3, bgcolor: '#cce7f9', borderRadius: 2, textAlign: 'center' }}
            >
              <Typography variant="subtitle1">Pending Payments</Typography>
              <Typography variant="h5" fontWeight="bold">
                $12,000
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{ p: 3, bgcolor: '#cce7f9', borderRadius: 2, textAlign: 'center' }}
            >
              <Typography variant="subtitle1">Disputed Transactions</Typography>
              <Typography variant="h5" fontWeight="bold">
                5 Cases
              </Typography>
            </Paper>
          </Grid>
        </Grid>


      </Paper>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: '#0e2a47', borderRadius: 2, py: 1.5 }}
          >
            Approve Event
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: '#0e2a47', borderRadius: 2, py: 1.5 }}
          >
            Manage Dispute
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: '#0e2a47', borderRadius: 2, py: 1.5 }}
          >
            Verify Transaction
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
