import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import categoryController from "__server__/controllers/categoryController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import adminMiddleware from "__server__/middleware/adminMiddleware";
import authMiddleware from "__server__/middleware/authMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// connect Database
connectDB();

// loggedin user & admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// get all categories route
router.get(categoryController.getAllCategory);

// create a new category route
router.post(categoryController.postNewCategory);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
