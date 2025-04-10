import {
    Box, Typography, CardContent, Button,
    Card,Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { MusicFestivalTable } from 'src/components/tables/music-festival-table';
import { musicFestivalTableData, musicFestivalTableHeaders } from './utills';


export function MusicFestival() {
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

                    {/* Organizer Section */}
                    <Box
                        sx={{
                            backgroundColor: '#f3f3f3',
                            p: 2,
                            borderRadius: 2,
                            mb: 4,
                        }}
                    >
                        <Typography fontWeight={600} mb={1}>
                            Organizer: Music Events Africa
                        </Typography>

                        <Button variant="contained" size="small" sx={{ mb: 2, backgroundColor: '#0B2E4C' }}>
                            View More Events
                        </Button>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <EmailIcon sx={{ color: '#0B2E4C' }} fontSize="small" />
                                <Typography fontSize="14px">contact@musicevents.com</Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <PhoneIcon sx={{ color: '#0B2E4C' }} fontSize="small" />
                                <Typography fontSize="14px">+237 123 456 789</Typography>
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Schedule */}
                    <Typography variant="h6" fontWeight={600} mb={2}>
                        Event Schedule
                    </Typography>

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
                                <Typography fontWeight={600}>{item.time}</Typography>
                                <Typography fontSize="14px">{item.title}</Typography>
                            </Box>
                        ))}
                    </Stack>

                    <Box sx={{ mx: 'auto', mt: 4 }}>
                        {/* Section Title */}
                        <Typography variant="h6" fontWeight={600} mb={2}>
                            Available Tickets
                        </Typography>

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