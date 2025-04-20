import { Box, Paper, Typography, Button, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const activityData = [
  { date: '10/02/2025', user: 'Jean M.', action: 'Created an event', location: 'Douala' },
  { date: '12/02/2025', user: 'EventPro', action: 'Purchased a ticket', location: 'Yaoundé' },
  { date: '10/02/2025', user: 'Jean M.', action: 'Created an event', location: 'Douala' },
  { date: '12/02/2025', user: 'EventPro', action: 'Purchased a ticket', location: 'Yaoundé' },
  { date: '10/02/2025', user: 'Jean M.', action: 'Created an event', location: 'Douala' },
  { date: '12/02/2025', user: 'EventPro', action: 'Purchased a ticket', location: 'Yaoundé' },
  { date: '10/02/2025', user: 'Jean M.', action: 'Created an event', location: 'Douala' },
  { date: '12/02/2025', user: 'EventPro', action: 'Purchased a ticket', location: 'Yaoundé' },
];

const trendData = [
  { day: 'M', value: 3 },
  { day: 'T', value: 5 },
  { day: 'W', value: 2 },
  { day: 'T', value: 6 },
  { day: 'F', value: 5 },
  { day: 'S', value: 2 },
  { day: 'Today', value: 4 },
];

export default function UserActivityCard() {
  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        User Activity History
      </Typography>

      {/* Table */}
      <Box sx={{ overflowX: 'auto', borderRadius: 2,mb: 4 }}>
        <Box sx={{ minWidth: 700 }}>
          {/* Table Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 2fr 1fr',
              backgroundColor: 'rgba(31, 143, 205, 1)',
              color: 'white',
              py: 1.5,
              px: 2,
              fontWeight: 600,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <div>Date</div>
            <div>User</div>
            <div>Action</div>
            <div>Location</div>
          </Box>

          {/* Scrollable Table Body */}
          <Box
            sx={{
              maxHeight: 300,
              overflowY: 'auto',
              borderTop: '1px solid #ddd',
              '&::-webkit-scrollbar': {
                width: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#0B2E4C',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
              },
            }}
          >
            {activityData.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 2fr 1fr',
                  py: 1.5,
                  px: 2,

                  alignItems: 'center',

                  borderBottom:
                    idx !== activityData.length - 1 ? '1px solid rgba(195, 195, 195, 1)' : 'none',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <div>{item.date}</div>
                <div>{item.user}</div>
                <div>{item.action}</div>
                <div>{item.location}</div>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Chart + Buttons */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 3,
              height: '100%',
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              User Trends
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData}>
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar dataKey="value" fill="#1F8FCD" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'flex-end' },
            justifyContent: { md: 'flex-end' },
            gap: 2,
            mt: { xs: 3, md: 0 },
          }}
        >
          <StyledActionButton>Download Activity Report</StyledActionButton>
          <StyledActionButton>Analyze Suspicious Behavior</StyledActionButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

function StyledActionButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      sx={{
        backgroundColor: '#0B2E4C',
        color: 'white',
        borderRadius: '20px',
        px: 3,
        height: 45,
        textTransform: 'none',
        fontSize: '14px',
        '&:hover': {
          backgroundColor: '#071E33',
        },
      }}
    >
      {children}
    </Button>
  );
}
