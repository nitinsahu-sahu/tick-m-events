import {
    Box, Typography, CardContent, Button, Paper,
    Card, useTheme, useMediaQuery, Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

import { tabs, typeMap, reviews } from './utills';



export function MusicFestivalTwo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tab, setTab] = useState(0);

    const filteredReviews = reviews.filter((review) => review.type === typeMap[tab]);

    return (
        <Box>
            <Card sx={{ borderRadius: 4, boxShadow: 3, p: 1, mt: 3 }}>
                <CardContent>
                    {/* Title */}
                    <Typography variant="h5" fontWeight={600} mb={2}>
                        Urban Music Festival 2025
                    </Typography>

                    {/* Banner */}
                    <Box
                        component="img"
                        src="/assets/images/event/urbanfestival.png"
                        alt="Urban Music Festival Banner"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: 300,
                            borderRadius: 2,
                            objectFit: 'cover',
                            mb: 2,
                        }}
                    />

                    {/* Date & Location */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems="center"
                        justifyContent="flex-start"
                        mb={2}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CalendarMonthIcon fontSize="small" />
                            <Typography fontSize="14px">February 10, 2025, 8 PM – 2 AM</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocationOnIcon fontSize="small" />
                            <Typography fontSize="14px">Main Square, Douala</Typography>
                        </Stack>
                    </Stack>

                    {/* Description */}
                    <Typography fontSize="14px" mb={3}>
                        Join us for the biggest Urban Music Festival featuring top artists, DJs, and an
                        unforgettable nightlife experience.
                    </Typography>

                    <Box
                        mt={3}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            backgroundColor: '#f0f0f0',
                            borderRadius: 3,
                            maxWidth: '100%',
                        }}
                    >
                        <Typography
                            variant={isMobile ? 'subtitle1' : 'h6'}
                            sx={{ fontWeight: 'bold', mb: 1 }}
                        >
                            Participant Reviews & Experiences
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Overall Rating:{' '}
                            <Box component="span" sx={{ color: '#f4b400', fontWeight: 600 }}>
                                4.8/5
                            </Box>{' '}
                            (Based on 250 reviews)
                        </Typography>

                        <Box sx={{ p: { xs: 1, md: 3 } }}>
                            <Stack direction="row" spacing={2} flexWrap="wrap" mb={3}>
                                {tabs.map((label, index) => (
                                    <Button
                                        key={label}
                                        onClick={() => setTab(index)}
                                        sx={{
                                            flex: isMobile ? '1 1 auto' : 'unset',
                                            backgroundColor: tab === index ? '#0B2E4C' : '#ccc',
                                            color: tab === index ? '#fff' : '#000',
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontSize: '0.9rem',
                                            px: 2,
                                            py: 1,
                                            minWidth: 100,
                                            '&:hover': {
                                                color: 'black',
                                                backgroundColor: tab === index ? '#0B2E4C' : '#bbb',
                                            },
                                        }}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </Stack>

                            <Box mb={2}>
                                <Typography>
                                    Showing <strong>{tabs[tab]}</strong> content...
                                </Typography>
                            </Box>
                        </Box>

                        {/* Review List */}
                        <Box display="flex" flexDirection="column" gap={2}>
                            {filteredReviews.map((review, index) => (
                                <Paper
                                    key={index}
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 600, fontSize: isMobile ? '0.95rem' : '1rem' }}
                                    >
                                        {review.name}
                                    </Typography>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ color: '#f4b400', fontSize: '14px' }}
                                    >
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <StarIcon key={i} fontSize="small" />
                                        ))}
                                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                                            ({review.rating}/5)
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        sx={{ display: 'block', mt: 0.5 }}
                                    >
                                        {review.date}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        mt={1}
                                        sx={{ fontSize: isMobile ? '0.85rem' : '1rem' }}
                                    >
                                        &ldquo;{review.comment}&rdquo;
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>

                        <Box mt={3} textAlign="center">
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#0B2E4C',
                                    color: '#fff',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    mt: 2,
                                    '&:hover': {
                                        backgroundColor: '#08304c',
                                    },
                                }}
                            >
                                Leave a review
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}