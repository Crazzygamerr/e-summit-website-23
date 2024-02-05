import * as fs from "node:fs/promises";
import os from "os";
import path from "path";
import { z } from "zod";

import OCR from "../../../lib/ocr";
import { protectedProcedure, router } from "../trpc";

export const travelCheckoutRouter = router({
  handleTravelCheckout: protectedProcedure
    .input(
      z.object({
        location: z.string(),
        seater: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { location, seater } = input;

      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      if (!user) return;

      const travel = await ctx.prisma.travel.findFirst({
        where: {
          pickUp: location,
          seater,
        },
      });

      if (!travel) return;

      const ssDir = path.join(os.homedir(), "screenshots");

      const ssFilename = (await fs.readdir(ssDir))
        .filter((ss) => ss.includes(userId))
        .sort()
        .reverse()[0];

      const UPI = (await OCR(ssDir + "/" + ssFilename))[0];

      console.log({ UPI });
      console.log({ ssFilename });
      console.log({ travel });
      await ctx.prisma.$transaction(async (tx) => {
        const userPayment = await tx.userPayment.create({
          data: {
            userId,
            upi: UPI ? UPI : "UPI NOT FOUND",
            url: ssFilename ? ssFilename : "FILE NOT FOUND",
          },
        });

        const travelPaymentItem = await tx.paymentItem.create({
          data: {
            userId,
            userPaymentId: userPayment.id,
            amount: travel.amount,
            state: "PROCESSING",
          },
        });

        await tx.travelItem.create({
          data: {
            travelId: travel.id,
            paymentItemId: travelPaymentItem.id,
            userId,
          },
        });
      });
    }),
});
