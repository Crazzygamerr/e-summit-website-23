import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const fetchEventReg = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const eventReg = await prisma.eventReg.findFirst({
    where: {
      userId: userId as string,
    },
  });
  return res.status(200).json(eventReg);
};

export default fetchEventReg;
