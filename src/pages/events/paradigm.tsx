import { type NextPage } from "next";
import Image from "next/image";

import judgeComingSoon from "../../assets/judge-coming-soon.png";
import paradigm from "../../assets/paradigm.png";
import { useCountdown } from "../../utils/countdownHook";
import Layout from "../../components/layout";
import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
const details = [
  {
    title: "Venue",
    content: "G 102, G-Block",
  },
  {
    title: "Amount",
    content: "Free",
  },
  {
    title: "Date",
    content: "27th Jan 2023",
  },
  {
    title: "Participants/Team",
    content: "2-4 Participants",
  },
  {
    title: "Registration Open",
    content: "29th Dec 2023",
  },
  {
    title: "Registration End",
    content: "19th Jan 2023",
  },
  {
    title: "Teams notified via Gmail",
    content: "20th Jan 2023",
  },
];

const prizes = [
  {
    title: "1st Runner Up",
    content: `Monetary prize of 40,000 Rs.
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

const Paradigm: NextPage = () => {
  const time = useCountdown(new Date("Jan 27, 2023 00:00:00").getTime());

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
    <Layout>
      <div className="mt-[70px] flex w-screen flex-col items-center gap-8 p-3 sm:p-6 lg:p-14">
        <Image className="w-full" alt="" src={paradigm} />
        <div className="grid w-full gap-3 sm:gap-6 xl:grid-cols-[40%_27%_30%]">
          <div className="col-span-1 flex h-fit flex-col items-center gap-2 rounded-2xl bg-[#111111] p-4 sm:p-8">
            <h1 className="text-md w-full font-bold sm:text-2xl">
              About the Event
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl">
              The hackathon will be held on the 20th of January, as part of Day
              0 of The E-Summit &apos;23 includes free of cost registrations.
              This event will bring together talented individuals from the
              business-to-business (B2B) sector as well as IT sector
              professionals to come and judge your submissions. An amazing
              opportunity for students to participate and create innovative
              solutions to real-world challenges in the B2B sector. Participants
              will go through a selection round and an on-campus round before
              moving on to the pitching rounds. The winning teams will have the
              chance to take home a prize pool worth up to 5 Lakh rupees.
            </p>
            <Flex flexDir="column" align="center" className="m-2 gap-5 sm:m-6 ">
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
                href="https://drive.google.com/file/d/1_mwH70fsfRTCUFoFFmDR4Qc8cmSROBWz/view?usp=share_link"
                className="w-full whitespace-nowrap rounded-lg border border-white py-2 text-lg"
              >
                Event Details
              </a>
            </Flex>
            <p className="text-xs sm:text-sm">Registration ends in</p>
            <h1 className="text-lg font-bold sm:text-2xl">{time} Days</h1>
          </div>
          <div className="col-span-1 col-start-1 flex flex-col gap-4 xl:col-start-2">
            {prizes.map((prize, index) => (
              <div
                className="flex w-full flex-col items-start gap-3 rounded-2xl bg-[#111111] p-4 sm:p-6"
                key={index}
              >
                <p className="text-lg font-bold text-[#FBC82E]">
                  {prize.title}
                </p>
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
                <p className="sm:text-md text-sm lg:text-lg">
                  {detail.content}
                </p>
              </div>
            ))}
          </div>
          <div className="col-span-1 row-start-4 flex flex-col gap-6 xl:col-span-2 xl:row-start-2">
            <h1 className="text-2xl font-bold">Judges</h1>
            <div className="flex w-full flex-wrap gap-6">
              <Image className="xl:w-1/3" alt="" src={judgeComingSoon} />
              <Image className="xl:w-1/3" alt="" src={judgeComingSoon} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Paradigm;