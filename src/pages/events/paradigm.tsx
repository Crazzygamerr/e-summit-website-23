import { type NextPage } from "next";
import Image from "next/image";

import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import judgeComingSoon from "../../assets/judge-coming-soon.png";
import paradigm from "../../assets/paradigm.png";
import Layout from "../../components/layout";
import { useCountdown } from "../../utils/countdownHook";
const details = [
  {
    title: "Venue",
    content: "Shiv Nadar University",
  },
  {
    title: "Amount",
    content: "Free",
  },
  {
    title: "Date",
    content: "27th - 28th Jan 2023",
  },
  {
    title: "Participants/Team",
    content: "2-4 Participants",
  },
  {
    title: "Registration Open",
    content: "29th Dec 2022",
  },
  // {
  //   title: "Registration End",
  //   content: "17th Jan 2023",
  // },
  // {
  //   title: "Teams notified via Gmail",
  //   content: "20th Jan 2023",
  // },
];

const prizes = [
  {
    title: "1st Runner Up",
    content: `TBA
2nd day access pass to the E-Summit
Free E-Summit clothing apparel
Meet with investors
Pitch to sharks during the startup verse event`,
  },
  {
    title: "2nd Runner Up",
    content: `TBA
Free E-Summit clothing apparel
Meet with investors
2nd day access pass to the E-Summit`,
  },
  {
    title: "3rd Runner Up",
    content: `TBA
2nd day access pass to the E-Summit`,
  },
  {
    title: "Participation",
    content: `2nd day access pass to the E-Summit`,
  },
];

const Paradigm: NextPage = () => {
  const time = useCountdown(new Date("Jan 27, 2023 12:00:00").getTime());

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="mt-[70px] flex w-screen flex-col items-center gap-8 p-3 sm:p-6 lg:p-14">
      <Image className="w-full" alt="" src={paradigm} />
      <div className="grid w-full gap-3 sm:gap-6 xl:grid-cols-[40%_27%_30%]">
        <div className="col-span-1 flex h-fit flex-col items-center gap-2 rounded-2xl bg-[#111111] p-4 sm:p-8">
          <h1 className="text-md w-full font-bold sm:text-2xl">
            About the Event
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl">
            24 hours. Real Problems. The best minds. 300 acres. Big prizes.
            Think you can you make it? E-Summit 2023 at Shiv Nadar University
            brings to you an opportunity to take part in a hackathon that gives
            you a chance to work on real world problems and win from a prize
            pool of 3 lakhs. Beginner? No problem, we&apos;re welcome to all.
            It&apos;s time to hack. It&apos;s time to build.
          </p>
          <div className="m-2 flex w-full flex-col justify-between gap-5 sm:m-6 md:flex-row md:gap-10 md:px-4">
            <a
              className="w-full rounded-lg py-2 text-lg"
              style={{
                textAlign: "center",
                background:
                  "linear-gradient(90.83deg, #FF1761 0%, #910AB1 98.45%)",
              }}
              target="_blank"
              rel="noreferrer"
              href="https://unstop.com/hackathon/paradigm-shiv-nadar-university-e-summit-2023-imagination-to-innovation-shiv-nadar-university-snu-greater-noida-572198"
            >
              Register
            </a>
            {/* <div
               className="apply-button"
               data-hackathon-slug="YOUR-HACKATHON-SLUG"
               data-button-theme="light"
               style={{ height: "44px", width: "100px" }}
             /> */}
            <a
              style={{
                textAlign: "center",
                padding: "0.5rem 1rem",
              }}
              target="_blank"
              rel="noreferrer"
              href="https://drive.google.com/file/d/1sSXAHescN0GgN-PTztuLlJVxCZTIXbPM/view?usp=share_link"
              className="w-full whitespace-nowrap rounded-lg border border-white py-2 text-lg"
            >
              Event Details
            </a>
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://drive.google.com/drive/folders/1yopnCBboPkJJAFVwxAkXhg0Tm5LJH0_3?usp=sharing"
            className="w-full whitespace-nowrap rounded-lg border py-2 text-center text-lg sm:w-[95%]"
          >
            Problem Statement
          </a>
          <p className="text-xs sm:text-sm">Registration ends in</p>
          <h1 className="text-lg font-bold sm:text-2xl">{time} Days</h1>
        </div>
        <div className="col-span-1 col-start-1 flex flex-col gap-4 xl:col-start-2">
          {prizes.map((prize, index) => (
            <div
              className="flex w-full flex-col items-start gap-3 rounded-2xl bg-[#111111] p-4 sm:p-6"
              key={index}
            >
              <p className="text-lg font-bold text-[#FBC82E]">{prize.title}</p>
              <ul className="text-md list-inside list-disc whitespace-pre-wrap">
                {prize.content.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className=" col-span-1 col-start-1 row-start-2 grid grid-cols-2 items-center gap-4 self-start
					rounded-2xl bg-[#111111] p-6 sm:sticky sm:top-[80px] sm:grid-cols-3 md:col-start-2 md:row-start-1 md:grid-cols-1 lg:h-fit lg:grid-cols-2 xl:col-start-3
				"
        >
          {details.map((detail, index) => (
            <div className="flex flex-col gap-1" key={index}>
              <p className="sm:text-md whitespace-nowrap text-xs text-white/50">
                {detail.title}
              </p>
              <p className="sm:text-md text-sm lg:text-lg">{detail.content}</p>
            </div>
          ))}
        </div>
        {/* <div className="col-span-1 row-start-4 flex flex-col gap-6 xl:col-span-2 xl:row-start-2">
          <h1 className="text-2xl font-bold">Judges</h1>
          <div className="flex w-full flex-wrap gap-6">
            <Image className="xl:w-1/3" alt="" src={judgeComingSoon} />
            <Image className="xl:w-1/3" alt="" src={judgeComingSoon} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Paradigm;
