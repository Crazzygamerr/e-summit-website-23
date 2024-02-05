import { type NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { type GetServerSidePropsContext } from "next";
import { prisma } from "../server/db/client";
import QRCode from "react-qr-code";
import { useSession, signIn } from "next-auth/react";
import { Role } from "@prisma/client";
import { useState, useEffect } from "react";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (session) {
    const email = session.user?.email;
    const user = await prisma.user.findFirst({ where: { email } });

		if (user?.role === Role.USER) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}
  }

  return {
		props: {
			user: session,
		},
  };
}

const Dashboard: NextPage = () => {
	const user = useSession();
	
  return (
    <div className="h-[80vh] p-[100px] items-center justify-start flex flex-col gap-10">
			<div className="text-4xl sm:text-5xl whitespace-nowrap">QR Code</div>
			{user.data?.user?.id ? (
				<QRCode
					id="QRCode"
					value={user.data?.user?.id ?? ""}
					bgColor="#000000"
					fgColor="#ffffff"
					style={{
						borderRadius: "4px",
					}}
					size={218}
				/>
			) : (
				<div className="text-xl whitespace-nowrap">
					Loading...
				</div>
			)}
			<button
				className="bg-blue-500 text-white font-bold text-md sm:text-xl rounded-full py-2 px-6 cursor-pointer whitespace-nowrap"
				style={{
					textAlign: "center",
					background:
						"linear-gradient(90.83deg, #FF1761 0%, #910AB1 98.45%)",
				}}
				onClick={() => {
					const svg = document.getElementById("QRCode");
					if(!svg) return;
					const svgData = new XMLSerializer().serializeToString(svg);
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");
					if(!ctx) return;
					const img = new Image();
					img.onload = () => {
						canvas.width = img.width;
						canvas.height = img.height;
						ctx.drawImage(img, 0, 0);
						const pngFile = canvas.toDataURL("image/png");
						const downloadLink = document.createElement("a");
						downloadLink.download = `${user.data?.user?.name} QR Code`;
						downloadLink.href = `${pngFile}`;
						downloadLink.click();
					};
					img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
				}}
			>
				Download QR
			</button>
    </div>
  );
};

export default Dashboard;
