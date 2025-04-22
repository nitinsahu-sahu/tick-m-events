import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, MonetizationOn, Star, Description } from '@mui/icons-material';

const chartData = [
  { name: 'April', value: 100000 },
  { name: 'May', value: 200000 },
  { name: 'June', value: 400000 },
  { name: 'July', value: 700000 },
  { name: 'August', value: 500000 },
  { name: 'September', value: 450000 },
  { name: 'October', value: 300000 },
  { name: 'November', value: 600000 },
];

const statCards = [
  {
    icon: <Description sx={{ fontSize: 40, color: '#007BBA' }} />,
    title: 'Contracts Obtained',
    value: '15',
    subtitle: 'in the last 3 months',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: '#007BBA' }} />,
    title: 'Offer Conversion Rate',
    value: '45%',
    subtitle: 'of sent proposals accepted',
  },
  {
    icon: <MonetizationOn sx={{ fontSize: 40, color: '#007BBA' }} />,
    title: 'Total Revenue',
    value: '3,500,000 XAF',
    subtitle: 'earned this year',
  },
  {
    icon: <Star sx={{ fontSize: 40, color: '#007BBA' }} />,
    title: 'Customer Rating',
    value: '4.7/5',
    subtitle: 'based on 30 reviews',
  },
];

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

export default function DashboardSummary() {
  const [tab, setTab] = React.useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cardHeight = isMobile ? 'auto' : 400;
  return (
    <Box
      mt={3}
      p={{
        xs: 2,
        md: 4,
      }}
      sx={{
        borderRadius: '20px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0,0,0,0.15)',
      }}
    >
      <Grid container spacing={3}>
        {/* First 3 Cards */}
        {statCards.slice(0, 3).map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #E0E0E0',
                boxShadow: '0 0 10px rgba(0,0,0,0.15)',
                height: '100%',
              }}
            >
              {card.icon}
              <Typography fontWeight={700} mt={2}>
                {card.title}
              </Typography>
              <Typography color="#007BBA" fontSize={22} fontWeight={700}>
                {card.value}
              </Typography>
              <Typography fontSize={13}>{card.subtitle}</Typography>
            </Paper>
          </Grid>
        ))}    

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={0} // Remove Paper shadow if desired
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#F9FAFB', // Fixed color code
              height: '100%',
              boxShadow: 'none', // Removes border effect
            }}
          >
            <Box
              textAlign="center"
              sx={{
                boxShadow: '0 0 10px rgba(0,0,0,0.15)',
                borderRadius: 2,
                p: 2,
                height: '100%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', // Center icon horizontally
              }}
            >
              {statCards[3].icon}
              <Typography fontWeight={700} mt={2}>
                {statCards[3].title}
              </Typography>
              <Typography color="#007BBA" fontSize={22} fontWeight={700}>
                {statCards[3].value}
              </Typography>
              <Typography fontSize={13}>{statCards[3].subtitle}</Typography>
            </Box>

            {/* Buttons inside the card */}
            <Box mt={3} display="flex" flexDirection="column" gap={2}>
              <DarkRoundedButton>View Contract Details</DarkRoundedButton>
              <DarkRoundedButton>Improve My Profile</DarkRoundedButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: '14px',
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
                Performance Trend
              </Typography>
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
      </Grid>
    </Box>
  );
}

function DarkRoundedButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      fullWidth
      sx={{
        backgroundColor: '#0B2E4C',
        color: 'white',
        textTransform: 'none',
        borderRadius: '20px',
        height: 45,
        fontWeight: 500,
        '&:hover': {
          backgroundColor: '#071E33',
        },
      }}
    >
      {children}
    </Button>
  );
}
