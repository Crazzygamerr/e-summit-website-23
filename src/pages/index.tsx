import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { type NextPage } from "next";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";
import blueEllipse from "../assets/blue-ellipse.svg";
import blueEllipse1 from "../assets/blue-ellipse1.svg";
import blueUniverse from "../assets/blue-universe.png";
import ideathon from "../assets/ideathon.svg";
import imagination from "../assets/imagination.png";
import innovation from "../assets/innovation.png";
import paradigm from "../assets/paradigm.svg";
import playButton from "../assets/play-button.png";
import redEllipse from "../assets/red-ellipse.svg";
import redEllipse1 from "../assets/red-ellipse1.svg";
import redEllipse2 from "../assets/red-ellipse2.svg";
import splashImgLeftUni from "../assets/splash-left-universe.png";
import splashImgRightUni from "../assets/splash-right-universe.png";
import splashImg from "../assets/splash.png";
import startupexpo from "../assets/startupexpo.svg";
import startupverse from "../assets/startupverse.svg";
import universe from "../assets/universe.svg";
import videoThumbnail from "../assets/video-thumbnail.png";

import RegBox from "../components/reg-box";

// Add this to every page to protect from users who haven't filled the form
// export { default as getServerSideProps } from "../lib/serverProps";

import Countdown from "../components/countdown";

const Home: NextPage = () => {
	const [video, setVideo] = useState(false);
	const data = [
		[startupverse, redEllipse2, "/events/startupverse"],
		[paradigm, redEllipse1, "/events/paradigm"],
		[ideathon, blueEllipse, "/events/ideathon"],
		[startupexpo, blueEllipse1, "/events/startupexpo"],
	];
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
	});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const controls = useAnimation();
	const videoRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: videoRef,
		offset: ["center end", "center start"],
	});
	const [md, setMd] = useState(false);

	useEffect(() => {
		if (emblaApi) {
			console.log(emblaApi?.selectedScrollSnap());
			const interval = setInterval(() => {
				emblaApi.scrollPrev();
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [emblaApi]);
	useEffect(() => {
		if (video) {
			if (videoRef.current) {
				videoRef.current.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
			setTimeout(() => {
				if (videoRef.current) {
					videoRef.current.scrollIntoView({ block: "center" });
				}
				disableBodyScroll(videoRef.current);
			}, 800);
		} else {
			enableBodyScroll(videoRef.current);
		}
	}, [video]);

	useEffect(() => {
		if (!emblaApi) return

		emblaApi.on('pointerDown', () => {
			setSelectedIndex(-1);
		});
		emblaApi.on('pointerUp', () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		});
		emblaApi.on('select', () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		});
	}, [emblaApi, setSelectedIndex]);

	useEffect(() => {
		const resize = () => {
			if (window.innerWidth >= 768) {
				setMd(true);
			} else {
				setMd(false);
			}
		}

		resize();
		window.addEventListener("resize", () => resize());
	}, [controls]);

	return (
		<div className="flex w-full flex-col items-center mt-[70px]">
			<div className="relative flex w-full items-center justify-center h-screen">
				<Image
					className="absolute left-[-5%] md:left-0 my-auto -z-30 w-1/2 md:w-auto md:h-[125%] select-none object-contain object-left"
					draggable={false}
					alt=""
					src={splashImgLeftUni}
				/>
				<div className="flex h-full w-full select-none flex-col items-center justify-center">
					<Image
						className="-ml-[8%] mt-[0%] w-full md:ml-0 md:w-3/4"
						draggable={false}
						alt=""
						src={splashImg}
					/>
					<RegBox />
					<div className="mt-6 flex flex-col items-center gap-2 md:mt-12">
						<Countdown
							initialTime={new Date("Jan 20, 2023 00:00:00").getTime()}
							isLarge={true}
						/>
						<h1 className="text-lg font-thin sm:text-3xl md:text-4xl">DAYS TO GO</h1>
					</div>
				</div>
				<Image
					className="absolute right-[-5%] md:right-0 my-auto -z-30 w-1/2 md:w-auto md:h-[125%] select-none object-contain object-right"
					draggable={false}
					alt=""
					src={splashImgRightUni}
				/>
			</div>
			<Image
				className="absolute right-0 left-0 top-[70vh] sm:top-[50vh] mx-auto -z-20 w-full sm:w-[750px] rotate-180 object-contain mix-blend-lighten"
				draggable={false}
				alt=""
				src={blueUniverse}
			/>
			<div className="relative flex h-[85vh] sm:h-screen w-full flex-col items-center justify-center overflow-visible overflow-x-clip">
				{video && (
					<button
						className="fixed top-0 left-0 z-50 h-full w-full backdrop-blur-lg"
						onClick={() => {
							setVideo(false);
						}}
					/>
				)}
				<div className="relative sm:w-[60%]">
					<motion.p
						className="absolute z-10 top-[-20%] lg:top-[-30%] left-1 sm:left-[-30%] w-fit text-left text-[8px] md:text-center md:text-xs lg:text-base"
						style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
					>
						The E-Summit is the flagship event of E-Cell, which provides a <br />
						platform to listen to and connect with industry stalwarts, new <br />
						entrepreneurs, and provides a platform to try, fail, learn and test <br />
						out your ideas in front of a huge audience.
					</motion.p>
					<motion.div
						className="absolute top-[-25%] -right-[150%] -z-10 w-[190%]"
						style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]) }}
					>
						<Image
							className="w-full object-contain"
							draggable={false}
							alt=""
							src={imagination}
						/>
					</motion.div>
					<div
						className="relative mx-4 overflow-hidden rounded-2xl md:rounded-[50px]"
						ref={videoRef}
						style={{
							transform: video && md ? "scale(1.5)" : "scale(1)",
							transition: "transform 0.8s",
							zIndex: video ? 100 : 0,
						}}
					>
						<button
							onClick={() => {
								setVideo((v: boolean) => !v);
							}}
						>
							<Image
								className="w-full object-contain"
								draggable={false}
								alt=""
								src={videoThumbnail}
							/>
							<div className="absolute bottom-0 left-0 h-1/6 w-full bg-gradient-to-t from-black to-transparent" />
							<Image
								className="absolute bottom-0 left-0 w-1/5"
								draggable={false}
								alt=""
								src={playButton}
							/>
							{video && (
								<iframe
									className="absolute top-0 left-0 h-full w-full"
									src="https://www.youtube.com/embed/pR0sQaWS5oc?autoplay=1"
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
									allowFullScreen
								/>
							)}
						</button>
					</div>
					<motion.p
						className="absolute z-10 bottom-[-20%] lg:bottom-[-30%] right-1 sm:right-[-30%] w-fit text-right text-[8px] md:text-center md:text-xs lg:text-base"
						style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]) }}
					>
						The E-Summit covers four broad verticals, namely, <br />
						Med-Tech, Meta, Social Media and Electric Mobility. We <br />
						strongly believe that these four are the pillars for the<br />
						growth of entrepreneurship in the near
						future.
					</motion.p>
					<motion.div
						className="absolute bottom-[-25%] -left-[150%] -z-10 w-[190%]"
						style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "75%"]) }}
					>
						<Image
							className="w-full object-contain"
							draggable={false}
							alt=""
							src={innovation}
						/>
					</motion.div>
				</div>
			</div>
			<Image
				className="absolute right-0 left-0 top-[160vh] sm:top-[150vh] mx-auto -z-20 w-full sm:w-[750px] rotate-180 object-contain mix-blend-lighten"
				draggable={false}
				alt=""
				src={blueUniverse}
			/>
			<div className="relative flex h-screen w-full flex-col items-center justify-center md:gap-[20px]">
				<p className="text-center text-[1.5rem] text-white md:text-[50px]">
					Become the part of
					<br /> these amazing <b>Events</b>
				</p>
				<Image
					className="-top-1/6 absolute -z-10 h-full w-1/2 object-contain"
					draggable={false}
					alt=""
					src={universe}
				/>
				<Image
					className="-top-1/6 absolute -z-10 h-[125%] w-full object-contain"
					draggable={false}
					alt=""
					src={redEllipse}
				/>
				<div className="w-full overflow-hidden" ref={emblaRef}>
					<div className="embla__container flex h-[170px] items-center md:h-[400px]">
						{data.map((data_item, index) => (
							<a key={index} href={data_item[2]} rel="noreferrer">
								<div
									className={`relative flex aspect-video h-[125px] shrink-0 grow-0 items-end overflow-hidden rounded-md bg-black md:h-[300px]
											${selectedIndex === index ? "z-10 animate-scale" : "blur-sm"}
										`}
								>
									<Image
										className="absolute bottom-0 h-[100%]"
										draggable={false}
										alt=""
										src={data_item[0]}
									/>
								</div>
							</a>
						))}
					</div>
				</div>
				{/* create navigation 4 buttons select index */}
				<div className="my-10 flex w-full justify-center gap-6">
					{data.map((_, index) => (
						<div
							className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ease-in-out
								${index === selectedIndex % data.length ? "scale-150 bg-white" : "bg-white/40"}
							`}
							key={index}
							onClick={() =>
								emblaApi?.scrollTo(
									emblaApi?.selectedScrollSnap() +
									(index - (selectedIndex % data.length))
								)
							}
						/>
					))}
				</div>
			</div>
			{/* <div className="relative mx-auto  my-8 hidden h-fit w-3/4 rounded-3xl bg-gradient-to-r from-white to-white/0 p-[1px] sm:block">
          <div className="flex flex-col items-center rounded-3xl bg-black pt-5">
            <Image
              className="absolute top-0 m-5 w-[95%] object-contain"
              draggable={false}
              alt=""
              src={cornerBorder}
            />
            <Image
              className="m-5 w-[60%] object-contain"
              draggable={false}
              alt=""
              src={spons}
            />
          </div>
        </div> */}
		</div>
	);
};

export default Home;
