import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { Collapse, Box, ListItem, ListItemButton, Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { varAlpha } from 'src/theme/styles';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { NavUpgrade } from '../components/nav-upgrade';

// ----------------------------------------------------------------------

interface NavItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  children?: NavItem[]; // ✅ Allow nested children
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
    <Typography variant="h6" sx={{
      color: "#C8C8C8",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      fontSize: { xs: 14, sm: 16 },
      marginBottom: 1,
      marginTop: 1,
      marginLeft: 2
    }}>
      {title}

    </Typography>
  )
}
export function NavContent({ data, slots, sx }: NavContentProps) {
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
            {data.map((item) => {
              const isActive = item.path === pathname;
              const hasChildren = item.children && item.children.length > 0;

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
                      <Box component="ul" sx={{ pl: 0 }}>
                        {item?.children?.map((child: any) => (
                          <ListItem key={child.title} disableGutters disablePadding>
                            <ListItemButton
                              component={RouterLink}
                              href={child.path}
                              sx={{
                                pl: 2,
                                gap: 2,
                                pr: 1.5,
                                borderRadius: 0.75,
                                typography: 'body2',
                                fontWeight: 'fontWeightMedium',
                                color: 'var(--layout-nav-item-color)',
                                minHeight: 'var(--layout-nav-item-height)',
                                '&:hover': {
                                  bgcolor: 'var(--layout-nav-item-hover-bg)',
                                },
                              }}
                            >
                              <Box component="span" sx={{ width: 24, height: 24 }}>{child.icon}</Box>
                              <Box component="span" flexGrow={1}>{child.title}</Box>
                            </ListItemButton>
                          </ListItem>
                        ))}
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
