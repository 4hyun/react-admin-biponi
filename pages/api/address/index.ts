import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import addressController from "__server__/controllers/addressController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import authMiddleware from "__server__/middleware/authMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// connect Database
connectDB();

// loggedin user checker middleware
router.use(authMiddleware);

// get address for specific user
router.get(addressController.getAddressByUser);

// create new address route
router.post(addressController.postNewAdderess);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
