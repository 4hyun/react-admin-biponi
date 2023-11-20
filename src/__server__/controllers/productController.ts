import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import { deleteFiles } from "../middleware/uploadMiddleware";
import Product from "../model/Product";
import errorResponse from "__server__/utils/error";

// cache instance
const cache = new NodeCache({ stdTTL: 20 });

// next api request extend type
interface ExtendApiRequest extends NextApiRequest {
  files?: Express.MulterS3.File[];
}

type ProductImage = { key: string; location: string };

const getAllProduct = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("products")) {
      return res.status(200).json(JSON.parse(cache.get("products")!));
    }

    const getProducts = await Product.find({}).sort("-createdAt");
    cache.set("products", JSON.stringify(getProducts));
    return res.status(200).json(getProducts);
  } catch (error) {
    errorResponse(error);
  }
};

const getOneProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (cache.has(`product-${id}`)) {
      return res.status(200).json(JSON.parse(cache.get(`product-${id}`)!));
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("Product Not Found!");
    }

    cache.set(`product-${id}`, JSON.stringify(product));
    return res.status(200).json(product);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);

    const images = product.skus[0]?.image?.map((item: ProductImage) => ({ Key: item.key }));

    if (images?.length > 0) {
      await deleteFiles(images);
    }

    const deleteProduct = await Product.deleteOne({ _id: id });

    cache.del(`product-${id}`);
    return res.status(200).json(deleteProduct);
  } catch (error) {
    errorResponse(error);
  }
};

const searchProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { search } = req.body;

    if (search) {
      // const products = await Product.find({ $text: { $search: search } });
      const products = await Product.find({ item: { $regex: search, $options: "i" } });
      return res.status(200).json(products);
    }
    return res.status(200).json([]);
  } catch (error) {
    errorResponse(error);
  }
};

const createNewProduct = async (req: ExtendApiRequest, res: NextApiResponse) => {
  try {
    const files = req.files;

    let images: ProductImage[] = [];

    if (files) {
      images = files.map((file) => ({ key: file.key, location: file.location }));
    }

    const { name, category, description, stock, price, discount, tags, unit } = req.body;

    const productData = {
      item: name,
      tags: JSON.parse(tags),
      description: description,
      categories: JSON.parse(category),
      features: ["Fresh", "Without Formaline"],
      skus: [
        {
          unit,
          color: [],
          sku: name,
          quantity: stock,
          image: images,
          price: { base: price, currency: "USD", discount: discount || 0 },
        },
      ],
    };

    const product = new Product(productData);
    const createdProduct = await product.save();

    cache.del("products");
    return res.status(201).json(createdProduct);
  } catch (error) {
    errorResponse(error);
  }
};

const updateProduct = async (req: ExtendApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const {
      name,
      categories,
      description,
      stock,
      price,
      discount,
      tags,
      features,
      unit,
      deleteImages,
    } = req.body;

    // find product via id
    const product = await Product.findById(id);

    let images = [...product.skus[0].image];

    // push new upload images
    if (req.files && req.files.length > 0) {
      req.files.forEach(({ key, location }) => images.push({ key, location }));
    }

    if (product) {
      const deleteExistingImage = JSON.parse(deleteImages);

      if (deleteExistingImage && deleteExistingImage.length > 0) {
        await deleteFiles(deleteExistingImage);

        images = images.filter((item) => {
          const find = deleteExistingImage.find((img: any) => img.Key === item.key);
          return find ? false : true;
        });
      }

      const productData = {
        item: name || product.item,
        tags: tags ? JSON.parse(tags) : product.tags,
        description: description || product.description,
        features: features ? JSON.parse(features) : product.features,
        categories: categories ? JSON.parse(categories) : product.categories,
        skus: [
          {
            unit: unit || product.skus[0].unit,
            color: product.skus[0].color,
            sku: product.skus[0].sku,
            quantity: +stock >= 0 ? +stock : product.skus[0].quantity,
            image: images,
            price: {
              currency: "USD",
              base: +price || product.skus[0].price.base,
              discount: +discount || product.skus[0].price.discount,
            },
          },
        ],
      };

      const updateProduct = await Product.findByIdAndUpdate(
        id,
        { $set: productData },
        { new: true, upsert: true }
      );

      cache.del(`product-${id}`);
      return res.status(201).json(updateProduct);
    }
  } catch (error) {
    errorResponse(error);
  }
};

const getProductsByCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const products = await Product.find({ categories: slug });
    return res.status(200).json(products);
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  getAllProduct,
  searchProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  createNewProduct,
  getProductsByCategory,
};
