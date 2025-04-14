import {
    Box, Typography, CardContent, Button, Paper,
    Card, useTheme, useMediaQuery, Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

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
                    <HeadingCommon title="Urban Music Festival 2025" weight={600} baseSize="30px" />

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

                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CalendarMonthIcon fontSize="small" />
                            <HeadingCommon title="February 10, 2025, 8 PM – 2 AM" weight={400} baseSize="16px" />
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center" >
                            <LocationOnIcon fontSize="small" />
                            <HeadingCommon title="Main Square, Douala" weight={400} baseSize="16px" />

                        </Stack>
                    </Stack>

                    {/* Description */}
                    <HeadingCommon mb={2} title="Join us for the biggest Urban Music Festival featuring top artists, DJs, and an
                        unforgettable nightlife experience." weight={400} baseSize="16px" />

                    <Box
                        mt={3}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            backgroundColor: '#f0f0f0',
                            borderRadius: 3,
                            maxWidth: '100%',
                        }}
                    >
                        <HeadingCommon variant="h6" title="Participant Reviews & Experiences" weight={500} baseSize="26px" />

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
                                    <HeadingCommon variant="subtitle1" title={review.name} weight={500} baseSize="16px" />

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
                                    <HeadingCommon variant="caption" color="#C9C9C9" title={review.date} weight={400} baseSize="14px" mt={0.5} />
                                    <HeadingCommon variant="body2" title={review.comment} weight={400} baseSize="14px" mt={0.5} />

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