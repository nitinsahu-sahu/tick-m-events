import {
  Box,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Avatar,
  Grid,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { PopularEvent } from './PopularEvent';
import { eventTickets } from './Utills';



export default function ProviderCardList() {
  const [view, setView] = useState('card');

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Paper
      sx={{
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
        <Typography variant="h6" fontWeight="bold">
          List of Providers
        </Typography>

        
        <Box
          sx={{
            display: 'flex',
            gap:2,
            mr:2,
          }}
        >
          <ToggleStyleButton  active={view === 'card'} onClick={() => setView('card')} >
            Card View
          </ToggleStyleButton>
          <ToggleStyleButton active={view === 'map'} onClick={() => setView('map')}>
            Map View
          </ToggleStyleButton>
        </Box>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3} mt={3}>
        {eventTickets.map((ticketc, index) => (
          <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
            <PopularEvent ticket={ticketc} key={index} />
          </Grid>
        ))}
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