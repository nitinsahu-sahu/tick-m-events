import { Box, Paper, Typography, Button, Grid } from '@mui/material';

export default function FinalValidationCard() {
  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        mt:3,
        borderRadius: 2.5,
        backgroundColor: '#fff',
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Tracking & Final Validation
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: '#fff',

          border: '1px solid #E0E0E0',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight={600}>Confirmed Service:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>
              DJ Performance - 4 hours with sound equipment included
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography fontWeight={600}>Final Agreed Price:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>250,000 XAF, including transportation</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography fontWeight={600}>Confirmed Date & Time:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>March 15, 2025, 7:00 PM - 11:00 PM</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography fontWeight={600}>Payment Terms:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>
              90% to be paid in cash or via Mobile Money
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography fontWeight={600}>TICK-M Commission:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>
              10% (Deposited immediately to secure the transaction)
            </Typography>
          </Grid>
        </Grid>

        <Box
          mt={4}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          justifyContent="center"
        >
          <ActionButton>Confirm & Pay Commission</ActionButton>
          <ActionButton>Sign Digitally</ActionButton>
          <ActionButton>Download Contract</ActionButton>
        </Box>
      </Paper>
    </Paper>
  );
}

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      fullWidth
      sx={{
        backgroundColor: '#0B2E4C',
        color: '#fff',
        textTransform: 'none',
        borderRadius: '20px',
        px: 3,
        py: 1.5,
        fontWeight: 500,
        '&:hover': {
          backgroundColor: '#071E33',
        },
      }}
    >
      {children}
    </Button>
  );
}
