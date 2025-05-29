import { Box, Paper, Typography, Button, Grid } from '@mui/material';
import { useState } from 'react';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

import { ProviderListView } from './PopularEvent';
import { eventTickets } from './Utills';


export default function ProviderCardList({ handleSelct,providersList }: any) {
  const [view, setView] = useState('card');
  
  return (
    <Paper
      sx={{
        mt: 3,
        p: { xs: 2, sm: 3 },
        borderRadius: 2.5,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0,0,0,0.15)',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <HeadingCommon title="List of Providers" variant="h6" weight={600} />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mr: 2,
          }}
        >
          <ToggleStyleButton active={view === 'card'} onClick={() => setView('card')} >
            Card View
          </ToggleStyleButton>
          <ToggleStyleButton active={view === 'map'} onClick={() => setView('map')}>
            Map View
          </ToggleStyleButton>
        </Box>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3} mt={3}>
        {providersList?.length > 0 ? (
          providersList?.map((ticketc: any, index: any) => (
            <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
              <ProviderListView providers={ticketc} key={index} handleSelct={handleSelct}/>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="textSecondary">
              {providersList === null
                ? "Please apply filters to see service providers"
                : "No providers match your current filters"}
            </Typography>
          </Grid>
        )}
      </Grid>

    </Paper>
  );
}

function ToggleStyleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        px: 3,
        py: 1,
        fontWeight: 600,
        borderRadius: '20px',
        border: '1px solid #ccc',
        textTransform: 'none',
        backgroundColor: active ? '#0B2E4C' : '#fff',
        color: active ? '#fff' : '#0B2E4C',
        '&:hover': {
          backgroundColor: active ? '#071E33' : '#f0f0f0',
        },

      }}
    >
      {children}
    </Button>
  );
}