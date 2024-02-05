import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const regRouter = router({
  regUser: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async (req) => {
      const { email } = req.input;

      // write prisma code to add email to db
      const emailCount = await req.ctx.prisma.emailReg.count({
        where: { email },
      });

      if (emailCount !== 0) {
        return {
          status: "error",
          message: "Email already exists",
        };
      }

      await req.ctx.prisma.emailReg.create({ data: { email } });

      console.log({ email });
    }),
  fillUserInfo: protectedProcedure
    .input(
      z.object({
        university: z.string(),
        fieldOfStudy: z.string(),
        yearOfStudy: z.string().regex(new RegExp("^[0-9]{4}$")),
        mobileNumber: z.string(),
        gender: z.enum(["MALE", "FEMALE"]),
      })
    )
    .mutation(async (req) => {
      try {
        const { name, email } = req.ctx.session.user;

        const fillUserInfoInput = req.input;
        console.log({ fillUserInfoInput });

        const updateUser = await req.ctx.prisma.user.update({
          where: {
            email: email!,
          },
          data: {
            ...fillUserInfoInput,
            hasFilledInfo: true,
          },
        });

        console.log(updateUser);

        return {
          status: "success",
          message: "Successfully modified user",
        };
      } catch (e) {
        return {
          status: "error",
          message: e,
        };
      }
    }),
});
