import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import deliveryTimeController from "__server__/controllers/deliveryTimeController";
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

// admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// get a delivery time route
router.get(deliveryTimeController.getOneDeliveryTime);

// update delivery time route
router.put(deliveryTimeController.updateDeliveryTime);

// delete delivery time route
router.delete(deliveryTimeController.deleteDeliveryTime);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
