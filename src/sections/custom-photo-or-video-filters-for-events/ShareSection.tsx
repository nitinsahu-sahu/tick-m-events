import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

const ShareSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2.5,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HeadingCommon title="Sharing & Social Media Engagement" weight={600} />

      <Box
        sx={{
          width: isMobile ? '100%' : '400px',

          height: 300,
          backgroundColor: '#d9d9d9',
          borderRadius: 2.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 30px auto',
        }}
      >
        <HeadingCommon color="#888" variant="body2" title="No media selected" baseSize="14px" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1877F2',
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 500,
            width: isMobile ? '100%' : 'auto',
            '&:hover': { backgroundColor: '#145bd1' },
          }}
        >
          Share on Facebook
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#E4405F',
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 500,
            width: isMobile ? '100%' : 'auto',
            '&:hover': { backgroundColor: '#c42b49' },
          }}
        >
          Share on Instagram
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000000',
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 500,
            color: '#fff',
            width: isMobile ? '100%' : 'auto',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Share on TikTok
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#25D366',
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 500,
            width: isMobile ? '100%' : 'auto',
            '&:hover': { backgroundColor: '#1ebd5a' },
          }}
        >
          Share on WhatsApp
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FFCC00',
            color: '#000',
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 500,
            width: isMobile ? '100%' : 'auto',
            '&:hover': { backgroundColor: '#e6c200' },
          }}
        >
          Save for Later
        </Button>
      </Box>
    </Box>
  );
};

export default ShareSection;
