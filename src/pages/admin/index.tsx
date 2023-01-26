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
      <Text>Total Amount - {data.totalAmount} </Text>
      <div className="flex gap-8">
        <button
          className={` rounded-full p-2 px-4
						${filter === "All" ? "bg-blue-500" : "bg-gray-500"}
					`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        {/* Button for ESUMMIT */}
        <button
          className={` rounded-full p-2 px-4
						${filter === "ESUMMIT" ? "bg-blue-500" : "bg-gray-500"}
					`}
          onClick={() => setFilter("ESUMMIT")}
        >
          Esummit
        </button>
        <button
          className={` rounded-full p-2 px-4
						${filter === "HACKATHON" ? "bg-blue-500" : "bg-gray-500"}
					`}
          onClick={() => setFilter("HACKATHON")}
        >
          Hackathon
        </button>
        <button
          className={` rounded-full p-2 px-4
						${filter === "IDEATHON" ? "bg-blue-500" : "bg-gray-500"}
					`}
          onClick={() => setFilter("IDEATHON")}
        >
          Ideathon
        </button>
        <button
          className={` rounded-full p-2 px-4
						${filter === "STARTUPVERSE" ? "bg-blue-500" : "bg-gray-500"}
					`}
          onClick={() => setFilter("STARTUPVERSE")}
        >
          Startupverse
        </button>
      </div>
      <table className="border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Team Name</th>
            <th className="border p-2">Member Name</th>
            <th className="border p-2">Check-in status</th>
            <th className="border p-2">Reg Status</th>
          </tr>
        </thead>
        <tbody>
          {(teams?.teams ?? [])
            .filter((team) => {
              return team.event.name === filter || filter === "All";
            })
            .map((team) => (
              <tr key={team.id}>
                <td rowSpan={team.User.length} className="border p-2">
                  {team.name}
                </td>
                <td className="border p-2">
                  {team.User.map((member) => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                    </tr>
                  ))}
                </td>
                <td className="border p-2">
                  {team.User.map((member) => (
                    <tr key={member.id}>
                      <td
                        className={`
												${member.checkedIn ? "" : "bg-red-500"}
											`}
                      >
                        {member.checkedIn ? "Checked In" : "Not Checked In"}
                      </td>
                    </tr>
                  ))}
                </td>
                <td className="border p-2">
                  {team.User.map((member) => (
                    <tr key={member.id}>
                      <td key={member.id}>REGGGGG</td>
                    </tr>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
