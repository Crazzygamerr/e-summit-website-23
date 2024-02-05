import type { NextApiRequest, NextApiResponse } from "next";

import { wifiMailwork } from "../../lib/mailwork";

const WifiMail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to, name, username, password } = req.body;

  await wifiMailwork(
    to as string,
    name as string,
    username as string,
    password as string
  );

  return res.status(200).json({ status: "success" });
};

export default WifiMail;
