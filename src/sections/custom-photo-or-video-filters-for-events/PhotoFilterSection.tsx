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
        <HeadingCommon title="Customize your filter" color="#888" baseSize="16px" />

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

        {/* Bottom Button */}
        <Grid container spacing={2} mt={1} justifyContent="center">
          <Grid item xs={12} >
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#0B2E4C',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 400,
                py: 1,
                borderRadius: 1.3,
                '&:hover': {
                  backgroundColor: '#083040',
                },
              }}
            >
              No filter defined by the organizer, create and use my filter for this event.
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

};

