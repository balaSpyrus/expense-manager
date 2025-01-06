"use client";
import { useUserDetails } from "@/lib/hook";
import React, { use } from "react";
import styles from "./userDetails.module.css";
import { redirect } from "next/navigation";

const UserDetails = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { user, isLoading } = useUserDetails();
  const defParams = use(params);

  console.log(user);
  if (!user && !isLoading) {
    redirect("/");
  }
  return (
    <div className={styles.container}>
      <h1>User Details</h1>
      <h3>{defParams.userId}</h3>
      <pre>{JSON.stringify(user?.providerData, null, 2)}</pre>
    </div>
  );
};

export default UserDetails;
