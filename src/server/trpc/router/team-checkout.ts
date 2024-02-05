import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

import { Gender } from "@prisma/client";
import * as fs from "node:fs/promises";
import os from "os";
import path from "path";
import OCR from "../../../lib/ocr";

export const teamCheckoutRouter = router({
  handleInitialCheckout: protectedProcedure
    .input(
      z.object({
        teamName: z.string(),
        members: z
          .object({
            name: z.string().optional(),
            emailId: z.string().optional(),
            phoneNumber: z.string().optional(),
            isAccomodation: z.boolean().optional(),
            checkinDate: z.date().optional(),
            checkoutDate: z.date().optional(),
            gender: z.enum(["MALE", "FEMALE"]),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;

      // get info from db
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      const clusterMale = await ctx.prisma.cluster.findFirst({
        where: {
          gender: "MALE",
        },
      });

      const clusterFemale = await ctx.prisma.cluster.findFirst({
        where: {
          gender: "FEMALE",
        },
      });

      const eventName = user?.role;
      const event = await ctx.prisma.event.findFirst({
        where: {
          name: eventName,
        },
      });

      if (!event || !clusterFemale || !clusterMale) return;

      // create a team
      const team = await ctx.prisma.team.create({
        data: {
          name: input.teamName,
          eventId: event.id,
        },
      });

      // create team members
      input.members.forEach(
        async (participant) =>
          await ctx.prisma.user.create({
            data: {
              name: participant.name,
              email: participant.emailId,
              mobileNumber: participant.phoneNumber,
              role: eventName,
              hasFilledInfo: true,
              teamId: team.id,
              gender: participant.gender,
            },
          })
      );

      // create global received payment
      const ssDir = path.join(os.homedir(), "screenshots");
      const ssFilename = (await fs.readdir(ssDir))
        .filter((ss) => ss.includes(userId))
        .sort()
        .reverse()[0];
      const UPI = (await OCR(ssDir + "/" + ssFilename))[0];
      const userPayment = await ctx.prisma.userPayment.create({
        data: {
          upi: UPI ?? "UPI NOT FOUND",
          url: ssFilename ?? "URL NOT FOUND",
          userId: userId,
        },
      });

      // create payment item for event
      const eventPaymentItem = await ctx.prisma.paymentItem.create({
        data: {
          userId,
          userPaymentId: userPayment.id,
          amount: event.amount,
          state: "PROCESSING",
        },
      });
      await ctx.prisma.eventReg.create({
        data: {
          userId,
          eventId: event.id,
          paymentId: eventPaymentItem.id,
        },
      });

      // create accomodations and payment items
      input.members.forEach(async (participant) => {
        if (
          participant.isAccomodation &&
          participant.checkoutDate &&
          participant.checkinDate
        ) {
          const days =
            participant.checkoutDate?.getDate() -
            participant.checkinDate?.getDate();
          const amount = 350 * days - (days - 1) * 50 - 1;

          const accomPayment = await ctx.prisma.paymentItem.create({
            data: {
              amount,
              state: "PROCESSING",
              userId,
              userPaymentId: userPayment.id,
            },
          });

          await ctx.prisma.accomodation.create({
            data: {
              userId: userId,
              clusterId:
                participant.gender == Gender.FEMALE
                  ? clusterFemale.id
                  : clusterMale.id,
              checkInDate: participant.checkinDate,
              checkOutDate: participant.checkoutDate,
              paymentId: accomPayment.id,
            },
          });
        }
      });
    }),
});
