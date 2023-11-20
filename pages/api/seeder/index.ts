import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "__server__/db";
import errorHandler from "__server__/lib/errorHandler";
import noMatchHandler from "__server__/lib/noMatchHandler";
import generateSlug from "__server__/lib/slugify";
import Address from "__server__/model/Address";
import Category from "__server__/model/Category";
import Category_Nav_List from "__server__/model/CategoryNavList";
import Delivery_Time from "__server__/model/DeliveryTime";
import Order from "__server__/model/Order";
import Page from "__server__/model/Page";
import Payment from "__server__/model/Payment";
import Product from "__server__/model/Product";
import Product_Type from "__server__/model/ProductType";
import Service from "__server__/model/Service";
import Service_Type from "__server__/model/ServiceType";
import Settings from "__server__/model/Settings";
import User from "__server__/model/User";
import categories from "__server__/seed-data/categories";
import delivery_times from "__server__/seed-data/delivery_times";
import pages from "__server__/seed-data/pages";
import products from "__server__/seed-data/products";
import services from "__server__/seed-data/services";
import settings from "__server__/seed-data/settings";
import users from "__server__/seed-data/users";
import { Product as ProductType, Service as ServiceType } from "__types__/common";

// create api router with next-connect
const router = createRouter<NextApiRequest, NextApiResponse>();

const createNavList = (cat: any[]) => {
  const navlist = "Grocery Category Nav List";
  const ids = cat.map(({ _id }) => _id);
  const slug = generateSlug(navlist);
  return { name: navlist, slug, categories: ids };
};

const createServiceType = (services: ServiceType[]) => {
  const type = "Grocery Service List";
  const ids = services.map(({ _id }) => _id);
  const slug = generateSlug(type);
  return { name: type, slug, services: ids };
};

const createProductTypes = (products: ProductType[]) => {
  const ids = products.slice(0, 4).map(({ _id }) => _id);
  const heading = "Trending Products";
  const slug = generateSlug(heading);

  return {
    slug,
    heading,
    products: ids,
    name: "Trending Products Slider",
    description: "Best collection in 2021 for you!",
  };
};

// connect database
connectDB();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await User.deleteMany();
    await Page.deleteMany();
    await Order.deleteMany();
    await Payment.deleteMany();
    await Address.deleteMany();
    await Product.deleteMany();
    await Service.deleteMany();
    await Category.deleteMany();
    await Settings.deleteMany();
    await Service_Type.deleteMany();
    await Product_Type.deleteMany();
    await Delivery_Time.deleteMany();
    await Category_Nav_List.deleteMany();

    await Page.insertMany(pages);
    await User.insertMany(users).then(async (data) => {
      await Address.insertMany([
        {
          name: "Ui Office",
          street1: "25th Street, General Area",
          street2: "",
          phone: "01828895567",
          city: "Sylhet",
          state: "Sylhet",
          country: "Bangladesh",
          zip: "43366",
          user: data[0]._id,
        },
        {
          name: "Ui Office",
          street1: "25th Street, General Area",
          street2: "",
          phone: "01828895567",
          city: "Sylhet",
          state: "Sylhet",
          country: "Bangladesh",
          zip: "43366",
          user: data[1]._id,
        },
      ]);
    });

    await Settings.insertMany(settings);
    await Delivery_Time.insertMany(delivery_times);

    await Product.insertMany(products).then(async (data) => {
      const navList = createProductTypes(data);
      await Product_Type.insertMany(navList);
    });

    Category.insertMany(categories).then(async (data) => {
      const navList = createNavList(data);
      await Category_Nav_List.insertMany(navList);
    });

    await Service.insertMany(services).then(async (data) => {
      const service_list = createServiceType(data);
      await Service_Type.insertMany(service_list);
    });

    return res.send("seeding completed");
  } catch (error: any) {
    throw new Error(error.message);
  }
});

// create a handler from router with custom onError and onNoMatch
export default router.handler({
  onError: errorHandler,
  onNoMatch: noMatchHandler,
});
