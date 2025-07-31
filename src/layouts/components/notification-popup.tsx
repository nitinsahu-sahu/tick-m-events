import {
    IconButton, Badge, Popover, Box, Typography, Divider, Tooltip, 
    ListSubheader, List, Button
} from "@mui/material";
import { useCallback, useState } from "react";
import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";

export function NotificattionPopup({ data = [], sx, ...other }: any) {
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
    const totalUnRead = 4
    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);
    return (
        <>
            <IconButton
                color={openPopover ? 'primary' : 'default'}
                onClick={handleOpenPopover}
                sx={sx}
                {...other}
            >
                <Badge badgeContent={totalUnRead} color="error">
                    <Iconify width={24} icon="streamline-freehand:push-notification-alert-1" />
                </Badge>
            </IconButton>
            <Popover
                open={!!openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 360,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        },
                    },
                }}
            >
                <Box display="flex" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">Notifications</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            You have {totalUnRead} unread messages
                        </Typography>
                    </Box>

                    {totalUnRead > 0 && (
                        <Tooltip title="Mark all as read">
                            <IconButton color="primary" >
                                <Iconify icon="solar:check-read-outline" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar fillContent sx={{ minHeight: 240, maxHeight: { xs: 360, sm: 'none' } }}>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                New
                            </ListSubheader>
                        }
                    >
                        {/* {displayedNotifications.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))} */}
                    </List>
                </Scrollbar>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ p: 1 }}>
                    <Button fullWidth disableRipple color="inherit" >
                        {/* {showAll ? 'Show less' : 'View all'} */}
                        Show less
                    </Button>
                </Box>
            </Popover>
        </>
    )
}