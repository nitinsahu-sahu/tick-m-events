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

const headers = ['Event', 'Organizer', 'Date', 'Tickets Available', 'Status', 'Actions'];

interface Event {
  id: number;
  name: string;
  organizer: string;
  date: string;
  tickets: number;
  status: 'Pending' | 'Approved' | 'Cancelled';
}

const events: Event[] = [
  {
    id: 1,
    name: 'Fally Ipupa Concert',
    organizer: 'EvenProd',
    date: '12/02/2026',
    tickets: 5000,
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Fally Ipupa Concert',
    organizer: 'EvenProd',
    date: '12/02/2026',
    tickets: 5000,
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Fally Ipupa Concert',
    organizer: 'EvenProd',
    date: '12/02/2026',
    tickets: 5000,
    status: 'Cancelled',
  },
];

const EventManagementTable: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');

  const filteredEvents = statusFilter ? events.filter((e) => e.status === statusFilter) : events;

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
        Event Management & Moderation
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
            {filteredEvents.length === 0 ? (
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
                  No events{statusFilter ? ` with status: ${statusFilter}` : ''}
                </TableCell>
              </TableRow>
            ) : (
              filteredEvents.map((event, index) => {
                const isLastRow = index === filteredEvents.length - 1;
                return (
                  <TableRow
                    key={event.id}
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
                      {event.name}
                    </TableCell>
                    <TableCell align="center">{event.organizer}</TableCell>
                    <TableCell align="center">{event.date}</TableCell>
                    <TableCell align="center">{event.tickets.toLocaleString()}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color:
                          event.status === 'Approved'
                            ? 'green'
                            : event.status === 'Pending'
                              ? 'orange'
                              : event.status === 'Cancelled'
                                ? 'red'
                                : 'inherit',
                        fontWeight: 600,
                      }}
                    >
                      {event.status}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottomRightRadius: isLastRow ? '20px' : 0,
                        width:"41%"
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
                          View Details
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
                          Request Modifications
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
                          Cancel
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

export default EventManagementTable;
