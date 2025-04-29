import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Tabs,
  Tab,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const monthlyData = [
  { name: 'April', revenue: 150000 },
  { name: 'May', revenue: 350000 },
  { name: 'June', revenue: 400000 },
  { name: 'July', revenue: 800000 },
  { name: 'August', revenue: 600000 },
  { name: 'September', revenue: 250000 },
  { name: 'October', revenue: 450000 },
  { name: 'November', revenue: 700000 },
];

const dailyData = [
  { day: '06', a: 50, b: 80 },
  { day: '07', a: 90, b: 60 },
  { day: '08', a: 75, b: 50 },
  { day: '09', a: 100, b: 85 },
  { day: '10', a: 60, b: 70 },
  { day: '11', a: 85, b: 65 },
  { day: '12', a: 55, b: 80 },
  { day: '13', a: 90, b: 60 },
  { day: '14', a: 70, b: 20 },
  { day: '15', a: 40, b: 95 },
];

const RevenueStats = () => {
  const [tab, setTab] = React.useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cardHeight = isMobile ? 'auto' : 400;

  return (
    <Grid container spacing={3}>
      {/* Line Chart */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: '16px',
            p: 2,
            height: cardHeight,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #E0E0E0',
            boxShadow: '0 0 10px rgba(0,0,0,0.15)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              Monthly Revenue Growth <span style={{ color: '#777' }}>2025</span>
            </Typography>
            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                minHeight: 'unset',
                '& .MuiTab-root': { minHeight: 'unset', fontSize: 13 },
              }}
            >
              <Tab label="Monthly" />
              <Tab label="Weekly" />
              <Tab label="Daily" />
            </Tabs>
          </Box>

          {/* Chart container */}
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  padding={{ left: 30, right: 20 }}
                />
                <YAxis
                  domain={[0, 800000]}
                  tickFormatter={(value) => (value === 0 ? '' : `${value / 1000}k`)}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0099E5"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Bar Chart */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: '14px',
            p: 2,
            bgcolor: '#0099E5',
            color: '#fff',
            position: 'relative',
            height: cardHeight,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Revenue Breakdown
          </Typography>

          <Typography variant="body2" mb={1}>
            Than last day
          </Typography>

          {/* 94% and triangle icon */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            position="absolute"
            top={16}
            right={16}
          >
            <Typography variant="h3" fontWeight="bold" mr={1}>
              94%
            </Typography>
            <Box component="img" src="./assets/icons/dashboard/ic_arrow_up_white.svg" width={16} height={16} />

          </Box>

          {/* Bar chart */}
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <XAxis dataKey="day" stroke="#fff" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="a" fill="#fff" barSize={10} radius={[10, 10, 0, 0]} />
                <Bar dataKey="b" fill="#002f5f" barSize={10} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RevenueStats;
