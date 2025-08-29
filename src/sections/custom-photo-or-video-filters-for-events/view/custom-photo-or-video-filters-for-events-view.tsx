import { Box } from '@mui/material';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { useState } from 'react';
import { FilterGrid } from '../FilterGrid';
import ShareSection from '../ShareSection';
import { PhotoFilterSection } from '../PhotoFilterSection';
import {FrameProvider} from './FrameContext';

export function CustomPhotoAndVideoFiltersforEventsView() {
   const [sharedImage, setSharedImage] = useState<string | null>(null);
   
  return (
      <FrameProvider>
    <DashboardContent>
      <PageTitleSection title="Custom Photo or Video Filter" />
      <PhotoFilterSection />
      <Box mt={4}>
          <FilterGrid onShare={(img) => setSharedImage(img)} />
      </Box>
      <Box mt={4}>
       <ShareSection image={sharedImage} />
      </Box>
    </DashboardContent>
    </FrameProvider>
  );
}
