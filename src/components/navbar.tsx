import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import paymentQr from "../assets/payment_qr.jpg";
import { trpc } from "../utils/trpc";

import {
	ArrowBackIcon,
	ArrowForwardIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	CloseIcon,
	HamburgerIcon
} from "@chakra-ui/icons";
import {
	Avatar,
	Button,
	Input,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList
} from "@chakra-ui/react";

import eSummitLogo from "../assets/e-summit-logo.png";

// Import React FilePond
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const navItems = [
	{
		title: "Home",
		href: "/",
	},
	// {
	//   title: "About Us",
	//   href: "/about",
	// },
	// {
	//   title: "Contact Us",
	//   href: "/contact",
	// },
	{
		title: "Events",
		drop: true,
		dropItems: [
			{
				title: "Startupverse - Shark Tank",
				href: "/events/startupverse",
				hover: "#FBC82E",
			},
			// {
			//   title: "My Story",
			//   href: "/events/my-story",
			// },
			{
				title: "Xcelerate - Ideathon",
				href: "/events/xcelerate",
				hover: "#FF1761",
			},
			{
				title: "Paradigm - Hackathon",
				href: "/events/paradigm",
				hover: "#A705BA",
			},
			// {
			//   title: "StartupXpo",
			//   href: "/events/startupxpo",
			//   hover: "#4B1485",
			// },
		],
	},
	// {
	//   title: "Contact",
	//   href: "/contact",
	// },
	// {
	//   title: "More",
	//   drop: true,
	//   dropItems: [],
	// },
];

const fields = [
	{
		label: "Name",
		placeholder: "Enter your name",
	},
	{
		label: "Email",
		placeholder: "Enter your email",
	},
	{
		label: "Contact",
		placeholder: "Enter your contact number",
	},
	{
		label: "Gender",
		options: ["Select gender", "Male", "Female", "Other"],
	},
	{
		label: "Aadhar Card Number",
		placeholder: "12 digits without space",
	},
	{
		label: "City",
		placeholder: "Enter your city",
	},
	{
		label: "Date of Birth",
		placeholder: "DD/MM/YYYY",
	},
	{
		label: "Check In",
		options: ["28th January", "29th January", "30th January"],
	},
	{
		label: "Check Out",
		options: ["28th January", "29th January", "30th January"],
	},
];

interface NavbarProps {
	page?: string;
}

const Navbar: React.FC<NavbarProps> = ({ page }) => {
	const { data: sessionData } = useSession();
	const ref = useRef<HTMLDivElement>(null);
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [showCart, setShowCart] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [showAccommodation, setShowAccommodation] = useState(false);
	const [showTicket, setShowTicket] = useState(false);
	const [files, setFiles] = useState([]);
	const { data: isSNU } = trpc.checkout.isSNU.useQuery();
	const handleInitialCheckout = trpc.checkout.handleInitialCheckout.useMutation();

	useEffect(() => {
		if (showMobileNav) {
			disableBodyScroll(document.body);
		} else {
			enableBodyScroll(document.body);
		}

		window.addEventListener("scroll", () => {
			if (!ref.current || !ref.current.style) return;

			if (window.scrollY > 1) {
				ref.current.style.padding = "2rem 0";
			} else {
				ref.current.style.padding = "";
			}
		});
	}, [showMobileNav]);

	useEffect(() => {
		if (
			showCart ||
			showConfirm ||
			showAccommodation ||
			showTicket
		) {
			disableBodyScroll(document.body);
		} else {
			enableBodyScroll(document.body);
		}
	}, [showCart, showConfirm, showAccommodation, showTicket]);

	const menu = () => {
		return navItems.map(({ title, href, drop, dropItems }) => {
			return drop ? (
				<div
					className={`text-gray-400 
						${showMobileNav ? "text-3xl" : "text-lg"}
					`}
					key={title}
				>
					{/* blasphemy */}
					<Menu>
						<MenuButton _hover={{ textColor: "white" }}>
							{title}
							{showMobileNav ? (
								<ChevronRightIcon color="white" />
							) : (
								<ChevronDownIcon color="white" />
							)}
						</MenuButton>
						<MenuList textColor="#FFF" borderRadius="0" backgroundColor="black">
							{dropItems.map((dropItem, index) => (
								<Link
									href={dropItem.href}
									key={dropItem.title}
									onClick={() => {
										setShowMobileNav(false);
									}}>
									<MenuItem
										backgroundColor="black"
										_hover={{ backgroundColor: dropItem.hover ?? "" }}
										py="0"
										justifyContent="space-between"
									>
										{dropItem.title}
										<ArrowForwardIcon color="white" />
									</MenuItem>
									{index !== dropItems.length - 1 && <MenuDivider />}
								</Link>
							))}
						</MenuList>
					</Menu>
				</div>
			) : (
				<Link
					href={href ? href : ""}
					key={title}
					onClick={() => {
						setShowMobileNav(false);
					}}>
					<div
						className={` 
							cursor-pointer transition-all duration-300 ease-in-out hover:text-white
							${page === title ? " text-white" : " text-gray-400"}
							${showMobileNav ? "text-3xl" : "text-lg"}
						`}
					>
						{title}
					</div>
				</Link>
			);
		});
	};

	return (
		<nav
			className="fixed top-0 left-0 z-50 flex h-[70px] w-full items-center justify-between backdrop-blur-md lg:px-8 laptop:pt-6"
			ref={ref}
		>
			<Link href="/">
				<div className="">
					<Image
						className="mr-8 object-contain phone:ml-3 phone:w-28"
						height={85}
						alt="E-Summit 2023"
						src={eSummitLogo}
					/>
				</div>
			</Link>
			<div className="flex gap-8 phone:hidden">{menu()}</div>
			<div
				className="flex gap-6 item-center px-8 phone:hidden"
				// style={{ visibility: "hidden" }}
			>
				{sessionData &&
					<button
						className="phone:hidden py-2 px-6 rounded-full text-white font-bold"
						style={{
							background:
								"linear-gradient(90.83deg, #FF1761 0%, #910AB1 98.45%)",
						}}
						onClick={() => setShowTicket(true)}>
						Buy Ticket
					</button>
				}
				{sessionData ? (
					<Menu>
						<MenuButton _hover={{ textColor: "white" }}>
							<Avatar
								size="sm"
								name={sessionData.user?.name ?? ""}
								src={sessionData.user?.image ?? ""}
							/>
						</MenuButton>
						<MenuList textColor="#FFF" borderRadius="0" bgColor="black">
							<Link href="/dashboard">
								<MenuItem bgColor="black" py="0" justifyContent="space-between">
									Edit Profile
								</MenuItem>
								<MenuDivider />
							</Link>
							<MenuItem
								bgColor="black"
								py="0"
								justifyContent="space-between"
								onClick={() => signOut({ callbackUrl: "/" })}
							>
								Sign Out
							</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<div
						className="cursor-pointer rounded-full bg-blue-500 px-7 py-1 text-lg transition-transform duration-300 ease-in-out hover:-translate-y-px"
						onClick={() => signIn("google")}
					>
						Sign in
					</div>
				)}
			</div>
			<div
				className="mr-6 cursor-pointer laptop:hidden"
				onClick={() => setShowMobileNav(true)}
			>
				<HamburgerIcon />
			</div>

			{/* mobile nav */}
			<div
				className={`
					absolute top-0 bottom-0 left-0 right-0 z-40 flex h-screen
					w-full flex-col items-start justify-center gap-16 pb-8 px-12 backdrop-blur-md laptop:hidden
					${showMobileNav ? "" : "invisible"}
				`}
				style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
			>
				<div className="flex flex-col gap-16 flex-grow justify-center">{menu()}</div>
				<div
					className="fixed top-[20px] right-[30px] cursor-pointer text-3xl"
					onClick={() => setShowMobileNav(false)}
				>
					<CloseIcon />
				</div>
				{sessionData &&
					<button
						className="w-full py-2 px-6 rounded-full text-white font-bold"
						style={{
							background:
								"linear-gradient(90.83deg, #FF1761 0%, #910AB1 98.45%)",
						}}
						onClick={() => setShowTicket(true)}>
						Buy Ticket
					</button>
				}
			</div>

			{/* Cart */}
			<div
				className={`
					absolute top-0 bottom-0 left-0 right-0 z-40 h-screen
					w-full backdrop-blur-md flex justify-end
					${showCart ? "" : "invisible"}
				`}
				style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
				<div className="h-screen w-full sm:w-[450px] bg-black flex flex-col justify-start py-6 px-8 gap-6 border-l-[1px] border-white/50">
					<div className="text-3xl w-full flex justify-between items-end">
						<ArrowBackIcon
							boxSize={7}
							cursor={"pointer"}
							onClick={() => {
								setShowCart(false);
								setShowTicket(true);
							}}
						/>
						<CloseIcon
							boxSize={5}
							cursor={"pointer"}	
							onClick={() => {
								setShowCart(false);
							}} />
					</div>
					<h1 className="text-white text-4xl my-4">Checkout</h1>
					<div className="relative flex flex-col w-full h-fit rounded-xl border-2 border-white/50 bg-[#0E0D0D] px-6 pt-4 pb-8 gap-8">
						<div className="flex flex-col w-full">
							<p className="text-white font-[600] text-lg">E-Summit&apos; 23 Ticket</p>
							<p className="text-xs text-white/60 w-5/6 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
						</div>
						<div className="grid grid-cols-[80%_20%] w-full gap-4 text-sm">
							<p>E-Summit&apos; 23 Ticket</p>
							<p>{isSNU ? "600 Rs" : "800 Rs"}</p>
							<div className="col-span-2 bg-white/50 h-[1px] mt-4"></div>
							<p>Total amount</p>
							<p>{isSNU ? "600 Rs" : "800 Rs"}</p>
						</div>
					</div>
					{/* TODO: Add this later */}
					{/* <div className="flex justify-evenly gap-4">
						<button
							className="flex justify-evenly bg-[#0E0D0D] px-4 py-2 rounded-md gap-4"
							onClick={() => {
								setShowCart(false);
								setShowAccommodation(true);
							}}>
							<p>Acommodation</p>
							<div className="bg-[#0085FF] rounded-md w-[25px] h-[25px] flex justify-center items-center">
								<AddIcon boxSize={2} />
							</div>
						</button>
						<div className="flex justify-evenly bg-[#0E0D0D] px-4 py-2 rounded-md gap-4">
							<p>Travel</p>
							<div className="bg-[#0085FF] rounded-md w-[25px] h-[25px] flex justify-center items-center">
								<AddIcon boxSize={2} />
							</div>
						</div>
					</div> */}
					<button
						className="flex justify-center items-center gap-2 w-full py-2 bg-[#0085FF] rounded-md"
						onClick={() => {
							setShowCart(false);
							setShowConfirm(true);
						}}>
						<p className="font-semibold">Pay</p>
						<ArrowForwardIcon boxSize={4} />
					</button>
				</div>
			</div>

			{/* Confirm */}
			<div
				className={`
					absolute top-0 bottom-0 left-0 right-0 z-40 h-screen
					w-full backdrop-blur-md flex justify-end
					${showConfirm ? "" : "invisible"}
				`}
				style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
				<div className="h-screen w-full sm:w-[450px] bg-black flex flex-col justify-start py-6 px-8 gap-6 border-l-[1px] border-white/50 overflow-auto">
					<div className="text-3xl w-full flex justify-between items-end">
						<ArrowBackIcon
							boxSize={7}
							cursor={"pointer"}
							onClick={() => {
								setShowConfirm(false);
								setShowCart(true);
							}}
						/>
						<CloseIcon
							boxSize={5}
							cursor={"pointer"}	
							onClick={() => {
								setShowConfirm(false);
								setFiles([]);
							}} />
					</div>
					<h1 className="text-white text-4xl my-4">Make Payment</h1>
					<Image
						src={paymentQr}
						alt="" />
					<p className="text-center mb-4">
						Harnam Singh Chhabra<br />
						9109782774@paytm <br />
						<a
							className="underline text-blue-500"
							href="https://p.paytm.me/xCTH/kmd08rbm">
							https://p.paytm.me/xCTH/kmd08rbm
						</a>
					</p>
					<h1 className="text-white text-2xl text-center">Amount</h1>
					<h1 className="text-white text-5xl -mt-4 mb-4 text-center">{isSNU ? "600 Rs" : "800 Rs"}</h1>
					<FilePond
						files={files}
						// onupdatefiles={(files) => setFiles(files)}
						onprocessfile={(error, file) => {
							if (!error) {
								setFiles([file]);
							}
						}}
						onremovefile={(error, file) => {
							if (!error) {
								setFiles([]);
							}
						}}
						allowMultiple={false}
						server="/api/checkout/ss-upload"
						name="files"
						labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
					/>
					<button
						disabled={files.length === 0}
						className={`flex justify-center items-center gap-2 w-full py-2 rounded-md
							${files.length === 0 ? "bg-gray-500" : "bg-[#0085FF]"}
						`}
						onClick={() => {
							handleInitialCheckout.mutate();
							if (handleInitialCheckout.isSuccess) {
								setShowConfirm(false);
								setFiles([]);
							}
						}}>
						<p className="font-semibold">Confirm Payment</p>
					</button>
				</div>
			</div>

			{/* Ticket */}
			<div
				className={`
					absolute top-0 bottom-0 left-0 right-0 z-40 h-screen
					w-full backdrop-blur-md flex justify-center items-center
					${showTicket ? "" : "invisible"}
				`}
				style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
				<div className="relative flex flex-col w-full sm:w-[375px] h-full sm:h-[430px] sm:rounded-xl border border-white/50 bg-black z-60">
					<button
						className="absolute top-4 right-4 border border-white/50 rounded-md px-2"
						onClick={() => {
							setShowTicket(false);
						}}>
						x
					</button>
					<div className="flex flex-col w-full p-6 gap-1">
						<p className="text-white font-[600] text-xl">E-Summit&apos; 23 Ticket</p>
						<p className="text-sm text-white/60 w-4/5 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
					</div>
					<div className="h-full flex-col my-1 p-6 border-y-[1px] border-white/50 overflow-auto">
						<div className="bg-[#161616] rounded-md flex flex-col gap-6 text-sm text-center p-4">
							{[...Array(10)].map((_, i) => (
								<p key={i}>Lorem ipsum dolor sit amet, consectetur</p>
							))}
						</div>
					</div>
					<div className="flex py-4 px-5 items-center">
						<p className="w-full text-lg">{isSNU ? "Rs. 600" : "Rs. 800"}</p>
						<button
							className="rounded-md border border-white/50 px-6 py-2"
							onClick={() => {
								setShowTicket(false);
							}}>
							<p className="text-sm">Cancel</p>
						</button>
						<button
							className="flex rounded-md bg-[#0085FF] px-6 py-2 ml-2 items-center gap-1"
							onClick={() => {
								setShowTicket(false);
								setShowCart(true);
							}}>
							<p className="text-sm">Next</p>
							<ArrowForwardIcon color={"white"} />
						</button>
					</div>
				</div>
			</div>

			{/* Accommodation */}
			{showAccommodation && (
				<div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md z-50 flex items-center justify-center">
					<div className="relative flex flex-col w-[800px] h-[550px] rounded-xl border border-white/50 bg-black items-center py-4">
						<button
							className="absolute top-4 right-4 border border-white/50 rounded-md px-2"
							onClick={() => {
								setShowAccommodation(false);
							}}>
							x
						</button>
						<h1 className="text-2xl font-[600] text-center">ACOMMODATION</h1>
						<div className="flex w-full justify-center items-center text-sm p-4">
							<p className="text-white/50">BASIC DETAILS</p>
							<div className="w-1/3 h-[1px] bg-white/20 mx-3" />
							<p className="text-white/50">MEMBERS DETAILS</p>
						</div>
						<div className="grid grid-flow-col grid-cols-2 grid-rows-6 w-full h-[80%] border-t-[1px] border-white/20 p-4 gap-y-12">
							{fields.map((field, i) => (
								<div className="flex flex-col w-5/6 h-min" key={i}>
									<p className="text-xs text-white">{field.label}</p>
									{field.options ? (
										<Menu>
											<MenuButton
												as={Button}
												rightIcon={<ChevronDownIcon className="w-full" />}
												backgroundColor={"transparent"}
												fontWeight={"normal"}
												borderRadius={"12px"}
												_hover={{}}
												_active={{}}
												className="mt-1 border border-white/50 text-white text-left pl-4">
												{field.options[0]}
											</MenuButton>
											<MenuList
												backgroundColor={"#000000"}>
												{field.options.map((option, i) => (
													<MenuItem
														backgroundColor={"#000000"}
														key={i}>{option}</MenuItem>
												))}
											</MenuList>
										</Menu>
									) : (
										<Input
											style={{
												borderRadius: "12px",
												borderColor: "rgba(255, 255, 255, 0.5)",
											}}
											className="mt-1"
											variant="outline"
											placeholder={field.placeholder}
										/>
									)}
								</div>
							))}
						</div>
						<div className="absolute bottom-0 right-0 flex w-1/2 py-4 px-5 justify-center">
							<button className="rounded-md border border-white/50 px-6 py-2">
								<p className="text-sm">Cancel</p>
							</button>
							<button className="flex rounded-md bg-[#0085FF] px-6 py-2 ml-2 items-center gap-1">
								<p className="text-sm">Next</p>
								<ArrowForwardIcon color={"white"} />
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
