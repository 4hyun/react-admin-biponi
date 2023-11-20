import { NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import User from "__server__/model/User";
import ExtendNextApiRequest from "../utils/extendRequest";
import errorResponse from "__server__/utils/error";

async function authMiddleware(req: ExtendNextApiRequest, res: NextApiResponse, next: Function) {
  try {
    const token = await getToken({ req });

    if (token && token.email) {
      const user = await User.findOne({ email: token.email });

      if (user) {
        req.user = user._id;
        await next();
      } else {
        res.status(401);
        throw new Error("Unauthorized Access!");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized Access!");
    }
  } catch (error) {
    errorResponse(error);
  }
}

export default authMiddleware;
