import React, { useState } from 'react';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

interface FilterCardProps {
  title: string;
  isVideoMode: boolean;
}

export const FilterCard: React.FC<FilterCardProps> = ({ title, isVideoMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mode, setMode] = useState(isVideoMode ? 'video' : 'photo');
  const [selectedFilter, setSelectedFilter] = useState('none');

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: string | null) => {
    if (newMode) setMode(newMode);
  };

  const filters = ['none', 'sepia', 'grayscale', 'blur'];
  const actionButtonLabel = mode === 'video' ? 'Record Video' : 'Capture';

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2.5,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        p: 3,
        minHeight: 500,
      }}
    >
      <HeadingCommon title={title} weight={600} baseSize="20px"/>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'center' }}>
        <Button
          variant={mode === 'photo' ? 'contained' : 'outlined'}
          onClick={() => setMode('photo')}
          sx={{
            backgroundColor: mode === 'photo' ? '#0B2E4C' : 'transparent',
            color: mode === 'photo' ? '#fff' : '#0B2E4C',
            borderColor: '#0B2E4C',
            borderRadius: 1,
            textTransform: 'none',
            minWidth: 130,
            '&:hover': {
              backgroundColor: mode === 'photo' ? '#083040' : '#f0f0f0',
            },
          }}
        >
          Photo Mode
        </Button>
        <Button
          variant={mode === 'video' ? 'contained' : 'outlined'}
          onClick={() => setMode('video')}
          sx={{
            backgroundColor: mode === 'video' ? '#0B2E4C' : 'transparent',
            color: mode === 'video' ? '#fff' : '#0B2E4C',
            borderColor: '#0B2E4C',
            borderRadius: 1,
            textTransform: 'none',
            minWidth: 130,
            '&:hover': {
              backgroundColor: mode === 'video' ? '#083040' : '#f0f0f0',
            },
          }}
        >
          Video Mode
        </Button>
      </Box>

      <Box
        sx={{
          width: isMobile ? '100%' : '70%',

          height: 320,
          backgroundColor: '#ccc',
          borderRadius: 2.5,
          margin: '16px auto',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? 'contained' : 'outlined'}
            onClick={() => setSelectedFilter(filter)}
            sx={{
              textTransform: 'none',
              borderRadius: 1,
              px: 2,
              py: 0.5,
              minWidth: 75,
              backgroundColor: selectedFilter === filter ? '#0B2E4C' : 'white',
              color: selectedFilter === filter ? '#fff' : 'black',
              borderColor: '#0B2E4C',
              '&:hover': {
                backgroundColor: selectedFilter === filter ? '#083040' : '#f5f5f5',
              },
            }}
          >
            {filter}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#0B2E4C',
              borderRadius: 1,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#083040',
              },
            }}
          >
            {actionButtonLabel}
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#0B2E4C',
              borderRadius: 1,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#083040',
              },
            }}
          >
            {mode === 'video' ? 'Edit Video' : 'Edit Filters'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#0B2E4C',
              borderRadius: 1,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#083040',
              },
            }}
          >
            Share
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
