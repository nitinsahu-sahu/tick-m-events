import { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, Typography, IconButton, TextField, Button, Grid, Box, Link } from '@mui/material';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import type { AppDispatch } from 'src/redux/store'; // Adjust this import based on your store setup

import { Iconify } from 'src/components/iconify';
import { login } from 'src/redux/actions';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { ForgotPasswordModal } from 'src/components/modal/reset-password-modal';

// Define types for Redux state
interface AuthState {
    authenticate: boolean;
    // Add other auth state properties as needed
}

interface RootState {
    auth: AuthState;
}

// Define types for form data
interface FormData {
    email: string;
    password: string;
}

// Define types for login action result
interface LoginResult {
    status: number;
    message?: string;
}

// Define types for pending purchase data
interface PendingPurchaseData {
    redirectTo: string;
}

// Define types for redirect data
interface RedirectData {
    redirectTo: string;
}

export function LoginView() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [active, setActive] = useState<string>("google");
    const { authenticate } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState<FormData>({
        email: 'organizer.rabada12@gmail.com',
        password: 'Nitin@123'
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    const handleOpenModal = (): void => setOpenModal(true);
    const handleCloseModal = (): void => setOpenModal(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignIn = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await dispatch(login(formData)) as unknown as LoginResult;

        if (result.status === 200) {
            toast.success(result?.message);

            // Check for pending purchase
            const pendingPurchase = sessionStorage.getItem('pendingPurchase');
            if (pendingPurchase) {
                try {
                    const purchaseData: PendingPurchaseData = JSON.parse(pendingPurchase);
                    navigate(purchaseData.redirectTo);
                } catch (error) {
                    console.error('Error parsing pending purchase data:', error);
                }
            }

            const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin');
            if (redirectAfterLogin) {
                try {
                    const redirectData: RedirectData = JSON.parse(redirectAfterLogin);
                    sessionStorage.removeItem('redirectAfterLogin');
                    navigate(redirectData.redirectTo);
                    return;
                } catch (error) {
                    console.error('Error parsing redirect data:', error);
                }
            }

            const redirect = searchParams.get('redirect');
            if (redirect) {
                window.location.href = decodeURIComponent(redirect);
            } else {
                window.location.href = '/';
            }
        } else {
            toast.error(result?.message);
        }
    }, [formData, dispatch, navigate, searchParams]);

    useEffect(() => {
        if (authenticate) {
            navigate("/");
        } else {
            navigate("/login");
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
                        onClick={handleOpenModal}
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
                    backgroundImage: `url('./assets/images/login-banner.png')`,
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

            {/* Forgot Password Modal */}
            <ForgotPasswordModal open={openModal} onClose={handleCloseModal} />
        </Grid>
    );
}