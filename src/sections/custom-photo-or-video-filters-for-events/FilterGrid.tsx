import { Grid } from '@mui/material';
import { FilterCard } from './FilterCard';

interface FilterGridProps {
  onShare: (img: string) => void;
  frameSize: { width: number; height: number };
}

export function FilterGrid({ onShare, frameSize }: FilterGridProps) {
  return (
    <Grid mt={2}>
      <FilterCard title="Event Filters" isVideoMode={false} onShare={onShare} frameSize={frameSize} />
    </Grid>
  );
};
