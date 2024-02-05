import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

// type MemInfo =
const TeamRegister = () => {
  const session = useSession();
  const toast = useToast();
  useEffect(() => {
    if (session.status === "loading") return;

    if (session.status === "unauthenticated")
      signIn("google", { callbackUrl: "/team-register" });
  }, [session.status]);

  const { data: isEvent } = trpc.teamRegisterRouter.isEvent.useQuery();
  const registerTeam = trpc.teamRegisterRouter.handleRegisterTeam.useMutation();
  const [size, setSize] = useState(2);
  const [members, setMembers] = useState<
    {
      name: string;
      email: string;
    }[]
  >([
    { name: "", email: "" },
    { name: "", email: "" },
  ]);
  console.log(isEvent);
  const changeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    const newMembersInfo = [...members];
    if (newSize > size)
      for (let i = size; i < newSize; i++)
        newMembersInfo.push({ name: "", email: "" });
    else newMembersInfo.pop();

    setMembers(newMembersInfo);
  };

  useEffect(() => {
    if (registerTeam.isSuccess) window.location.href = "/team-register";
    if (registerTeam.isError)
      toast({
        title: "Error",
        description: "One of the members is not registered on the website",
      });
  }, [registerTeam, toast]);
  const [teamName, setTeamName] = useState("");
  const updateName = (name: string, index: number) => {
    const newMembersInfo = [...members];
    newMembersInfo[index]!.name = name;
    setMembers(newMembersInfo);
  };

  const updateEmail = (email: string, index: number) => {
    const newMembersInfo = [...members];
    newMembersInfo[index]!.email = email;
    setMembers(newMembersInfo);
  };

  const maxSize =
    isEvent?.role === "STARTUPVERSE" ? Array(10).fill(0) : Array(4).fill(0);

  const curSize = Array(size).fill(0);
  if (
    isEvent?.role !== Role.USER &&
    isEvent !== undefined &&
    isEvent.isTeam === false
  )
    return (
      <Center flexDir="column" gap="2rem">
        <Heading textAlign="center" mt="5rem">
          Register team for {isEvent.role.toLowerCase()}
        </Heading>
        <Flex flexDir="column" align="start" mx="auto" maxW="80%" gap="1rem">
          <Flex w="100%" align="center" gap="1rem">
            <Text>Team Size</Text>
            <Select
              maxW="100px"
              onChange={(e) => {
                setSize(Number(e.target.value));
                changeSize(e);
              }}
            >
              {maxSize.map(
                (_, index) =>
                  index > 0 && (
                    <option
                      style={{ background: "black" }}
                      key={index}
                      value={index + 1}
                    >
                      {index + 1}
                    </option>
                  )
              )}
            </Select>
          </Flex>
          <FormControl maxW="300px" isRequired>
            <FormLabel>Team Name</FormLabel>
            <Input
              onChange={(e) => setTeamName(e.target.value)}
              value={teamName}
              type="text"
            />
          </FormControl>
          {curSize.map((_, index) => (
            <React.Fragment key={index + "/"}>
              <Text>
                Member {index + 1} {index === 0 ? "(Leader)" : ""}
              </Text>
              <Flex gap="1rem">
                <Input
                  placeholder="name"
                  onChange={(e) => updateName(e.target.value, index)}
                  value={members[index]?.name}
                  type="text"
                />
                <Input
                  placeholder="email"
                  value={members[index]?.email}
                  onChange={(e) => updateEmail(e.target.value, index)}
                  type="text"
                />
              </Flex>
            </React.Fragment>
          ))}
        </Flex>
        <Button
          color="black"
          isDisabled={members.some(
            (member) => member.name === "" || member.email === ""
          )}
          onClick={() => {
            console.log(members);
            registerTeam.mutate({
              teamName,
              members,
            });
          }}
        >
          Register Team
        </Button>
      </Center>
    );
  else
    return (
      <Heading mt="5rem" textAlign="center">
        {isEvent?.isTeam
          ? "Already Registered"
          : "Contact +919466007434 if you have registered for an event and cant access this"}
      </Heading>
    );
};
export default TeamRegister;
