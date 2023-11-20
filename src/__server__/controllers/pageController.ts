import { NextApiRequest, NextApiResponse } from "next";
import generateSlug from "__server__/lib/slugify";
import Page from "../model/Page";
import errorResponse from "__server__/utils/error";

const getAllPage = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const pages = await Page.find().sort("-createdAt");
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(201).json(pages);
  } catch (error) {
    errorResponse(error);
  }
};

const getOnePage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const page = await Page.findOne({ slug });
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json(page);
  } catch (error) {
    errorResponse(error);
  }
};

const postNewPage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, content } = req.body;
    const slug = generateSlug(name);

    const findPage = await Page.findOne({ slug });
    if (findPage) {
      res.status(400);
      throw new Error("Page already created with this name");
    }

    const page = new Page({ name, slug, content });
    const createdPage = await page.save();
    return res.status(201).json(createdPage);
  } catch (error) {
    errorResponse(error);
  }
};

const updatePage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const updatePage = await Page.findOneAndUpdate(
      { slug },
      { $set: req.body },
      { new: true, upsert: true }
    );
    return res.status(200).json(updatePage);
  } catch (error) {
    errorResponse(error);
  }
};

const deletePage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const deletePage = await Page.findOneAndDelete({ slug });
    return res.status(200).json(deletePage);
  } catch (error) {
    errorResponse(error);
  }
};

export default { getAllPage, postNewPage, getOnePage, updatePage, deletePage };
