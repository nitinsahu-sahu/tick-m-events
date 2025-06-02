import { Box, Paper, Typography, Button, Stack } from '@mui/material';

const users = [
  {
    name: 'Jean M.',
    role: 'Organizer',
    registrationDate: '12/02/2025',
    status: 'Pending',
  },
  {
    name: 'Jean M.',
    role: 'Organizer',
    registrationDate: '12/02/2025',
    status: 'Suspended',
  },
  {
    name: 'Jean M.',
    role: 'Organizer',
    registrationDate: '12/02/2025',
    status: 'Suspended',
  },
  {
    name: 'New Person',
    role: 'Viewer',
    registrationDate: '12/03/2025',
    status: 'Pending',
  },
  {
    name: 'Another One',
    role: 'Editor',
    registrationDate: '12/04/2025',
    status: 'Suspended',
  },
  {
    name: 'Jean M.',
    role: 'Organizer',
    registrationDate: '12/02/2025',
    status: 'Suspended',
  },
  {
    name: 'New Person',
    role: 'Viewer',
    registrationDate: '12/03/2025',
    status: 'Pending',
  },
  {
    name: 'Another One',
    role: 'Editor',
    registrationDate: '12/04/2025',
    status: 'Suspended',
  },
];

export function OverviewTableCard() {
  return (
    <Paper
      sx={{
        mt: 3,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Search & Advanced Filters
      </Typography>
      <Typography variant="subtitle1" mb={3}>
        Overview of Accounts
      </Typography>

      {/* Scrollable Horizontal Wrapper */}
      <Box sx={{ overflowX: 'auto', borderRadius: 2, }}>
        <Box sx={{ minWidth: 700 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr',
              backgroundColor: '#1F8FCD',
              color: 'white',
              py: 1.5,
              px: 2,
              fontWeight: 600,
            }}
          >
            <div>Name</div>
            <div>Role</div>
            <div>Registration Date</div>
            <div>Status</div>
            <div>Actions</div>
          </Box>

          {/* Scrollable Vertical Section if more than 3 */}
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
            {users.map((user, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr',
                  alignItems: 'center',
                  py: 1.5,
                  px: 2,
                  borderBottom:
                    idx !== users.length - 1 ? '1px solid rgba(195, 195, 195, 1)' : 'none',
                  backgroundColor: 'rgba(238, 238, 238, 1)',
                }}
              >
                <div>{user.name}</div>
                <div>{user.role}</div>
                <div>{user.registrationDate}</div>
                <div>
                  <Typography
                    sx={{
                      color:
                        user.status === 'Pending'
                          ? 'orange'
                          : user.status === 'Suspended'
                            ? 'red'
                            : 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    {user.status}
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
                      flex: { xs: '1 1 auto', sm: 'none' }, // Buttons fill available space on mobile
                      minWidth: { xs: '100%', sm: 100 }, // Full width on mobile, fixed on larger
                    },
                  }}
                >
                  {user.status === 'Pending' ? (
                    <StyledActionButton label="Validate" />
                  ) : (
                    <StyledActionButton label="Reactivate" />
                  )}
                  <StyledActionButton label="View Profile" />
                  <StyledActionButton label="Block" />
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Bottom Buttons */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4}>
        <ResponsiveActionButton>View Account Details</ResponsiveActionButton>
        <ResponsiveActionButton>Export Data</ResponsiveActionButton>
      </Stack>
    </Paper>
  );
}

// Action Button Style
function StyledActionButton({ label }: { label: string }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#0B2E4C',
        borderRadius: '20px',
        textTransform: 'none',
        fontSize: '13px',
        height: 35,
        px: 2,
        minWidth: 100,
        '&:hover': {
          backgroundColor: '#071E33',
        },
      }}
    >
      {label}
    </Button>
  );
}

// Full Width Action Button Style
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
