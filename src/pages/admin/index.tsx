import { Center, Text } from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import { useState } from "react";

const Admin = () => {
  const { data } = trpc.adminRouter.adminViewTickets.useQuery();
  const { data: teams } = trpc.adminRouter.adminViewTeams.useQuery();
  const [filter, setFilter] = useState("All");

  console.log(data);
  if (!data?.isAdmin)
    return (
      <Center minH="100vh" color="white">
        Loading...
      </Center>
    );
  return (
    <div className="flex flex-col items-start justify-start gap-6 px-10 pt-[90px]">
      <h1 className="whitespace-nowrap text-4xl">Admin</h1>
      <Text>Total Tickets Bought - {data.totalQuantity}</Text>
      <Text>Total Amount - {data.totalAmount} </Text>
    </div>
  );
};

export default Admin;
