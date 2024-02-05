import { useState, useEffect } from "react";

import { Center, Button, useToast, Spinner } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { trpc } from "../../utils/trpc";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import QrScan from "react-qr-reader";

const CheckinPage = () => {
  const toast = useToast();

  const {
    data: isAdmin,
    isLoading,
    isError,
  } = trpc.adminRouter.checkIfAdmin.useQuery();

  const [qrData, setQrData] = useState("");
  const [qrUser, setQrUser] = useState<any>();

  const {
    isLoading: qrUserLoading,
    data: qrUserData,
    refetch: qrUserDataRefetch,
  } = trpc.adminRouter.adminGetQrUserData.useQuery({
    qrUserId: qrData,
  });

  const {
    isLoading: checkInMutLoading,
    isError: checkInMutError,
    ...checkInMut
  } = trpc.adminRouter.adminCheckinParticipant.useMutation();

  useEffect(() => {
    if (!qrData) return;

    console.log("reached here", { qrData });

    qrUserDataRefetch();
  }, [qrData]);

  useEffect(() => {
    console.log("reached qruserdata effect", { qrUserLoading, qrUserData });

    if (qrUserData?.qrUser?.name) {
      setQrUser(qrUserData?.qrUser);
    }
  }, [qrUserData]);

  useEffect(() => {
    if (checkInMut.isSuccess) {
      toast({
        title: "Checked in successfully",
        status: "success",
        isClosable: true,
      });
    }
  }, [checkInMutLoading]);

  const handleScan = (data: string) => {
    if (data) {
      setQrData(data);
      // setQrData("cld2wysth000693eki37eksh1"); // user with an EventReg attached
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  if (!isAdmin)
    return (
      <Center minH="100vh" color="white">
        You are not an admin
      </Center>
    );

  return (
    <Center flexDir="column" minH="100vh" color="white">
      <h1 className="mt-20 text-3xl">Admin</h1>
      <h1 className="text-xl">Check in a participant</h1>
      <div>
        <div style={{ marginTop: 30, marginBottom: 20 }}>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: "50vh", width: "100vw" }}
          />
        </div>
      </div>
      <div className="flex w-[90%] flex-col rounded-xl bg-slate-600 py-8 px-10">
        {qrUser ? (
          // <pre className="text-md text-white">
          //   {JSON.stringify(qrUser, null, 2)}
          // </pre>
          <>
            <div className="text-md">
              <div className="font-bold">{qrUser.name}</div>
              <div>Email: {qrUser.email}</div>
              <div>Uni: {qrUser.university}</div>
              <div>Grad: {qrUser.yearOfStudy}</div>
              <div>Team Lead: {qrUser.teamLeader.toString()}</div>
              <div>Role: {qrUser.role}</div>
              {/* {qrUser.EventReg[0].event.name
                  ? qrUser.EventReg[0].event.name
                  : "none"} */}

              {/* <div>Phone: {qrUser.mobileNumber}</div> */}
            </div>
            <Button
              w="100%"
              mt={3}
              colorScheme={qrUser.checkedIn ? "gray" : "green"}
              isLoading={checkInMutLoading}
              spinner={<Spinner color="white" />}
              disabled={qrUser.checkedIn}
              onClick={() => {
                if (!qrUser.checkedIn) {
                  checkInMut.mutate({ userIdToCheckIn: qrUser.id });
                  return;
                }

                toast({
                  title: "User has already checked in",
                  status: "error",
                  isClosable: true,
                });
              }}
            >
              {qrUser.checkedIn ? (
                <div className="text-gray-600">Already checked in</div>
              ) : (
                <>
                  Check in <ChevronRightIcon boxSize={6} />
                </>
              )}
            </Button>

            {checkInMut.error && (
              <p className="text-red-600">
                Something went wrong! {checkInMut.error.message}
              </p>
            )}
          </>
        ) : qrData ? (
          <p className="text-xl">{`userId: ${qrData}`}</p>
        ) : (
          <p className="text-xl">No result</p>
        )}
      </div>
    </Center>
  );
};

export default CheckinPage;
