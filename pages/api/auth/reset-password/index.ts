import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import authController from "__server__/controllers/authController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";

// create api router with next-connect
const router = createRouter<NextApiRequest, NextApiResponse>();

// connect Database
connectDB();

// generate link route
router.post(authController.generateResetPasswordLink);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
