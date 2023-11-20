import { NextApiRequest, NextApiResponse } from "next";

const noMatchHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).end(`Not Found - ${req.url}`);
};

export default noMatchHandler;
