import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Popover, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usePathname } from 'src/routes/hooks';
import { _notifications } from 'src/_mock';
import { RootState } from 'src/redux/store';
import { logout } from 'src/redux/actions';

import { NotificationsPopover } from './notifications-popover';
import { MessagePopover } from './message-popover';
import { EmailPopover } from './email-popover';
import { GiftPopover } from './gift-popover';

export function UserPopover() {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const pathname = usePathname()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hiddenPaths = ['/ticket-validation-at-entry', '/loyalty-program', "/ticket-management"];

    const { _id, name, role, avatar } = useSelector((state: RootState) => state?.auth?.user);

    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md")); // Hide on md & below

    const handleOpen = (event: any) => {
        if (isMobileOrTablet) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout() as any); // Ensure TypeScript recognizes the async action
        navigate("/sign-in"); // Redirect after logout
    };

    return (
        <Box display="flex" alignItems="center" gap={1}>
            {/* Name & Role (Only visible on Desktop) */}
            {!isMobileOrTablet && (
                <Box key={_id}>
                    <Typography textTransform="capitalize" fontWeight={600} color="#0C2340" fontFamily="Poppins, sans-serif">
                        {name}
                    </Typography>
                    <Typography textTransform="capitalize" fontSize={12} color="gray" fontFamily="Poppins, sans-serif">
                        {role} | <span
                            role="button"
                            tabIndex={0}
                            style={{ cursor: 'pointer', color: 'red' }}
                            onClick={() => handleLogout()}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    console.log('logout');
                                }
                            }}
                        >
                            Logout
                        </span>
                    </Typography>
                </Box>
            )}

            {/* Avatar (Click to Show Name & Role Only on Mobile & Tablet) */}
            <Avatar
                src={avatar?.url}
                sx={{ width: 40, height: 40, cursor: isMobileOrTablet ? "pointer" : "default" }}
                onClick={handleOpen}
                variant="square"
            />

            {/* Popover for Mobile & Tablet */}
            {isMobileOrTablet && (
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}

                >
                    <Box p={2} textAlign="center" key={_id}>
                        <Typography textTransform="capitalize" fontWeight={600} color="#0C2340" fontFamily="Poppins, sans-serif">
                            {name}
                        </Typography>
                        <Typography textTransform="capitalize" fontSize={12} color="gray" fontFamily="Poppins, sans-serif">
                            {role}
                        </Typography>

                        {pathname.includes('/ticket-management') && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#0C2340",
                                    color: "white",
                                    borderRadius: "8px",
                                    px: 1,
                                    fontSize: 16,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600
                                }}
                            >
                                My Tickets
                            </Button>
                        )}
                    </Box>
                    {!hiddenPaths.some(path => pathname.includes(path)) &&
                        <Box display="flex" gap={1} alignItems="center">
                            <NotificationsPopover data={_notifications} />
                            <MessagePopover totalUnRead="1" />
                            <GiftPopover totalUnRead="5" />
                            <EmailPopover totalUnRead="2" />
                            {/* <LanguagePopover data={_langs}/> */}
                        </Box>
                    }


                    {!hiddenPaths.some(path => pathname.includes(path)) &&
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginX: 1 }}>
                            <Button
                                sx={{
                                    backgroundColor: "#0C2340",
                                    color: "white",
                                    borderRadius: "8px",
                                    px: 1,
                                    marginY: 1,
                                    fontSize: 16,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600,
                                }}
                            >
                                Save Changes
                            </Button>
                            <Button
                                sx={{
                                    borderRadius: "8px",
                                    px: 1,
                                    marginY: 1,
                                    borderColor: "#C8C8C8",
                                    color: "#0C2340",
                                    fontSize: 16,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600,
                                }}
                            >
                                Publish Events
                            </Button>
                        </Box>
                    }


                </Popover>
            )}
        </Box>
    )
}