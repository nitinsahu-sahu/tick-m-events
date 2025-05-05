import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  TextField,
  Stack,
  Switch,
  Checkbox,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DashboardContent } from 'src/layouts/dashboard';
import { profileGet } from 'src/redux/actions';
import { AppDispatch, RootState } from 'src/redux/store';
import { MainProfile } from '../main-profile';
import { UpdateProfile } from '../update-profile';
import { OfferAndService } from '../offer-and-service';
import { ClientReview } from '../client-review';
import { days, verifications } from '../utills';

export function ProfileAndServicesManagementView() {
  const { user } = useSelector((state: RootState) => state?.auth);

  const [showUpdateProfile, setShowUpdateProfile] = useState(false); // Toggle for edit mode

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
  });
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(profileGet(user?._id));
  }, [dispatch, user?._id]);

  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleModify = useCallback((rowData: any) => {
    setShowUpdateProfile(true); // Show UpdateProfile when Modify is clicked

    setProfileData((prev) => {
      // Only update if values actually changed
      if (
        prev._id === rowData._id &&
        prev.name === rowData.name &&
        prev.email === rowData.email &&
        prev.username === rowData.username &&
        prev.address === rowData.address &&
        prev.number === rowData.website &&
        prev.website === rowData.number &&
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
      };
    });
    setSocialLinks((prev) => {
      // Only update if values actually changed
      if (
        prev._id === rowData._id &&
        prev.instagram === rowData.socialLinks.instagram &&
        prev.facebook === rowData.socialLinks.facebook &&
        prev.linkedin === rowData.socialLinks.linkedin &&
        prev.tiktok === rowData.socialLinks.tiktok
      ) {
        return prev;
      }
      return {
        _id: rowData._id,
        instagram: rowData.socialLinks.instagram,
        facebook: rowData.socialLinks.facebook,
        linkedin: rowData.socialLinks.linkedin,
        tiktok: rowData.socialLinks.tiktok,
      };
    });
  }, []);

  return (
    <DashboardContent>
      <MainProfile onModify={handleModify} />
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
      <OfferAndService />

      {/* Client review section */}
      <ClientReview />

      {/* Avability section */}
      <Box
        mt={3}
        sx={{
          borderRadius: '20px',
          border: '1px solid #00000066',
          background: '#FFFFFF',
          p: 3,
        }}
      >
        {/* Availability Settings Header */}
        <Box
          sx={{
            borderRadius: '20px',
            border: '1px solid #00000066',
            backgroundColor: '#FFFFFF',
            p: 2,
            mb: 3,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mb: 0 }}>
                Availability Settings
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: 'green',
                  }}
                />
                <Typography variant="body2">Available</Typography>
              </Stack>
            </Box>

            <Switch
              defaultChecked
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#0B2E4C',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#0B2E4C',
                },
              }}
            />
          </Stack>
        </Box>

        {/* Manage Availability */}
        <Box
          sx={{
            borderRadius: '20px',
            border: '1px solid #00000066',
            backgroundColor: '#FFFFFF',
            p: { xs: 2, sm: 3 },
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Manage Your Availability
          </Typography>

          <Typography variant="body2" color="#D9D9D9" sx={{ mb: 3 }}>
            Click on dates to mark as unavailable.
          </Typography>

          <Grid container spacing={0}>
            {days.map((day, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    backgroundColor: '#EEEEEE',
                    borderRadius: 1.5,
                    px: 2,
                    py: 1,
                    mb: 2,
                    width: '100%',
                    maxWidth: { xs: '100%', md: '50%' },
                    ml: { xs: 0, md: 0 }, // left-aligned on all devices
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    sx={{
                      flexWrap: { xs: 'wrap', md: 'nowrap' },
                    }}
                  >
                    <Grid item xs={12} sm={3} md={2}>
                      <Typography sx={{ fontSize: 14 }}>{day}</Typography>
                    </Grid>

                    <Grid item>
                      <Checkbox
                        sx={{
                          mx: 1,
                          color: 'black',
                          '&.Mui-checked': {
                            color: 'black',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <Typography sx={{ fontSize: 14, minWidth: 30 }}>24H</Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3}>
                      <TextField
                        type="time"
                        size="small"
                        fullWidth
                        sx={{
                          '& input[type="time"]::-webkit-calendar-picker-indicator': {
                            display: 'none',
                            WebkitAppearance: 'none',
                          },
                          '& input[type="time"]': {
                            appearance: 'textfield',
                            MozAppearance: 'textfield',
                          },
                          '& .MuiInputBase-root': {
                            height: 30,
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #C4C4C4',
                            px: 1,
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          style: { padding: '8px 0' },
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <Typography sx={{ mx: 1, fontSize: 14 }}>to</Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} md={3}>
                      <TextField
                        type="time"
                        size="small"
                        fullWidth
                        sx={{
                          '& input[type="time"]::-webkit-calendar-picker-indicator': {
                            display: 'none',
                            WebkitAppearance: 'none',
                          },
                          '& input[type="time"]': {
                            appearance: 'textfield',
                            MozAppearance: 'textfield',
                          },
                          '& .MuiInputBase-root': {
                            height: 30,
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #C4C4C4',
                            px: 1,
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          style: { padding: '8px 0' },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#0B2E4C',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '14px',
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#0B2E4C',
                },
              }}
            >
              Add a Service
            </Button>
          </Box>
        </Box>
      </Box>

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
