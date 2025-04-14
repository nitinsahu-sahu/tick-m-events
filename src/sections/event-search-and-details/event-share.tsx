import {
    Box, Button, useTheme,
    useMediaQuery
} from "@mui/material";
import { Iconify } from "src/components/iconify";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { friends } from "./utills";

export function EventShare() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box
            sx={{
                p: isMobile ? 2 : 4,
                backgroundColor: '#fff',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                mb: 4,
                mt: 3,
            }}
        >
            {/* Title */}
            <HeadingCommon variant="h6" title="Share This Event" weight={600} baseSize="34px" />

            {/* Social Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 4,
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#25D366',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#1da851' },
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                >
                    <Iconify icon="ic:baseline-whatsapp" /> Whatsapp
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#1877F2',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#165fcc' },
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                >
                    <Iconify icon="lucide:facebook" /> Facebook
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#333' },
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                >
                    <Iconify icon="ic:baseline-tiktok" /> Ticktok
                </Button>
            </Box>

            {/* Friends List */}
            <Box
                sx={{
                    backgroundColor: '#f0f0f0',
                    p: isMobile ? 2 : 3,
                    borderRadius: 2,
                }}
            >
                <HeadingCommon title="Friends Who Booked" weight={500} baseSize="26px" />

                {friends.map((name, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            px: 2,
                            py: 2,
                            mb: 2,
                            fontWeight: 500,
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        }}
                    >
                        {name}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}