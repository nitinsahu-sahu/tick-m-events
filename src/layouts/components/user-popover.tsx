import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Popover, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { _notifications } from 'src/_mock';
import { RootState } from 'src/redux/store';

import { NotificationsPopover } from './notifications-popover';
import { MessagePopover } from './message-popover';
import { EmailPopover } from './email-popover';
import { GiftPopover } from './gift-popover';

export function UserPopover() {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
      const location = useLocation();
  const hiddenPaths = ['/ticket-validation-at-entry', '/loyalty-program'];
    
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

    return (
        <Box display="flex" alignItems="center" gap={1}>
            {/* Name & Role (Only visible on Desktop) */}
            {!isMobileOrTablet && (
                <Box key={_id}>
                    <Typography textTransform="capitalize" fontWeight={600} color="#0C2340" fontFamily="Poppins, sans-serif">
                        {name}
                    </Typography>
                    <Typography textTransform="capitalize" fontSize={12} color="gray" fontFamily="Poppins, sans-serif">
                        {role}
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
                    </Box>
                    <Box display="flex" gap={1} alignItems="center">
                        <NotificationsPopover data={_notifications} />
                        <MessagePopover totalUnRead="1" />
                        <GiftPopover totalUnRead="5" />
                        <EmailPopover totalUnRead="2" />
                        {/* <LanguagePopover data={_langs}/> */}
                    </Box>

                    {!hiddenPaths.some(path => location.pathname.includes(path)) &&
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