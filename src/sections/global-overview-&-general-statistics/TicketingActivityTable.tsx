import { Box, Paper, Typography, Button, Stack } from '@mui/material';

const TicketData = [
  {
    Event: 'Concert Fally Ipupa',
    Organizer: 'EvenProd',
    TicketsSold: '5,000',
    Revenue: '25,000,000 XAF',
    status: 'Active',

  },
  {
    Event: 'Concert Fally Ipupa',
    Organizer: 'EvenProd',
    TicketsSold : '5,000',
    Revenue: '25,000,000 XAF',
    status: 'Pending',

  },
  {
    Event: 'Concert Fally Ipupa',
    Organizer: 'EvenProd',
    TicketsSold : '5,000',
    Revenue: '25,000,000 XAF',
    status: 'In Progress',

  },

  // Add more rows as needed
];

export function TicketingActivityTable() {
  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2.5,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Ticketing Activity (Events & Tickets)
      </Typography>

      <Box sx={{ overflowX: 'auto', borderRadius: 2 }}>
        <Box sx={{ minWidth: 700 }}>
          {/* Table Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              backgroundColor: '#1F8FCD',
              color: 'white',
              py: 1.5,
              px: 2,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            <Box>Event</Box>
            <Box>Organizer</Box>
            <Box>Tickets Sold</Box>
            <data>Revenu</data>
            <Box>Status</Box>
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
            {TicketData.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                  alignItems: 'center',
                  textAlign: 'center',
                  py: 1.5,
                  px: 2,
                  borderBottom:
                    idx !== TicketData.length - 1 ? '1px solid rgba(195, 195, 195, 1)' : 'none',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Box>{item.Event}</Box>
                <Box>{item.Organizer}</Box>
                <Box>{item.TicketsSold}</Box>
                <Box>{item.Revenue }</Box>
                <Box>
                  <Typography
                    sx={{
                      color:
                        item.status === 'Pending'
                          ? 'red'
                          : item.status === 'Active'
                            ? 'green'
                            : 'orange',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.status}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        
      </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4}>
              <ResponsiveActionButton>Moderate an Event</ResponsiveActionButton>
              <ResponsiveActionButton>Analyze an Organizer</ResponsiveActionButton>
              <ResponsiveActionButton>View Event Transactions</ResponsiveActionButton>
            </Stack>
    </Paper>
  );
}


function ResponsiveActionButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      fullWidth
      sx={{
        borderRadius: '20px',
        backgroundColor: '#0B2E4C',
        color: 'white',
        height: 45,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#071E33',
        },
      }}
    >
      {children}
    </Button>
  );
}
