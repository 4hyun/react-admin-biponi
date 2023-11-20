import { NextApiResponse } from "next";
import User from "__server__/model/User";
import ExtendNextApiRequest from "../utils/extendRequest";
import errorResponse from "__server__/utils/error";

const adminMiddleware = async (req: ExtendNextApiRequest, res: NextApiResponse, next: Function) => {
  try {
    const user = await User.findById(req.user);

    if (user && user.role === "admin") {
      if (req.method === "GET" || user.email === "superadmin@gmail.com") {
        await next();
      } else {
        return res.status(401).send("Permission Denied Edit Demo!");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized Access!");
    }
  } catch (error) {
    errorResponse(error);
  }
};

export default adminMiddleware;
