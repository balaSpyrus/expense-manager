import React from "react";

const UserDetails = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params).userId;
  return <div>UserDetails :{userId}</div>;
};

export default UserDetails;
