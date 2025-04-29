import React, { useState } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const headers = ['Date', 'Buyer', 'Event', 'Reason', 'Status', 'Actions'];

interface Refund {
  id: number;
  name: string;
  buyer: string;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
}

const refunds: Refund[] = [
  {
    id: 1,
    name: 'Fally Ipupa Concert',
    buyer: 'Jean M.',
    date: '12/02/2026',
    reason: 'Payment Error',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Fally Ipupa Concert',
    buyer: 'Jean M.',
    date: '12/02/2026',
    reason: 'Payment Error',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Fally Ipupa Concert',
    buyer: 'Jean M.',
    date: '12/02/2026',
    reason: 'Payment Error',
    status: 'Approved',
  },
];

const RefundManagementTable: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');

  const filteredRefunds = statusFilter ? refunds.filter((e) => e.status === statusFilter) : refunds;

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Dispute & Refund Management
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel sx={{ color: 'black' }}>Filter by status</InputLabel>
        <Select
          value={statusFilter}
          label="Filter by status"
          onChange={(e) => setStatusFilter(e.target.value)}
          IconComponent={ExpandMoreIcon}
          sx={{
            color: 'black',
            '& .MuiSelect-icon': {
              color: 'black',
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{
                    bgcolor: '#1F8FCD',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                    color: 'white',
                    borderTopLeftRadius: index === 0 ? '20px' : 0,
                    borderTopRightRadius: index === headers.length - 1 ? '20px' : 0,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRefunds.length === 0 ? (
              <TableRow
                sx={{
                  backgroundColor: '#EEEEEE',
                  position: 'relative',
                  '&:not(:last-child)': {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '96%',
                      borderBottom: '1px solid #C3C3C3',
                    },
                  },
                }}
              >
                <TableCell
                  colSpan={headers.length}
                  align="center"
                  sx={{
                    py: 2,
                    fontWeight: 500,
                    color: 'Black',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                  }}
                >
                  No refunds{statusFilter ? ` with status: ${statusFilter}` : ''}
                </TableCell>
              </TableRow>
            ) : (
              filteredRefunds.map((refund, index) => {
                const isLastRow = index === filteredRefunds.length - 1;
                return (
                  <TableRow
                    key={refund.id}
                    sx={{
                      backgroundColor: '#EEEEEE',
                      position: 'relative',
                      '&:not(:last-child)': {
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '96%',
                          borderBottom: '1px solid #C3C3C3',
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
                      {refund.date}
                    </TableCell>
                    <TableCell align="center">{refund.buyer}</TableCell>
                    <TableCell align="center">{refund.name}</TableCell>
                    <TableCell align="center">{refund.reason}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color:
                          refund.status === 'Approved'
                            ? 'green'
                            : refund.status === 'Pending'
                              ? 'orange'
                              : refund.status === 'Cancelled'
                                ? 'red'
                                : 'inherit',
                        fontWeight: 600,
                      }}
                    >
                      {refund.status}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottomRightRadius: isLastRow ? '20px' : 0,
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
                          Contact
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
                          Resolve
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
                          Refund
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default RefundManagementTable;
