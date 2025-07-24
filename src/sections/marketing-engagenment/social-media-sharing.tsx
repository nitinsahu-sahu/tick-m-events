import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    IconButton,
    Paper,
    TextField,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter'; // X
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // TikTok placeholder
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { createSocialMediaPost } from '../../redux/actions/socialMedia.actions';
import baseURL from "../../redux/helper/axios";

interface PostData {
       _id?: string;
    description: string;
    reservationLink: string;
    hashtag: string;
    eventImage: string | null;
    eventId?: string;
    createdBy?: string;
    platform?: string;
    imageUrl?: string | null;
    eventName?: string;
    eventDate?: string;
}

const platforms = [
    { label: 'Facebook', color: '#1877F2', maxLength: Infinity, icon: <FacebookIcon /> },
    { label: 'WhatsApp', color: '#25D366', maxLength: Infinity, icon: <WhatsAppIcon /> },
    { label: 'TikTok', color: '#000', maxLength: 150, icon: <MusicNoteIcon /> },
    { label: 'X', color: '#000', maxLength: 280, icon: <TwitterIcon /> },
    { label: 'LinkedIn', color: '#006294', maxLength: Infinity, icon: <LinkedInIcon /> },
];

export function SocialMediaSharing({ selEvent }: any) {
    console.log("sss", selEvent);
    const [description, setDescription] = useState('Join us for an unforgettable experience! Get your tickets now!');
    const [reservationLink, setReservationLink] = useState('https://tick-m-events.vercel.app/our-event');
    const [hashtag, setHashtag] = useState('#AmazingEvent2025');
    const [eventImage, setEventImage] = useState<string | null>(null);
    const [savedPostData, setSavedPostData] = useState<PostData | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setEventImage(imageUrl);
        }
    };

    // const handlePost = async () => {
    //     if (!eventImage || !selectedFile) {
    //         alert("Please select an image");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('eventId', selEvent?._id);
    //     formData.append('createdBy', user?._id);
    //     formData.append('platform', selectedPlatform.label);
    //     formData.append('description', description);
    //     formData.append('reservationLink', reservationLink);
    //     formData.append('hashtag', hashtag);
    //     formData.append('image', selectedFile);

    //     const response = await dispatch(createSocialMediaPost(formData)) as any;
    //     console.log("Post creation response: ", response);
    //     const post = response?.post;

    //     if (post && post.imageUrl) {
    //         setSavedPostData({
    //             description,
    //             reservationLink,
    //             hashtag,
    //             eventImage,
    //             eventId: selEvent?._id,
    //             createdBy: user?._id,
    //             platform: selectedPlatform.label,
    //             imageUrl: post.imageUrl,
    //         });
    //         alert("Post saved successfully");
    //     } else {
    //         alert("Failed to save post");
    //     }

    // };
    const handlePost = async () => {
        if (!eventImage || !selectedFile) {
            alert("Please select an image");
            return;
        }

        const formData = new FormData();
        formData.append('eventId', selEvent?._id);
        formData.append('createdBy', user?._id);
        formData.append('platform', selectedPlatform.label);
        formData.append('description', description);
        formData.append('reservationLink', reservationLink);
        formData.append('hashtag', hashtag);
        formData.append('image', selectedFile);

        const response = await dispatch(createSocialMediaPost(formData)) as any;
        console.log("Post creation response: ", response);
        const post = response?.post;

        if (post && post._id) {
            try {
                const shareRes = await fetch(`https://tick-m-events-server.onrender.com/api/v1/promotion/social-share/${post._id}`, {
                    headers: { Accept: 'text/html' }
                });

                if (!shareRes.ok) throw new Error(`HTTP ${shareRes.status}`);

                const htmlText = await shareRes.text();

                // Use DOMParser to parse the HTML and extract OG meta tags
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');

                const eventName = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || undefined;
                const eventDateAndDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || undefined;

                setSavedPostData(prev => {
                    const base: PostData = prev ?? {
                          _id: post._id, 
                        description,
                        reservationLink,
                        hashtag,
                        eventImage,
                        eventId: selEvent?._id,
                        createdBy: user?._id,
                        platform: selectedPlatform.label,
                        imageUrl: post.imageUrl,
                        eventName: undefined,
                        eventDate: undefined,
                    };

                    return {
                        ...base,
                        eventName,
                        eventDate: eventDateAndDescription,  // or parse a date string here
                    };
                });

                alert("Post saved and data loaded!");
            } catch (err) {
                console.error("Error loading OG data:", err);
                alert("Post saved, but failed to load OG data.");
            }


        } else {
            alert("Failed to save post");
        }
    };

    const handleShare = () => {
        if (!savedPostData) {
            alert("Please save the post first");
            return;
        }

        const {
            description: savedDescription,
            reservationLink: savedReservationLink,
            hashtag: savedHashtag,
            imageUrl,
            eventId
        } = savedPostData;

        const fullMsg = `${savedDescription}\nReservation: ${savedReservationLink}\n${savedHashtag}\nImage: ${imageUrl}`;
        console.log("full",fullMsg);
        const encodedMsg = encodeURIComponent(fullMsg);

        switch (selectedPlatform.label) {
            case 'WhatsApp':
                window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
                break;
            case 'X':
                window.open(`https://twitter.com/intent/tweet?text=${encodedMsg}`, '_blank');
                break;
            case 'Facebook': {
                if (!eventId || !savedPostData?._id) {
                    alert("Missing event ID or post ID");
                    return;
                }
                const shareUrl = `https://tick-m-events-server.onrender.com/api/v1/social-share/${savedPostData._id}`;
                const encodedUrl = encodeURIComponent(shareUrl);
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
                // const fbShareUrl = `https://tick-m-events.vercel.app/our-event/${eventId}`;
                // const encodedFbUrl = encodeURIComponent(fbShareUrl);
                // window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedFbUrl}`, '_blank');
                break;
            }
            case 'LinkedIn':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedMsg}`, '_blank');
                break;
            default:
                break;
        }

    };


    return (
        <Box p={3} boxShadow={3} mt={3} borderRadius={3} sx={{ border: '1px solid black' }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Social Media Sharing</Typography>

            {/* Platform Selection */}
            <Box display="flex" justifyContent="space-around" mb={2}>
                {platforms.map((btn) => (
                    <Button
                        key={btn.label}
                        onClick={() => setSelectedPlatform(btn)}
                        sx={{
                            bgcolor: selectedPlatform.label === btn.label ? btn.color : '#e0e0e0',
                            color: selectedPlatform.label === btn.label ? 'white' : 'black',
                            borderRadius: '10px',
                            px: 4,
                        }}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Box>

            {/* Preview Card */}

            {/* {eventImage && (
                <Card sx={{ mb: 3, p: 2, borderRadius: '10px', backgroundColor: '#e0f7fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <img src={eventImage} alt="Event" style={{ maxWidth: 100, borderRadius: 10, marginBottom: 8 }} />
                        <Typography variant="subtitle1" fontWeight="bold">{description}</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Reservation: <a href={reservationLink} target="_blank" rel="noreferrer">{reservationLink}</a>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">Hashtag: {hashtag}</Typography>
                    </CardContent>

                    <IconButton onClick={handleShare} sx={{ ml: 2 }}>
                        {selectedPlatform.icon}
                    </IconButton>

                </Card>
            )} */}

            {eventImage && (
                <Card sx={{ mb: 3, p: 2, borderRadius: '10px', backgroundColor: '#e0f7fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <img src={eventImage} alt="Event" style={{ maxWidth: 100, borderRadius: 10, marginBottom: 8 }} />
                        <Typography variant="subtitle1" fontWeight="bold">{description}</Typography>

                        {/* New: Event Name and Date */}
                        {savedPostData?.eventName && (
                            <Typography variant="body2" fontWeight="bold" color="primary">
                                Event: {savedPostData.eventName}
                            </Typography>
                        )}
                        {savedPostData?.eventDate && (
                            <Typography variant="body2" color="textSecondary">
                                Date: {new Date(savedPostData.eventDate).toLocaleDateString()}
                            </Typography>
                        )}

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Reservation: <a href={reservationLink} target="_blank" rel="noreferrer">{reservationLink}</a>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">Hashtag: {hashtag}</Typography>
                    </CardContent>

                    <IconButton onClick={handleShare} sx={{ ml: 2 }}>
                        {selectedPlatform.icon}
                    </IconButton>
                </Card>
            )}

            {/* Edit Form */}
            <Paper sx={{ p: 2, borderRadius: '10px', background: '#f5f5f5' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>Edit Your Post</Typography>

                <Typography variant="body2" fontWeight="bold" mb={1}>Event Image</Typography>
                <TextField type="file" fullWidth onChange={handleImageChange} sx={{ mb: 2 }} />

                <Typography variant="body2" fontWeight="bold" mb={1}>
                    Description ({selectedPlatform.maxLength === Infinity ? 'Unlimited' : `Max ${selectedPlatform.maxLength} chars`})
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val.length <= selectedPlatform.maxLength) {
                            setDescription(val);
                        }
                    }}
                    sx={{ mb: 2 }}
                />

                <Typography variant="body2" fontWeight="bold" mb={1}>Reservation Link</Typography>
                <TextField fullWidth value={reservationLink} onChange={(e) => setReservationLink(e.target.value)} sx={{ mb: 2 }} />

                <Typography variant="body2" fontWeight="bold" mb={1}>Hashtag</Typography>
                <TextField fullWidth value={hashtag} onChange={(e) => setHashtag(e.target.value)} sx={{ mb: 2 }} />
            </Paper>

            {/* Post Button */}
            <Button
                fullWidth
                onClick={handlePost}
                sx={{
                    bgcolor: '#0B2E4C',
                    color: 'white',
                    mt: 2,
                    p: '10px',
                    borderRadius: '10px',
                    '&:hover': { bgcolor: '#083048' },
                }}
            >
                Post to {selectedPlatform.label}
            </Button>
        </Box>
    );
}
