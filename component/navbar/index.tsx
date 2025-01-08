/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import auth from "@/auth";
import { useUserDetails } from "@/lib/hook";
import { Login, Logout } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import styles from "./navbar.module.css";

const provider = new GoogleAuthProvider();

const NavBar = () => {
  const { user } = useUserDetails();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value?: string) => {
    setAnchorEl(null);

    switch (value) {
      case "settings":
        redirect(`/user/${user?.uid}`);
      case "login":
      case "logout":
        if (user) {
          signOut(auth);
        } else {
          signInWithPopup(auth, provider)
            .then((result) => {
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const token = credential?.accessToken;
              const user = result.user;
              setTimeout(() => redirect("/dashboard"), 1000);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.customData.email;
              const credential = GoogleAuthProvider.credentialFromError(error);
            });
        }
        break;
      default:
        break;
    }
  };

  return (
    <nav className="nav-bar">
      <h1>
        <Link href="/">Expense Manager</Link>
      </h1>
      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/configure">Configure</Link>
        </li>
        <li>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              color: "rgb(var(--foreground))",
            }}
          >
            {user ? (
              <>
                <Image
                  className={styles.avatar}
                  src={user.photoURL ?? ""}
                  width={20}
                  height={20}
                  alt=""
                />
                <Typography variant="h1" fontWeight={600}>
                  {user.displayName
                    ?.split(" ")
                    .map((each) => each.charAt(0))
                    .join("")}
                </Typography>
              </>
            ) : (
              <AccountCircleOutlinedIcon />
            )}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("settings")}>
              <ListItemIcon>
                <ConstructionIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Account Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleClose(user ? "logout" : "login")}>
              <ListItemIcon>
                {user ? (
                  <Logout fontSize="small" />
                ) : (
                  <Login fontSize="small" />
                )}
              </ListItemIcon>
              {user ? "Logout" : "Login"}
            </MenuItem>
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
