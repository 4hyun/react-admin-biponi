import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import productController from "__server__/controllers/productController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import adminMiddleware from "__server__/middleware/adminMiddleware";
import authMiddleware from "__server__/middleware/authMiddleware";
import validIdMiddleware from "__server__/middleware/validIdMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// connect database
connectDB();

// check the valid mongodb id
router.use(validIdMiddleware);

// get a single product
router.get(productController.getOneProduct);

// loggedIn user checker and admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// delete product route
router.delete(productController.deleteProduct);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
