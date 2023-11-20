import { NextApiRequest, NextApiResponse } from "next";
import generateSlug from "../lib/slugify";
import Service from "../model/Service";
import Service_Type from "../model/ServiceType";
import errorResponse from "__server__/utils/error";

const getAllServiceType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const getServiceType = await Service_Type.find().populate("services");
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(getServiceType);
  } catch (error) {
    errorResponse(error);
  }
};

const getServiceTypeBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const getServiceType = await Service_Type.findOne({ slug }).populate("services");
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(getServiceType.services);
  } catch (error) {
    errorResponse(error);
  }
};

const postNewServiceType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, services } = req.body;
    const slug = generateSlug(name);

    const serviceType = new Service_Type({ name, slug, services });
    const createdServiceType = await serviceType.save();
    return res.status(201).json(createdServiceType);
  } catch (error) {
    errorResponse(error);
  }
};

const updateServiceType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const { service, services } = req.body;
    const check = Array.isArray(services);

    // push single service in service list
    if (!check && service) {
      const serviceType = await Service_Type.findOneAndUpdate(
        { slug },
        { $push: { services: service } },
        { new: true, upsert: true }
      );
      return res.status(200).json(serviceType);
    }

    // update full service list
    const updated = await Service_Type.findOneAndUpdate(
      { slug },
      { $set: { services: services } },
      { new: true, upsert: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteServiceType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const deletedServiceType = await Service_Type.findOneAndDelete({ slug });
    return res.status(201).json(deletedServiceType);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteServiceFromServiceType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { serviceTypeSlug, serviceSlug } = req.body;

    const service = await Service.findOne({ slug: serviceSlug });

    const serviceType = await Service_Type.findOne({
      $and: [{ slug: serviceTypeSlug }, { services: { $in: service._id } }],
    });

    if (service && serviceType) {
      // remove service from service type list
      await Service_Type.updateOne(
        { slug: serviceTypeSlug },
        { $pull: { services: { $in: serviceSlug._id } } }
      );

      // delete main service
      await Service.deleteOne({ _id: service._id });

      return res.status(201).json({ message: "Updated Successfully!" });
    } else {
      res.status(400);
      throw new Error("Not Found Data!");
    }
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  getAllServiceType,
  deleteServiceType,
  updateServiceType,
  postNewServiceType,
  getServiceTypeBySlug,
  deleteServiceFromServiceType,
};
