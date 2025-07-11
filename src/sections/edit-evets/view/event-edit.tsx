import { Box, Typography } from '@mui/material';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';

export function EditEventsView() {
  return (
    <DashboardContent>
      <PageTitleSection title="Events Edits" />


      <Typography>Edit Evets</Typography>

    </DashboardContent>
  );
}
