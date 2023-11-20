import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import categoryNavlistController from "__server__/controllers/categoryNavlistController";
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

// get a category nav list item via a slug
router.get(categoryNavlistController.getCategoryNavlistBySlug);

// loggedin user checker and admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// put new category in category nav list
router.put(categoryNavlistController.updateCategoryNavlist);

// delete a category nav list
router.delete(categoryNavlistController.deleteCategoryNavlist);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
