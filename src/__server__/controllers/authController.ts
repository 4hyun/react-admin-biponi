import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../model/User";
import sendEmail from "../utils/sendEmail";
import errorResponse from "__server__/utils/error";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400);
      throw new Error("Invalid Email and Password");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      res.status(400);
      throw new Error("Invalid Email and Password");
    }

    return res.status(200).json({
      _id: user._id,
      role: user.role,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    });
  } catch (error) {
    errorResponse(error);
  }
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password, last_name, first_name, role, avatar, termsAndCondition } = req.body;
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      res.status(400);
      throw new Error("User Exists with given email address");
    }
    // password hash
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      email,
      last_name,
      first_name,
      termsAndCondition,
      password: hashPassword,
      avatar: avatar || `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      _id: savedUser._id,
      role: savedUser.role,
      email: savedUser.email,
      avatar: savedUser.avatar,
      name: `${savedUser.first_name} ${savedUser.last_name}`,
    });
  } catch (error) {
    errorResponse(error);
  }
};

const generateResetPasswordLink = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400);
      throw new Error("Account doesn't found with given email");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "5m",
    });

    const link = `${process.env.NEXTAUTH_URL}/reset-password/${user._id}/${token}`;
    await sendEmail(email, link);

    return res.status(200).json({ message: "Check your email for password reset" });
  } catch (error) {
    errorResponse(error);
  }
};

const resetPasswordLinkVerify = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { password } = req.body;

    const [userId, token] = req.query.slug as string[];
    const user = await User.findOne({ _id: userId });

    if (user) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

      // @ts-ignore
      if (decodedToken.exp * 1000 > Date.now()) {
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(user._id, {
          $set: { password: hashPassword },
        });

        return res.status(200).json({ message: "Password Update Successfully" });
      } else {
        res.status(400);
        throw new Error("Token is Expired!");
      }
    } else {
      res.status(400);
      throw new Error("User Not Available in Our Database");
    }
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  login,
  register,
  resetPasswordLinkVerify,
  generateResetPasswordLink,
};
