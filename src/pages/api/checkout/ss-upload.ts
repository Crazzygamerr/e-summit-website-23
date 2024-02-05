import type { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import formidable from "formidable";

// import { Storage, type StorageOptions } from "@google-cloud/storage";

// const gcloudStorageOptions: StorageOptions = {
//   projectId: '',
//   credentials: {}
// }

type Res = {
  status: string;
  message: string;
  random?: any;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
	const session = await getServerAuthSession({ req, res });
	if (!session) {
		res.status(401).json({
			status: "error",
			message: "You must be signed in to view the protected content on this page.",
		});
		return;
	}
	
  try {
		const form = formidable({
			multiples: false,
			uploadDir: "./screenshots",
			keepExtensions: true,
			filename: (name, ext) => {
				return `${session.user?.id ?? name}-${Date.now()}${ext}`;
			}
		});
		
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.status(500).json({ status: "error", message: err.message });
				return;
			}
			// upload to google cloud storage
			// const storage = new Storage(gcloudStorageOptions);
			// const bucket = storage.bucket("bucket-name");
			
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