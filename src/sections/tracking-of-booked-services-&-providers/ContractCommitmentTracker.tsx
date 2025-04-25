import {
  Box,
  Typography,
  Paper,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
} from '@mui/material';
import { useState } from 'react';

const trackingSteps = [
  {
    step: 'Contract Signature',
    status: 'Completed',
    comment: 'Signed contract uploaded',
    color: 'green',
  },
  {
    step: '10% Payment Deposit',
    status: 'In Progress',
    comment: 'Secure deposit on TICK-M',
    color: 'orange',
  },
  {
    step: 'Provider Confirmation',
    status: 'Completed',
    comment: 'Provider needs to validate',
    color: 'green',
  },
  {
    step: 'Service Execution',
    status: 'Upcoming',
    comment: 'Scheduled for 10/02/2025',
  },
];

export default function ContractCommitmentTracker() {
  const details = [
    {
      label: 'Booked Service:',
      value: 'DJ Animation – 4 hours with sound equipment included.',
    },
    {
      label: 'Confirmed Date & Time:',
      value: 'February 10, 2025, from 8 PM to midnight.',
    },
    {
      label: 'Total Agreed Price:',
      value: '250,000 XAF',
    },
    {
      label: 'Payment Terms:',
      value: '90% in cash or Mobile Money, 10% already deposited on TICK‑M.',
    },
  ];
  const [selectedService, setSelectedService] = useState(
    'DJ Animation – 4 hours with sound equipment included.'
  );

  return (
    <Box
      sx={{
        p: 3,
        mt: 3,
        backgroundColor: '#fff',
        borderRadius: 2.5,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Dropdown */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Contract & Commitment Tracking
      </Typography>
      <Select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 3 }}
      >
        <MenuItem value="DJ Animation – 4 hours with sound equipment included.">
          DJ Animation – 4 hours with sound equipment included.
        </MenuItem>
        {/* Add more options as needed */}
      </Select>

      {/* Summary Box */}

      <Paper
        elevation={1}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          backgroundColor: 'white',
          borderRadius: 2.5,
          border: '1px solid #E0E0E0',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{
            mb: 2,
            pb: 1.5,
            borderBottom: '1px solid #D9D9D9',
          }}
        >
          Signed Contract Summary
        </Typography>

        <Box
          sx={{
            display: 'grid',
            rowGap: 2.2,
          }}
        >
          {details.map((row, i) => (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' }, // consistent label width
                columnGap: 8,
                alignItems: 'start',
              }}
            >
              <Typography fontWeight={700} fontSize="1rem" sx={{ whiteSpace: 'nowrap' }}>
                {row.label}
              </Typography>
              <Typography fontSize="1rem">{row.value}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Commitment Table */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Commitment Tracking
      </Typography>

      <Box sx={{ overflowX: 'auto', borderRadius: 2 }}>
        <Box sx={{ minWidth: 700 }}>
          {/* Table Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr ',
              backgroundColor: '#1976d2',
              color: 'white',
              py: 1.5,
              px: 2,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            <div>Step</div>
            <div>Status</div>
            <div>comment</div>
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
            {trackingSteps.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  alignItems: 'center',
                  textAlign: 'center',
                  py: 1.5,
                  px: 2,
                  borderBottom:
                    idx !== trackingSteps.length - 1 ? '1px solid rgba(195, 195, 195, 1)' : 'none',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <div>{item.step}</div>
                <div>
                  <Typography
                    sx={{
                      color:
                        item.status === 'In Progress'
                          ? 'orange'
                          : item.status === 'Completed'
                            ? 'green'
                            : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.status}
                  </Typography>
                </div>
                <div>{item.comment}</div>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4}>
        <ResponsiveActionButton>Download Contract</ResponsiveActionButton>
        <ResponsiveActionButton>Modify Terms</ResponsiveActionButton>
      </Stack>
    </Box>
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
