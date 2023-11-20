import { NextApiResponse } from "next";
import { createRouter } from "next-connect";
import userController from "__server__/controllers/userController";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import adminMiddleware from "__server__/middleware/adminMiddleware";
import authMiddleware from "__server__/middleware/authMiddleware";
import ExtendNextApiRequest from "__server__/utils/extendRequest";

// create api router with next-connect
const router = createRouter<ExtendNextApiRequest, NextApiResponse>();

// database connection
connectDB();

// loggedIn user checker and admin user checker middleware
router.use(authMiddleware).use(adminMiddleware);

// get all users
router.get(userController.getAllUsers);

// create new user from admin dashboard
router.post(userController.createNewUser);

// admin edit user data
router.put(userController.updateUser);

// // delete user route
// router.delete(userController.deleteUserById);

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
