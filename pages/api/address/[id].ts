import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import addressController from "__server__/controllers/addressController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import authMiddleware from "__server__/middleware/authMiddleware";
import validIdMiddleware from "__server__/middleware/validIdMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// connect Database
connectDB();

// loggedin user checker middleware
router.use(authMiddleware);

// check the valid mongodb id
router.use(validIdMiddleware);

// get address with id
router.get(addressController.getAddressById);

// update address route
router.put(addressController.updateAddressById);

// create new address route
router.delete(addressController.deleteAddressById);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
