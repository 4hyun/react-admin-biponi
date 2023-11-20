import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import siteSettingsController from "__server__/controllers/siteSettingsController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import adminMiddleware from "__server__/middleware/adminMiddleware";
import authMiddleware from "__server__/middleware/authMiddleware";
import uploadMiddleware from "__server__/middleware/uploadMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// connect database
connectDB();

// loggedIn user checker and admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// @ts-ignore
router.use(uploadMiddleware.single("file"));

// create and update footer setting route
router.post(siteSettingsController.footerSettings);

export const config = { api: { bodyParser: false } };
// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
