import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import productController from "__server__/controllers/productController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";

// create api router with next-connect
const router = createRouter<NextApiRequest, NextApiResponse>();

// connect database
connectDB();

// get all products
router.get(productController.getAllProduct);

// searching products
router.post(productController.searchProduct);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
