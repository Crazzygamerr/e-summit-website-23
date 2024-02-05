import { Center, Grid, Text } from "@chakra-ui/react";
import { useState } from "react";

import { trpc } from "../../utils/trpc";

const RegisteredPage = () => {
  const {
    data: isAdmin,
    isLoading,
    isError,
  } = trpc.adminRouter.checkIfAdmin.useQuery();

  const { data: adminVRData, ...adminVRQuery } =
    trpc.adminRouter.adminViewRegistered.useQuery();

  if (isLoading || adminVRQuery.isLoading) return <div>Loading</div>;
  if (isError || adminVRQuery.isError) return <div>Error</div>;

  if (!isAdmin)
    return (
      <Center minH="100vh" color="white">
        You are not an admin
      </Center>
    );

  return adminVRQuery.isLoading ? (
    <div className="mt-20 text-3xl">Loading data...</div>
  ) : (
    <div className="mx-24">
      <div className="mt-20 text-3xl">All registered users</div>
      {adminVRData?.registeredUsers?.map((blob) => (
        <Grid
          templateColumns={"1fr 1fr 1fr"}
          key={blob.user.id + Math.random()}
        >
          <div className="w-72">{blob.user.name}</div>
          <div className="w-75">{blob.user.email}</div>
          <div>{blob.EventReg[0]?.quantity}</div>
        </Grid>
      ))}
      <div className="mt-10">count: {adminVRData?.registeredUsers?.length}</div>
    </div>
  );
};

export default RegisteredPage;
