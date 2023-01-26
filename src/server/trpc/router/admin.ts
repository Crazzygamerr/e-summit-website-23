import { Role } from "@prisma/client";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

const specialAdmins = {
  agaash: ["agaash@gmail.com", "somesh.kar@gmail.com"],
  harnam: ["harnam@gmail.com", "somesh.kar@gmail.com"],
};

export const adminRouter = router({
  checkIfAdmin: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
    });

    return user !== null && user.role === Role.ADMIN;
  }),
  checkIfAgaash: protectedProcedure.query(async ({ ctx }) => {
    return specialAdmins.agaash.includes(ctx.session.user.email as string);
  }),
  agaashViewAccomodation: protectedProcedure.query(async ({ ctx }) => {
    if (!specialAdmins.agaash.includes(ctx.session.user.email as string))
      return { isAgaash: false };

    const accoms = await ctx.prisma.accomodation.findMany();

    return { isAgaash: true, accoms };
  }),
  agaashMutateAccomodation: protectedProcedure
    .input(z.object({ id: z.string(), change: z.any() }))
    .query(async ({ ctx }) => {
      if (!specialAdmins.agaash.includes(ctx.session.user.email as string))
        return { isAgaash: false };

      // const { id } = input;
      // const acc = await ctx.prisma.accomodation.findMany({ where: { id } });

      // mutate accomodation with change here

      // return changed data
    }),
  harnamViewPayments: protectedProcedure.query(async ({ ctx }) => {
    if (!specialAdmins.harnam.includes(ctx.session.user.email as string))
      return { isHarnam: false };

    return [];
  }),
  adminViewTickets: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;
    const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
    console.log({ user });
    if (user === null || user.role !== Role.ADMIN)
      return {
        isAdmin: false,
        totalAmount: 0,
        totalQuantity: 0,
      };

    // prisma sum quantity column in table EventReg
    // const totalQuantity = await ctx.prisma.eventReg.aggregate({
    // 	_sum: {
    // 		quantity: true,
    // 	},
    // });

    const totalAmount = await ctx.prisma.paymentItem.aggregate({
      _sum: {
        amount: true,
      },
    });
    totalAmount._sum.amount;

    return {
      isAdmin: true,
      // totalQuantity: totalQuantity._sum.quantity,
      totalAmount: totalAmount._sum.amount,
    };
  }),
  adminViewTeams: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;
    const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

    if (user === null || user.role !== Role.ADMIN)
      return {
        isAdmin: false,
        totalAmount: 0,
        totalQuantity: 0,
      };

    const teams = await ctx.prisma.team.findMany({
      include: {
        User: true,
        event: true,
      },
    });
    return { isAdmin: true, teams };
  }),
  adminGetQrUserData: protectedProcedure
    .input(z.object({ qrUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { qrUserId } = input;

      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      console.log({ user });

      if (user === null || user.role !== Role.ADMIN) return { isAdmin: false };

      if (!qrUserId) return { isAdmin: true };

      const qrUser = await ctx.prisma.user.findFirst({
        where: { id: qrUserId },
        include: {
          EventReg: { include: { event: true } },
        },
      });

      return { isAdmin: true, qrUser };
    }),
  adminCheckinParticipant: protectedProcedure
    .input(z.object({ userIdToCheckIn: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { userIdToCheckIn } = input;

      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      console.log({ user });

      if (user === null || user.role !== Role.ADMIN) return { isAdmin: false };

      const userToCheckIn = await ctx.prisma.user.findFirst({
        where: { id: userIdToCheckIn },
      });

      console.log({ userToCheckIn });

      if (userToCheckIn) {
        await ctx.prisma.user.update({
          where: { id: userIdToCheckIn },
          data: { checkedIn: true },
        });
      }

      return { isAdmin: true, userToCheckIn };
    }),
  adminRegParticipant: protectedProcedure
    .input(z.object({ userIdToReg: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { userIdToReg } = input;

      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      console.log({ user });

      if (user === null || user.role !== Role.ADMIN) return { isAdmin: false };

      const userToReg = await ctx.prisma.user.findFirst({
        where: { id: userIdToReg },
      });

      console.log({ userToReg });

      if (userToReg) {
        await ctx.prisma.user.update({
          where: { id: userIdToReg },
          data: { registeredForEvent: true },
        });
      }

      return { isAdmin: true, userToReg };
    }),
  adminCheckoutParticipant: protectedProcedure
    .input(z.object({ userIdToCheckOut: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { userIdToCheckOut } = input;

      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      console.log({ user });

      if (user === null || user.role !== Role.ADMIN) return { isAdmin: false };

      const userToCheckOut = await ctx.prisma.user.findFirst({
        where: { id: userIdToCheckOut },
      });

      console.log({ userToCheckOut });

      if (userToCheckOut) {
        await ctx.prisma.user.update({
          where: { id: userIdToCheckOut },
          data: { checkedIn: true },
        });
      }

      return { isAdmin: true, userToCheckOut };
    }),
});
