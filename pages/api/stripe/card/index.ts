import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import stripeController from "__server__/controllers/stripeController";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import authMiddleware from "__server__/middleware/authMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// loggedIn user checker middleware
router.use(authMiddleware);

// get cards for single customer route
router.get(stripeController.getAllCardsForSingleUser);

// create a new card route
router.post(stripeController.createNewCard);

// delete card route
router.delete(stripeController.deleteCard);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
