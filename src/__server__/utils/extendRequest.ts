import { ObjectId } from "mongoose";
import { NextApiRequest } from "next";

type ExtendNextApiRequest = NextApiRequest & { user: ObjectId | unknown };
export default ExtendNextApiRequest;
