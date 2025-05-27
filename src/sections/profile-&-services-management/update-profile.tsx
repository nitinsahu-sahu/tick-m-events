import {
    Avatar,
    Box,
    Button,
    TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import { profileUpdate } from "src/redux/actions";
import { AppDispatch, RootState } from "src/redux/store";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

import { profileFields, socialMediaFields } from "./utills";



interface ApiResult {
    status: number;
    type: string;
    message: any;
    // Add other properties if needed
}

const FormTextField = ({ name, type = 'text', value, onChange, placeholder, transform, multiline, minRows }: any) => (
    <TextField
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        fullWidth
        placeholder={placeholder}
        multiline={multiline}
        minRows={minRows}
        inputProps={{
            style: { textTransform: transform }
        }}
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'black', // Default border color
                },
                '&:hover fieldset': {
                    borderColor: 'black', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'black', // Border color when focused
                },
            },
            '& input': {
                textTransform: transform
            }
        }}
    />
);

export function UpdateProfile({ setShowUpdateProfile, profileData, socialLinks, setProfileData, setSocialLinks }: any) {
    const dispatch = useDispatch<AppDispatch>();
    const { _id,role } = useSelector((state: RootState) => state?.auth?.user);
    const { profile } = useSelector((state: RootState) => state?.profile);

    const handleProfileUpdateChange = (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        const { name, value } = event.target;
        setProfileData((prevData: any) => ({ ...prevData, [name]: value }));
    };

    const handleLinksChange = (e: any) => {
        const { name, value } = e.target;
        setSocialLinks({
            ...socialLinks,
            [name]: value
        });
    };

    const handleProfileUpdate = useCallback(async (event: any) => {
        event.preventDefault();
        const formProfileData = new FormData();
        formProfileData.append("username", profileData.username);
        formProfileData.append("name", profileData.name);
        formProfileData.append("email", profileData.email);
        formProfileData.append("experience", profileData.experience);
        formProfileData.append("address", profileData.address);
        formProfileData.append("number", profileData.number);
        formProfileData.append("serviceCategory", profileData.serviceCategory);
        formProfileData.append("website", profileData.website);
        formProfileData.append("socialLinks", JSON.stringify(socialLinks))
        try {
            const result = await dispatch(profileUpdate({ formProfileData, _id }));
            if ((result as ApiResult)?.status === 200) {
                toast.success(result?.message);
                setShowUpdateProfile(false)
                setProfileData({
                    name: "",
                    email: "",
                    username: "",
                    address: "",
                    experience: "",
                    website: "",
                    number: ""
                })
                setSocialLinks({
                    instagram: "",
                    facebook: "",
                    linkedin: "",
                    tiktok: ""
                })
            } else {
                toast.error(result?.message);
            }

        } catch (error) {
            toast.error("Profile update failed");
        }
    }, [profileData, setProfileData, setSocialLinks, _id, socialLinks, setShowUpdateProfile, dispatch])

    return (
        <Box mt={3} boxShadow={3} borderRadius={3} bgcolor="#FFFFFF" p={3}>
            {/* Profile Header */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Box sx={{ position: "relative" }}>
                    <Avatar
                        src={profile?.avatar?.url}
                        alt="Profile"
                        sx={{ width: 72, height: 72 }}
                    />
                    {/* Online Dot */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 4,
                            right: 4,
                            width: 12,
                            height: 12,
                            backgroundColor: "#04C832",
                            border: "2px solid white",
                            borderRadius: "50%",
                        }}
                    />
                </Box>
                <Box>
                    <HeadingCommon variant="body1" title={profile?.name} weight={600} mb={0} />
                    <HeadingCommon variant="body" title={profile?.username} weight={400} baseSize="16px" />
                </Box>
            </Box>

            {/* Profile Form Fields */}
            <form onSubmit={handleProfileUpdate}>

                <Box component="form" display="flex" flexDirection="column" gap={2}>
                    {/* Profile Fields */}
                    {profileFields.filter(field => !(field.name === 'serviceCategory' && role === 'organizer')).map((field) => (
                        <FormTextField
                            key={field.name}
                            name={field.name}
                            type={field.type}
                            value={profileData[field.name]}
                            onChange={handleProfileUpdateChange}
                            placeholder={field.placeholder}
                            transform={field.transform}
                            multiline={field.multiline}
                            minRows={field.minRows}
                        />
                    ))}
                    {/* Social Media Fields */}
                    {socialMediaFields.map((field) => (
                        <FormTextField
                            key={field.name || ''}
                            name={field.name || ''}
                            type="text"
                            value={socialLinks[field.name]}
                            onChange={handleLinksChange}
                            placeholder={field.placeholder}
                        />
                    ))}
                </Box>

                {/* Edit Button */}
                <Box mt={3}>
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: "#0B2E4C",
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: 2,
                            py: 1.5,
                            "&:hover": {
                                backgroundColor: "#0B2E4C",
                            },
                        }}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </form>
        </Box>
    )
}