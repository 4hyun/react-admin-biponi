import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import serviceTypeController from "__server__/controllers/serviceTypeController";
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

// loggedin user checker and admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// deleted service from service type and main service
router.post(serviceTypeController.deleteServiceFromServiceType);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
