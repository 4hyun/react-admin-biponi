import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import serviceController from "__server__/controllers/serviceController";
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

// create a new service route
router.post(serviceController.createNewService);

// get all services route
router.get(serviceController.getAllService);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
