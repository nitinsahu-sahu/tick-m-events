import React from 'react';
import { Grid } from '@mui/material';
import { FilterCard } from './FilterCard';

interface FilterGridProps {
  onShare: (img: string) => void;
}

export function FilterGrid({ onShare }: FilterGridProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FilterCard title="Event Filters" isVideoMode={false}  onShare={onShare}  />
      </Grid>
    </Grid>
  );
};
