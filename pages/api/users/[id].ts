import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import authMiddleware from "__server__/middleware/authMiddleware";
import adminMiddleware from "__server__/middleware/adminMiddleware";
import uploadMiddleware from "__server__/middleware/uploadMiddleware";
import validIdMiddleware from "__server__/middleware/validIdMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";
import userController from "__server__/controllers/userController";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// connect database
connectDB();

// loggedIn user checker middleware
router.use(authMiddleware);

// check the valid mongodb id
router.use(validIdMiddleware);

// get single user route
router.get(userController.getUserById);

// @ts-ignore
router.use(uploadMiddleware.single("file"));

// update user route
router.put(userController.updateUserById);

// delete user route
router.use(adminMiddleware).delete(userController.deleteUserById);

export const config = { api: { bodyParser: false } };

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
