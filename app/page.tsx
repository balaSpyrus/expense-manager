"use client";
import auth from "@/auth";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const provider = new GoogleAuthProvider();

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<User | null>(null);
  const onClick = () => {
    if (user) {
      signOut(auth);
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log("====================================");
          console.log(token, user, getAdditionalUserInfo(result));
          console.log("====================================");

          // setUser(user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);

          console.log(errorCode, errorMessage, email, credential);
        });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Expense Manager</h1>
      <p className={styles.description}>
        This is a simple expense manager app to manage your expenses.
      </p>
      {user && (
        <pre
          style={{
            maxWidth: 700,
            overflow: "auto",
            wordBreak: "break-all",
            whiteSpace: "break-spaces",
          }}
        >
          {JSON.stringify(user.providerData, null, 4)}
        </pre>
      )}
      <button onClick={onClick}>{user ? "logout" : "login"}</button>
    </div>
  );
}
