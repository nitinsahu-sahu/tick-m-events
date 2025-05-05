import { Box, CardContent, Button, Card, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { MusicFestivalTable } from 'src/components/tables/music-festival-table';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { RootState } from 'src/redux/store';

import { musicFestivalTableData, musicFestivalTableHeaders } from './utills';



export function MusicFestival() {
    const { fullData } = useSelector((state: RootState) => state?.event);

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

                    {/* Organizer Section */}
                    <Box
                        sx={{
                            backgroundColor: '#f3f3f3',
                            p: 2,
                            borderRadius: 2,
                            mb: 4,
                        }}
                    >
                        <HeadingCommon title="Organizer: Music Events Africa" weight={500} baseSize="26px" />

                        <Button variant="contained" size="small" sx={{ mb: 2, backgroundColor: '#0B2E4C' }}>
                            View More Events
                        </Button>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <EmailIcon sx={{ color: '#0B2E4C' }} fontSize="small" />
                                <HeadingCommon title="contact@musicevents.com" weight={400} baseSize="16px" />
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <PhoneIcon sx={{ color: '#0B2E4C' }} fontSize="small" />
                                <HeadingCommon title="+237 123 456 789" weight={400} baseSize="16px" />
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Schedule */}
                    <HeadingCommon variant="h6" title="Event Schedule" weight={500} baseSize="26px" />

                    <Stack spacing={1.5}>
                        {[
                            { time: '8:00 PM', title: 'Doors Open' },
                            { time: '9:00 PM', title: 'Main Artist Performance' },
                            { time: '11:00 PM', title: 'DJ Set & After Party' },
                        ].map((item, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#f5f5f5',
                                    p: 1.5,
                                    borderRadius: 1.5,
                                }}
                            >
                                <HeadingCommon title={item.time} weight={600} baseSize="18px" />
                                <HeadingCommon color="#B3B3B3" title={item.title} weight={400} baseSize="18px" />
                            </Box>
                        ))}
                    </Stack>

                    <Box sx={{ mx: 'auto', mt: 4 }}>
                        {/* Section Title */}
                        <HeadingCommon title=" Available Tickets" weight={500} baseSize="26px" />

                        {/* Responsive Table */}
                        <MusicFestivalTable headers={musicFestivalTableHeaders} data={musicFestivalTableData} type="1" />

                        {/* Book Now Button */}
                        <Box mt={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#0B2E4C',
                                    borderRadius: 2.5,
                                    px: 1,
                                    py: 1.5,
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#1565C0',
                                    },
                                }}
                            >
                                Book Now
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}