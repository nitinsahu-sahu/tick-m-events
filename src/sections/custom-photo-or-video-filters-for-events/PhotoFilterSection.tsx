import { Box, Button, Grid } from '@mui/material';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

export function PhotoFilterSection() {

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 2.5,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        p: { xs: 2, sm: 4 },
        mt: 4,
        textAlign: 'center',
      }}
    >
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <HeadingCommon variant="h5" title="Photo And Filter" weight={600} />

        {/* Dashed Box */}
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 4,
            width: 254,
            height: 280,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
            mb: 1,
          }}
        >
          <HeadingCommon color="#888" variant="body2" title="No Filter Available" baseSize="14px" />

        </Box>
      </Box>
    </Box>
  );

};

