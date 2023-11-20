import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import settingController from "__server__/controllers/settingController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import adminMiddleware from "__server__/middleware/adminMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// connect database
connectDB();

// get a setting by slug
router.get(settingController.getOneSettings);

// admin user checker middleware
router.use(adminMiddleware);

// update a setting by slug
router.put(settingController.updateSettings);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
