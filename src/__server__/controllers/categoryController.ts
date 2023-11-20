import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import generateSlug from "__server__/lib/slugify";
import Category from "../model/Category";
import errorResponse from "__server__/utils/error";

// caching instance
const cache = new NodeCache({ stdTTL: 30 });

const getAllCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("categories")) {
      return res.status(200).json(JSON.parse(cache.get("categories")!));
    }

    const categories = await Category.find({}).exec();
    cache.set("categories", JSON.stringify(categories));
    return res.status(200).json(categories);
  } catch (error) {
    errorResponse(error);
  }
};

const getOneCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;

    if (cache.has(`categories-${slug}`)) {
      return res.status(200).json(JSON.parse(cache.get(`categories-${slug}`)!));
    }

    const category = await Category.findOne({ slug });
    cache.set(`categories-${slug}`, JSON.stringify(category));
    return res.status(200).json(category);
  } catch (error) {
    errorResponse(error);
  }
};

const postNewCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, icon } = req.body;
    const slug = generateSlug(name);

    const find_slug = await Category.findOne({ slug });
    if (find_slug) {
      res.status(400);
      throw new Error("Category already exists with given name");
    }

    const category = new Category({ name, slug, icon });
    const createdCategory = await category.save();
    cache.del("categories");
    return res.status(201).json(createdCategory);
  } catch (error) {
    errorResponse(error);
  }
};

const updateCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const { name, icon } = req.body;
    const category = await Category.findOne({ slug });

    if (category) {
      const newCategory = {
        name: name || category.name,
        icon: icon || category.icon,
        slug: name ? generateSlug(name) : category.slug,
      };

      const updateCategory = await Category.updateOne({ slug }, newCategory, {
        new: true,
        upsert: true,
      });

      cache.del(`categories-${slug}`);
      return res.status(200).json(updateCategory);
    }
  } catch (error) {
    errorResponse(error);
  }
};

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const deletedCategory = await Category.findOneAndDelete({ slug });

    if (!deletedCategory) {
      res.status(404);
      throw new Error("Category Not Found!");
    }

    cache.del("categories");
    return res.status(200).json(deletedCategory);
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  getAllCategory,
  postNewCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
