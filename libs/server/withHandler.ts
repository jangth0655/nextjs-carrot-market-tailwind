import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

type Method = "GET" | "POST" | "DELETE";

export default function withHandler(
  method: Method,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
