import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import { useState } from 'react';
import { InputBase, Button, Box, Alert, Popover, useMediaQuery, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { _langs, _notifications } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import { RootState } from 'src/redux/store';
import { usePathname } from 'src/routes/hooks';

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
  const { _id, name } = useSelector((state: RootState) => state?.auth?.user);
  const pathname = usePathname()

  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md")); // Hide on md & below
  const hiddenPaths = ['/ticket-validation-at-entry', '/loyalty-program', "/ticket-management"];
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
              sx: { px: { [layoutQuery]: 5 } },
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
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                />
                {hiddenPaths.some(path => pathname.includes(path)) &&
                  <Typography fontWeight={600} fontSize={{ xs: "18px", sm: "24px", md: "30px" }} key={_id}>Hey Welcome, <span>{name}</span>!</Typography>
                }
              </>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={2} >
                {/* Search Bar */}
                {!hiddenPaths.some(path => pathname.includes(path)) &&
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
                    {!hiddenPaths.some(path => pathname.includes(path)) &&
                      <Box display="flex" gap={1} alignItems="center">
                        <NotificationsPopover data={_notifications} />
                        <MessagePopover totalUnRead="1" />
                        <GiftPopover totalUnRead="5" />
                        <EmailPopover totalUnRead="2" />
                        {/* <LanguagePopover data={_langs}/> */}
                      </Box>
                    }
                  </>
                )}

                {/* Buttons (Hidden on Mobile & Tablet) */}
                {!isMobileOrTablet && (
                  <>
                    {!hiddenPaths.some(path => pathname.includes(path)) &&
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
                            color: "#0C2340",
                            fontSize: 16,
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600
                          }}
                        >
                          Publish Event
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
        <NavDesktop data={navData} layoutQuery={layoutQuery}
        />
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
        '--layout-dashboard-content-pb': theme.spacing(8),
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
