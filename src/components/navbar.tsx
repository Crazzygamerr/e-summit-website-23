import { useEffect, useState, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HamburgerIcon,
  CloseIcon,
  ArrowForwardIcon,
	ArrowBackIcon,
	AddIcon,
} from "@chakra-ui/icons";

import eSummitLogo from "../assets/e-summit-logo.png";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "Events",
    drop: true,
    dropItems: [
      {
        title: "Startupverse",
        href: "/events/startupverse",
        hover: "#FBC82E",
      },
      // {
      //   title: "My Story",
      //   href: "/events/my-story",
      // },
      {
        title: "Xcelerate - Ideation",
        href: "/events/xcelerate",
        hover: "#FF1761",
      },
      {
        title: "Paradigm - Hackathon",
        href: "/events/paradigm",
        hover: "#A705BA",
      },
      {
        title: "StartupXpo",
        href: "/events/startupxpo",
        hover: "#4B1485",
      },
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

interface NavbarProps {
  page?: string;
}

const Navbar: React.FC<NavbarProps> = ({ page }) => {
  const { data: sessionData } = useSession();
  const ref = useRef<HTMLDivElement>(null);
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [showCart, setShowCart] = useState(false);

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
        className="item-center flex px-8 phone:hidden"
        style={{ visibility: "hidden" }}
      >
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
					w-full flex-col items-start justify-center gap-16 pl-12 backdrop-blur-md laptop:hidden
					${showMobileNav ? "" : "invisible"}
				`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        {menu()}
        <div
          className="fixed top-[20px] right-[30px] cursor-pointer text-3xl"
          onClick={() => setShowMobileNav(false)}
        >
          <CloseIcon />
        </div>
			</div>
			
			{/* Cart */}
			<div
        className={`
					absolute top-0 bottom-0 left-0 right-0 z-40 h-screen
					w-full backdrop-blur-md flex justify-end
					${showCart ? "" : "invisible"}
				`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        <div
          className="fixed top-[20px] right-[30px] cursor-pointer text-3xl"
					onClick={() => setShowCart(false)}>
          <CloseIcon boxSize={5} />
				</div>
				<div className="h-screen w-[450px] bg-black flex flex-col justify-start pt-28 px-8 gap-6 border-l-[1px] border-white/50">
					<h1 className="text-white text-4xl mb-4">Checkout</h1>
					<div className="relative flex flex-col w-full h-fit rounded-xl border-2 border-white/50 bg-[#0E0D0D] px-6 pt-4 pb-8 gap-8">
						<div className="flex flex-col w-full">
							<p className="text-white font-[600] text-lg">E-Summit&apos; 23 Ticket</p>
							<p className="text-xs text-white/60 w-5/6 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
						</div>
						<div className="grid grid-cols-[80%_20%] w-full gap-4 text-sm">
							<p>E-Summit&apos; 23 Ticket</p>
							<p>600 Rs</p>
							<div className="col-span-2 bg-white/50 h-[1px] mt-4"></div>
							<p>Total amount</p>
							<p>600 Rs</p>
						</div>
					</div>
					<div className="flex justify-evenly gap-4">
						<div className="flex justify-evenly bg-[#0E0D0D] px-4 py-2 rounded-md gap-4">
							<p>Acommodation</p>
							<div className="bg-[#0085FF] rounded-md w-[25px] h-[25px] flex justify-center items-center">
								<AddIcon boxSize={2} />
							</div>
						</div>
						<div className="flex justify-evenly bg-[#0E0D0D] px-4 py-2 rounded-md gap-4">
							<p>Travel</p>
							<div className="bg-[#0085FF] rounded-md w-[25px] h-[25px] flex justify-center items-center">
								<AddIcon boxSize={2} />
							</div>
						</div>
					</div>
					<div className="flex justify-center items-center gap-2 w-full py-2 bg-[#0085FF] rounded-md">
						<p className="font-semibold">Pay</p>
						<ArrowForwardIcon boxSize={4} />
					</div>
				</div>
			</div>
    </nav>
  );
};

export default Navbar;
