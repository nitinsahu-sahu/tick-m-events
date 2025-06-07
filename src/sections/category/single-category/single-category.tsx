import { Box, Grid, Typography, Card, CardMedia, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Marquee from 'react-fast-marquee';
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { TicketCard } from 'src/components/event-card/event-card';
import { AppDispatch, RootState } from 'src/redux/store';
import { categoryByIdFetch } from 'src/redux/actions/event.action';
import { PopularEvent } from 'src/sections/home-and-recommendations/PopularEvent';

export function SingleCategoriesView() {
  const { categoryId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { _id, name, cover, subcategories, events } = useSelector((state: RootState) => state?.event?.category);

  useEffect(() => {
    dispatch(categoryByIdFetch(categoryId));
  }, [dispatch, categoryId]);
  // Example category data with a beautiful arts/culture banner image
  const category = {
    id: '1',
    name: 'Cultural & Artistic Events',
    cover: {
      url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Beautiful cultural events banner
    },
    subcategories: [
      { id: '1', name: 'Art Exhibitions' },
      { id: '2', name: 'Theater' },
      { id: '3', name: 'Dance Performances' },
      { id: '4', name: 'Cultural Festivals' },
      { id: '5', name: 'Music Concerts' },
      { id: '6', name: 'Poetry Slams' },
      { id: '7', name: 'Film Screenings' },
    ],
    events: [
      {
        id: 1,
        title: 'Festival Urban Music',
        image: 'festival.png',
        location: 'Douala',
        date: '10/02/2025',
        time: '5:00 PM',
        status: '5,000 XAF',
        statusColor: '#0B2E4C',
        rating: 4.8,
        viewPromo: true,
      },
      {
        id: 2,
        title: 'Startup Summit 2025',
        image: 'startup.png',
        location: 'Yaoundé',
        date: '10/02/2025',
        time: '5:00 PM',
        status: 'Free',
        statusColor: '#0B2E4C',
        rating: 4.8,
        viewPromo: false,
      },
      {
        id: 3,
        title: 'Tech Expo 2025',
        image: 'tech.png',
        location: 'Douala',
        date: '15/02/2025',
        time: '6:00 PM',
        status: '$50',
        statusColor: '#0B2E4C',
        rating: 5.0,
        viewPromo: false,
      },
    ],
  };

  return (
    <Box key={_id}>
      {/* Enhanced Category Banner with beautiful image */}
      <Card
        sx={{
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 3,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="350"
          image={cover?.url}
          alt={name}
          sx={{
            objectFit: 'cover',
            width: '100%',
          }}
        />

        {/* Gradient overlay with content */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 4,
            background:
              'linear-gradient(to top, rgba(11,46,76,0.9) 0%, rgba(11,46,76,0.3) 70%, transparent 100%)',
            color: 'white',
          }}
        >
          <HeadingCommon
            title={category.name}
            weight={600}
            baseSize="34px"
            variant="h4"
            color="white"
          />

          {/* Animated subcategories marquee */}
          <Box sx={{ mb: 3, overflow: 'hidden' }}>
            <Marquee speed={40} gradient={false}>
              {subcategories?.map((subcat: any, index: any) => (
                <React.Fragment key={subcat._id || index}>
                  {index < category.subcategories.length - 1 && (
                    <Box
                      component="span"
                      sx={{
                        color: 'white',
                        fontSize: '1.2rem',
                      }}
                    >
                      •
                    </Box>
                  )}
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      px: 2,
                      fontSize: '1.1rem',
                      textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    }}
                  >
                    {subcat.name}
                  </Typography>

                </React.Fragment>
              ))}
            </Marquee>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              size="medium"
              sx={{
                borderRadius: '20px',
                px: 3,
                py: 1,
                backgroundColor: 'rgba(255,255,255,0.95)',
                color: '#0B2E4C',
                fontWeight: 700,
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {events?.length} Events Available
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Events Section - Final Enhanced Version */}
      <Box
        sx={{
          mt: 6,
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: '1400px',
          mx: 'auto',
          mb: 8, // Added proper bottom margin for the page
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
          sx={{
            color: '#0B2E4C',
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              backgroundColor: 'primary.main',
              mt: 2,
              borderRadius: '2px',
            },
          }}
        >
          Category Events
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            justifyContent: { xs: 'center', sm: 'flex-start' },
            minHeight: 200 // Ensures consistent spacing when empty
          }}
        >
          {events?.length > 0 ? (
            events.map((event: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                key={event.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: '360px',
                    '& .MuiButton-contained': {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                >
                  <PopularEvent event={event} flag='singleCagetory'/>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No events found
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                Check back later for upcoming events
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
