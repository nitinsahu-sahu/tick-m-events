import { Avatar, Box, Button, Grid, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { AppDispatch, RootState } from "src/redux/store";
import { profileGet, updateProAvatar, updateProCover } from "src/redux/actions";

import axios from "../../redux/helper/axios";

interface ApiResult {
    status: number;
    type: string;
    message: any;
}

export function MainProfile({ handleAvalibility, setShowService, onModify }: any) {
    const { profile } = useSelector((state: RootState) => state?.profile);
    const dispatch = useDispatch<AppDispatch>();
    const [covererror, setCoverError] = useState(null)
    const [avatarerror, setAvatarError] = useState(null)
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const handleModifyClick = (rowData: any) => {
        onModify(rowData);  // Call the callback with row data
    };

    
    const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('cover', file);

            try {
                const result = await dispatch(updateProCover(formData))
                if ((result as ApiResult)?.status === 200) {
                    setCoverError(null);
                    dispatch(profileGet(profile?._id));
                } else {
                    setCoverError(result.message);

                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                const result = await dispatch(updateProAvatar(formData))
                if ((result as ApiResult)?.status === 200) {
                    setAvatarError(null);
                    dispatch(profileGet(profile?._id));
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const triggerAvatarInput = () => {
        avatarInputRef.current?.click();
    };

    const triggerCoverInput = () => {
        coverInputRef.current?.click();
    };

    return (
        <Box boxShadow={3} borderRadius={3} bgcolor="#FFFFFF" mt={3} >
            {/* Banner Image */}
            {/* Hidden file inputs */}
            <input
                type="file"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {/* Banner Image with Edit Button */}
            <Box
                borderRadius="24px 24px 0px 0px"
                sx={{
                    width: "100%",
                    height: { xs: "150px", sm: "220px" },
                    backgroundImage: profile?.cover?.url
                        ? `url(${profile.cover.url})`
                        : `url(https://res.cloudinary.com/dm624gcgg/image/upload/v1745399695/a33ffade6c44792172af87c950e914099ba87c45_dg1rab.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center", // More specific position
                    backgroundRepeat: "no-repeat",
                    position: 'relative',
                    overflow: 'hidden' // Ensures rounded corners work properly
                }}
            >
                <IconButton
                    onClick={triggerCoverInput}
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)'
                        }
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <Typography sx={{
                    position: 'absolute',
                    top: 10,
                    right: 16,

                }} color="red" fontSize={15} fontWeight={600}>{covererror}</Typography>

            </Box>

            {/* Profile Info */}
            <Box display="flex" alignItems="center" gap={3} p={3} >
                <Box sx={{ position: "relative", mt: -5 }}>
                    <Avatar
                        src={profile?.avatar?.url}
                        alt="Profile"
                        sx={{
                            width: 90,
                            height: 90,
                        }}
                    />
                    {/* Inset Active Dot */}
                    {/* <Box
                        sx={{
                            position: "absolute",
                            bottom: 4,
                            right: 4,
                            width: 12,
                            height: 12,
                            backgroundColor: "#04C832",
                            border: "2px solid white",
                            borderRadius: "50%",
                            zIndex: 1,
                        }}
                    /> */}
                    {/* Avatar Edit Button */}
                    <IconButton
                        onClick={triggerAvatarInput}
                        sx={{
                            position: 'absolute',
                            bottom: -2,
                            right: -8,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)'
                            }
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ marginTop: "-43px" }}>
                    <HeadingCommon variant="body1" title={profile?.name} weight={600} mb={0} />
                    <HeadingCommon variant="body" title={profile?.username} weight={400} baseSize="16px" />
                </Box>
            </Box>

            {/* Stats Section */}
            <Box mx={3}>
                {/* Stats Box */}
                <Grid container
                    sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        border: '1px solid #ccc',
                        borderRadius: 3,
                        textAlign: 'center',
                        backgroundColor: '#fff',
                    }}>
                    <Grid item xs={6} sm={3}>
                        <Typography fontSize="13px" color="#1E1E1E">
                            Overall Rating
                        </Typography>
                        <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                            {profile?.averageRating}/5{" "}
                            <Typography component="span" fontSize="13px" color="#1E1E1E">
                                ({profile?.reviewCount} reviews)
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography fontSize="13px" color="#1E1E1E">
                            Completed Gigs
                        </Typography>
                        <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                            120
                        </Typography>
                    </Grid>
                    {profile?.role === 'provider' && (
                        <Grid xs={6} sm={3}>
                            <Typography fontSize="13px" color="#1E1E1E">
                                Profile Views
                            </Typography>
                            <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                                250{" "}
                                <Typography component="span" fontSize="13px" color="#1E1E1E">
                                    this week
                                </Typography>
                            </Typography>
                        </Grid>
                    )}

                    <Grid xs={6} sm={3}>
                        <Typography fontSize="13px" color="#1E1E1E">
                            Response Time
                        </Typography>
                        <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                            within 1h
                        </Typography>
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Grid container spacing={2} my={2}>
                    <Grid item xs={12} sm={6} md={profile?.role === 'provider' ? 3 : 6} >
                        <Button
                            fullWidth
                            onClick={() => { handleModifyClick(profile) }}
                            variant="contained"
                            sx={{
                                backgroundColor: "#032D4F",
                                textTransform: "none",
                                borderRadius: "8px",
                                fontWeight: 500,
                                fontSize: "14px",
                                py: 1.5,
                                "&:hover": {
                                    backgroundColor: "#021f37",
                                },
                            }}
                        >
                            Modify Profile
                        </Button>

                    </Grid>
                    {profile?.role === 'provider' && (
                        <>
                            <Grid item xs={12} sm={6} md={3} >
                                <Button
                                    onClick={() => { setShowService() }}

                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#032D4F",
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        py: 1.5,
                                        "&:hover": {
                                            backgroundColor: "#021f37",
                                        },
                                    }}
                                >
                                    Add a Service
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} >
                                <Button
                                    fullWidth
                                    onClick={() => { handleAvalibility() }}

                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#032D4F",
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        py: 1.5,
                                        "&:hover": {
                                            backgroundColor: "#021f37",
                                        },
                                    }}
                                >
                                    Update Availability
                                </Button>
                            </Grid>
                        </>
                    )}

                    <Grid item xs={12} sm={6} md={profile?.role === 'provider' ? 3 : 6} >
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                const profileUrl = `${import.meta.env.VITE_Live_URL}/pro/${profile?._id}`;
                                const whatsappMessage = `Check out my profile: ${profileUrl}`;
                                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
                                window.open(whatsappUrl, '_blank');
                            }}
                            sx={{
                                backgroundColor: "#032D4F",
                                textTransform: "none",
                                borderRadius: "8px",
                                fontWeight: 500,
                                fontSize: "14px",
                                py: 1.5,
                                "&:hover": {
                                    backgroundColor: "#021f37",
                                },
                            }}
                        >
                            Share Profile
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}