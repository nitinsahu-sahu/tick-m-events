import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, Paper } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import { AppDispatch, RootState } from 'src/redux/store';
import { getActiveContractsByProvider } from '../../redux/actions/service-request';

const ProviderStats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeContracts } = useSelector((state: RootState) => state?.serviceRequest);

  useEffect(() => {
    dispatch(getActiveContractsByProvider());
  }, [dispatch]);

  const contractCount = activeContracts?.length || 0;
     
  const stats = [
    {
      title: 'Contracts Obtained',
      value: contractCount,
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#0099E5' }} />,
    },
    {
      title: 'Revenue Generated',
      value: '5,000,000 XAF', // You can make this dynamic
      icon: <MonetizationOnIcon sx={{ fontSize: 40, color: '#0099E5' }} />,
    },
    {
      title: 'Customer Ratings',
      value: '4.8/5', // You can make this dynamic
      icon: <StarRateIcon sx={{ fontSize: 40, color: '#0099E5' }} />,
    },
  ];

  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: '16px',
                textAlign: 'center',
                height: '100%',
                border: '1px solid #E0E0E0',
                boxShadow: '0 0 10px rgba(0,0,0,0.15)',
              }}
            >
              <Box mb={1}>{stat.icon}</Box>
              <Typography variant="h5" fontWeight="bold">
                {stat.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: '#0099E5', fontWeight: 'bold', mt: 1 }}
              >
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProviderStats;
