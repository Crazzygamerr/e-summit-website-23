import * as fs from "node:fs/promises";
import os from "os";
import path from "path";
import { z } from "zod";

import type { Gender } from "@prisma/client";
import OCR from "../../../lib/ocr";
import { protectedProcedure, router } from "../trpc";

export const accommodationCheckoutRouter = router({
  handleAccommodationCheckout: protectedProcedure
    .input(
      z.object({
        checkinDate: z.number().min(0).max(2),
        checkoutDate: z.number().min(0).max(2),
        gender: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { checkinDate, checkoutDate, gender } = input;

      let amount = 349;
      const cost: number[] = [349, 599, 899];
      amount = cost[checkoutDate - checkinDate] ?? 349;

      const indate = new Date(
        ["2023-01-27", "2023-01-28", "2023-01-29"][checkinDate] ?? "2023-01-27"
      );
      const outdate = new Date(
        ["2023-01-28", "2023-01-29", "2023-01-30"][checkoutDate] ?? "2023-01-28"
      );

      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      if (!user) return;
      const cluster = await ctx.prisma.cluster.findFirst({
        where: {
          gender: gender as Gender,
        },
      });
      if (!cluster) return;

      const ssDir = path.join(os.homedir(), "screenshots");

      const ssFilename = (await fs.readdir(ssDir))
        .filter((ss) => ss.includes(userId))
        .sort()
        .reverse()[0];

      const UPI = (await OCR(ssDir + "/" + ssFilename))[0];

      console.log({ UPI });
      console.log({ ssFilename });
      console.log({ indate, outdate, cluster, amount });

      await ctx.prisma.$transaction(async (tx) => {
        const userPayment = await tx.userPayment.create({
          data: {
            userId,
            upi: UPI ? UPI : "UPI NOT FOUND",
            url: ssFilename ? ssFilename : "FILE NOT FOUND",
          },
        });

        const paymentItem = await tx.paymentItem.create({
          data: {
            userId,
            userPaymentId: userPayment.id,
            amount,
            state: "PROCESSING",
          },
        });

        const acc = await tx.accomodation.create({
          data: {
            checkInDate: indate,
            checkOutDate: outdate,
            clusterId: cluster.id,
            paymentId: paymentItem.id,
            userId,
          },
        });
        console.log({ acc, paymentItem, userPayment });
      });
    }),
});
