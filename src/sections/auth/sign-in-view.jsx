import { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Paper, Alert, Modal, InputAdornment, Typography, IconButton, TextField, Button, Grid, Box, Link } from '@mui/material';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

import { Iconify } from 'src/components/iconify';
import { login, resetPassword, sendResetCode, verifyResetCode } from 'src/redux/actions';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { modalStyle } from './utils';

import 'react-phone-number-input/style.css'

// ----------------------------------------------------------------------

export function SignInView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("google");
  const { authenticate } = useSelector(state => state.auth);
  const [formData, setFormData] = useState(
    {

      email: 'organizer.rabada12@gmail.com',
      password: 'Nitin@123'

    });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: code verification, 3: new password
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setEmail('');
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    setLoading(false)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCode = () => {
    const newErrors = {};
    if (!resetCode) {
      newErrors.resetCode = 'Reset code is required';
    } else if (resetCode.length !== 6) {
      newErrors.resetCode = 'Code must be 6 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async () => {
    setLoading(true)

    if (validateEmail()) {
      const response = await dispatch(sendResetCode(email));
      if (response.status === 200) {
        setTimeout(() => {
          setStep(2);
        }, 2000)
        setLoading(false)
        setMessage(response.message)
        setError(null)

      } else {
        setLoading(false)
        setError(response.error)
      }

    }
  };

  const handleVerifyCode = async () => {
    if (validateCode()) {
      const response = await dispatch(verifyResetCode(email, resetCode));
      if (response.status === 200) {
        setTimeout(() => {
          setStep(3)
        }, 2000)
        setLoading(false)
        setMessage(response.message)
        setError(null)

      } else {
        setLoading(false)
        setError(response.error)
        setMessage('')
      }
    }
  };

  const handleResetPassword = async () => {
    if (validatePassword()) {
      const response = await dispatch(resetPassword(email, resetCode, newPassword));
      if (response.status === 200) {
        setTimeout(() => {
          handleClose()
          setError(null)
          setMessage('')
        }, 2000)
        setLoading(false)
        setMessage(response.message)

      } else {
        setLoading(false)
        setError(response.error)
        setMessage('')
      }
    }
  };


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
        navigate(redirectData.redirectTo);
        return;
      }
      navigate('/')
    } else {
      toast.error(result?.message);
    }
  }, [formData, dispatch, navigate]);

  useEffect(() => {
    if (authenticate) {
      navigate("/", { replace: true });
    }
  }, [authenticate, navigate]);

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
          placeholder='********'
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

        />
        <Typography variant="body2">
          <Link
            component="button"
            type="button"
            onClick={handleOpen}
            sx={{
              ml: 0.5,
              textDecoration: 'none',
              color: 'primary.main',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Forgot Password?
          </Link>
        </Typography>
        <LoadingButton
          sx={{ mt: 3 }}
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
            Don&apos;t have an account?
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
      <Modal open={open} onClose={handleClose}>
        <Paper sx={modalStyle}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

          {step === 1 && (
            <>
              <Typography variant="h6" gutterBottom>
                Reset Password
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Enter your email address and we&apos;ll send you a verification code.
              </Typography>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={handleSendCode}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Send Code'}
                </Button>
              </Box>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h6" gutterBottom>
                Enter Verification Code
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                We&apos;ve sent a 6-digit code to {email}. Please check your email.
              </Typography>
              <TextField
                fullWidth
                label="Verification Code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                error={!!errors.resetCode}
                helperText={errors.resetCode}
                margin="normal"
                inputProps={{ maxLength: 6 }}
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button onClick={() => setStep(1)}>Back</Button>
                <Button
                  onClick={handleVerifyCode}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Verify Code'}
                </Button>
              </Box>
            </>
          )}

          {step === 3 && (
            <>
              <Typography variant="h6" gutterBottom>
                Set New Password
              </Typography>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button onClick={() => setStep(2)}>Back</Button>
                <Button
                  onClick={handleResetPassword}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Modal>
    </Grid>
  );
}