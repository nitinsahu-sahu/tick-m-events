import { useEffect, useState } from 'react';
import { Box, MenuItem, Select, Typography, Button, Stack, Slider, FormControl, InputLabel } from '@mui/material';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import axios from 'src/redux/helper/axios';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useFrame } from './view/FrameContext';

export function PhotoFilterSection() {
  const { _id } = useSelector((state: RootState) => state.auth.user);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');
  const [isCustom, setIsCustom] = useState(false);

  const frames = selectedEvent?.customPhotoFrame?.frameUrls || [];
  const frameList = Array.isArray(frames) ? frames : [frames];
 console.log("Selected Event:", selectedEvent);
console.log("Frames:", selectedEvent?.customPhotoFrame);

  // const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [customFilters, setCustomFilters] = useState({
    brightness: 100,
    contrast: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
  });
  const { selectedFrame, setSelectedFrame } = useFrame();
  const buildCustomFilter = () => {
    const { brightness, contrast, blur, grayscale, sepia } = customFilters;
    return `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) grayscale(${grayscale}%) sepia(${sepia}%)`;
  };

  const appliedFilter = isCustom ? buildCustomFilter() : selectedFilter;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`/event-order/user/${_id}`);
        const tickets = response.data;
        console.log("Tickets:", tickets);

        const uniqueEvents = Array.from(
          new Map(
            tickets.map((ticket: any) => {
              const eventId = ticket.eventDetails._id;
              return [
                eventId,
                {
                  ...ticket.eventDetails,
                  customPhotoFrame: ticket.customPhotoFrame ?? null, // attach the frame manually
                },
              ];
            })
          ).values()
        );

        console.log("Unique events with frames:", uniqueEvents); // ✅ Debug: See if frame is present

        setEvents(uniqueEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    }

    if (_id) {
      fetchEvents();
    }
  }, [_id]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const filterOptions = [
    { label: 'None', value: 'none' },
    { label: 'Grayscale', value: 'grayscale(100%)' },
    { label: 'Sepia', value: 'sepia(100%)' },
    { label: 'Blur', value: 'blur(4px)' },
    { label: 'Brightness', value: 'brightness(150%)' },
    { label: 'Contrast', value: 'contrast(200%)' },
    { label: 'Custom', value: 'custom' },
  ];

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
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
        <FormControl fullWidth size="small" sx={{ maxWidth: 250 }}>
          <InputLabel>Select Event</InputLabel>
          <Select
            value={selectedEvent?._id || ''}
            onChange={(e) => {
              const selected = events.find(ev => ev._id === e.target.value);
              setSelectedEvent(selected || null);
            }}
            label="Select Event"
          >
            {events.map((event: any) => (
              <MenuItem key={event._id} value={event._id}>
                {event.eventName} ({event.date})
              </MenuItem>
            ))}
          </Select>

        </FormControl>
      </Box>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <HeadingCommon variant="h5" title="Custom Photo or Video Filter" weight={600} />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          {frameList.length > 0 ? (
            frameList.map((frameUrl: string, index: number) => (
              <Box
                key={index}
                component="img"
                src={frameUrl}
                alt={`Frame ${index + 1}`}
                onClick={() => setSelectedFrame(frameUrl)} // ✅ sets selected frame globally
                sx={{
                  width: 120,
                  height: 140,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: '0 0 6px rgba(0,0,0,0.1)',
                  border: selectedFrame === frameUrl ? '3px solid #0B2E4C' : 'none',
                  cursor: 'pointer',
                }}
              />
            ))
          ) : (
            <Typography variant="body2" color="#888" sx={{ zIndex: 2 }}>
              No Filter or Frame Available
            </Typography>
          )}

          {uploadedImage && (
            <Box
              component="img"
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: appliedFilter,
                zIndex: 0,
              }}
            />
          )}
        </Box>


        <Button component="label" variant="outlined" sx={{ mt: 1 }}>
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>

        {uploadedImage && (
          <>
            <Stack direction="row" spacing={1} justifyContent="center" mt={2} flexWrap="wrap">
              {filterOptions.map((f) => (
                <Button
                  key={f.value}
                  size="small"
                  variant={
                    selectedFilter === f.value || (isCustom && f.value === 'custom')
                      ? 'contained'
                      : 'outlined'
                  }
                  onClick={() => {
                    setSelectedFilter(f.value);
                    setIsCustom(f.value === 'custom');
                  }}
                >
                  {f.label}
                </Button>
              ))}
            </Stack>

            {isCustom && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" mb={1}>
                  Adjust Filters:
                </Typography>

                <Stack direction="row" spacing={4} flexWrap="wrap" justifyContent="center">
                  {Object.entries(customFilters).map(([key, value]) => (
                    <Box key={key} sx={{ width: 160 }}>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 500, textAlign: 'center', display: 'block', mb: 0.5 }}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                      </Typography>
                      <Slider
                        value={value}
                        min={key === 'blur' ? 0 : 0}
                        max={key === 'blur' ? 10 : 200}
                        step={key === 'blur' ? 0.5 : 1}
                        onChange={(_, newVal) =>
                          setCustomFilters((prev) => ({ ...prev, [key]: newVal as number }))
                        }
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
