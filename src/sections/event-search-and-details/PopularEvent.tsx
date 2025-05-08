import { Box, Button, Card, CardContent, Grid, Typography, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { formatTimeTo12Hour } from 'src/hooks/formate-time';
import { AppDispatch } from 'src/redux/store';
import { eventAddToWishlist } from 'src/redux/actions/event.action';

interface ApiResult {
  status: number;
  type: string;
  message: any;
  // Add other properties if needed
}

export function PopularEvent({ event, handleEventDetails }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const handleViewEvent = (selectedViewEvent: any) => {
    handleEventDetails(selectedViewEvent)
  };

  const handleAddEventWishlist = async (selectedViewEvent: any) => {
    try {
      const result = await dispatch(eventAddToWishlist(selectedViewEvent))
      if ((result as ApiResult)?.status === 201) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error("Server maintenence");
    }
  };

  // Simplified arrow function without block statement

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundImage: `url('./assets/images/event/image.png')`,
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        overflow: 'visible',
        position: 'relative',
        my: 3
      }}
    >
      {event && (
        <Box
          sx={{
            position: 'absolute',
            top: 46,
            left: -12,
            overflow: 'hidden',
            backgroundColor: '#0B2E4C',
            color: '#fff',
            px: 2,
            py: '2px',
            fontSize: '10px',
            fontWeight: 600,
            transform: 'rotate(-45deg)',
            width: '120px',
            textAlign: 'center',
            zIndex: 1,
            boxShadow: 2,
          }}
        >
          {event?.category}
        </Box>
      )}
      <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
        <Avatar
          src={event?.customization?.eventLogo?.url}
          alt={event.title}
          sx={{
            border: "2px solid black",
            width: { xs: '70px', sm: '80px', md: '90px' },
            height: { xs: '70px', sm: '80px', md: '90px' },
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <HeadingCommon variant="h6" mt={5} title={event.eventName} baseSize="25px" weight={600} color="#0B2E4C" />
        <HeadingCommon variant="body2" title={`${event.location} | ${event.date} | ${formatTimeTo12Hour(event.time)}`} baseSize="16px" weight={400} />
        <HeadingCommon variant="body2" title={event.payStatus} baseSize="16px" weight={700} color="#0B2E4C" />
        {/* Star Rating */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 1,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              fontSize="small"
              sx={{
                color: i < Math.floor(23) ? '#fbc02d' : '#ddd',
              }}
            />
          ))}
          <Typography fontWeight="bold" ml={0.5} fontSize={{ xs: '12px', sm: '14px' }}>
            3
          </Typography>
        </Box>

        <Grid container spacing={2} mt={2} justifyContent="center">
          <Grid item xs={12} sm={10} md={11}>
            <Grid container spacing={2}>
              {['View Details', 'Wishlist', 'Share'].map((text) => (
                <Grid item xs={4} key={text}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      if (text === "View Details") {
                        handleViewEvent({ selectedViewEvent: event })// Log when "Modify Profile" is clicked
                      }
                      if (text === "Wishlist") {
                        handleAddEventWishlist({ selectedViewEvent: event })// Log when "Modify Profile" is clicked
                      }
                      // Add other conditions if needed
                    }}
                    sx={{
                      fontSize: { xs: '10px', sm: '14px', md: '14px' },
                      fontWeight: 500,
                    }}
                  >
                    {text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  )
}


