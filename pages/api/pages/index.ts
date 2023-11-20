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

// loggedIn user & admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// get all pages
router.get(pageController.getAllPage);

// create a new page
router.post(pageController.postNewPage);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
