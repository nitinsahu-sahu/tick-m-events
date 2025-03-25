import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { login } from 'src/redux/actions';

// ----------------------------------------------------------------------

export function SignInView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const [formData, setFormData] = useState({ email: 'admin.rinku@gmail.com', password: 'admin@123' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = useCallback(async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const result = await dispatch(login(formData));
  }, [formData, dispatch]);

  if (auth?.authenticate) {
    setTimeout(() => navigate("/"), 100);
  }
  
  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        required
        name="email"
        type='email'
        label="Email address"
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
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
      </Box>
      <form onSubmit={handleSignIn}>
        {renderForm}
      </form>
    </>
  );
}
