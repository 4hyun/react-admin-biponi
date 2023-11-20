import { NextApiRequest, NextApiResponse } from "next";
import Payment from "../model/Payment";
import errorResponse from "__server__/utils/error";

const getAllPayment = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const payments = await Payment.find({}).exec();
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(payments);
  } catch (error) {
    errorResponse(error);
  }
};

const getOnePayment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const user = await Payment.findById(id);
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(user);
  } catch (error) {
    errorResponse(error);
  }
};

const postNewPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payment = new Payment(req.body);
    const createdPayment = await payment.save();
    return res.status(200).json(createdPayment);
  } catch (error) {
    errorResponse(error);
  }
};

export default { postNewPayment, getAllPayment, getOnePayment };
