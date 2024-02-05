import Image from "next/image";
import Link from "next/link";
import { Envelope, InstagramLogo, LinkedinLogo } from "phosphor-react";
import logo from "../assets/e-summit-logo.png";
const Footer: React.FC = () => {
  return (
    <footer className="flex h-fit w-full justify-between p-12 sm:p-24">
      <div className="flex w-full flex-col gap-5 text-sm">
        <Image className="-m-7" draggable={false} alt="" src={logo} />
        <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-start gap-8">
              <Link href="https://www.instagram.com/esummit.snu/">
                <InstagramLogo size={30} />
              </Link>
              <Link href="https://www.linkedin.com/company/esummit-snu/">
                <LinkedinLogo size={30} />
              </Link>
              <Link href="mailto:esummit@snu.edu.in">
                <Envelope size={30} />
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-gray-400">
              <a href="tel:+918249090228">+91 8249090228</a>
              <a href="tel:+919911051532">+91 9911051532</a>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-5 whitespace-nowrap">
            <p className="text-white/50">Learn more about E-Summit &#39;23</p>
            <div className="flex flex-wrap gap-6">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/esummit.snu/"
              >
                CONTACT US
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.google.com/document/d/e/2PACX-1vQ_zpZ7CN8gf0peRO2g7XfP54RXtpoHiJPPddtT3JGQ5wBcgrZKpIhjT-NjdWRwlIfE8_E77nUHe_63/pub"
              >
                TERMS & CONDITIONS
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.google.com/document/d/e/2PACX-1vQsCKc5p4oi6Eh59L8J1BXQsiNisZ9BfuYV-VN7ts8AgzqnzyiDQGLrAny0QXI34FHhtloZKfzubL4n/pub"
              >
                PRIVACY POLICY
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.google.com/document/d/e/2PACX-1vSGtBGlRVMRPAVsDuqD1IjMDmRRhifk5GwAdIhNmXw7GIs7QhbOIsbFMmoT9iNeabxs4IR5gXYXPL85/pub"
              >
                REFUND POLICY
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
