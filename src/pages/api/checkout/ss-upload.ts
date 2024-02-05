import type { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import formidable from "formidable";
import os from "os";
import fs from "fs";
type Res = {
  status: string;
  message: string;
  random?: unknown;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(401).json({
      status: "error",
      message:
        "You must be signed in to view the protected content on this page.",
    });
    return;
  }

  try {
    const form = formidable({
      multiples: false,
      uploadDir: os.homedir() + "/screenshots",
      keepExtensions: true,
      filename: (_, ext) => {
        const files = fs.readdirSync(os.homedir() + "/screenshots");
        // count the number of files that includes the user id
        if (!session.user) return "asd";
        const id = session.user.id;
        const count = files.filter((file) => {
          return file.includes(id);
        }).length;

        return `${id}-${count + 1}${ext}`;
      },
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ status: "error", message: err.message });
        return;
      }

      res.status(200).json({
        status: "success",
        message: "Woohoo! It worked :)",
        random: { files },
      });
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "error", message: `oops, this happened: ${e}` });
  }
}

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
