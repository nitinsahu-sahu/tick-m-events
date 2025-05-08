import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import { useState } from 'react';
import { InputBase, Button, Box, Alert, useMediaQuery, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { _langs, _notifications } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import { RootState } from 'src/redux/store';
import { usePathname } from 'src/routes/hooks';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { getFilteredNavItems } from 'src/routes/hooks/getFilterNavItesm';
import { useNavigate } from 'react-router-dom';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { NotificationsPopover } from '../components/notifications-popover';
import { MessagePopover } from '../components/message-popover';
import { GiftPopover } from '../components/gift-popover';
import { EmailPopover } from '../components/email-popover';
import { UserPopover } from '../components/user-popover';
import { WishlistPopover } from '../components/wishlist-popover';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();
  const { _id, name, role } = useSelector((state: RootState) => state?.auth?.user);
  const filteredNavItems = getFilteredNavItems(navData, role);
  const pathname = usePathname()
  const navigate = useNavigate();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md")); // Hide on md & below
  const hiddenPaths = ['/ticket-validation-at-entry'];
  const hiddenTicketManagement = ["/ticket-management"];
  const hiddenSearchSelect = ['/search-&-select-service-providers'];
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
  const hiddenLoyaltyProgram = ['/loyalty-program'];
  const hiddenTicketPurchasePro = ['/ticket-purchase-process'];
  const hiddenEventSearchDetails = ['/event-search-and-details'];
  const hiddenEventDetails = ['/event-details'];
  const hiddenCustomPhotoVideo = ['/custom-photo-or-video-filters-for-events'];
  const hiddenHomeRecommadation = ['/home-and-recommendations'];
  const hiddenTranPaymet = ['/transection-and-payment'];
  const hiddenDashboard = ['/'];

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 3 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={filteredNavItems}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                />
                {
                  hiddenSearchSelect.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Search & Select Service Providers" />
                }
                {
                  (hiddenReserContracts.some(path => pathname.includes(path)) ||
                    hiddenServiceCal.some(path => pathname.includes(path))) &&
                  !isMobileOrTablet && (
                    <HeadingCommon weight={600} baseSize="30px" title="Reservations & Contracts" />
                  )
                }
                {
                  hiddenHomeGlobal.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Home & Global View" />
                }
                {
                  hiddenTransectionPayment.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Transaction & Payment Management" />
                }
                {
                  hiddenLoyaltyProgram.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="My Loyalty Points" />
                }
                {
                  hiddenMessageClientRel.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Messaging & Client Relationship" />
                }
                {
                  hiddenStatisticsPerform.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title={name} />
                }
                {
                  hiddenServiceReq.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Service Request & Negotiation" />
                }

                {
                  hiddenCustomPhotoVideo.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Custom Photo or Video Filter" />
                }
                {
                  hiddenGlobalOverview.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Global Overview & General Statistics" />
                }
                {
                  hiddenTraackingBooked.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Tracking of Booked Services & Providers" />
                }
                {
                  hiddenUsrMange.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Admin Panel" />
                }
                {
                  hiddenProfileService.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Profile & Services Management" />
                }
                {
                  hiddenMarketting.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="TICK-M EVENTS" />
                }
                {
                  hiddenTicketingAndTransection.some(path => pathname.includes(path)) && !isMobileOrTablet && <HeadingCommon weight={600} baseSize="30px" title="Ticketing & Transactions Supervision" />
                }
                {
                  (
                    hiddenHomeRecommadation.some(path => pathname.includes(path)) ||
                    hiddenEventSearchDetails.some(path => pathname.includes(path)) ||
                    hiddenPaths.some(path => pathname.includes(path))) &&
                  !hiddenProfileService.some(path => pathname.includes(path)) && (
                    <Typography fontWeight={600} fontSize={{ xs: "18px", sm: "24px", md: "30px" }} key={_id}>
                      Hey Welcome, <span>{name}</span>!
                    </Typography>
                  )
                }
                {
                  hiddenTicketPurchasePro.some(path => pathname.includes(path)) &&
                  <Typography fontWeight={600} fontSize={{ xs: "18px", sm: "24px", md: "30px" }} key={_id}>
                    Event Name
                  </Typography>
                }
              </>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={2} >

                {/* Search Bar */}
                {
                  !hiddenEventSearchDetails.some(path => pathname.includes(path)) &&
                  !hiddenHomeRecommadation.some(path => pathname.includes(path)) &&
                  !hiddenTicketPurchasePro.some(path => pathname.includes(path)) &&
                  !hiddenTicketManagement.some(path => pathname.includes(path)) &&
                  !hiddenTransectionPayment.some(path => pathname.includes(path)) && !hiddenMarketting.some(path => pathname.includes(path)) &&
                  !hiddenServiceCal.some(path => pathname.includes(path)) &&
                  !hiddenReserContracts.some(path => pathname.includes(path)) &&
                  !hiddenHomeGlobal.some(path => pathname.includes(path)) &&
                  !hiddenMarketting.some(path => pathname.includes(path)) &&
                  !hiddenCustomPhotoVideo.some(path => pathname.includes(path)) &&

                  !hiddenPaths.some(path => pathname.includes(path)) &&
                  !hiddenLoyaltyProgram.some(path => pathname.includes(path)) &&
                  !hiddenStatisticsPerform.some(path => pathname.includes(path)) &&
                  !hiddenServiceReq.some(path => pathname.includes(path)) &&
                  !hiddenTraackingBooked.some(path => pathname.includes(path)) &&
                  !hiddenGlobalOverview.some(path => pathname.includes(path)) &&
                  !hiddenTicketingAndTransection.some(path => pathname.includes(path)) &&
                  !hiddenProfileService.some(path => pathname.includes(path)) &&
                  !hiddenMessageClientRel.some(path => pathname.includes(path)) &&
                  <Box
                    sx={{
                      display: "flex",
                      height: "40px",
                      alignItems: "center",
                      width: "200px",
                      maxWidth: "300px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Search Icon */}
                    <IconButton >
                      <Iconify icon="eva:search-fill" />
                    </IconButton>

                    {/* Search Input */}
                    <InputBase
                      placeholder="Search here"
                      sx={{
                        flex: 1,
                        fontSize: "14px",
                        color: "#666",
                        "&::placeholder": { color: "#bbb" },
                      }}
                    />
                  </Box>
                }


                {/* Notifications & Popovers (Hidden on Mobile & Tablet) */}
                {!isMobileOrTablet && (
                  <>
                    {
                      !hiddenEventSearchDetails.some(path => pathname.includes(path)) &&
                      !hiddenServiceReq.some(path => pathname.includes(path)) &&
                      !hiddenTicketPurchasePro.some(path => pathname.includes(path)) &&
                      !hiddenPaths.some(path => pathname.includes(path)) &&
                      !hiddenLoyaltyProgram.some(path => pathname.includes(path)) &&
                      !hiddenCustomPhotoVideo.some(path => pathname.includes(path)) &&
                      <Box display="flex" gap={1} alignItems="center">

                        <NotificationsPopover data={_notifications} />
                        {
                          !hiddenHomeRecommadation.some(path => pathname.includes(path)) &&
                          !hiddenTicketManagement.some(path => pathname.includes(path)) &&
                          !hiddenHomeGlobal.some(path => pathname.includes(path)) &&
                          !hiddenServiceCal.some(path => pathname.includes(path)) &&
                          !hiddenTransectionPayment.some(path => pathname.includes(path)) &&
                          !hiddenMarketting.some(path => pathname.includes(path)) &&
                          !hiddenSearchSelect.some(path => pathname.includes(path)) &&
                          !hiddenTicketingAndTransection.some(path => pathname.includes(path)) &&
                          !hiddenProfileService.some(path => pathname.includes(path)) &&
                          !hiddenUsrMange.some(path => pathname.includes(path)) &&
                          !hiddenStatisticsPerform.some(path => pathname.includes(path)) &&
                          !hiddenMessageClientRel.some(path => pathname.includes(path)) &&
                          <>
                            {
                              !hiddenGlobalOverview.some(path => pathname.includes(path)) &&
                              !hiddenTraackingBooked.some(path => pathname.includes(path)) &&
                              <>
                                <MessagePopover totalUnRead="1" />
                                {
                                  !hiddenReserContracts.some(path => pathname.includes(path)) && <GiftPopover totalUnRead="5" />
                                }

                              </>
                            }
                            {
                              !hiddenReserContracts.some(path => pathname.includes(path)) && <EmailPopover totalUnRead="2" />
                            }

                          </>
                        }

                        {/* <LanguagePopover data={_langs}/> */}
                      </Box>
                    }
                  </>
                )}
                {
                  (
                    hiddenEventSearchDetails.some(path => pathname.includes(path)) &&
                    <>
                      <Iconify icon="typcn:filter" width={24} />
                      <WishlistPopover />
                    </>
                  )
                }
                {
                  hiddenStatisticsPerform.some(path => pathname.includes(path)) &&
                  <Typography fontWeight={600} fontSize={{ xs: 14, sm: 16, md: 18 }} color="#3CB1F1">
                    Performance: <span style={{ color: "black" }}>Excellent</span>
                  </Typography>
                }
                {
                  hiddenLoyaltyProgram.some(path => pathname.includes(path)) &&
                  <HeadingCommon title="500" weight={700} color="#0B2E4C" />

                }
                {
                  (hiddenTransectionPayment.some(path => pathname.includes(path)) ||
                    hiddenMessageClientRel.some(path => pathname.includes(path))) && (
                    <Typography fontWeight={600} fontSize={{ xs: 14, sm: 16, md: 18 }} color="#3CB1F1">
                      Balance: <span style={{ color: "#757575" }}>$2,500</span>
                    </Typography>
                  )
                }
                {/* Buttons (Hidden on Mobile & Tablet) */}
                {!isMobileOrTablet && (
                  <>
                    {
                      !hiddenDashboard.some(path => pathname.includes(path)) &&
                      !hiddenTranPaymet.some(path => pathname.includes(path)) &&
                      !hiddenHomeRecommadation.some(path => pathname.includes(path)) &&
                      !hiddenEventSearchDetails.some(path => pathname.includes(path)) &&
                      !hiddenTicketPurchasePro.some(path => pathname.includes(path)) &&
                      !hiddenTicketManagement.some(path => pathname.includes(path)) &&
                      !hiddenLoyaltyProgram.some(path => pathname.includes(path)) &&
                      !hiddenCustomPhotoVideo.some(path => pathname.includes(path)) &&
                      !hiddenHomeGlobal.some(path => pathname.includes(path)) &&
                      !hiddenServiceCal.some(path => pathname.includes(path)) &&
                      !hiddenReserContracts.some(path => pathname.includes(path)) &&
                      !hiddenPaths.some(path => pathname.includes(path)) &&
                      !hiddenTransectionPayment.some(path => pathname.includes(path)) &&
                      !hiddenMessageClientRel.some(path => pathname.includes(path)) &&
                      !hiddenStatisticsPerform.some(path => pathname.includes(path)) &&
                      !hiddenSearchSelect.some(path => pathname.includes(path)) &&
                      !hiddenProfileService.some(path => pathname.includes(path)) &&
                      !hiddenMarketting.some(path => pathname.includes(path)) &&
                      !hiddenUsrMange.some(path => pathname.includes(path)) &&
                      !hiddenGlobalOverview.some(path => pathname.includes(path)) &&
                      !hiddenTraackingBooked.some(path => pathname.includes(path)) &&
                      !hiddenServiceReq.some(path => pathname.includes(path)) &&

                      !hiddenTicketingAndTransection.some(path => pathname.includes(path)) &&
                      <>
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
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: "8px",
                            px: 1,
                            borderColor: "#C8C8C8",
                            color: "#2295D4",
                            fontSize: 16,
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600
                          }}
                        >
                          Publish Event
                        </Button>
                      </>
                    }
                    {
                      !isMobileOrTablet && (
                        hiddenDashboard.some(path => pathname.includes(path)) &&
                        !hiddenTranPaymet.some(path => pathname.includes(path)) &&
                        !hiddenHomeRecommadation.some(path => pathname.includes(path)) &&
                        !hiddenEventSearchDetails.some(path => pathname.includes(path)) &&
                        !hiddenTicketPurchasePro.some(path => pathname.includes(path)) &&
                        !hiddenTicketManagement.some(path => pathname.includes(path)) &&
                        !hiddenLoyaltyProgram.some(path => pathname.includes(path)) &&
                        !hiddenCustomPhotoVideo.some(path => pathname.includes(path)) &&
                        !hiddenHomeGlobal.some(path => pathname.includes(path)) &&
                        !hiddenServiceCal.some(path => pathname.includes(path)) &&
                        !hiddenReserContracts.some(path => pathname.includes(path)) &&
                        !hiddenPaths.some(path => pathname.includes(path)) &&
                        !hiddenTransectionPayment.some(path => pathname.includes(path)) &&
                        !hiddenMessageClientRel.some(path => pathname.includes(path)) &&
                        !hiddenStatisticsPerform.some(path => pathname.includes(path)) &&
                        !hiddenSearchSelect.some(path => pathname.includes(path)) &&
                        !hiddenProfileService.some(path => pathname.includes(path)) &&
                        !hiddenMarketting.some(path => pathname.includes(path)) &&
                        !hiddenUsrMange.some(path => pathname.includes(path)) &&
                        !hiddenGlobalOverview.some(path => pathname.includes(path)) &&
                        !hiddenTraackingBooked.some(path => pathname.includes(path)) &&
                        !hiddenServiceReq.some(path => pathname.includes(path)) &&

                        !hiddenTicketingAndTransection.some(path => pathname.includes(path)) &&
                        <>
                          <Button
                            variant="contained"
                            disabled={hiddenEventDetails?.toString() === pathname?.toString()}
                            onClick={() => navigate("/event-details")} // Redirect on click
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
                            Create an Event
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              borderRadius: "8px",
                              px: 1,
                              borderColor: "#C8C8C8",
                              color: "#2295D4",
                              fontSize: 16,
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 600
                            }}
                          >
                            Setting
                          </Button>
                        </>
                      )
                    }
                    {
                      hiddenTranPaymet.some(path => pathname.includes(path)) &&
                      <>
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
                          Export
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: "8px",
                            px: 1,
                            borderColor: "#C8C8C8",
                            color: "#2295D4",
                            fontSize: 16,
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600
                          }}
                        >
                          Request Help
                        </Button>
                      </>
                    }
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
                    {hiddenServiceReq.some(path => pathname.includes(path)) && (
                      <Button
                        variant="contained"
                        size='small'
                        sx={{
                          backgroundColor: "#0C2340",
                          color: "white",
                          borderRadius: 1,
                          p: 1,
                          fontSize: 16,
                          fontWeight: 500
                        }}
                      >
                        Submission
                      </Button>
                    )}
                    {hiddenCustomPhotoVideo.some(path => pathname.includes(path)) && (
                      <Button
                        variant="contained"
                        size='small'
                        sx={{
                          backgroundColor: "#0C2340",
                          color: "white",
                          borderRadius: 1,
                          p: 1,
                          fontSize: 16,
                          fontWeight: 500
                        }}
                      >
                        Gallery
                      </Button>
                    )}

                  </>
                )}

                {/* User Profile */}
                <UserPopover />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={filteredNavItems} layoutQuery={layoutQuery} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '280px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(1),
        '--layout-dashboard-content-px': theme.spacing(3),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
