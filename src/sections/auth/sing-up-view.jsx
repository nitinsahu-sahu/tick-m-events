import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { login } from 'src/redux/actions';
import { toast } from 'react-toastify';
import { Button, Divider, Grid } from '@mui/material';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

// ----------------------------------------------------------------------

export function SignUpView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState("google");

    const getWidth = (key) => (active === key ? "50%" : "10%");
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

        if (result.status === 200) {
            toast.success(result?.message);
        } else {
            toast.error(result?.message);
        }
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
                Register
            </LoadingButton>
        </Box>
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
                    <Button variant="h6" fontWeight={600} mb={2} sx={{ backgroundColor: "#1F8FCD", color: "white" }}>
                        Reginster Here
                    </Button>

                    <form onSubmit={handleSignIn}>
                        {renderForm}
                    </form>
                    {/* Divider */}
                    <Divider
                        sx={{
                            my: 2,
                            "&::before, &::after": { borderTopStyle: "dashed" },
                        }}
                    >
                        <HeadingCommon baseSize="12px" variant="overline" title="Or connect with your social account" />

                    </Divider>

                    {/* Social buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            mb: 2,
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
                    </Box>
                    <Typography variant="body2" mb={3}>
                        Already have an account?
                        <Link href="#" sx={{ ml: 0.5 }}>
                            Login here !
                        </Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
