import { Box, Paper, Typography, Button, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { useState } from 'react';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { ProviderListView } from './PopularEvent';

export default function ProviderCardList({ handleSelct, providersList }: any) {
  const [view, setView] = useState<'card' | 'list'>('card');
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
          <ToggleStyleButton active={view === 'card'} onClick={() => setView('card')}>
            Card View
          </ToggleStyleButton>
          <ToggleStyleButton active={view === 'list'} onClick={() => setView('list')}>
            List View
          </ToggleStyleButton>
        </Box>
      </Box>

      {providersList?.length > 0 ? (
        view === 'card' ? (
          // Card View
          <Grid container spacing={3} mt={3}>
            {providersList.map((ticketc: any, index: any) => (
              <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
                <ProviderListView providers={ticketc} key={index} handleSelct={handleSelct} />
              </Grid>
            ))}
          </Grid>
        ) : (
          // List View
          // List View
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {providersList.map((provider: any, index: any) => (
              <ListItem
                key={provider._id || index}
                sx={{
                  borderBottom: '1px solid #eee',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  alignItems: 'flex-start', // Align items to top
                  py: 2, // Add vertical padding
                }}
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: '20px',
                        borderColor: '#0B2E4C',
                        color: '#0B2E4C',
                        '&:hover': {
                          backgroundColor: '#0B2E4C10', // Slight tint on hover
                          borderColor: '#0B2E4C',
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view details action
                        handleSelct(provider);
                      }}
                    >
                       View Profile
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: '20px',
                        backgroundColor: '#0B2E4C',
                        '&:hover': {
                          backgroundColor: '#071E33',
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Chat Now
                    </Button>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={provider.avatar.url}
                    alt={provider.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={provider.name}
                  primaryTypographyProps={{ fontWeight: 'bold', variant: 'h6' }}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {provider.category}
                      </Typography>
                      {provider.description && ` — ${provider.description}`}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )
      ) : (
        <Grid item xs={12} sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="textSecondary">
            {providersList === null
              ? "Please apply filters to see service providers"
              : "No providers match your current filters"}
          </Typography>
        </Grid>
      )}
    </Paper>
  );
}

// ToggleStyleButton remains the same
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