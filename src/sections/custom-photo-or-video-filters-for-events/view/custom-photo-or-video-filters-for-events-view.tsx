import { Box } from '@mui/material';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { FilterGrid } from '../FilterGrid';
import ShareSection from '../ShareSection';
import {PhotoFilterSection} from '../PhotoFilterSection';

export function CustomPhotoAndVideoFiltersforEventsView() {
  return (
    <DashboardContent>
      <PageTitleSection title="Custom Photo or Video Filter" />
      <PhotoFilterSection />
      <Box mt={4}>
        <FilterGrid />
      </Box>
      <Box mt={4}>
        <ShareSection />
      </Box>
    </DashboardContent>
  );
}
