import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import generateSlug from "../lib/slugify";
import { deleteFile, deleteFiles } from "../middleware/uploadMiddleware";
import Settings from "../model/Settings";
import errorResponse from "__server__/utils/error";
import ProductImage from "__types__/product-image";

// cache instance
const cache = new NodeCache({ stdTTL: 60 * 3 });

// ===========================================================
// next api request extend
interface ExtendApiRequest extends NextApiRequest {
  file?: Express.MulterS3.File;
  files?: Express.MulterS3.File[];
}
// ===========================================================

// site footer settings controller
const footerSettings = async (req: ExtendApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("footer")) {
      return res.status(200).json(JSON.parse(cache.get("footer")!));
    }

    const { description, setting_name } = req.body;

    const slug = generateSlug(setting_name);
    const findSetting = await Settings.findOne({ slug });

    const column_two = JSON.parse(req.body.column_two);
    const column_three = JSON.parse(req.body.column_three);
    const column_four = JSON.parse(req.body.column_four);

    if (findSetting) {
      if (req.file && findSetting.logo?.key) {
        await deleteFile(findSetting.values.site_logo.key);
      }

      const values = {
        column_two: column_two || findSetting.values.column_two,
        description: description || findSetting.values.description,
        column_three: column_three || findSetting.values.column_three,
        column_four: column_four || findSetting.values.column_four,
        logo: req.file
          ? { key: req.file.key, location: req.file.location }
          : findSetting.values.logo,
      };

      const updateSetting = await Settings.updateOne(
        { slug },
        { $set: { name: setting_name, slug, values } },
        { new: true }
      );

      cache.del("footer");
      return res.status(200).json(updateSetting);
    }

    const values = {
      column_two,
      column_four,
      description,
      column_three,
      logo: req.file ? { key: req.file.key, location: req.file.location } : {},
    };

    const setting = new Settings({ name: setting_name, slug, values });
    const createdSetting = await setting.save();

    cache.set("footer", JSON.stringify(createdSetting));
    return res.status(200).json(createdSetting);
  } catch (error) {
    errorResponse(error);
  }
};

// general site settings controller
const generalSiteSettings = async (req: ExtendApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("site-settings")) {
      return res.status(200).json(JSON.parse(cache.get("site-settings")!));
    }

    const { site_name, site_description, site_banner_text, setting_name } = req.body;
    const slug = generateSlug(setting_name);

    const findSetting = await Settings.findOne({ slug });

    // @ts-ignore
    const logo = req.files?.["logo"]?.[0];
    // @ts-ignore
    const banner = req.files?.["image"]?.[0];

    if (findSetting) {
      if (logo) {
        await deleteFile(findSetting.values.site_logo.key);
      }

      if (banner && findSetting.values?.site_banner?.key) {
        await deleteFile(findSetting.values.site_banner.key);
      }

      const values = {
        site_name: site_name || findSetting.values.site_name,
        site_description: site_description || findSetting.values.site_description,
        site_banner_text: site_banner_text || findSetting.values.site_banner_text,
        site_logo: logo ? { key: logo.key, location: logo.location } : findSetting.values.site_logo,
        site_banner: banner
          ? { key: banner.key, location: banner.location }
          : findSetting.values.site_banner,
      };

      const updateSetting = await Settings.updateOne(
        { slug },
        { $set: { name: setting_name, slug, values } },
        { new: true }
      );
      cache.del("site-settings");
      return res.status(200).json(updateSetting);
    }

    const values = {
      site_name,
      site_description,
      site_banner_text,
      site_logo: { key: logo.key, location: logo.location },
      site_banner: { key: banner.key, location: banner.location },
    };

    const setting = new Settings({ name: setting_name, slug, values });
    const createdSetting = await setting.save();

    cache.set("site-settings", JSON.stringify(createdSetting));
    return res.status(200).json(createdSetting);
  } catch (error) {
    errorResponse(error);
  }
};

// delivery shipping and vat controller
const shippingVatSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, shipping, vat } = req.body;
    const slug = generateSlug(name);

    const findSetting = await Settings.findOne({ slug });

    if (findSetting) {
      const values = {
        vat: vat >= 0 ? vat : findSetting.values.vat,
        shipping_charge: shipping >= 0 ? shipping : findSetting.values.shipping_charge,
      };

      const updateSetting = await Settings.updateOne(
        { slug },
        { $set: { name, slug, values } },
        { new: true }
      );
      return res.status(200).json(updateSetting);
    }

    const values = { shipping_charge: shipping, vat };

    const setting = new Settings({ name, slug, values });
    const createdSetting = await setting.save();

    return res.status(201).json(createdSetting);
  } catch (error) {
    errorResponse(error);
  }
};

// site slide settings controller
const siteSlideSettings = async (req: ExtendApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("slides")) {
      return res.status(200).json(JSON.parse(cache.get("slides")!));
    }

    const setting_name = "Banner Slider Setting";

    let uploadImage: ProductImage[] = [];
    const files = req.files;

    if (files) {
      uploadImage = files.map((file) => ({ key: file.key, location: file.location }));
    }

    const slug = generateSlug(setting_name);
    const findSetting = await Settings.findOne({ slug });

    if (findSetting) {
      const deleteImages = req.body.delete ? JSON.parse(req.body.delete) : null;

      let allImage = [...uploadImage, ...findSetting.values];

      if (deleteImages?.length > 0) {
        // delete from aws s3
        const images = deleteImages.map((item: any) => ({ Key: item.key }));
        await deleteFiles(images);

        allImage = allImage.filter((item) => {
          const find = deleteImages.find((img: any) => img.key === item.key);
          return find ? false : true;
        });
      }

      const updatedSetting = await Settings.updateOne({ slug }, { $set: { values: allImage } });
      cache.del("slides");
      return res.status(200).json(updatedSetting);
    }

    const setting = new Settings({ name: setting_name, slug, values: uploadImage });
    const createdSetting = await setting.save();

    cache.set("slides", JSON.stringify(createdSetting));
    return res.status(200).json(createdSetting);
  } catch (error) {
    errorResponse(error);
  }
};

// site social links settings controller
const socialLinksSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { appLinks, socialLinks, setting_name } = req.body;
    const slug = generateSlug(setting_name);

    const findSetting = await Settings.findOne({ slug });

    if (findSetting) {
      const values = {
        appLinks: appLinks || findSetting.values.appLinks,
        socialLinks: socialLinks || findSetting.values.socialLinks,
      };

      const updateSetting = await Settings.updateOne(
        { slug },
        { $set: { name: setting_name, slug, values } },
        { new: true }
      );
      return res.status(200).json(updateSetting);
    }

    const values = { appLinks, socialLinks };

    const setting = new Settings({ name: setting_name, slug, values });
    const createdSetting = await setting.save();
    return res.status(200).json(createdSetting);
  } catch (error) {
    errorResponse(error);
  }
};

// site topbar settings controller
const siteTopbarSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("topbar")) {
      return res.status(200).json(JSON.parse(cache.get("topbar")!));
    }

    const name = "Topbar Setting";
    const slug = generateSlug(name);

    const { phone, email, links } = req.body;

    const findSetting = await Settings.findOne({ slug });

    if (findSetting) {
      const values = {
        phone: phone || findSetting.values.phone,
        email: email || findSetting.values.email,
        links: links || findSetting.values.links,
      };

      const updateSetting = await Settings.updateOne(
        { slug },
        { $set: { name, slug, values } },
        { new: true }
      );

      cache.del("topbar");
      return res.status(200).json(updateSetting);
    }

    const values = { phone, email, links };

    const setting = new Settings({ name, slug, values });
    const createdSetting = await setting.save();
    cache.set("topbar", JSON.stringify(createdSetting));
    return res.status(201).json(createdSetting);
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  footerSettings,
  siteSlideSettings,
  siteTopbarSettings,
  generalSiteSettings,
  shippingVatSettings,
  socialLinksSettings,
};
