import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import productTypeController from "__server__/controllers/productTypeController";
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

// get all products types --> e.g. - latest, popular, trending products
router.get(productTypeController.getAllProductType);

// loggedIn user checker and admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// create new product type route
router.post(productTypeController.createNewProductType);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
