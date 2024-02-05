import { type CheckoutState } from "../hooks/useCheckout";

const TeamCheckoutModal = ({ checkout }: { checkout: CheckoutState }) => {
  // const {
  //   isActive,
  //   setIsActive,
  //   members,
  //   addMember,
  //   editMember,
  //   removeMember,
  // } = checkout;

  // const [member, setMember] = useState<Member>({
  //   name: "",
  //   emailId: "",
  //   phoneNumber: "",
  //   aadharNumber: "",
  //   gender: "MALE",
  //   isAccomodation: false,
  //   checkinDate: new Date("Jan 28, 2023 00:00:00"),
  //   checkoutDate: new Date("Jan 29, 2023 00:00:00"),
  // });

  // useEffect(() => {}, [member]);

  // useEffect(() => {
  //   if (isActive === -1) {
  //     setMember({
  //       name: "",
  //       emailId: "",
  //       phoneNumber: "",
  //       aadharNumber: "",
  //       gender: "MALE",
  //       isAccomodation: false,
  //       checkinDate: new Date("Jan 28, 2023 00:00:00"),
  //       checkoutDate: new Date("Jan 29, 2023 00:00:00"),
  //     });
  //   } else {
  //     setMember({
  //       ...(members[isActive] as Member),
  //       checkinDate: new Date("Jan 28, 2023 00:00:00"),
  //       checkoutDate: new Date("Jan 29, 2023 00:00:00"),
  //     });
  //   }
  // }, [isActive]);

  // const [showMemberUI, setShowMemberUI] = useAtom(showMemberModalAtom);
  // const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (!ref.current || !ref.current.style) return;

  //     if (window.scrollY > 1) {
  //       ref.current.style.padding = "2rem 0";
  //     } else {
  //       ref.current.style.padding = "";
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (showMemberUI) {
  //     disableBodyScroll(document.body);
  //   } else {
  //     enableBodyScroll(document.body);
  //   }
  // }, [showMemberUI]);

  // return (
  //   <div
  //     className={`
  // 				absolute top-[7vh] bottom-0 left-0 right-0 z-40 flex h-[80vh]
  // 				w-full items-center justify-center backdrop-blur-md sm:h-screen
  //         md:h-[65vh]
  // 				${showMemberUI ? "" : "invisible"}
  // 			`}
  //     style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
  //   >
  //     <div className="z-60 relative flex h-full w-full flex-col border border-white/50 bg-black sm:w-[600px] sm:rounded-xl md:mt-[3vh]">
  //       <button
  //         className="absolute top-4 right-4 rounded-md border border-white/50 px-2"
  //         onClick={() => {
  //           setShowMemberUI(false);
  //         }}
  //       >
  //         x
  //       </button>
  //       <div className="flex w-full flex-col gap-1 p-6">
  //         <p className="text-xl font-[600] text-white">
  //           {isActive === -1
  //             ? "Add new member"
  //             : `Edit member #${isActive + 1}`}
  //         </p>
  //       </div>
  //       <div className="my-1 h-full flex-col overflow-y-auto border-y-[1px] border-white/50 p-6">
  //         <div className="flepux-col flex-col gap-6 rounded-md bg-[#161616] p-4 text-left text-sm">
  //           <p className="text-xs text-white">Name</p>
  //           <Input
  //             style={{
  //               borderRadius: "12px",
  //               borderColor: "rgba(255, 255, 255, 0.5)",
  //             }}
  //             onChange={(e) => setMember({ ...member, name: e.target.value })}
  //             value={member.name}
  //             className="mt-1"
  //             variant="outline"
  //             placeholder="Full name"
  //           />

  //           <p className="mt-4 text-xs text-white">Email</p>
  //           <Input
  //             style={{
  //               borderRadius: "12px",
  //               borderColor: "rgba(255, 255, 255, 0.5)",
  //             }}
  //             onChange={(e) =>
  //               setMember({ ...member, emailId: e.target.value })
  //             }
  //             className="mt-1"
  //             value={member.emailId}
  //             variant="outline"
  //             placeholder="Email address"
  //           />

  //           <p className="mt-4 text-xs text-white">Phone number</p>
  //           <Input
  //             style={{
  //               borderRadius: "12px",
  //               borderColor: "rgba(255, 255, 255, 0.5)",
  //             }}
  //             onChange={(e) =>
  //               setMember({ ...member, phoneNumber: e.target.value })
  //             }
  //             className="mt-1"
  //             value={member.phoneNumber}
  //             variant="outline"
  //             placeholder="Phone number"
  //           />

  //           <p className="mt-4 text-xs text-white">Gender</p>
  //           <Select
  //             style={{
  //               borderRadius: "12px",
  //               borderColor: "rgba(255, 255, 255, 0.5)",
  //             }}
  //             className="mt-1"
  //             variant="outline"
  //             placeholder="Gender"
  //             onChange={(e) =>
  //               setMember({ ...member, gender: e.target.value as Gender })
  //             }
  //             value={member.gender}
  //           >
  //             <option value="MALE">MALE</option>
  //             <option value="FEMALE">FEMALE</option>
  //           </Select>

  //           {/* Team member accomodation */}

  //           <Checkbox
  //             mt={4}
  //             checked={member.isAccomodation}
  //             onChange={(e) =>
  //               setMember({ ...member, isAccomodation: e.target.checked })
  //             }
  //           >
  //             <p className="text-md mt-1 font-semibold text-white">
  //               Need Accomodation for this team member?
  //             </p>
  //           </Checkbox>

  //           {member.isAccomodation && (
  //             <>
  //               <div className="mt-4 w-full">
  //                 <p className="text-xs text-white">Aadhar Card Number</p>
  //                 <Input
  //                   style={{
  //                     borderRadius: "12px",
  //                     borderColor: "rgba(255, 255, 255, 0.5)",
  //                   }}
  //                   onChange={(e) =>
  //                     setMember({ ...member, aadharNumber: e.target.value })
  //                   }
  //                   className="mt-1"
  //                   variant="outline"
  //                   placeholder="12 digits without space"
  //                 />

  //                 <p className="mt-4 text-xs text-white">Check In Date</p>
  //                 <Menu>
  //                   <MenuButton
  //                     as={Button}
  //                     rightIcon={<ChevronDownIcon className="w-full" />}
  //                     backgroundColor={"transparent"}
  //                     fontWeight={"normal"}
  //                     borderRadius={"12px"}
  //                     _hover={{}}
  //                     _active={{}}
  //                     className="mt-1 w-full border border-white/50 pl-4 text-left text-white"
  //                   >
  //                     {member.checkinDate.toDateString()}
  //                   </MenuButton>
  //                   <MenuList backgroundColor={"#000000"}>
  //                     <MenuItem
  //                       backgroundColor={"#000000"}
  //                       onClick={() =>
  //                         setMember({
  //                           ...member,
  //                           checkinDate: new Date("Jan 28, 2023 00:00:00"),
  //                         })
  //                       }
  //                     >
  //                       {new Date("Jan 28, 2023 00:00:00").toDateString()}
  //                     </MenuItem>
  //                     <MenuItem
  //                       backgroundColor={"#000000"}
  //                       onClick={() =>
  //                         setMember({
  //                           ...member,
  //                           checkinDate: new Date("Jan 29, 2023 00:00:00"),
  //                         })
  //                       }
  //                     >
  //                       {new Date("Jan 29, 2023 00:00:00").toDateString()}
  //                     </MenuItem>
  //                   </MenuList>
  //                 </Menu>

  //                 <p className="mt-4 text-xs text-white">Check Out Date</p>
  //                 <Menu>
  //                   <MenuButton
  //                     as={Button}
  //                     rightIcon={<ChevronDownIcon className="w-full" />}
  //                     backgroundColor={"transparent"}
  //                     fontWeight={"normal"}
  //                     borderRadius={"12px"}
  //                     _hover={{}}
  //                     _active={{}}
  //                     className="mt-1 w-full border border-white/50 pl-4 text-left text-white"
  //                   >
  //                     {member.checkoutDate.toDateString()}
  //                   </MenuButton>
  //                   <MenuList backgroundColor={"#000000"}>
  //                     <MenuItem
  //                       backgroundColor={"#000000"}
  //                       onClick={() =>
  //                         setMember({
  //                           ...member,
  //                           checkoutDate: new Date("Jan 29, 2023 00:00:00"),
  //                         })
  //                       }
  //                     >
  //                       {new Date("Jan 29, 2023 00:00:00").toDateString()}
  //                     </MenuItem>
  //                     <MenuItem
  //                       backgroundColor={"#000000"}
  //                       onClick={() =>
  //                         setMember({
  //                           ...member,
  //                           checkoutDate: new Date("Jan 30, 2023 00:00:00"),
  //                         })
  //                       }
  //                     >
  //                       {new Date("Jan 30, 2023 00:00:00").toDateString()}
  //                     </MenuItem>
  //                   </MenuList>
  //                 </Menu>
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //       <div className="flex items-center py-4 px-5">
  //         <button
  //           className="rounded-md border border-white/50 px-6 py-2"
  //           onClick={() => {
  //             setIsActive(-1);
  //             setShowMemberUI(false);
  //           }}
  //         >
  //           <p className="text-sm">Cancel</p>
  //         </button>
  //         <button
  //           className={`ml-2 flex items-center gap-1 rounded-md px-6 py-2`}
  //           onClick={() => {
  //             if (isActive === -1) {
  //               addMember(member);
  //             } else {
  //               editMember(member, isActive);
  //             }

  //             setIsActive(-1);
  //             setShowMemberUI(false);
  //           }}
  //         >
  //           <div className="flex gap-2">
  //             <p className="text-sm">{isActive === -1 ? "Add" : "Edit"}</p>
  //             <ArrowForwardIcon color={"white"} />
  //           </div>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return <></>;
};

export default TeamCheckoutModal;
