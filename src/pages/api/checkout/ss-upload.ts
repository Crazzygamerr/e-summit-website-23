import type { NextApiRequest, NextApiResponse } from "next";

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

function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  try {
		const form = formidable({
			multiples: false,
			uploadDir: "./uploads",
		});
		
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.status(500).json({ status: "error", message: err.message });
				return;
			}
			console.log("files");
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