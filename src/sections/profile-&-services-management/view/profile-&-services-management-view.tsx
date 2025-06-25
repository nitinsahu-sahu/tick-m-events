import { Box, Button, Grid, Typography, useMediaQuery, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DashboardContent } from 'src/layouts/dashboard';
import { profileGet } from 'src/redux/actions';
import { AppDispatch, RootState } from 'src/redux/store';
import { PageTitleSection } from 'src/components/page-title-section';

import { MainProfile } from '../main-profile';
import { UpdateProfile } from '../update-profile';
import { OfferAndService } from '../offer-and-service';
import { ClientReview } from '../client-review';
import { verifications } from '../utills';
import { ProviderAvailability } from '../provider-availability';

export function ProfileAndServicesManagementView() {
  const { user } = useSelector((state: RootState) => state?.auth);

  const [showUpdateProfile, setShowUpdateProfile] = useState(false); // Toggle for edit mode
  const [showService, setShowService] = useState(false); // Toggle for edit mode
  const [updateAval, setUpdateAval] = useState(false); // Toggle for edit mode

  const [socialLinks, setSocialLinks] = useState({
    _id: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    tiktok: '',
  });

  const [profileData, setProfileData] = useState({
    _id: '',
    name: '',
    email: '',
    username: '',
    address: '',
    experience: '',
    website: '',
    number: '',
    serviceCategory: ''
  });

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(profileGet(user?._id));
  }, [dispatch, user?._id]);

  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery('(max-width:600px)');
  const handleServiece = () => {
    setShowService(!showService)
    setShowUpdateProfile(false);
  }
  const handleAvalibility = () => {
    setUpdateAval(!updateAval)
    setShowService(false)
    setShowUpdateProfile(false);
  }

  const handleModify = useCallback((rowData: any) => {
    setShowService(false)
    setUpdateAval(false)

    setShowUpdateProfile(true); // Show UpdateProfile when Modify is clicked
    // Safely handle socialLinks (fallback to empty object if null/undefined)
    const userSocialLinks = rowData.socialLinks || {};
    setProfileData((prev) => {
      // Only update if values actually changed
      if (
        prev._id === rowData._id &&
        prev.name === rowData.name &&
        prev.email === rowData.email &&
        prev.username === rowData.username &&
        prev.address === rowData.address &&
        prev.number === rowData.number &&
        prev.website === rowData.website &&
        prev.serviceCategory === rowData.serviceCategory &&
        prev.experience === rowData.experience
      ) {
        return prev;
      }
      return {
        _id: rowData._id,
        name: rowData.name,
        email: rowData.email,
        username: rowData.username,
        address: rowData.address,
        number: rowData.number,
        website: rowData.website,
        experience: rowData.experience,
        serviceCategory: rowData.serviceCategory,
      };
    });
    setSocialLinks((prev) => {
      // Only update if values actually changed
      if (
        prev._id === userSocialLinks._id &&
        prev.instagram === userSocialLinks.instagram &&
        prev.facebook === userSocialLinks.facebook &&
        prev.linkedin === userSocialLinks.linkedin &&
        prev.tiktok === userSocialLinks.tiktok
      ) {
        return prev;
      }
      return {
        _id: userSocialLinks._id,
        instagram: userSocialLinks.instagram || '',
        facebook: userSocialLinks.facebook || '',
        linkedin: userSocialLinks.linkedin || '',
        tiktok: userSocialLinks.tiktok || '',
      };
    });
  }, []);

  return (
    <DashboardContent>
      <PageTitleSection title="Profile & Service Manangement" />

      <MainProfile onModify={handleModify} handleAvalibility={handleAvalibility} setShowService={handleServiece} />
      {/* DJ light setion */}

      {showUpdateProfile && (
        <UpdateProfile
          setShowUpdateProfile={setShowUpdateProfile}
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
          setProfileData={setProfileData}
          profileData={profileData}
        />
      )}

      {/* offerd services section */}
      {showService === true && (<OfferAndService />)}
      {updateAval === true && (
        <>
          {/* Client review section */}
          <ClientReview />

          {/* Avability section */}
          <ProviderAvailability />
        </>
      )}




      {/* Profile verification section */}

      <Box
        sx={{
          borderRadius: '20px',
          background: '#FFFFFF',
          boxShadow: '0px 0px 14px 0px #00000040',
          p: { xs: 2, md: 4 },
          // maxWidth: 700,
          // mx: "auto",
          mt: 4,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: isMobile ? 16 : 20 }}>
          Profile Trust & Verification
        </Typography>

        <Typography sx={{ mb: 3, color: '#555', fontSize: isMobile ? 13 : 15 }}>
          Boost your credibility by completing all verification steps.
        </Typography>

        <Stack spacing={1.5} mb={4}>
          {verifications.map((item, index) => (
            <Grid
              container
              alignItems="center"
              spacing={1}
              key={index}
              sx={{ fontSize: isMobile ? 14 : 16 }}
            >
              <Grid item>
                {item.status ? (
                  <CheckCircleIcon sx={{ color: 'green', fontSize: 20 }} />
                ) : (
                  <CancelIcon sx={{ color: 'red', fontSize: 20 }} />
                )}
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: isMobile ? 14 : 16 }}>{item.label}</Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>

        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: '20px',
            backgroundColor: '#0B2E4C',
            textTransform: 'none',
            fontSize: isMobile ? 14 : 16,
            py: 1.2,
            '&:hover': {
              backgroundColor: '#0B2E4C',
            },
          }}
        >
          Complete My Verification
        </Button>
      </Box>
    </DashboardContent>
  );
}
