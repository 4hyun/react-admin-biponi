import { NextApiRequest, NextApiResponse } from "next";
import generateSlug from "__server__/lib/slugify";
import Product_Type from "__server__/model/ProductType";
import errorResponse from "__server__/utils/error";

const getAllProductType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const getProductTypes = await Product_Type.find().populate("products");
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(getProductTypes);
  } catch (error) {
    errorResponse(error);
  }
};

const getOneProductType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const getProductType = await Product_Type.findOne({ slug }).populate("products");
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(getProductType);
  } catch (error) {
    errorResponse(error);
  }
};

const createNewProductType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, products, heading, description } = req.body;
    const slug = generateSlug(heading);

    // check products length
    if (!products.length || products.length < 3) {
      res.status(400);
      throw new Error("added minimum 3 products in list");
    }

    const findSlug = await Product_Type.findOne({ slug });

    if (findSlug) {
      res.status(400);
      throw new Error("List already exists with given heading name");
    }

    const productType = new Product_Type({ name, slug, products, heading, description });
    const createdProductType = await productType.save();
    return res.status(201).json(createdProductType);
  } catch (error) {
    errorResponse(error);
  }
};

const updateProductType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const { name, products, heading, description } = req.body;

    // check products length
    if (!products.length || products.length < 3) {
      res.status(400);
      throw new Error("added minimum 3 products in list");
    }

    const productType = await Product_Type.find({ slug });

    if (productType) {
      const newSlug = heading ? generateSlug(heading) : slug;

      await Product_Type.updateOne(
        { slug },
        { name, description, heading, products, slug: newSlug },
        { new: true }
      );
      return res.status(200).json({ msg: "updated successfully" });
    } else {
      res.status(400);
      throw new Error("Product Type Not Found!");
    }
  } catch (error) {
    errorResponse(error);
  }
};

const deleteProductType = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const deletedProductType = await Product_Type.findOneAndDelete({ slug });
    return res.status(200).json(deletedProductType);
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  getAllProductType,
  createNewProductType,
  getOneProductType,
  updateProductType,
  deleteProductType,
};
