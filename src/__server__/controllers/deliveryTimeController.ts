import { NextApiRequest, NextApiResponse } from "next";
import generateSlug from "__server__/lib/slugify";
import Delivery_Time from "../model/DeliveryTime";
import errorResponse from "__server__/utils/error";

const getAllDeliveryTimeList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const getAllList = await Delivery_Time.find();
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(getAllList);
  } catch (error) {
    errorResponse(error);
  }
};

const getOneDeliveryTime = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const getTime = await Delivery_Time.findOne({ slug });
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(getTime);
  } catch (error) {
    errorResponse(error);
  }
};

const postNewDeliveryTime = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { time } = req.body;
    const slug = generateSlug(time);

    const deliveryTime = new Delivery_Time({ time, slug });
    const newDeliveryTime = await deliveryTime.save();
    return res.status(201).json(newDeliveryTime);
  } catch (error) {
    errorResponse(error);
  }
};

const updateDeliveryTime = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const { time } = req.body;

    const newTime = { time, slug: generateSlug(time) };
    const update = await Delivery_Time.findOneAndUpdate(
      { slug },
      { $set: newTime },
      { new: true, upsert: true }
    );
    return res.status(200).json(update);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteDeliveryTime = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const deleteTime = await Delivery_Time.findOneAndDelete({ slug });
    return res.status(200).json(deleteTime);
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  getAllDeliveryTimeList,
  postNewDeliveryTime,
  getOneDeliveryTime,
  updateDeliveryTime,
  deleteDeliveryTime,
};
