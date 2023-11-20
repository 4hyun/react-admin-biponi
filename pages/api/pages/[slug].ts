import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import pageController from "__server__/controllers/pageController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import adminMiddleware from "__server__/middleware/adminMiddleware";
import authMiddleware from "__server__/middleware/authMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// connect database
connectDB();

// get a page
router.get(pageController.getOnePage);

// admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// update page route
router.put(pageController.updatePage);

// delete page route
router.delete(pageController.deletePage);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
