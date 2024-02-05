import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

import { Event, Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const teamLeaders: Record<string, Role> = {
  "prathu.agg@gmail.com": Role.HACKATHON,
  "somesh.kar@gmail.com": Role.HACKATHON,
  "vj284@snu.edu.in": Role.HACKATHON,
  "ansarialan31@gmail.com": Role.HACKATHON,
  "amanuniquecoder@gmail.com": Role.HACKATHON,
  "sb875@snu.edu.in": Role.HACKATHON,
  "harveer.2125ec1067@kiet.edu": Role.HACKATHON,
  "harshdhariwal29@gmail.com": Role.HACKATHON,
  "ishan22052003@gmail.com": Role.HACKATHON,
  "faraziqbal2001@gmail.com": Role.HACKATHON,
  "khushboojoshi2017@gmail.com": Role.HACKATHON,
  "shivang260279@gmail.com": Role.HACKATHON,
  "abheytyagi010@gmail.com": Role.HACKATHON,
  "shubhchaudhary1203@gmail.com": Role.HACKATHON,
  "vaidicdodwani@gmail.com": Role.HACKATHON,
  "harshraj2717@gmail.com": Role.HACKATHON,
  "anni.agg2003@gmail.com": Role.HACKATHON,
  "jaswant2111058@akgec.ac.in": Role.HACKATHON,
  "arnav.amma@gmail.com": Role.HACKATHON,
  "chandan.ug21@nsut.ac.in": Role.HACKATHON,
  "namangautama29@gmail.com": Role.HACKATHON,
  "anshumannandan2003@gmail.com": Role.HACKATHON,
  "aa373@snu.edu.in": Role.HACKATHON,
  "himanshitripathi14@gmail.com": Role.HACKATHON,
  "sambhrantt@gmail.com": Role.HACKATHON,
  "mandalamit325@gmail.com": Role.HACKATHON,
  "bhoomikasaxena12@gmail.com": Role.HACKATHON,
  "shivam20406@iiitd.ac.in": Role.HACKATHON,
  "anurag.2125csit1174@kiet.edu": Role.HACKATHON,
  "hg09032@gmail.com": Role.HACKATHON,
  "sforshivansh@gmail.com": Role.HACKATHON,
  "ct765@snu.edu.in": Role.HACKATHON,
  "hs172@snu.edu.in": Role.HACKATHON,
  "717821i250@kce.ac.in": Role.IDEATHON,
  "sahilchowdhary5@gmail.com": Role.IDEATHON,
  "rs418@snu.edu.in": Role.IDEATHON,
  "manish123hello@gmail.com": Role.IDEATHON,
  "ta340@snu.edu.in": Role.IDEATHON,
  "ks367@snu.edu.in": Role.IDEATHON,
  "ashwath5769@gmail.com": Role.IDEATHON,
  "aniket20173@iiitd.ac.in": Role.IDEATHON,
  "mg301@snu.edu.in": Role.IDEATHON,
  "milanofficial2502@gmail.com": Role.IDEATHON,
  "aman.singh.apd19@itbhu.ac.in": Role.IDEATHON,
  "animeshfw@gmail.com": Role.IDEATHON,
  "abhigyaverma27@gmail.com": Role.IDEATHON,
  "aquietguychannel@gmail.com": Role.IDEATHON,
  "sprayiton1122@gmail.com": Role.IDEATHON,
  "devanshu.2125csme@kiet.edu": Role.IDEATHON,
} as const;

export const teamRegisterRouter = router({
  isEvent: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session)
      return {
        role: Role.USER,
        isTeam: true,
      };
    const id = ctx.session.user?.id;
    const user = await ctx.prisma.user.findFirst({
      where: { id },
    });

    const email = user?.email ?? "";
    return {
      role: teamLeaders[email] ?? (Role.USER as Role),

      isTeam: user?.teamId ? true : false,
    };
  }),
  handleRegisterTeam: protectedProcedure
    .input(
      z.object({
        teamName: z.string(),
        members: z
          .object({
            name: z.string(),
            email: z.string(),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      if (!user) return false;

      const eventName = teamLeaders[user.email ?? "asd"] ?? Role.USER;
      const event: Event | null = await ctx.prisma.event.findFirst({
        where: {
          name: eventName,
        },
      });
      if (!event) return false;

      try {
        await ctx.prisma.$transaction(async (tx) => {
          const team = await tx.team.create({
            data: {
              name: input.teamName,
              eventId: event.id,
            },
          });

          for (const member of input.members) {
            await tx.user.update({
              where: {
                email: member.email,
              },
              data: {
                teamId: team.id,
                role: teamLeaders[user.email ?? "asd"] ?? Role.USER,
              },
            });
          }
        });
      } catch (e) {
        console.log("\n\n\n\nERRRROOROORR\n\n\n");
        throw new TRPCError({ code: "PRECONDITION_FAILED" });
      }
    }),
});
