import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "src/redux/store";
import { getAllUsers } from '../../redux/actions/userActions';

interface User {
  name: string;
  role: string;
  createdAt: string;
  status: 'Pending' | 'Suspended' | 'Active' | string;
}

export function OverviewTableCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, users, error } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <Box sx={{ overflowX: 'auto', borderRadius: 2 }}>
          <Box sx={{ minWidth: 700 }}>
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
              {(users as User[]).map((user: User, idx: number) => (
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
                  <div>{new Date(user.createdAt).toLocaleDateString()}</div>
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
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase()}
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
                        minWidth: { xs: '100%', sm: 100 },
                      },
                    }}
                  >
                    {user.status === 'pending' && (
                      <>
                        <StyledActionButton label="Validate" />
                        <StyledActionButton label="View Profile" />
                        <StyledActionButton label="Block" />
                      </>
                    )}

                    {user.status === 'suspended' && (
                      <>
                        <StyledActionButton label="Reactivate" />
                        <StyledActionButton label="View Profile" />
                        <StyledActionButton label="Block" />
                      </>
                    )}

                    {user.status === 'active' && (
                      <>
                        <StyledActionButton label="View Profile" />
                         <StyledActionButton label="Block" />
                      </>
                    )}
                  </Stack>

                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4}>
        <ResponsiveActionButton>View Account Details</ResponsiveActionButton>
        <ResponsiveActionButton>Export Data</ResponsiveActionButton>
      </Stack>
    </Paper>
  );
}

// Action Button Component
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

// Responsive Button Component
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
