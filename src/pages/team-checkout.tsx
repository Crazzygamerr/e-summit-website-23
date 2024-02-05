import type { NextPage } from "next";

const TeamCheckout: NextPage = () => {
  // const [showMemberModal, setShowMemberModal] = useAtom(showMemberModalAtom);

  // const checkout = useCheckout();

  // const {
  //   isActive,
  //   setIsActive,
  //   members,
  //   addMember,
  //   editMember,
  //   removeMember,
  // } = checkout;

  // return (
  //   <div className="mt-20">
  //     {/* <div className="text-3xl"></div> */}
  //     <div className="mx-auto h-[40vh] w-[40vw]">
  //       {/* <div>main contents</div> */}
  //       {members.map(({ name, ...member }, i: number) => (
  //         <div
  //           key={i}
  //           className="m-2 flex items-center justify-between rounded-md bg-slate-500 p-4"
  //         >
  //           <div className="select-none text-3xl">{name}</div>

  //           <div className="flex gap-2">
  //             <div
  //               className="cursor-pointer"
  //               onClick={() => {
  //                 console.log("editing", name);
  //                 setShowMemberModal(true);
  //                 setIsActive(i);
  //               }}
  //             >
  //               <EditIcon
  //                 p={2}
  //                 borderRadius={"8px"}
  //                 bgColor={"blue.600"}
  //                 _hover={{ bgColor: "blue.700" }}
  //                 // border="1px solid #6c7078"
  //                 boxSize={10}
  //               />
  //             </div>

  //             <div
  //               className="cursor-pointer"
  //               onClick={() => {
  //                 console.log("deleting", name);
  //                 removeMember(i);
  //               }}
  //             >
  //               <DeleteIcon
  //                 p={2}
  //                 borderRadius={"8px"}
  //                 bgColor={"red.600"}
  //                 _hover={{ bgColor: "red.700" }}
  //                 // border="1px solid #6c7078"
  //                 boxSize={10}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //       <div
  //         className="m-2 flex cursor-pointer items-center items-center justify-center rounded-md border-2 border-dotted border-slate-500 p-4"
  //         onClick={() => {
  //           setIsActive(-1);
  //           setShowMemberModal(true);
  //         }}
  //       >
  //         <AddIcon boxSize={10} />
  //       </div>
  //     </div>

  //     <TeamCheckoutModal checkout={checkout} />
  //   </div>
  // );
  return <></>;
};

export default TeamCheckout;
