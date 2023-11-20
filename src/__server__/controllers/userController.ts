import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import { deleteFile } from "__server__/middleware/uploadMiddleware";
import User from "../model/User";
import ExtendNextApiRequest from "../utils/extendRequest";
import errorResponse from "__server__/utils/error";

// caching instance
const cache = new NodeCache({ stdTTL: 30 });

// next api request extend type
interface ExtendApiRequest extends NextApiRequest {
  file?: Express.MulterS3.File;
  // user: ObjectId;
}

const getAllUsers = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("users")) {
      return res.status(200).json(JSON.parse(cache.get("users")!));
    }

    const users = await User.find({})
      .select(["-__v", "-password", "-createdAt", "-updatedAt"])
      .sort("-createdAt");

    cache.set("users", JSON.stringify(users));
    return res.status(200).json(users);
  } catch (error) {
    errorResponse(error);
  }
};

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (cache.has(`user-${id}`)) {
      return res.status(200).json(JSON.parse(cache.get(`user-${id}`)!));
    }

    const user = await User.findById(id).select(["-__v", "-password", "-createdAt", "-updatedAt"]);
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(user);
  } catch (error) {
    errorResponse(error);
  }
};

const getOneUser = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has(`user-${req.user}`)) {
      return res.status(200).json(JSON.parse(cache.get(`user-${req.user}`)!));
    }

    const users = await User.findOne({ _id: req.user }).select([
      "-__v",
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(users);
  } catch (error) {
    errorResponse(error);
  }
};

const createNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password, last_name, first_name, role, phone } = req.body;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error("User Exists with given email address");
    }
    // password hash
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      email,
      phone,
      last_name,
      first_name,
      password: hashPassword,
      avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      role: savedUser.role,
      email: savedUser.email,
      name: `${savedUser.first_name} ${savedUser.last_name}`,
    });
  } catch (error) {
    errorResponse(error);
  }
};

const updateUser = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const { id, role, email, phone, password, last_name, first_name } = req.body;
    const user = await User.findById(id);

    if (user) {
      // update password hash
      const hashPassword = password && (await bcrypt.hash(password, 10));
      const updateUser = await User.updateOne(
        { _id: id },
        { last_name, first_name, role, email, phone, password: hashPassword || user.password }
      );

      cache.set(`user-${id}`, JSON.stringify(updateUser));
      return res.status(200).json(updateUser);
    } else {
      throw new Error("User not exists with given id");
    }
  } catch (error) {
    errorResponse(error);
  }
};

const updateUserById = async (req: ExtendApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const user = await User.findById(id);

    if (req.file && user.avatarKey) {
      await deleteFile(user.avatarKey);
    }

    if (user) {
      const first_name = req.body.first_name || user.first_name;
      const last_name = req.body.last_name || user.last_name;
      const avatar = req.file?.location || user.avatar;
      const avatarKey = req.file?.key || user.avatarKey;
      const role = req.body.role || user.role;
      const dateOfBirth = JSON.parse(req.body.dateOfBirth) || user.dateOfBirth;
      const phone = req.body.phone || user.phone;

      const updateUser = await User.findByIdAndUpdate(
        id,
        { $set: { first_name, last_name, avatar, role, dateOfBirth, phone, avatarKey } },
        { new: true, upsert: true }
      ).select(["-__v", "-password", "-createdAt", "-updatedAt"]);

      cache.set(`user-${id}`, JSON.stringify(updateUser));
      return res.status(200).json(updateUser);
    } else {
      throw new Error("User not exists with given id");
    }
  } catch (error) {
    errorResponse(error);
  }
};

const deleteUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      cache.del(`user-${id}`);
      cache.del("users");

      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      throw new Error("User Not Found!");
    }
  } catch (error) {
    errorResponse(error);
  }
};

const passwordUpdate = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const { current_password, new_password } = req.body;
    const user = await User.findOne({ _id: req.user });

    // COMMENT THIS ERROR AFTER PURCHASE
    res.status(400);
    throw new Error("Password can't changeable in the demo");

    if (user && current_password) {
      const verifyPassword = await bcrypt.compare(current_password, user.password);
      if (verifyPassword) {
        // password hash
        const hashPassword = await bcrypt.hash(new_password, 10);
        await User.updateOne({ _id: req.user }, { password: hashPassword });

        cache.del(`user-${req.user}`);
        return res.status(200).send("Password updated");
      } else {
        res.status(400);
        throw new Error("Current password not matched");
      }
    } else {
      res.status(400);
      throw new Error("Invalid Credential");
    }
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  updateUser,
  getOneUser,
  getAllUsers,
  getUserById,
  createNewUser,
  passwordUpdate,
  deleteUserById,
  updateUserById,
};
