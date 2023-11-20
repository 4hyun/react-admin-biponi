import { NextApiRequest, NextApiResponse } from "next";
import generateSlug from "__server__/lib/slugify";
import Category from "../model/Category";
import Category_Nav_List from "../model/CategoryNavList";
import Product from "../model/Product";
import errorResponse from "__server__/utils/error";

const getAllCategoryNavlist = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const getAllList = await Category_Nav_List.find().populate("categories");
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(getAllList);
  } catch (error) {
    errorResponse(error);
  }
};

const getCategoryNavlistBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const getCategoryNavList = await Category_Nav_List.findOne({ slug }).populate("categories");
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(getCategoryNavList.categories);
  } catch (error) {
    errorResponse(error);
  }
};

const postNewCategoryNavlist = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, categories } = req.body;
    const slug = generateSlug(name);

    const categoryNavList = new Category_Nav_List({ name, slug, categories });
    const newCategoryNavList = await categoryNavList.save();
    return res.status(201).json(newCategoryNavList);
  } catch (error) {
    errorResponse(error);
  }
};

const updateCategoryNavlist = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const { categories, category } = req.body;

    const check = Array.isArray(categories);

    // push single category in categories
    if (!check && category) {
      const updateList = await Category_Nav_List.findOneAndUpdate(
        { slug },
        { $push: { categories: category } },
        { new: true, upsert: true }
      );

      return res.status(200).json(updateList);
    }

    // update full categories
    const updateList = await Category_Nav_List.findOneAndUpdate(
      { slug },
      { $set: { categories: categories } },
      { new: true, upsert: true }
    );

    return res.status(200).json(updateList);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteCategoryNavlist = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const deletedCategoryNavList = await Category_Nav_List.findOneAndDelete({ slug });
    return res.status(201).json(deletedCategoryNavList);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteOneCategoryFromNavlist = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { categoryNavListSlug, categorySlug } = req.body;

    const category = await Category.findOne({ slug: categorySlug });

    const categoryNavList = await Category_Nav_List.findOne({
      $and: [{ slug: categoryNavListSlug }, { categories: { $in: category._id } }],
    });

    if (category && categoryNavList) {
      // remove category from nav list list
      await Category_Nav_List.updateOne(
        { slug: categoryNavListSlug },
        { $pull: { categories: { $in: category._id } } }
      );

      // delete main category
      await Category.deleteOne({ _id: category._id });

      // remove category from products
      await Product.updateMany(
        { categories: category.name },
        { $pull: { categories: { $in: category.name } } }
      );

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
  deleteCategoryNavlist,
  updateCategoryNavlist,
  getAllCategoryNavlist,
  postNewCategoryNavlist,
  getCategoryNavlistBySlug,
  deleteOneCategoryFromNavlist,
};
