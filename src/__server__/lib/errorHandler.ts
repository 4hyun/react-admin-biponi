import { NextApiRequest, NextApiResponse } from "next";

const errorHandler = (err: any, req: NextApiRequest, res: NextApiResponse) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    path: req.url,
    stack: err.stack,
    message: err.message,
  });
};

export default errorHandler;
