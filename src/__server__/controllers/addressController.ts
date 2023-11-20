import { NextApiResponse } from "next";
import Address from "../model/Address";
import ExtendNextApiRequest from "../utils/extendRequest";
import errorResponse from "__server__/utils/error";

const getAddressByUser = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const address = await Address.find({ user: req.user });
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(address);
  } catch (error) {
    errorResponse(error);
  }
};

const postNewAdderess = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const { name, street1, street2, phone, city, state, country, zip } = req.body;
    const address = new Address({
      name,
      street1,
      street2,
      phone,
      city,
      state,
      country,
      zip,
      user: req.user,
    });
    const createdAddress = await address.save();
    return res.status(200).json(createdAddress);
  } catch (error) {
    errorResponse(error);
  }
};

const getAddressById = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const address = await Address.findOne({ _id: id });
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(address);
  } catch (error) {
    errorResponse(error);
  }
};

const updateAddressById = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const updateAddress = await Address.findOneAndUpdate(
      { $and: [{ _id: id }, { user: req.user }] },
      req.body,
      { new: true, upsert: true }
    );
    return res.status(200).json(updateAddress);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteAddressById = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const deleteAddress = await Address.findOneAndDelete({
      $and: [{ _id: id }, { user: req.user }],
    });
    return res.status(200).json(deleteAddress);
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  getAddressById,
  postNewAdderess,
  getAddressByUser,
  updateAddressById,
  deleteAddressById,
};
