import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";

import os from "os";
import path from "path";
import * as fs from "node:fs/promises";
import OCR from "../../../lib/ocr";
import mailWork from "../../../lib/mailwork";

export const checkoutRouter = router({
  isSNU: publicProcedure.query(({ ctx }) => {
    return ctx?.session?.user?.email?.endsWith("snu.edu.in") ?? false;
  }),
  currentStatus: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    try {
      const paymentItems = await ctx.prisma.paymentItem.findMany({
        where: { userId },
      });

      if (paymentItems.length !== 0) {
        return paymentItems[paymentItems.length - 1]?.state;
      }
    } catch (e) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "You have not initiated any payments yet.",
        cause: e,
      });
    }
  }),
  handleInitialCheckout: protectedProcedure
    .input(
      z.object({
        isAccomodation: z.boolean().optional(),
        checkinDate: z.date().optional(),
        checkoutDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isSNU = ctx.session.user.email?.endsWith("snu.edu.in");

      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      if (!user) return;

      const { isAccomodation, checkinDate, checkoutDate } = input;

      const ssDir = path.join(os.homedir(), "screenshots");

      const ssFilename = (await fs.readdir(ssDir))
        .filter((ss) => ss.includes(userId))
        .sort()
        .reverse()[0];

      const UPI = (await OCR(ssDir + "/" + ssFilename))[0];

      const event = isSNU
        ? await ctx.prisma.event.findFirst({ where: { name: "SNU-ESUMMIT" } })
        : await ctx.prisma.event.findFirst({
            where: { name: "NONSNU-ESUMMIT" },
          });

      const cluster = await ctx.prisma.cluster.findFirst({
        where: {
          gender: user.gender ?? "MALE",
        },
      });

      if (!cluster || !event) return;

      console.log({ UPI });
      console.log(ssFilename);
      console.log("eventName", event.name);
      console.log("checkinDate", checkinDate);
      console.log("checkoutDate", checkoutDate);

      await ctx.prisma.$transaction(async (tx) => {
        const userPayment = await tx.userPayment.create({
          data: {
            userId,
            upi: UPI ? UPI : "Bruh",
            url: ssFilename ? ssFilename : "bruh",
          },
        });

        const eventPaymentItem = await tx.paymentItem.create({
          data: {
            userId,
            userPaymentId: userPayment.id,
            amount: event.amount,
            state: "PROCESSING",
          },
        });

        await tx.eventReg.create({
          data: {
            userId,
            eventId: event.id,
            paymentId: eventPaymentItem.id,
          },
        });

        if (isAccomodation && checkinDate && checkoutDate) {
          const days = checkoutDate.getDate() - checkinDate.getDate();
          const accomodationAmount = 300 * days - (days - 1) * 50 - 1;

          const accomodationPaymentItem = await tx.paymentItem.create({
            data: {
              userId,
              userPaymentId: userPayment.id,
              amount: accomodationAmount,
              state: "PROCESSING",
            },
          });

          await tx.accomodation.create({
            data: {
              checkInDate: checkinDate,
              checkOutDate: checkoutDate,
              clusterId: cluster.id,
              paymentId: accomodationPaymentItem.id,
              userId,
            },
          });
        }
      });

      await mailWork(user.email as string, user.name as string, UPI as string);
    }),
});
