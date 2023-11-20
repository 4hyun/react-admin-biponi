import { NextApiRequest, NextApiResponse } from "next";
import generateSlug from "../lib/slugify";
import Service from "../model/Service";
import errorResponse from "__server__/utils/error";

const getAllService = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const services = await Service.find({}).exec();
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(services);
  } catch (error) {
    errorResponse(error);
  }
};

const getOneService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const service = await Service.findOne({ slug });
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(service);
  } catch (error) {
    errorResponse(error);
  }
};

const createNewService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, subTitle, icon } = req.body;
    const slug = generateSlug(title);
    const service = new Service({ title, subTitle, slug, icon });
    const createdService = await service.save();
    return res.status(201).json(createdService);
  } catch (error) {
    errorResponse(error);
  }
};

const updateService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const { title, subTitle, icon } = req.body;
    const service = await Service.findOne({ slug });

    if (service) {
      const newService = {
        icon: icon || service.icon,
        title: title || service.title,
        subTitle: subTitle || service.subTitle,
        slug: title ? generateSlug(title) : service.slug,
      };

      const updateService = await Service.updateOne({ slug }, newService);
      return res.status(200).json(updateService);
    }
  } catch (error) {
    errorResponse(error);
  }
};

const deleteService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const deletedService = await Service.findOneAndDelete({ slug });
    return res.status(200).json(deletedService);
  } catch (error) {
    errorResponse(error);
  }
};

export default { createNewService, getAllService, getOneService, updateService, deleteService };
