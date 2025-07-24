import React from 'react';
import {
  Typography,
  Paper,
  Button,
  Grid,
  Box,
} from '@mui/material';

interface InfoCardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function InfoCard({ activeTab, setActiveTab }: InfoCardProps) {
  const tabs = ['Approve Event', 'Manage Dispute', 'Verify Transaction'];

  return (
    <>
      <Paper elevation={3} sx={{ boxShadow: 3 }}>
        <Grid container spacing={3} p={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#cce7f9', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Total Sales</Typography>
              <Typography variant="h5" fontWeight="bold">
                $45,000
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#cce7f9', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Pending Payments</Typography>
              <Typography variant="h5" fontWeight="bold">
                $12,000
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#cce7f9', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Disputed Transactions</Typography>
              <Typography variant="h5" fontWeight="bold">
                5 Cases
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Tab Buttons */}
      <Grid container spacing={2} mt={2}>
        {tabs.map((label) => (
          <Grid item xs={12} md={4} key={label}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setActiveTab(label)}
              sx={{
                bgcolor: activeTab === label ? '#0e2a47' : 'white',
                color: activeTab === label ? 'white' : '#0e2a47',
                border: '1px solid #0e2a47',
                borderRadius: 2,
                py: 1.5,
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: activeTab === label ? '#0b2035' : '#0e2a47',
                  color: 'white',
                },
              }}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
