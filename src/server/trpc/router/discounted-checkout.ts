import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

import * as fs from "node:fs/promises";
import os from "os";
import path from "path";
import mailWork from "../../../lib/mailwork";
import OCR from "../../../lib/ocr";

export const discountedCheckoutRouter = router({
  handleInitialCheckout: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isSNU = ctx.session.user.email?.endsWith("snu.edu.in");
      const { quantity } = input;
      let amount = 599;
      switch (quantity) {
        case 1:
          amount = 599;
          break;
        case 2:
          amount = 1099;
          break;
        case 3:
          amount = 1599;
        case 4:
          amount = 1999;
          break;
      }
      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      if (!user) return;

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

      if (!event) return;

      console.log({ UPI });
      console.log({ ssFilename });
      console.log("eventName", event.name);

      await ctx.prisma.$transaction(async (tx) => {
        const userPayment = await tx.userPayment.create({
          data: {
            userId,
            upi: UPI ? UPI : "UPI NOT FOUND",
            url: ssFilename ? ssFilename : "FILE NOT FOUND",
          },
        });

        const eventPaymentItem = await tx.paymentItem.create({
          data: {
            userId,
            userPaymentId: userPayment.id,
            amount,
            state: "PROCESSING",
          },
        });

        await tx.eventReg.create({
          data: {
            userId,
            eventId: event.id,
            paymentId: eventPaymentItem.id,
            quantity,
          },
        });
      });

      await mailWork(user.email as string, user.name as string, UPI as string);
    }),
});
