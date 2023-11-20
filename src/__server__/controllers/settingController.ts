import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import generateSlug from "../lib/slugify";
import Settings from "../model/Settings";
import errorResponse from "__server__/utils/error";

// cache instance
const cache = new NodeCache({ stdTTL: 60 * 3 });

// get all settings controller
const getAllSettings = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("settings")) {
      return res.status(200).json(JSON.parse(cache.get("settings")!));
    }

    const settings = await Settings.find({});
    cache.set("settings", JSON.stringify(settings));
    return res.status(200).json(settings);
  } catch (error) {
    errorResponse(error);
  }
};

// get single settings controller
const getOneSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;

    if (cache.has(`settings-${slug}`)) {
      return res.status(200).json(JSON.parse(cache.get(`settings-${slug}`)!));
    }

    const setting = await Settings.findOne({ slug });
    cache.set(`settings-${slug}`, JSON.stringify(setting));
    return res.status(200).json(setting);
  } catch (error) {
    errorResponse(error);
  }
};

// create a new settings controller
const createNewSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, values } = req.body;
    const slug = generateSlug(name);

    const setting = new Settings({ name, values, slug });
    const createdSetting = await setting.save();
    cache.del("settings");
    return res.status(200).json(createdSetting);
  } catch (error) {
    errorResponse(error);
  }
};

// update single settings controller
const updateSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, values } = req.body;
    const slug = generateSlug(name);

    const setting = await Settings.findOneAndUpdate(
      { slug: req.query.slug },
      { $set: { name, values, slug } },
      { new: true }
    );

    cache.del(`settings-${slug}`);
    return res.status(200).json(setting);
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  getAllSettings,
  getOneSettings,
  updateSettings,
  createNewSettings,
};
