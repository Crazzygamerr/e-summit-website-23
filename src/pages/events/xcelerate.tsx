import { type NextPage } from "next";
import Image from "next/image";

import judgeComingSoon from "../../assets/judge-coming-soon.png";
import paradigm from "../../assets/xcelerate.png";
import { useCountdown } from "../../utils/countdownHook";
import Layout from "../../components/layout";

const Xcelerate: NextPage = () => {
  const time = useCountdown(new Date("Jan 27, 2023 00:00:00").getTime());

  const details = [
    {
      title: "Venue",
      content: "G-Block",
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
    {
      title: "Registration End",
      content: "17th Jan 2023",
    },
    {
      title: "Teams notified via Gmail",
      content: "20th Jan 2023",
    },
  ];

  const prizes = [
    {
      title: "1st Runner Up",
      content: `TBA
2nd day access pass to the E-Summit
Free E-Summit clothing apparel
Goodies, swags and free subscriptions from a multitude of companies`,
    },
    {
      title: "2nd Runner Up",
      content: `TBA
2nd day access pass to the E-Summit
Free E-Summit clothing apparel
Goodies, swags and free subscriptions from a multitude of companies`,
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

  return (
    <div className="mt-[70px] flex w-screen flex-col items-center gap-8 p-3 sm:p-6 lg:p-14">
       <Image className="w-full" alt="" src={paradigm} />
       <div className="grid w-full gap-3 sm:gap-6 xl:grid-cols-[40%_27%_30%]">
         <div className="col-span-1 flex h-fit flex-col items-center gap-2 rounded-2xl bg-[#111111] p-4 sm:p-8">
           <h1 className="text-md w-full font-bold sm:text-2xl">
             About the Event
           </h1>
           <p className="text-sm sm:text-lg lg:text-xl">
             Xcelerate is E-Summit, Shiv Nadar University&apos;s first ever
             ideathon. Four amazing themes to choose from, form a group of upto
             4 people and make the best B-Plan you can. Head over to Unstop to
             learn more about this event. 24 hours. Only the best minds. 3
             lakhs at stake. Grab your piece of the pie.
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
               href="https://unstop.com/competition/xcelerate-ideathon-e-summit-2023-imagination-to-innovation-shiv-nadar-university-snu-greater-noida-573352"
             >
               Register
             </a>
             <a
               style={{
                 textAlign: "center",
               }}
               // make external link
               target="_blank"
               rel="noreferrer"
               href="https://docs.google.com/document/d/1MWEqS8EQmp4_VbvyOsi1Dd1CD1YozH9LnZK9Yc2Xa60/edit#heading=h.kojhve4sod2q"
               className="w-full whitespace-nowrap rounded-lg border border-white py-2 text-lg"
             >
               Event Details
             </a>
           </div>
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
  );
};

export default Xcelerate;
