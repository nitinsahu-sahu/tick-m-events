import { Box, Paper, Typography, Button, Stack, Grid } from '@mui/material';

const RevenueData = [
  {
    Period: 'Jan / 2025',
    Revenue: '1,200,000',
    Services: '5',
    Average: '240,000',
  },
  {
    Period: 'Jan / 2025',
    Revenue: '800,000',
    Services: '5',
    Average: '266,000',
  },

  // Add more rows as needed
];

export function FinancialAnalysisRevenue() {
  return (
    <Paper
      sx={{
        mt: 3,
        p: { xs: 2, sm: 3 },
        borderRadius: 2.5,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Financial Analysis & Revenue
      </Typography>

      <Box sx={{ overflowX: 'auto', borderRadius: 2 }}>
        <Box sx={{ minWidth: 700 }}>
          {/* Table Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              backgroundColor: '#1976d2',
              color: 'white',
              alignItems: 'center',
              justifyItems: 'center',
              py: 1.5,
              px: 2,
              fontWeight: 600,
            }}
          >
            <div>Period </div>
            <div>Revenue Earned (XAF)</div>
            <div>Services Competed </div>
            <div>Average Payment (XAF)</div>
          </Box>

          {/* Scrollable Table Body */}
          <Box
            sx={{
              maxHeight: 200,
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
            {RevenueData.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  alignItems: 'center',
                  justifyItems: 'center',
                  py: 1.5,
                  px: 2,
                  borderBottom:
                    idx !== RevenueData.length - 1 ? '1px solid rgba(195, 195, 195, 1)' : 'none',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <div>{item.Period}</div>
                <div>{item.Revenue}</div>
                <div>{item.Services}</div>
                <div>{item.Average}</div>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: { md: 'flex-start' },
          gap: 2,
          mt: { xs: 3, md: 3 },
          
        }}
      >
        <StyledActionButton>Download My Financial Report</StyledActionButton>
        <StyledActionButton>Optimize My Pricing</StyledActionButton>
      </Grid>
      
    </Paper>
  );
}

function StyledActionButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      sx={{
        backgroundColor: '#0B2E4C',
        color: 'white',
        borderRadius: '20px',
        px: 3,
        height: 45,
        textTransform: 'none',
        width: {
          lg: '30%',
        },
        fontSize: '14px',
        '&:hover': {
          backgroundColor: '#071E33',
        },
      }}
    >
      {children}
    </Button>
  );
}
