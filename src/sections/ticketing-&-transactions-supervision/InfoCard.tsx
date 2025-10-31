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
  const card = [
    {
      name: "Total Sales",
      value: "45,000 XAF"
    },
    {
      name: "Pending Payments",
      value: "45,000 XAF"
    },
    {
      name: "Approved Refunds",
      value: "45,000 XAF"
    },
    {
      name: "Commission on Ticketing Activities",
      value: "45,000 XAF"
    },
    {
      name: "Commission on Marketplace Activities",
      value: "45,000 XAF"
    }
  ]
  return (
    <>
      <Paper elevation={3} sx={{ boxShadow: 3 }}>
        <Grid container spacing={3} p={3} justifyContent="center">
          {
            card?.map((__i, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box display="flex" justifyContent="center">
                  <Paper sx={{
                    p: 3,
                    bgcolor: '#cce7f9',
                    borderRadius: 2,
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: 280
                  }}>
                    <Typography variant="subtitle1" fontSize={14} textTransform="capitalize">
                      {__i.name}
                    </Typography>
                    <Typography variant="subtitle1" fontSize={12} fontWeight="bold" textTransform="capitalize">
                      {__i.value}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            ))
          }
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
