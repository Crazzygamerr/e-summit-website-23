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
              <p className="text-1">FOLLOW US</p>
              <Link href="https://www.instagram.com/esummit.snu/">
                <InstagramLogo size={50} />
              </Link>
              <Link href="https://www.linkedin.com/company/esummit-snu/">
                <LinkedinLogo size={50} />
              </Link>
              <Link href="esummit@snu.edu.in">
                <Envelope size={50} />
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-5 whitespace-nowrap">
            <p className="text-white/50">Learn More About E-SUMMIT&#39;23</p>
            <div className="flex flex-wrap gap-6">
              <a>BLOG</a>
              <a>ABOUT</a>
              <a>PRIVACY POLICY</a>
              <a>TERMS & CONDITIONS </a>
              <a>CONTACT US</a>
              <a>REFUND POLICY</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
