"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Login, Logout } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hook";
import ThemeProvider from "../themeProvider";
import { ROUTES } from "@/constant";

const NavBar = () => {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = async () => {
    await login();
    handleMenuClose();
    router.push("/dashboard");
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
    router.push("/");
  };

  const handleSettings = () => {
    handleMenuClose();
    router.push(`/user/${user?.uid}`);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {user && (
        <MenuItem onClick={handleSettings}>
          <ConstructionIcon fontSize="small" sx={{ mr: 1 }} />
          Account Settings
        </MenuItem>
      )}
      <MenuItem onClick={user ? handleLogout : handleLogin}>
        {user ? (
          <Logout fontSize="small" sx={{ mr: 1 }} />
        ) : (
          <Login fontSize="small" sx={{ mr: 1 }} />
        )}
        {user ? "Logout" : "Login"}
      </MenuItem>
    </Menu>
  );

  const renderDrawer = (
    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
      <List>
        {ROUTES.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            href={item.href}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <ThemeProvider>
      <AppBar position="static" className="nav-bar">
        <Toolbar>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            component={Link}
            href="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Expense Manager
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              {renderDrawer}
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {ROUTES.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  href={item.href}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          <IconButton color="inherit" onClick={handleMenuOpen} sx={{ ml: 2 }}>
            {user ? (
              <Avatar
                src={user.photoURL ?? undefined}
                alt={user.displayName ?? ""}
                sx={{ width: 32, height: 32 }}
              >
                {user.displayName?.charAt(0)}
              </Avatar>
            ) : (
              <AccountCircleOutlinedIcon />
            )}
          </IconButton>
          {renderMenu}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
