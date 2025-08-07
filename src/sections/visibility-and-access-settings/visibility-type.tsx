import { Box, Button, Tooltip, Checkbox, IconButton, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';

import { AppDispatch, RootState } from 'src/redux/store';
import { eventUpdate, eventVisibilityUpdate } from 'src/redux/actions/event.action';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

interface VisibilityData {
  _id: string;
  eventId: string;
  eventCustomizationId: string;
  ticketCustomId: string;
  visibilityType: 'public' | 'private' | 'unlisted';
  customUrl: string;
  promotionAndHighlight: {
    homepageHighlighting: boolean;
    autoShareOnSocialMedia: boolean;
  };
  status: 'draft' | 'publish' | 'archived';
}

interface VisibilityTypeProps {
  eventId: string;
  visibility: VisibilityData;
}

// Generate URL based on visibility type
const generateDefaultUrl = (visibilityType: string, eventId: string) => {
  const baseUrl = "https://tick-m-events.vercel.app/our-event";
  return visibilityType === 'public' ? baseUrl : `${baseUrl}/${eventId}`;
};

export function VisibilityType({ eventId, visibility }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [visibilityState, setVisibilityState] = useState<VisibilityData>({
    ...visibility,
    customUrl: visibility?.customUrl || generateDefaultUrl(visibility?.visibilityType, eventId)
  });
  const [promotionSettings, setPromotionSettings] = useState({
    homepageHighlighting: visibility?.promotionAndHighlight?.homepageHighlighting || false,
    autoShareOnSocialMedia: visibility?.promotionAndHighlight?.autoShareOnSocialMedia || false
  });

  // Update URL when visibility type changes
  useEffect(() => {
    if (eventId) {
      setVisibilityState(prev => ({
        ...prev,
        customUrl: generateDefaultUrl(prev.visibilityType, eventId)
      }));
    }
  }, [visibilityState.visibilityType, eventId]);

  useEffect(() => {
    if (visibility) {
      setVisibilityState(visibility);
      setPromotionSettings({
        homepageHighlighting: visibility.promotionAndHighlight.homepageHighlighting,
        autoShareOnSocialMedia: visibility.promotionAndHighlight.autoShareOnSocialMedia
      });
    }
  }, [visibility]);

  const handlePromotionChange = (field: keyof typeof promotionSettings) => {
    const newSettings = {
      ...promotionSettings,
      [field]: !promotionSettings[field]
    };
    setPromotionSettings(newSettings);
    setVisibilityState({
      ...visibilityState,
      promotionAndHighlight: newSettings
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(visibilityState.customUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('URL copied to clipboard!');
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibilityState({
      ...visibilityState,
      visibilityType: event.target.value as 'public' | 'private'
    });
  };

  const handleUpdateEventVisibility = async () => {
    // Here you would typically dispatch an action to save the settings
    const updatedEvent = {
      _id: eventId,
      visibilityState,
      promotionSettings
    }
    const result = await dispatch(eventVisibilityUpdate(updatedEvent));

    if (result?.status === 200) {
      toast.success("Setting Saved...")
    } else {
      toast.error(result?.message);
    }

  };


  if (!eventId) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="body1">No event selected</Typography>
      </Box>
    );
  }

  return (
    <Box
      boxShadow={3}
      borderRadius={3}
      p={{ xs: 2, sm: 3, md: 4 }}
      mt={3}
      bgcolor="white"
    >
      <Box display="flex" justifyContent="space-between">
        <HeadingCommon title="Visibility Type" />
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <RadioGroup
        value={visibilityState?.visibilityType}
        onChange={handleVisibilityChange}
        sx={{ mt: 2 }}
      >
        <FormControlLabel
          value="public"
          control={<Radio checked={visibilityState?.visibilityType === 'public'} />}
          label="Public - Accessible to everyone"
        />
        <FormControlLabel
          value="private"
          control={<Radio checked={visibilityState?.visibilityType === 'private'} />}
          label="Private - Only via direct link"
        />
      </RadioGroup>

      <Box mt={3}>
        <Typography variant="subtitle2" mb={1}>
          Event URL
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle2"
            component="a"
            href={visibilityState?.customUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {visibilityState?.customUrl}
          </Typography>
          <Tooltip title={copied ? 'Copied!' : 'Copy'}>
            <IconButton size="small" onClick={handleCopy} sx={{ ml: 1 }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box mt={3}>
        <Typography variant="subtitle1" mb={2}>
          Promotion Settings
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={promotionSettings?.homepageHighlighting}
              onChange={() => handlePromotionChange('homepageHighlighting')}
            />
          }
          label="Highlight on homepage"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={promotionSettings?.autoShareOnSocialMedia}
              onChange={() => handlePromotionChange('autoShareOnSocialMedia')}
            />
          }
          label="Auto share on social media"
        />
      </Box>

      {/* Save Button - Disabled until event is selected */}
      <Box mt={4}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#072F4A',
            color: '#fff',
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
          onClick={handleUpdateEventVisibility}
          disabled={!eventId}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
}