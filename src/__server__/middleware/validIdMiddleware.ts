import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

function validIdMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const id = req.query.id as string;
  const valid = mongoose.Types.ObjectId.isValid(id);

  if (!valid) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  next();
}

export default validIdMiddleware;
