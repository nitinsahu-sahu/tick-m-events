import { Box, TableHead, TableBody, Table, TableCell, TableRow, Paper, Typography, Button, Stack, TableContainer } from '@mui/material';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

const SanctionsData = [
  {
    user: 'Jean M.',
    reason: 'Fraud detected',
    date: '10/02/2025',
    status: 'Pending',
    actions: ['Suspend', 'Ban', 'Send Alert'],
  },
  {
    user: 'EventPro',
    readonlyeason: 'Inappropriate content',
    date: '08/02/2025',
    status: 'Resolved',
    actions: ['View Details'],
  },
  {
    user: 'Jean M.',
    reason: 'Fraud detected',
    date: '10/02/2025',
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
      <HeadingCommon variant="h6" weight={600} mb={3} title="Actions & Sanctions" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#E1E1E1" }}>
              {["Date", "User", "Reason", "Status", "Action"].map((header: string) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    color: "white",
                    backgroundColor: "#1F8FCD",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {SanctionsData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    No Data...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              SanctionsData?.map((__: any) => (
                <TableRow key={__._id} sx={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #E1E1E1" }}>
                  <TableCell align="center" sx={{ textTransform: "capitalize", fontSize: { xs: "12px", sm: "13px" }, fontWeight: "700" }}>{__.date}</TableCell>
                  <TableCell align="center" sx={{ textTransform: "capitalize", fontSize: { xs: "12px", sm: "13px" }, fontWeight: "normal" }}>{__.user || 'N/A'}</TableCell>
                  <TableCell align="center" sx={{ textTransform: "capitalize", fontSize: { xs: "12px", sm: "13px" }, fontWeight: "normal" }}>{__.reason || 'N/A'}</TableCell>
                  <TableCell align="center"
                    sx={{
                      textTransform: "capitalize",
                      color:
                        __.status === 'pending'
                          ? 'red'
                          : __.status === 'active'
                            ? 'green'
                            : 'black',
                      fontSize: { xs: "12px", sm: "13px" }, fontWeight: 600
                    }}>{__.status}</TableCell>
                  <TableCell align="center" sx={{ textTransform: "capitalize", fontSize: { xs: "12px", sm: "13px" }, fontWeight: "normal" }}>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "blue",
                          borderRadius: 1,
                          textTransform: 'none',
                          fontSize: '13px',
                          width: 100,
                          px: 2,
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#071E33',
                          },
                        }}
                      >
                        Suspend
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "blue",
                          borderRadius: 1,
                          textTransform: 'none',
                          fontSize: '13px',
                          width: 100,
                          px: 2,
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#332707ff',
                          },
                        }}
                      >
                        Ban
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "blue",
                          borderRadius: 1,
                          textTransform: 'none',
                          fontSize: '13px',
                          width: 100,
                          px: 2,
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#eb1616ff',
                          },
                        }}
                      >
                        Send Alert
                      </Button>
                    </Box>
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
