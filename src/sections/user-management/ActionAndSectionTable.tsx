import {
    Box,
    Paper,
    Typography,
    Button,
    Stack,
  } from '@mui/material';
  
  const SanctionsData = [
    {
      user: 'Jean M.',
      Reason: 'Fraud detected',
      Date: '10/02/2025',
      status: 'Pending',
      actions: ['Suspend', 'Ban', 'Send Alert'],
    },
    {
      user: 'EventPro',
      Reason: 'Inappropriate content',
      Date: '08/02/2025',
      status: 'Resolved',
      actions: ['View Details'],
    },
    {
      user: 'Jean M.',
      Reason: 'Fraud detected',
      Date: '10/02/2025',
      status: 'Pending',
      actions: ['Suspend', 'Ban', 'Send Alert'],
    },
 
    // Add more rows as needed
  ];
  
  export function ActionAndSectionTable() {
    return (
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          border: '1px solid #E0E0E0',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
        Actions & Sanctions
        </Typography>
  
        <Box sx={{ overflowX: 'auto', borderRadius: 2 }}>
          <Box sx={{ minWidth: 700 }}>
            {/* Table Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr',
                backgroundColor: '#1976d2',
                color: 'white',
                py: 1.5,
                px: 2,
                fontWeight: 600,
              }}
            >
              <div>Date</div>
              <div>User</div>
              <div>Reason</div>
              <div>Status</div>
              <div>Actions</div>
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
              {SanctionsData.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr',
                    alignItems: 'center',
                    py: 1.5,
                    px: 2,
                    borderBottom:
                      idx !== SanctionsData.length - 1
                        ? '1px solid rgba(195, 195, 195, 1)'
                        : 'none',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <div>{item.Date}</div>
                  <div>{item.user}</div>
                  <div>{item.Reason}</div>
                  <div>
                    <Typography
                      sx={{
                        color:
                          item.status === 'Pending'
                            ? 'orange'
                            : item.status === 'Resolved'
                            ? 'green'
                            : 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.status}
                    </Typography>
                  </div>
  
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{
                      mt: { xs: 1, sm: 0 },
                      '& button': {
                        flex: { xs: '1 1 auto', sm: 'none' },
                        minWidth: { xs: '100%', sm: '100%', md:10, lg: 5 },
                      },
                    }}
                  >
                    {item.actions.map((label, i) => (
                      <StyledActionButton key={i} label={label} />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }
  
  function StyledActionButton({ label }: { label: string }) {
    const getButtonColor = () => {
      switch (label) {
        case 'Suspend':
        case 'View Details':
        case 'Send Alert':
          return '#0B2E4C';
        case 'Ban':
          return '#D32F2F';
        default:
          return '#0B2E4C';
      }
    };
  
    return (
      <Button
        variant="contained"
        sx={{
          backgroundColor: getButtonColor(),
          borderRadius: '20px',
          textTransform: 'none',
          fontSize: '13px',
          height: 35,
          px: 2,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#071E33',
          },
        }}
      >
        {label}
      </Button>
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
  