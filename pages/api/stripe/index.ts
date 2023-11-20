import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import stripeController from "__server__/controllers/stripeController";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import authMiddleware from "__server__/middleware/authMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// loggedin user checker middleware
router.use(authMiddleware);

// create a new stripe customer or if exists return customer route
router.post(stripeController.createNewStripeCustomer);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
