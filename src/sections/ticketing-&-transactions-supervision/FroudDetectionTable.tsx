import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Container,
  TableContainer,
} from '@mui/material';

const transactions = [
  {
    date: '02/10/2025',
    event: 'Fally Ipupa Concert',
    buyer: 'Jean M.',
    amount: '50,000 XAF',
    method: 'Mobile Money',
    status: 'Under Review',
  },
  {
    date: '02/10/2025',
    event: 'Fally Ipupa Concert',
    buyer: 'Jean M.',
    amount: '50,000 XAF',
    method: 'Mobile Money',
    status: 'Successful',
  },
  {
    date: '02/10/2025',
    event: 'Fally Ipupa Concert',
    buyer: 'Jean M.',
    amount: '50,000 XAF',
    method: 'Mobile Money',
    status: 'Blocked',
  },
];

function FroudDetectionTable() {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Security & Fraud Detection
      </Typography>

      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ backgroundColor: '#f8f9fa', borderRadius: 2 }}>
          <TableHead>
            <TableRow>
              {['Date', 'Buyer', 'Event', 'Amount', 'Payment Method', 'Status', 'Action'].map(
                (header, index, arr) => (
                  <TableCell
                    key={header}
                    align="center"
                    sx={{
                      bgcolor: '#1F8FCD',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      borderTopLeftRadius: index === 0 ? '20px' : 0,
                      borderTopRightRadius: index === arr.length - 1 ? '20px' : 0,
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((tx, index) => {
              const isLastRow = index === transactions.length - 1;

              return (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: '#EEEEEE',
                    position: 'relative',
                    '&:not(:last-child)': {
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)', // Center the line
                        width: '96%', // You can adjust this to change the line length
                        borderBottom: '1px solid #C3C3C3', // The border itself
                      },
                    },
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      borderBottomLeftRadius: isLastRow ? '20px' : 0,
                    }}
                  >
                    {tx.date}
                  </TableCell>
                  <TableCell align="center">{tx.buyer}</TableCell>
                  <TableCell align="center">{tx.event}</TableCell>
                  <TableCell align="center">{tx.amount}</TableCell>
                  <TableCell align="center">{tx.method}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,

                      color:
                        tx.status === 'Successful'
                          ? 'green'
                          : tx.status === 'Under Review'
                            ? 'orange'
                            : tx.status === 'Blocked'
                              ? 'red'
                              : 'inherit',
                    }}
                  >
                    {tx.status}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottomRightRadius: isLastRow ? '20px' : 0,
                      width: "25%"
                    }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: '#0e2a47',
                          '&:hover': { bgcolor: '#0c223b' },
                          width: { xs: '100%', sm: 'auto' },
                        }}
                      >
                        Analyze
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: '#0e2a47',
                          '&:hover': { bgcolor: '#0c223b' },
                          width: { xs: '100%', sm: 'auto' },
                        }}
                      >
                        Block Account
                      </Button>

                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mt={3}
        justifyContent="space-between"
      >
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: '#0e2a47',
            '&:hover': { bgcolor: '#0c223b' },
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Analyze a Transaction
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 600,
            color: '#0B2E4C', // Set your preferred color
            borderColor: '#0B2E4C', // Match border color to text
            '&:hover': {
              backgroundColor: '#0B2E4C', // subtle hover background
              borderColor: '#0B2E4C',
              color: 'white',
            },
          }}
        >
          Block Account
        </Button>
      </Stack>
    </Paper>
  );
};

export default FroudDetectionTable;
