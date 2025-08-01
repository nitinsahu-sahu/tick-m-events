import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, Typography, IconButton, TextField, Button, Divider, Grid, Avatar, Box, Link } from '@mui/material';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import PhoneInput from 'react-phone-number-input'
import { Iconify } from 'src/components/iconify';
import { login, signup } from 'src/redux/actions';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import 'react-phone-number-input/style.css'

// ----------------------------------------------------------------------

export function SignInView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("google");
  const [showSignup, setShowSignup] = useState(false);
  const [transition, setTransition] = useState(false);
  const [avatar, setAvatar] = useState(null); // Correct initialization
  const [phoneNumber, setPhoneNumber] = useState('');
  const getWidth = (key) => (active === key ? "50%" : "10%");
  const auth = useSelector(state => state.auth);
  const [formData, setFormData] = useState({ email: 'organizer.William1@gmail.com', password: 'Manoj@123' });
  const [formRegisterData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
    role: "",
  });

  const handlePhoneChange = (value) => {
    const phoneValue = value; // or String(value)
    setPhoneNumber(phoneValue);
    setRegisterData((prevData) => ({ ...prevData, number: phoneValue }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files?.[0]) { // Check if a file exists
      setAvatar(e.target.files[0]); // Store the File object directly
    }
  };

  const handleRegisterChange = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const { name, value } = event.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChange = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegistration = useCallback(async (event) => {
    event.preventDefault();
    const formSignData = new FormData();

    // Append all form data
    formSignData.append("name", formRegisterData.name);
    formSignData.append("email", formRegisterData.email);
    formSignData.append("password", formRegisterData.password);
    formSignData.append("number", phoneNumber);
    formSignData.append("role", formRegisterData.role);
    formSignData.append("gender", formRegisterData.gender);

    // Append avatar if it exists
    if (avatar) {
      formSignData.append("avatar", avatar);
    }

    try {
      const result = await dispatch(signup(formSignData));

      if (result.status === 201) {
        toast.success(result?.message);
        // Reset form and states
        setRegisterData({
          name: '',
          email: '',
          password: '',
          role: '',
          gender: 'Male'
        });
        setAvatar(null); // Clear avatar if using
        navigate("/");
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error("Registration failed");
    }
  }, [formRegisterData, navigate, avatar, dispatch, phoneNumber]);

  const handleSignIn = useCallback(async (event) => {
    event.preventDefault();
    const result = await dispatch(login(formData));

    if (result.status === 200) {
      toast.success(result?.message);

      // Check for pending purchase
      const pendingPurchase = sessionStorage.getItem('pendingPurchase');
      if (pendingPurchase) {
        const purchaseData = JSON.parse(pendingPurchase);
        navigate(purchaseData.redirectTo);
      }
      const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin');
      if (redirectAfterLogin) {
        const redirectData = JSON.parse(redirectAfterLogin);
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectData.redirectTo || '/');
        return;
      }
      navigate('/')
    } else {
      toast.error(result?.message);
    }
  }, [formData, dispatch, navigate]);

  useEffect(() => {
    if (auth?.authenticate) {
      navigate("/");
    }
  }, [auth?.authenticate, navigate]);

  const toggleForms = () => {
    setTransition(true);
    setTimeout(() => {
      setShowSignup(!showSignup);
      setTransition(false);
    }, 300); // Match this with CSS transition duration
  };

  const renderSignupForm = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      mt={2}
      sx={{
        position: 'relative',
        right: showSignup ? 0 : '100%',
        opacity: showSignup ? 1 : 0,
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
        accept="image/*"
        onChange={handleAvatar}
        sx={{ mt: 2 }}
        InputProps={{
          sx: {
            borderRadius: '10px',
            border: '1px solid #ccc',
            backgroundColor: '#F9F9F9',
          },
        }}
      />

      {/* Phone Number */}
      {/* <TextField
        fullWidth
        required
        name="number"
        type='number'
        label="Number"
        placeholder='Enter your Phone number'
        value={formRegisterData.number}
        onChange={handleRegisterChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mt: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              +91
            </InputAdornment>
          ),
        }}
      /> */}

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

  const renderForm = (
    <>
      <HeadingCommon variant="h4" title="Welcome back" weight={600} mb={2} />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        sx={{
          position: 'relative',
          left: showSignup ? '100%' : 0,
          opacity: showSignup ? 0 : 1,
          transition: 'all 0.3s ease',
          width: '100%'
        }}
      >
        <TextField
          fullWidth
          required
          name="email"
          type='email'
          label="Email address"
          placeholder='Email / Username'
          value={formData.email}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          required
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
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
          sx={{ mb: 3 }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
        >
          Sign in
        </LoadingButton>

      </Box>
      {/* Divider */}
      {/* <Divider
        sx={{
          my: 2,
          "&::before, &::after": { borderTopStyle: "dashed" },
        }}
      >
        <HeadingCommon baseSize="12px" variant="overline" title="Or connect with your social account" />

      </Divider> */}

      {/* Social buttons */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <IconButton
          onMouseEnter={() => setActive("google")}
          onClick={() => setActive("google")}
          sx={{
            borderRadius: 1,
            border: "1px solid black",
            backgroundColor: "#cee1e5",
            transition: "width 0.3s ease",
            width: getWidth("google"),
          }}
        >
          <Iconify icon="flat-color-icons:google" />
        </IconButton>

        <IconButton
          onMouseEnter={() => setActive("facebook")}
          onClick={() => setActive("facebook")}
          sx={{
            borderRadius: 1,
            border: "1px solid black",
            backgroundColor: "#cee1e5",
            transition: "width 0.3s ease",
            width: getWidth("facebook"),
          }}
        >
          <Iconify icon="logos:facebook" />
        </IconButton>

        <IconButton
          onMouseEnter={() => setActive("apple")}
          onClick={() => setActive("apple")}
          sx={{
            borderRadius: 1,
            border: "1px solid black",
            backgroundColor: "#cee1e5",
            transition: "width 0.3s ease",
            width: getWidth("apple"),
          }}
        >
          <Iconify icon="ic:twotone-apple" />
        </IconButton>
      </Box> */}
    </>

  );


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
          {
            showSignup ? <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
              <Button
                size="small"
                variant="h6"
                fontWeight={600}
                sx={{
                  backgroundColor: "#1F8FCD",
                  color: "white",
                  textTransform: "none",
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
              :
              <Button size="small" variant="h6" fontWeight={600} mb={2} sx={{ backgroundColor: "#1F8FCD", color: "white" }}>
                Sign In
              </Button>
          }



          <form encType='multipart/form-data' onSubmit={showSignup ? handleRegistration : handleSignIn}>
            {showSignup ? renderSignupForm : renderForm}
          </form>

          <Typography variant="body2" my={2}>
            {showSignup ? 'Already have an account?' : 'Don\'t have an account?'}
            <Link
              href="#"
              sx={{ ml: 0.5 }}
              onClick={(e) => {
                e.preventDefault();
                toggleForms();
              }}
            >
              {showSignup ? 'Login Here!' : 'Register Here!'}
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}