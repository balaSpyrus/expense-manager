/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import auth from "@/auth";
import { useUserDetails } from "@/lib/hook";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Dropdown from "../atoms/dropdown";
import styles from "./navbar.module.css";

const provider = new GoogleAuthProvider();

const NavBar = () => {
  const { user } = useUserDetails();

  const onChange = (value: string) => {
    switch (value) {
      case "Account Settings":
        redirect(`/user/${user?.uid}`);
      default:
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
    }
  };

  return (
    <nav className="nav">
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
          <Dropdown
            buttonProps={{
              className: styles.user_dd,
            }}
            value={
              user ? (
                <>
                  <Image
                    className={styles.avatar}
                    src={user.photoURL ?? ""}
                    width={20}
                    height={20}
                    alt=""
                  />
                  <span>
                    {user.displayName
                      ?.split(" ")
                      .map((each) => each.charAt(0))
                      .join("")}
                  </span>
                </>
              ) : (
                <CircleUserRound />
              )
            }
            options={["Account Settings", user ? "Logout" : "Login"]}
            onChange={onChange}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
