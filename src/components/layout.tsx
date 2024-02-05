import { type ReactNode } from "react";
import Head from "next/head";

import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title
            ? `${title} | E-Summit Shiv Nadar University 2023`
            : "E-Summit Shiv Nadar University 2023"}
        </title>
        <meta
          name="description"
          content="Official website for E-Cell's annual event, E-Summit 2023"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar page={title} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
