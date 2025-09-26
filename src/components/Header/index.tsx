import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <List>
        {["Home", "About Us", "Sell Your Event", "Advertise Your Event", "Contact"].map(
          (text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <header>
      {/* 🔹 Top Bar */}
      <AppBar position="static" sx={{ bgcolor: "#0d2a4d", py: 0.5 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            minHeight: "40px !important",
          }}
        >
          {/* Left */}
          <Box
            display="flex"
            gap={{ xs: 1, sm: 2, md: 3 }}
            alignItems="center"
            sx={{ fontSize: { xs: "11px", sm: "13px" } }}
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <PhoneIcon sx={{ fontSize: 14 }} />
              <Typography variant="body2">+1 222-555-33-99</Typography>
            </Box>
            <Box
              display={{ xs: "none", sm: "flex" }}
              alignItems="center"
              gap={0.5}
            >
              <EmailIcon sx={{ fontSize: 14 }} />
              <Typography variant="body2">sale@carento.com</Typography>
            </Box>
          </Box>

          {/* Center (hidden on xs/sm) */}
          <Typography
            variant="body2"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            More than 800+ special collection in this summer — Access Now
          </Typography>

          {/* Right */}
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
            <Button
              sx={{
                color: "white",
                fontSize: { xs: "10px", sm: "12px" },
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                minWidth: "auto",
              }}
            >
              <PersonIcon fontSize="small" /> Sign in
            </Button>

            {/* Language */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <LanguageIcon sx={{ fontSize: 16, color: "white" }} />
              <Select
                defaultValue="EN"
                size="small"
                sx={{
                  fontSize: "12px",
                  height: 28,
                  color: "white",
                  "& .MuiSelect-icon": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
                variant="outlined"
              >
                <MenuItem value="EN">EN</MenuItem>
                <MenuItem value="FR">FR</MenuItem>
              </Select>
            </Box>

            {/* Currency */}
            <Select
              defaultValue="USD"
              size="small"
              sx={{
                fontSize: "12px",
                height: 28,
                color: "white",
                "& .MuiSelect-icon": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
              variant="outlined"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>

            {/* Seller button (hidden xs) */}
            <Button
              variant="outlined"
              sx={{
                display: { xs: "none", sm: "block" },
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "12px",
                px: 1.5,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderColor: "black",
                },
              }}
            >
              Become Seller
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔹 Main Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "70px !important",
            px: { xs: 2, md: 8 },
          }}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src="/public/assets/logo/full-logo.png"
              alt="Logo"
              style={{ height: 50 }}
            />
          </Box>

          {/* Menu (desktop only) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
              fontWeight: 500,
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Home <ExpandMoreIcon sx={{ fontSize: 16 }} />
            </Typography>
            <Typography sx={{ cursor: "pointer", fontWeight: 600 }}>
              About Us
            </Typography>
            <Typography sx={{ cursor: "pointer", fontWeight: 600 }}>
              Sell Your Event
            </Typography>
            <Typography sx={{ cursor: "pointer", fontWeight: 600 }}>
              Advertise Your Event
            </Typography>
            <Typography sx={{ cursor: "pointer", fontWeight: 600 }}>
              Contact
            </Typography>
          </Box>

          {/* Right Controls */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton>
              <SearchIcon sx={{ color: "#3cb1f1" }} />
            </IconButton>

            {/* CTA hidden on xs */}
            <Button
              variant="contained"
              sx={{
                display: { xs: "none", sm: "block" },
                bgcolor: "#0d2a4d",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "13px",
                px: 2,
                "&:hover": { bgcolor: "#0b223e" },
              }}
            >
              Create Your Event
            </Button>

            {/* Hamburger menu (mobile only) */}
            <IconButton
              edge="end"
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: "none" } }}
      >
        {drawer}
      </Drawer>
    </header>
  );
}
