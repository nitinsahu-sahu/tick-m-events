import React from 'react';
import { Grid } from '@mui/material';
import { FilterCard } from './FilterCard';

export function FilterGrid() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FilterCard title="Event Filters" isVideoMode={false} />
      </Grid>
    </Grid>
  );
};
