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

// get a product type via a slug
router.get(productTypeController.getOneProductType);

// loggedIn user checker and admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// update product type route
router.put(productTypeController.updateProductType);

// delete a product type by id
router.delete(productTypeController.deleteProductType);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
