import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { friends } from "./utills";

// Constants for social buttons to avoid repetition
const SOCIAL_BUTTONS = [
  {
    id: 'whatsapp',
    icon: 'ic:baseline-whatsapp',
    label: 'Whatsapp',
    bgColor: '#25D366',
    hoverBgColor: '#1da851'
  },
  {
    id: 'facebook',
    icon: 'lucide:facebook',
    label: 'Facebook',
    bgColor: '#1877F2',
    hoverBgColor: '#165fcc'
  },
  {
    id: 'tiktok',
    icon: 'ic:baseline-tiktok',
    label: 'TikTok',
    bgColor: '#000',
    hoverBgColor: '#333'
  },
  {
    id: 'twitter',
    icon: 'line-md:twitter',
    label: 'Twitter',
    bgColor: '#000',
    hoverBgColor: '#333'
  }
];

export function EventShare() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Common styles extracted to reduce repetition
  const containerStyles = {
    p: isMobile ? 2 : 4,
    backgroundColor: '#fff',
    borderRadius: 3,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    mb: 4,
    mt: 3,
  };

  const socialButtonsContainerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mb: 4,
  };

  const friendItemStyles = {
    backgroundColor: '#fff',
    borderRadius: 2,
    px: 2,
    py: 2,
    mb: 2,
    fontWeight: 500,
    fontSize: isMobile ? '0.9rem' : '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  };

  const friendsContainerStyles = {
    backgroundColor: '#f0f0f0',
    p: isMobile ? 2 : 3,
    borderRadius: 2,
  };

  return (
    <Box sx={containerStyles}>
      {/* Title */}
      <HeadingCommon 
        variant="h6" 
        title="Share This Event" 
        weight={600} 
        baseSize="34px" 
      />

      {/* Social Buttons */}
      <Box sx={socialButtonsContainerStyles}>
        {SOCIAL_BUTTONS.map((button) => (
          <Button
            key={button.id}
            variant="contained"
            sx={{
              backgroundColor: button.bgColor,
              color: '#fff',
              '&:hover': { backgroundColor: button.hoverBgColor },
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            <Iconify icon={button.icon} /> {button.label}
          </Button>
        ))}
      </Box>

      {/* Friends List */}
      <Box sx={friendsContainerStyles}>
        <HeadingCommon 
          title="Friends Who Booked" 
          weight={500} 
          baseSize="26px" 
        />

        {friends.map((name, index) => (
          <Box key={index} sx={friendItemStyles}>
            {name}
          </Box>
        ))}
      </Box>
    </Box>
  );
}