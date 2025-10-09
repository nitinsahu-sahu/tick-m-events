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
// OR if using React Router:
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <List>
        {[
          { text: "About Us", path: "/about-us" },
          { text: "Sell Your Event", path: "/sell-event" },
          { text: "Advertise Your Event", path: "/advertise-event" },
          { text: "Contact", path: "/contact-us" },
        ].map((item, index) => (
          <ListItem 
            button 
            key={index}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <header>
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
            <Link to="/home">
              <img
                src="/assets/logo/full-logo.png"
                alt="Logo"
                style={{ height: 50, cursor: "pointer" }}
              />
            </Link>
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
            <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  cursor: "pointer",
                  fontWeight: 600,
                  '&:hover': {
                    color: "#0d2a4d",
                  }
                }}
              >
                Home <ExpandMoreIcon sx={{ fontSize: 16 }} />
              </Typography>
            </Link>

            <Link to="/event-list" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography 
                sx={{ 
                  cursor: "pointer", 
                  fontWeight: 600,
                  '&:hover': {
                    color: "#0d2a4d",
                  }
                }}
              >
                Events
              </Typography>
            </Link>
            
            <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography 
                sx={{ 
                  cursor: "pointer", 
                  fontWeight: 600,
                  '&:hover': {
                    color: "#0d2a4d",
                  }
                }}
              >
                Blog
              </Typography>
            </Link>
            
            <Link to="/b2b-marketplace" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography 
                sx={{ 
                  cursor: "pointer", 
                  fontWeight: 600,
                  '&:hover': {
                    color: "#0d2a4d",
                  }
                }}
              >
                B2B Marketplace
              </Typography>
            </Link>
            
            <Link to="/about-us" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography 
                sx={{ 
                  cursor: "pointer", 
                  fontWeight: 600,
                  '&:hover': {
                    color: "#0d2a4d",
                  }
                }}
              >
                About
              </Typography>
            </Link>
            
            <Link to="/contact-us" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography 
                sx={{ 
                  cursor: "pointer", 
                  fontWeight: 600,
                  '&:hover': {
                    color: "#0d2a4d",
                  }
                }}
              >
                Contact
              </Typography>
            </Link>
          </Box>

          {/* Right Controls */}
          <Box display="flex" alignItems="center" gap={1}>
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "#0d2a4d",
                  fontSize: { xs: "10px", sm: "12px" },
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "auto",
                  border: "1px solid #0d2a4d",
                  '&:hover': {
                    backgroundColor: "#0d2a4d",
                    color: "white",
                  }
                }}
              >
                <PersonIcon fontSize="small" /> Sign in
              </Button>
            </Link>

            {/* Language */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <LanguageIcon sx={{ fontSize: 16, color: "#0d2a4d" }} />
              <Select
                defaultValue="EN"
                size="small"
                sx={{
                  fontSize: "12px",
                  height: 28,
                  color: "#0d2a4d",
                  "& .MuiSelect-icon": { color: "#0d2a4d" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
                variant="outlined"
              >
                <MenuItem value="EN">EN</MenuItem>
                <MenuItem value="FR">FR</MenuItem>
              </Select>
            </Box>

            {/* Hamburger menu (mobile only) */}
            <IconButton
              edge="end"
              color="inherit"
              sx={{ 
                display: { xs: "flex", md: "none" },
                color: "#0d2a4d"
              }}
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