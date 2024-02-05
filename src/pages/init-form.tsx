import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { useForm, SubmitHandler } from "react-hook-form";

import { type GetServerSidePropsContext } from "next";

import { prisma } from "../server/db/client";

import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

import { trpc } from "../utils/trpc";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (session) {
    // TODO: Check if hasFilledInfo is false in db using
    // prisma directly since this runs server side only
    const email = session.user?.email;
    const user = await prisma.user.findFirst({ where: { email } });

    console.log({ user }, "has visited the init form");

    if (user?.hasFilledInfo) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}

interface InitFormInputs {
  university: string;
  fieldOfStudy: string;
  yearOfStudy: string;
	mobileNumber: string;
	gender: "MALE" | "FEMALE";
}

const InitialForm: NextPage = () => {
  const { data: sessionData } = useSession();

  const toast = useToast();

  const mutation = trpc.reg.fillUserInfo.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitFormInputs>();

  const onSubmit: SubmitHandler<InitFormInputs> = (data) => {
    console.log(data);
    mutation.mutate(data);

    if (mutation.isError) {
      toast({
        title: "Error",
        description: "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "You have successfully updated your details.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return sessionData ? (
    <div className="mx-auto flex w-[40vw] flex-col items-start phone:w-[90vw]">
      <div>
        <div className="mt-10 text-5xl phone:text-4xl">
          Welcome, {sessionData.user?.name?.split(" ")[0]}.
        </div>
        <div className="text-sm laptop:text-base">
          Enter your details to continue.
        </div>
      </div>

      <FormControl className="w-full">
        <Input
          className="mt-5 w-[80%]"
          variant="flushed"
          placeholder="University"
          {...register("university", { required: true })}
        />
        {errors.university && (
          <FormHelperText color="red.400">
            This field is required
          </FormHelperText>
        )}
        <Input
          className="mt-10 w-[80%]"
          variant="flushed"
          placeholder="Field of Study"
          {...register("fieldOfStudy", { required: true })}
        />
        {errors.fieldOfStudy && (
          <FormHelperText color="red.400">
            This field is required
          </FormHelperText>
        )}
        <Select
          className="w-[80%]"
          marginTop="38px"
          variant="flushed"
          placeholder="Year of Study"
          {...register("yearOfStudy", {
            required: true,
            pattern: /^[0-9]{4}$/,
          })}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </Select>
        {errors.yearOfStudy && (
          <FormHelperText color="red.400">
            This field is required
          </FormHelperText>
        )}
        <Input
          className="mt-10 w-[80%]"
          variant="flushed"
          placeholder="Mobile number"
          {...register("mobileNumber", {
            required: true,
            pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
          })}
        />
        <FormHelperText>
          Please enter your number without spaces, beginning with an extension
          like &#39;+91&#39; for India.
        </FormHelperText>
        {errors.mobileNumber && (
          <FormHelperText color="red.400">
            This field is required
          </FormHelperText>
				)}
				<Select
          className="w-[80%]"
          marginTop="38px"
          variant="flushed"
          placeholder="Gender"
          {...register("gender", {
            required: true,
          })}
        >
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </Select>
        <Button
          mt={14}
          colorScheme="black"
          type="submit"
          variant="outline"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Submit
        </Button>
      </FormControl>
    </div>
  ) : (
    <></>
  );
};

export default InitialForm;
