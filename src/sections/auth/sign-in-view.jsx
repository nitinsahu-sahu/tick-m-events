import { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, Typography, IconButton, TextField, Button, Grid, Box, Link } from '@mui/material';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

import { Iconify } from 'src/components/iconify';
import { login } from 'src/redux/actions';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

import 'react-phone-number-input/style.css'

// ----------------------------------------------------------------------

export function SignInView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("google");
  const [showSignup, setShowSignup] = useState(false);
  const auth = useSelector(state => state.auth);
  const [formData, setFormData] = useState({ email: 'provider.aidenM1991@gmail.com', password: 'Aiden@123' });


  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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
    setTimeout(() => {
      setShowSignup(!showSignup);
    }, 300); // Match this with CSS transition duration
  };

  const renderForm = (
    <>
      <HeadingCommon variant="h4" title="Welcome back" weight={600} mb={2} />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        sx={{
          position: 'relative',
          left: 0,
          opacity: 1,
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
          <Button size="small" variant="h6" fontWeight={600} mb={2} sx={{ backgroundColor: "#1F8FCD", color: "white" }}>
            Sign In
          </Button>



          <form encType='multipart/form-data' onSubmit={handleSignIn}>
            {renderForm}
          </form>

          <Typography variant="body2" my={2}>
            Don\&apos;t have an account?
            <Link
              component={RouterLink}
              to="/register"
              sx={{
                ml: 0.5,
                textDecoration: 'none',
                color: 'primary.main',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Register Here!
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}