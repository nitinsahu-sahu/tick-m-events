import { Button, Card, Grid, Typography, Modal, Box, IconButton, Stack, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TikTokIcon from '@mui/icons-material/VideoLibrary'; // Alternative for TikTok

export function ContactAndSharing({ organizer }: any) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Check if social media links exist
    const hasSocialMedia = organizer?.socialMedia && Object.values(organizer.socialMedia).some(value => value);

    return (
        <>
            <Card variant="outlined" sx={{ p: 3, mt: 3, backgroundColor: "#FAFAFA" }}>
                <HeadingCommon variant="h5" title='Contact and Sharing' weight={600} baseSize="36px" />

                <Typography my={1} fontWeight="bold" fontSize={{ xs: "13px", sm: "17px", md: "21px" }}>
                    Quick Contact Link
                </Typography>

                <Button 
                    onClick={handleOpen} 
                    fullWidth 
                    variant="contained" 
                    sx={{ 
                        backgroundColor: "#0a2940",
                        '&:hover': {
                            backgroundColor: "#0d3552"
                        }
                    }}
                >
                    Contact the Organizer
                </Button>
            </Card>

            {/* Contact Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="organizer-contact-modal"
                aria-describedby="organizer-contact-information"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: 500 },
                        maxWidth: 500,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 0,
                        overflow: 'hidden'
                    }}
                >
                    {/* Header with Gradient Background */}
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #0a2940 0%, #1a4a6e 100%)',
                            color: 'white',
                            p: 3,
                            position: 'relative'
                        }}
                    >
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: 'white'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Contact Organizer
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                            {organizer?.name}
                        </Typography>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3 }}>
                        {/* Contact Information */}
                        <Stack spacing={3}>
                            {/* Email */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        backgroundColor: '#e3f2fd',
                                        borderRadius: '50%',
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <EmailIcon sx={{ color: '#1976d2' }} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        fontWeight="medium"
                                        component="a"
                                        href={`mailto:${organizer?.email}`}
                                        sx={{ 
                                            color: '#1976d2', 
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        {organizer?.email}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Phone */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        backgroundColor: '#e8f5e8',
                                        borderRadius: '50%',
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <PhoneIcon sx={{ color: '#2e7d32' }} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Phone
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        fontWeight="medium"
                                        component="a"
                                        href={`tel:${organizer?.number}`}
                                        sx={{ 
                                            color: '#2e7d32',
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        {organizer?.number}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Website */}
                            {organizer?.website && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                        sx={{
                                            backgroundColor: '#fff3e0',
                                            borderRadius: '50%',
                                            width: 50,
                                            height: 50,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <LanguageIcon sx={{ color: '#f57c00' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Website
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            fontWeight="medium"
                                            component="a"
                                            href={organizer.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ 
                                                color: '#f57c00',
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' }
                                            }}
                                        >
                                            Visit Website
                                        </Typography>
                                    </Box>
                                </Box>
                            )}

                            {/* Social Media */}
                            {hasSocialMedia && (
                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Social Media
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                        {organizer.socialMedia.whatsapp && (
                                            <Chip
                                                icon={<WhatsAppIcon />}
                                                label="WhatsApp"
                                                component="a"
                                                href={organizer.socialMedia.whatsapp}
                                                target="_blank"
                                                clickable
                                                sx={{ backgroundColor: '#25D366', color: 'white' }}
                                            />
                                        )}
                                        {organizer.socialMedia.linkedin && (
                                            <Chip
                                                icon={<LinkedInIcon />}
                                                label="LinkedIn"
                                                component="a"
                                                href={organizer.socialMedia.linkedin}
                                                target="_blank"
                                                clickable
                                                sx={{ backgroundColor: '#0077B5', color: 'white' }}
                                            />
                                        )}
                                        {organizer.socialMedia.facebook && (
                                            <Chip
                                                icon={<FacebookIcon />}
                                                label="Facebook"
                                                component="a"
                                                href={organizer.socialMedia.facebook}
                                                target="_blank"
                                                clickable
                                                sx={{ backgroundColor: '#1877F2', color: 'white' }}
                                            />
                                        )}
                                        {organizer.socialMedia.tiktok && (
                                            <Chip
                                                icon={<TikTokIcon />}
                                                label="TikTok"
                                                component="a"
                                                href={organizer.socialMedia.tiktok}
                                                target="_blank"
                                                clickable
                                                sx={{ backgroundColor: '#000000', color: 'white' }}
                                            />
                                        )}
                                    </Stack>
                                </Box>
                            )}
                        </Stack>

                        {/* Action Buttons */}
                        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Button
                                variant="contained"
                                startIcon={<EmailIcon />}
                                href={`mailto:${organizer?.email}`}
                                fullWidth
                                sx={{
                                    backgroundColor: '#0a2940',
                                    '&:hover': { backgroundColor: '#0d3552' }
                                }}
                            >
                                Send Email
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<PhoneIcon />}
                                href={`tel:${organizer?.number}`}
                                fullWidth
                            >
                                Call Now
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}