import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Collapse, Box, ListItem, ListItemButton, useTheme, Drawer, drawerClasses } from '@mui/material';
import { useSelector } from 'react-redux';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { varAlpha } from 'src/theme/styles';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { RootState } from 'src/redux/store';

import { NavUpgrade } from '../components/nav-upgrade';

// ----------------------------------------------------------------------
export type UserRole = 'organizer' | 'admin' | 'provider' | 'participant';

interface NavItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  roles?: UserRole[]; // Add roles property
  children?: NavItem[];
}
export type NavContentProps = {
  data: NavItem[]; // ✅ Use the updated NavItem type
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots}
      />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function DashboardHF({ title }: any) {
  return (
    <HeadingCommon title={title} color="#C8C8C8" variant="h6" weight={600} baseSize="16px" mb={1} mt={1} />
  )
}
// Add this custom hook to filter nav items by role
const useFilteredNavData = (data: any) => {
  const currentRole = useSelector((state: RootState) => state.auth?.user?.role || 'participant');


  return data.filter((item: any) => {
    // If no roles specified, show to all
    if (!item.roles) return true;
    // Check if current role is in allowed roles
    return item.roles.includes(currentRole);
  });
};


export function NavContent({ data, slots, sx }: NavContentProps) {
  const filteredData = useFilteredNavData(data); // Use the filtered data

  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      <Logo />

      {slots?.topArea}
      <DashboardHF title="MAIN MENU" />
      <Scrollbar fillContent>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {filteredData.map((item: any) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive = pathname === item.path ||
                (hasChildren && item.children.some((child: any) => child.path === pathname));

              return (
                <Box key={item.title}>
                  {/* Parent Menu Item */}
                  <ListItem disableGutters disablePadding>
                    <ListItemButton
                      disableGutters
                      component={!hasChildren ? RouterLink : 'button'}
                      onClick={hasChildren ? () => handleToggle(item.title) : undefined}
                      href={!hasChildren ? item.path : undefined}
                      sx={{
                        pl: 2,
                        py: 1,
                        gap: 2,
                        pr: 1.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        fontWeight: 'fontWeightMedium',
                        color: 'var(--layout-nav-item-color)',
                        minHeight: 'var(--layout-nav-item-height)',
                        ...(isActive && {
                          fontWeight: 'fontWeightSemiBold',
                          bgcolor: 'var(--layout-nav-item-active-bg)',
                          color: 'var(--layout-nav-item-active-color)',
                          '&:hover': {
                            bgcolor: 'var(--layout-nav-item-hover-bg)',
                          },
                        }),
                      }}
                    >
                      <Box component="span" sx={{ width: 24, height: 24 }}>{item.icon}</Box>
                      <Box component="span" flexGrow={1} sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                        {item.title}
                        {item.info && (
                          <Box component="span" sx={{ marginLeft: 1, borderRadius: "12px" }}> {/* Adjust marginLeft value as needed */}
                            {item.info}
                          </Box>
                        )}
                      </Box>

                      {hasChildren && (
                        <Box component="span">
                          <Box
                            alt="Single logo"
                            component="img"
                            src={openMenus[item.title] ? './assets/icons/navbar/ic_chevron_down.svg' : './assets/icons/navbar/ic_chevron_up.svg'}
                            width={16}
                            height={16}
                          />
                        </Box>
                      )}
                      {/* {hasChildren && <Box component="span">{openMenus[item.title] ? '▲' : '▼'}</Box>} */}
                    </ListItemButton>
                  </ListItem>

                  {/* Submenu Items (Dropdown) */}
                  {hasChildren && (
                    <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                      <Box component="ul" sx={{ pl: 0, my: 1 }}>
                        {item?.children?.map((child: any) => {
                          const isChildActive = child.path === pathname;
                          return (
                            <ListItem key={child.title} disableGutters disablePadding>
                              <ListItemButton
                                component={RouterLink}
                                href={child.path}
                                sx={{
                                  pl: 6,
                                  gap: 2,
                                  pr: 1.5,
                                  borderRadius: 0.75,
                                  typography: 'body2',
                                  fontWeight: isChildActive ? 'fontWeightSemiBold' : 'fontWeightMedium',
                                  color: isChildActive
                                    ? 'var(--layout-nav-item-active-color)'
                                    : 'var(--layout-nav-item-color)',
                                  minHeight: 'var(--layout-nav-item-height)',
                                  bgcolor: isChildActive
                                    ? 'var(--layout-nav-item-active-bg)'
                                    : 'transparent',
                                  '&:hover': {
                                    bgcolor: isChildActive
                                      ? 'var(--layout-nav-item-active-hover-bg)'
                                      : 'var(--layout-nav-item-hover-bg)',
                                  },
                                }}
                              >
                                <Box component="span" sx={{ width: 24, height: 24 }}>{child.icon}</Box>
                                <Box component="span" flexGrow={1}>{child.title}</Box>
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}

      <NavUpgrade />

      <DashboardHF title="tick-m EVENTS Dashboard" />
    </>
  );
}
