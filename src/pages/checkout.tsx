import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  ListItem,
  Select,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FilePond } from "react-filepond";
import paymentQr from "../assets/payment_qr.jpg";
import { trpc } from "../utils/trpc";

const Checkout: NextPage = () => {
  const quantity = 1;
  const [files, setFiles] = useState<any>([]);
  const toast = useToast();
  const user = useSession();
  const handleInitialCheckout =
    trpc.discountedCheckout.handleInitialCheckout.useMutation();

  useEffect(() => {
    if (handleInitialCheckout.isSuccess)
      toast({
        title: "Payment processing",
        description:
          "Kindly wait for 24 hours for us to get back with a confirmation. Don't worry, your money is safe.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  }, [handleInitialCheckout, toast]);

  useEffect(() => {
    if (user.status === "unauthenticated")
      signIn("google", { callbackUrl: "/checkout" });
  }, [user]);

  return (
    <Center mt="6rem">
      <Flex flexDir="column" align="center" gap="2rem">
        <Heading>One day pass worth Rs. 350</Heading>

        <h1 className="text-center text-4xl text-white">
          Make Payment Rs. 350
        </h1>
        <Image
          className="hidden md:block"
          height="200"
          width="200"
          src={paymentQr}
          alt=""
        />
        <p className="text-center">
          Upload Screenshot after payment, make sure it includes UPI Order / ref
          id
          <br />
          9109782774@paytm <br />
          <a
            className="text-blue-500 underline"
            href="https://p.paytm.me/xCTH/kmd08rbm"
          >
            https://p.paytm.me/xCTH/kmd08rbm
          </a>
        </p>

        <Box w="200px">
          <FilePond
            files={files}
            acceptedFileTypes={["image/*"]}
            onprocessfile={(error, file) => {
              if (!error) {
                setFiles([file]);
              }
            }}
            onremovefile={(error) => {
              if (!error) {
                setFiles([]);
              }
            }}
            allowMultiple={false}
            server="/api/checkout/ss-upload"
            name="files"
            labelIdle="Upload your payment screenshot"
          />
        </Box>
        <Button
          isDisabled={files.length === 0 || handleInitialCheckout.isLoading}
          _disabled={{
            color: "white",
            bg: "gray.500",
          }}
          bgColor="green"
          color="black"
          _hover={{}}
          _focus={{}}
          onClick={() => {
            handleInitialCheckout.mutate();
            setFiles([]);
          }}
        >
          Payment confirm
        </Button>
      </Flex>
    </Center>
  );
};
export default Checkout;
