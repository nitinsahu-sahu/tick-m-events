import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Popover, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { usePathname } from 'src/routes/hooks';
import { _giftboxdata, _messages, _notifications } from 'src/_mock';
import { RootState } from 'src/redux/store';
import { logout } from 'src/redux/actions';

import { NotificationsPopover } from './notifications-popover';
import { MessagePopover } from './message-popover';
import { GiftPopover } from './gift-popover';

export function UserPopover() {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const pathname = usePathname()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hiddenTicketManagement = ["/ticket-management"];
    const hiddenTicketPurchasePro = ['/ticket-purchase-process'];

    const hiddenPaths = ['/ticket-validation-at-entry', '/loyalty-program'];
    const hiddenProfileService = ['/profile-&-services-management'];
    const hiddenMarketting = ['/marketplace-&-service-provider-supervision'];
    const hiddenTicketingAndTransection = ['/ticketing-&-transactions-supervision'];
    const hiddenUsrMange = ['/user-management'];
    const hiddenGlobalOverview = ['/global-overview-&-general-statistics'];
    const hiddenTraackingBooked = ['/tracking-of-booked-services-&-providers'];
    const hiddenServiceReq = ['/service-request-&-negotiation'];
    const hiddenStatisticsPerform = ['/statistics-&-performance'];
    const hiddenMessageClientRel = ['/messaging-&-client-relationship'];
    const hiddenTransectionPayment = ['/transaction-&-payment-management'];
    const hiddenServiceCal = ['/confirmed-service-calendar'];
    const hiddenReserContracts = ['/reservations-and-contracts'];
    const hiddenHomeGlobal = ['/home-and-global-view'];
    const hiddenCustomPhotoVideo = ['/custom-photo-or-video-filters-for-events'];
    const hiddenEventSearchDetails = ['/event-search-and-details'];
    const hiddenHomeRecommadation = ['/home-and-recommendations'];
    const hiddenTranPaymet = ['/transection-and-payment'];
    const hiddenDashboard = ['/'];
    const hiddenEventDetails = ['/events/add-new'];
    const hiddenVisibilityAccess = ['/visibility-and-access-settings'];

    const { _id, name, role, avatar } = useSelector((state: RootState) => state?.auth?.user);

    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md")); // Hide on md & below

    const hiddenSearchSelect = ['/search-&-select-service-providers'];
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
            {!isMobileOrTablet &&
                !hiddenUsrMange.some(path => pathname.includes(path)) && (
                    <Box key={_id}>
                        <Typography textTransform="capitalize" fontWeight={600} color="#2295D4" fontFamily="Poppins, sans-serif">
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
                                    }
                                }}
                            >
                                Logout
                            </span>
                        </Typography>
                    </Box>
                )}
            {/* Avatar (Click to Show Name & Role Only on Mobile & Tablet) */}
            {
                !hiddenUsrMange.some(path => pathname.includes(path)) &&
                <Avatar
                    src={avatar?.url}
                    sx={{ width: 40, height: 40, cursor: isMobileOrTablet ? "pointer" : "default" }}
                    onClick={handleOpen}
                    variant="square"
                />
            }


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
                        <Typography textTransform="capitalize" fontWeight={600} color="#2295D4" fontFamily="Poppins, sans-serif">
                            {name}
                        </Typography>
                        <Typography textTransform="capitalize" fontSize={12} color="gray" fontFamily="Poppins, sans-serif">
                            {role}
                        </Typography>
                    </Box>
                    {
                        !hiddenEventSearchDetails.some(path => pathname.includes(path)) &&
                        !hiddenTicketPurchasePro.some(path => pathname.includes(path)) &&
                        !hiddenPaths.some(path => pathname.includes(path)) &&
                        !hiddenServiceReq.some(path => pathname.includes(path)) &&
                        !hiddenCustomPhotoVideo.some(path => pathname.includes(path)) &&
                        <Box display="flex" gap={1} alignItems="center" justifyContent="center">
                            <NotificationsPopover data={_notifications} />
                            {
                                !hiddenHomeRecommadation.some(path => pathname.includes(path)) &&
                                !hiddenTicketManagement.some(path => pathname.includes(path)) &&
                                !hiddenHomeGlobal.some(path => pathname.includes(path)) &&
                                !hiddenServiceCal.some(path => pathname.includes(path)) &&
                                !hiddenTransectionPayment.some(path => pathname.includes(path)) &&
                                !hiddenUsrMange.some(path => pathname.includes(path)) &&
                                !hiddenSearchSelect.some(path => pathname.includes(path)) &&
                                !hiddenTicketingAndTransection.some(path => pathname.includes(path)) &&
                                !hiddenProfileService.some(path => pathname.includes(path)) &&
                                !hiddenMarketting.some(path => pathname.includes(path)) &&
                                !hiddenMessageClientRel.some(path => pathname.includes(path)) &&
                                !hiddenStatisticsPerform.some(path => pathname.includes(path)) &&
                                <>
                                    {
                                        !hiddenTraackingBooked.some(path => pathname.includes(path)) &&
                                        !hiddenGlobalOverview.some(path => pathname.includes(path)) &&
                                        <>
                                            <MessagePopover data={_messages} />
                                            {
                                                !hiddenReserContracts.some(path => pathname.includes(path)) && <GiftPopover data={_giftboxdata} />
                                            }
                                        </>
                                    }
                                    {/* {
                                        !hiddenReserContracts.some(path => pathname.includes(path)) && <EmailPopover totalUnRead="2" />
                                    } */}
                                </>
                            }

                            {/* <LanguagePopover data={_langs}/> */}
                        </Box>
                    }

                    {
                        !hiddenDashboard.some(path => pathname.includes(path)) &&
                        !hiddenTranPaymet.some(path => pathname.includes(path)) &&
                        !hiddenHomeRecommadation.some(path => pathname.includes(path)) &&
                        !hiddenEventSearchDetails.some(path => pathname.includes(path)) &&
                        !hiddenTicketPurchasePro.some(path => pathname.includes(path)) &&
                        !hiddenTicketManagement.some(path => pathname.includes(path)) &&
                        !hiddenPaths.some(path => pathname.includes(path)) && !hiddenSearchSelect.some(path => pathname.includes(path)) &&
                        !hiddenStatisticsPerform.some(path => pathname.includes(path)) &&
                        !hiddenTraackingBooked.some(path => pathname.includes(path)) &&
                        !hiddenGlobalOverview.some(path => pathname.includes(path)) &&
                        !hiddenMarketting.some(path => pathname.includes(path)) &&
                        !hiddenUsrMange.some(path => pathname.includes(path)) &&
                        !hiddenTransectionPayment.some(path => pathname.includes(path)) &&
                        !hiddenServiceReq.some(path => pathname.includes(path)) &&
                        !hiddenTicketingAndTransection.some(path => pathname.includes(path)) &&
                        !hiddenMessageClientRel.some(path => pathname.includes(path)) &&
                        !hiddenProfileService.some(path => pathname.includes(path)) &&
                        !hiddenServiceCal.some(path => pathname.includes(path)) &&
                        !hiddenHomeGlobal.some(path => pathname.includes(path)) &&
                        !hiddenCustomPhotoVideo.some(path => pathname.includes(path)) &&
                        !hiddenReserContracts.some(path => pathname.includes(path)) &&
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginX: 1 }}>
                            <Button
                                sx={{
                                    backgroundColor: "#0C2340",
                                    color: "white",
                                    borderRadius: 1,
                                    px: 1,
                                    fontSize: 14,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600,
                                }}
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: 1,
                                    px: 1,
                                    borderColor: "#C8C8C8",
                                    color: "#2295D4",
                                    fontSize: 14,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600,
                                }}
                            >
                                Publish Events
                            </Button>

                        </Box>
                    }
                    {
                        role === 'organizer' &&
                        !hiddenTranPaymet.some(path => pathname.includes(path)) &&
                        (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginX: 1 }}>
                                <Button
                                    variant="contained"
                                    disabled={hiddenEventDetails?.toString() === pathname?.toString()}
                                    onClick={() => navigate("/events/add-new")} // Redirect on click
                                    sx={{
                                        backgroundColor: "#0C2340",
                                        color: "white",
                                        borderRadius: "8px",
                                        px: 1,
                                        fontSize: 14,
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 600
                                    }}
                                >
                                    Create an Events
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderRadius: "8px",
                                        px: 1,
                                        borderColor: "#C8C8C8",
                                        color: "#2295D4",
                                        fontSize: 14,
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 600
                                    }}
                                    disabled={hiddenVisibilityAccess?.toString() === pathname?.toString()}

                                >
                                    <Link
                                        to="/visibility-and-access-settings"
                                        style={{
                                            textDecoration: 'none', // Removes underline
                                            color: 'inherit', // Inherits parent color
                                            // Or set specific color:
                                            // color: '#yourColor',
                                        }}
                                    >
                                        Settings
                                    </Link>

                                </Button>
                            </Box>
                        )

                    }
                    {
                        hiddenTranPaymet.some(path => pathname.includes(path)) &&
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginX: 1 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#0C2340",
                                    color: "white",
                                    borderRadius: "8px",
                                    px: 1,
                                    fontSize: 14,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600
                                }}
                            >
                                Export
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: "8px",
                                    px: 1,
                                    borderColor: "#C8C8C8",
                                    color: "#2295D4",
                                    fontSize: 14,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600
                                }}
                            >
                                Request Help
                            </Button>
                        </Box>
                    }
                    {pathname.includes('/ticket-management') && (
                        <Box sx={{ px: 1, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#0C2340",
                                    color: "white",
                                    borderRadius: 1,
                                    p: 1,
                                    fontSize: 14,
                                    width: "100%",
                                    fontWeight: 500
                                }}
                            >
                                My Tickets
                            </Button>
                        </Box>
                    )}
                    {hiddenServiceReq.some(path => pathname.includes(path)) && (
                        <Box sx={{ px: 1, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                size='small'
                                sx={{
                                    backgroundColor: "#0C2340",
                                    color: "white",
                                    borderRadius: 1,
                                    p: 1,
                                    fontSize: 14,
                                    width: "100%",
                                    fontWeight: 500
                                }}
                            >
                                Submission
                            </Button>
                        </Box>
                    )}
                    {hiddenCustomPhotoVideo.some(path => pathname.includes(path)) && (
                        <Box sx={{ px: 1, display: 'flex', justifyContent: 'center' }}><Button
                            variant="contained"
                            size='small'
                            sx={{
                                backgroundColor: "#0C2340",
                                color: "white",
                                borderRadius: 1,
                                p: 1,
                                fontSize: 14,
                                width: "100%",
                                fontWeight: 500
                            }}
                        >
                            Gallery
                        </Button>
                        </Box>
                    )}
                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'center' }}>

                        <Button
                            variant="outlined"
                            size='small'
                            onClick={() => handleLogout()}
                            sx={{
                                color: "red",
                                borderColor: "red",
                                my: 1,
                                p: 1,
                                width: "100%",
                                fontSize: 16,
                                fontWeight: 500
                            }}
                        >
                            Logout
                        </Button>
                    </Box>

                </Popover>
            )}
        </Box>
    )
}