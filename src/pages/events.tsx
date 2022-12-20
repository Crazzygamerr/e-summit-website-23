import { useState, useEffect } from "react";
import { type NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";

import paradigm from "../assets/paradigm.png";
import judgeComingSoon from "../assets/judge-coming-soon.png";

const Events: NextPage = () => {
	// countdown timer with days : hours : minutes : seconds
	const [time, setTime] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	const eventDate = new Date("Jan 20, 2021 00:00:00").getTime();
	
	const timer = () => {
		const now = new Date().getTime();
		const distance = eventDate - now;
		
		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		setTime({
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds
		});
	}
	
	useEffect(() => {
		setInterval(timer, 1000);
	}, []);
	
	const details = [
		{
			title: "Venue",
			content: "G 102, G-Block"
		},
		{
			title: "Amount",
			content: "Free"
		},
		{
			title: "Date",
			content: "20th Jan 2023"
		},
		{
			title: "Participants/Team",
			content: "2-4 Participants"
		},
		{
			title: "Registration Open",
			content: "20th Dec 2023"
		},
		{
			title: "Submission Ends",
			content: "20th Jan 2023"
		},
		{
			title: "Teams notified via Gmail",
			content: "20th Jan 2023"
		},			
	];
	
	const prizes = [
		{
			title: "1st Runner Up",
			content: `Electric Scooter (bounce infinity) worth 60,000 Rs, provided by bounce infinity along with a test drive on campus
Monetary prize of 40,000 Rs.
2nd day access pass to the E-Summit
Free E-Summit clothing apparel
Meet with investors
Pitch to sharks during the startup verse event`,
		},
		{
			title: "2nd Runner Up",
			content: `Monetary prize of 25,000 Rs.
Free E-Summit clothing apparel
Meet with investors
2nd day access pass to the E-Summit`,
		},
		{
			title: "3rd Runner Up",
			content: `Monetary prize of 10,000
2nd day access pass to the E-Summit`,
		},
		{
			title: "Participation",
			content: `2nd day access pass to the E-Summit`,
		},
	];
	
	return (
		<Layout>
			<div className="flex flex-col w-screen items-center p-14 gap-4">
				<Image className="w-full" alt="" src={paradigm} />
				<div className="flex flex-wrap w-full gap-6">
					<div className="flex flex-col w-2/5 h-fit bg-[#111111] rounded-2xl p-8 gap-2 items-center">
						<h1 className="w-full text-2xl font-bold">About the Event</h1>
						<p className="text-xl">
							The hackathon will be held on the 20th of January, as part of Day 0 of The E-Summit &apos;23 includes free of cost registrations. This event will bring together talented individuals from the business-to-business (B2B) sector as well as IT sector professionals to come and judge your submissions. An amazing opportunity for students to participate and create innovative solutions to real-world challenges in the B2B sector. Participants will go through a selection round and an on-campus round before moving on to the pitching rounds. The winning teams will have the chance to take home a prize pool worth up to 1.6 Lakh rupees.
						</p>
						<div className="w-full flex justify-between gap-10 px-4 m-6">
							<button
								className="w-full py-2 rounded-lg text-lg"
								style={{
									background: 'linear-gradient(90.83deg, #FF1761 0%, #910AB1 98.45%)'
								}}
							>
								Register
							</button>
							<button
								className="w-full py-2 rounded-lg border border-white whitespace-nowrap text-lg">
								Event Details
							</button>
						</div>
						<p className="text-sm">Registration ends in</p>
					</div>
					<div className="grid grid-cols-2 h-min w-1/4 bg-[#111111] rounded-2xl px-10 py-6 gap-4 items-center">
						{details.map((detail, index) => (
							<div className="flex flex-col gap-1" key={index}>
								<p className="text-md text-white/50 whitespace-nowrap">{detail.title}</p>
								<p className="text-lg">{detail.content}</p>
							</div>
						))}
					</div>
					<div className="flex flex-col gap-4 w-1/4">
						{prizes.map((prize, index) => (
							<div className="w-full flex flex-col bg-[#111111] rounded-2xl p-6 gap-3 items-start" key={index}>
								<p className="text-lg font-bold text-[#FBC82E]">{prize.title}</p>
								<p className="text-md whitespace-pre-wrap">{prize.content}</p>
							</div>
						))}
					</div>
					<div className="flex flex-col gap-6">
						<h1 className="text-2xl font-bold">Judges</h1>
						<div className="flex gap-6 w-full">
							<Image className="w-1/3" alt="" src={judgeComingSoon} />
							<Image className="w-1/3" alt="" src={judgeComingSoon} />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Events;