import { InputAdornment, Typography, IconButton, TextField, Button, Grid, Avatar, Box, Link, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import PhoneInput from 'react-phone-number-input'
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Iconify } from 'src/components/iconify';
import { signup, validateReferralCode } from 'src/redux/actions';
import { AppDispatch } from 'src/redux/store';


export function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formRegisterData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "Male",
        role: "",
        address: "",
        referralCode: ""
    });
    const [avatar, setAvatar] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [referralValidation, setReferralValidation] = useState({
        isValid: false,
        message: "",
        referrerName: ""
    });
    const [validatingReferral, setValidatingReferral] = useState(false);

    const handleRegisterChange = (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        const { name, value } = event.target;
        setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAvatar = (e: any) => {
        if (e.target.files?.[0]) { // Check if a file exists
            setAvatar(e.target.files[0]); // Store the File object directly
        }
    };

    const handlePhoneChange = (value: any) => {
        const phoneValue = value; // or String(value)
        setPhoneNumber(phoneValue);
        setRegisterData((prevData) => ({ ...prevData, number: phoneValue }));
    };

    const handleReferralCodeChange = async (e: any) => {
        const code = e.target.value;
        setRegisterData((prevData) => ({ ...prevData, referralCode: code }));

        // Validate referral code in real-time
        if (code.length >= 6) {
            setValidatingReferral(true);
            try {
                const result = await dispatch(validateReferralCode(code));
                if (result.success) {
                    setReferralValidation({
                        isValid: true,
                        message: `Valid referral code! You'll receive bonus points.`,
                        referrerName: result.referrerName
                    });
                } else {
                    setReferralValidation({
                        isValid: false,
                        message: result.message,
                        referrerName: ""
                    });
                }
            } catch (error) {
                setReferralValidation({
                    isValid: false,
                    message: "Error validating referral code",
                    referrerName: ""
                });
            } finally {
                setValidatingReferral(false);
            }
        } else if (code.length === 0) {
            setReferralValidation({
                isValid: false,
                message: "",
                referrerName: ""
            });
        }
    };

    const handleRegistration = useCallback(async (event: any) => {
        event.preventDefault();

        // Validate referral code again before submission if provided
        if (formRegisterData.referralCode && !referralValidation.isValid) {
            toast.error("Please enter a valid referral code");
            return;
        }

        const formSignData = new FormData();

        // Append all form data
        formSignData.append("name", formRegisterData.name);
        formSignData.append("email", formRegisterData.email);
        formSignData.append("password", formRegisterData.password);
        formSignData.append("number", phoneNumber);
        formSignData.append("role", formRegisterData.role);
        formSignData.append("gender", formRegisterData.gender);
        formSignData.append("address", formRegisterData.address);
        formSignData.append("referralCode", formRegisterData.referralCode);

        // Append avatar if it exists
        if (avatar) {
            formSignData.append("avatar", avatar);
        }

        try {
            const result = await dispatch(signup(formSignData));

            if (result.status === 201) {
                toast.success(result?.message);
                // Show referral success if applicable
                if (formRegisterData.referralCode) {
                    toast.success(`You've received bonus points from ${referralValidation.referrerName}'s referral!`);
                }

                // Reset form and states
                setRegisterData({
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    gender: 'Male',
                    address: '',
                    referralCode: ''
                });
                setAvatar(null);
                setReferralValidation({
                    isValid: false,
                    message: "",
                    referrerName: ""
                });
                navigate("/sign-in");
            } else {
                toast.error(result?.message);
            }
        } catch (error) {
            toast.error("Registration failed");
        }
    }, [formRegisterData, navigate, avatar, dispatch, phoneNumber, referralValidation]);

    const renderSignupForm = (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            mt={2}
            sx={{
                position: 'relative',
                right: 0,
                opacity: 1,
                transition: 'all 0.3s ease',
                width: '100%'
            }}
        >
            {/* Full Name */}
            <TextField
                fullWidth
                required
                name="name"
                type='text'
                label="Full Name"
                placeholder='Enter your Fullname'
                value={formRegisterData.name}
                onChange={handleRegisterChange}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
            />

            {/* Email */}
            <TextField
                fullWidth
                required
                name="email"
                type='email'
                label="Email address"
                placeholder='Enter your Email'
                value={formRegisterData.email}
                onChange={handleRegisterChange}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}

            />

            {/* Address */}
            <TextField
                fullWidth
                required
                name="address"
                type='text'
                label="Address"
                placeholder='Enter your address'
                value={formRegisterData.address}
                onChange={handleRegisterChange}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
            />
            {/* Gender Radio Buttons */}
            <Box sx={{ width: '100%' }} mt={2}>
                <Box display="flex" gap={2} alignItems="center">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Gender *
                    </Typography>

                    {['Male', 'Female', 'Other'].map((gender) => (
                        <Box key={gender} display="flex" alignItems="center">
                            <input
                                type="radio"
                                id={`gender-${gender}`}
                                name="gender"
                                value={gender}
                                checked={formRegisterData.gender === gender}
                                onChange={handleRegisterChange}
                                required={formRegisterData.gender === ''} // Show required only if nothing selected
                                style={{ marginRight: 8 }}
                            />
                            <label htmlFor={`gender-${gender}`}>
                                <Typography variant="body2">{gender}</Typography>
                            </label>
                        </Box>
                    ))}
                </Box>
            </Box>

            <TextField
                label="Avatar"
                type="file"
                fullWidth
                required
                name='avatar'
                onChange={handleAvatar}
                sx={{ mt: 2 }}
                InputProps={{
                    sx: {
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        backgroundColor: '#F9F9F9',
                    },
                    inputProps: {
                        accept: "image/*",
                    },
                }}
            />

            {/* Phone Number */}
            <Box sx={{
                width: '100%',
                mt: 2,
                '& .PhoneInput': {
                    width: '100%',
                    '& input': {
                        width: '100%',
                        padding: '16.5px 14px',
                        border: '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: "10px",
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        '&:hover': {
                            borderColor: 'black',
                        },
                        '&:focus': {
                            borderColor: 'black',
                            borderWidth: '2px',
                            outline: 'none',
                        },
                    },
                    '& .PhoneInputCountry': {
                        marginRight: '8px',
                    },
                    '& .PhoneInputCountrySelect': {
                        marginRight: '8px',
                    },
                },
                '& .PhoneInput--focus': {
                    '& input': {
                        borderColor: 'black',
                        borderWidth: '2px',
                    },
                },
            }}>
                <PhoneInput
                    international
                    defaultCountry="US"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter phone number"
                />
            </Box>
            {/* Role Select */}
            <TextField
                fullWidth
                select
                required
                name="role"
                label="Role"
                value={formRegisterData.role}
                onChange={handleRegisterChange}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
                SelectProps={{
                    native: true,
                }}
            >
                <option value="">Select your role</option>
                <option value="participant">Participant</option>
                <option value="organizer">Organizer</option>
                <option value="provider">Provider</option>
            </TextField>

            {/* Password */}
            <TextField
                fullWidth
                required
                name="password"
                label="Password"
                placeholder='Enter your Password'
                value={formRegisterData.password}
                onChange={handleRegisterChange}
                type={showPassword ? 'text' : 'password'}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{ mt: 2 }}
            />

            <TextField
                fullWidth
                name="referralCode"
                type='text'
                label="Referral Code (Optional)"
                placeholder='Enter referral code for bonus points'
                value={formRegisterData.referralCode}
                onChange={handleReferralCodeChange}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
                error={formRegisterData.referralCode.length > 0 && !referralValidation.isValid}
                helperText={
                    validatingReferral ? "Validating..." :
                        formRegisterData.referralCode.length > 0 ? referralValidation.message :
                            "Enter a friend's referral code to get bonus points"
                }
                InputProps={{
                    endAdornment: formRegisterData.referralCode.length > 0 && (
                        <InputAdornment position="end">
                            {validatingReferral ? (
                                <CircularProgress size={20} />
                            ) : referralValidation.isValid ? (
                                <Iconify icon="ic:round-check" color="success.main" />
                            ) : formRegisterData.referralCode.length > 0 ? (
                                <Iconify icon="ic:round-close" color="error.main" />
                            ) : null}
                        </InputAdornment>
                    )
                }}
            />
            {/* Register Button */}
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                sx={{ mt: 2 }}
            >
                Register
            </LoadingButton>
        </Box>
    )

    return (
        <Grid container sx={{ minHeight: "50vh" }}>
            {/* Left image (hide on xs/sm) */}
            <Grid
                item
                xs={0}
                md={6}
                sx={{
                    display: { xs: "none", md: "block" },
                    backgroundImage: `url('./assets/images/login-banner.png')`, // replace with actual image path
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Right content */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 3,
                }}
            >
                <Box sx={{ width: "100%", maxWidth: 400 }} textAlign="center">
                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                        <Button
                            size="small"
                            variant="contained" // Changed from "h6" to "contained", "text", or "outlined"
                            sx={{
                                backgroundColor: "#1F8FCD",
                                color: "white",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: '12', // This will make it h6 size
                                // Additional h6 styling if needed
                                lineHeight: 1.6,
                                letterSpacing: '0.0075em'
                            }}
                        >
                            Sign Up
                        </Button>
                        {
                            avatar ? (
                                <Avatar
                                    src={URL.createObjectURL(avatar)} // avatar is a File object
                                    alt="Preview"
                                    sx={{ width: 56, height: 56, mt: 2 }}
                                />
                            ) : (
                                <Avatar alt="User" src="/path-to-default-avatar.jpg" />
                            )
                        }
                    </Box>



                    <form encType='multipart/form-data' onSubmit={handleRegistration}>
                        {renderSignupForm}
                    </form>

                    <Typography variant="body2" my={2}>
                        Already have an account?
                        <Link
                            component={RouterLink}
                            to="/sign-in"
                            sx={{
                                ml: 0.5,
                                textDecoration: 'none',
                                color: 'primary.main',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Login Here!
                        </Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}