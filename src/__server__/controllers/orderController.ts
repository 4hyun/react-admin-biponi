import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import Stripe from "stripe";
import Order from "../model/Order";
import Payment from "../model/Payment";
import Product from "../model/Product";
import User from "../model/User";
import { stripe } from "./stripeController";
import ExtendNextApiRequest from "../utils/extendRequest";
import errorResponse from "__server__/utils/error";

// caching instance
const cache = new NodeCache({ stdTTL: 30 });

// create card token
const createCardToken = (card: any) => {
  return stripe.tokens.create({
    card: {
      name: card.cardHolderName,
      number: card.cardNumber,
      exp_month: card.cardMonth,
      exp_year: card.cardYear,
      cvc: card.cardCVC,
      address_country: card.address.country,
      address_zip: card.address.zip,
    },
  });
};

// create charge from card
type CreateCharge = { source: string; amount: number; customer: string };

const createCharge = ({ source, amount, customer }: CreateCharge) => {
  return stripe.charges.create({
    source,
    customer,
    currency: "USD",
    amount: Math.round(amount * 100),
    description: `Charged Amount is ${amount}`,
  });
};

const createNewOrder = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const { values, customerId, amount, tax, items, subTotal } = req.body;

    const {
      cardCVC,
      cardNumber,
      cardYear,
      cardMonth,
      cardHolderName,
      checkCard,
      card,
      address,
      date,
      time,
      paymentType,
    } = values;

    const user = await User.findById(req.user);

    const orderData = {
      tax,
      items,
      paymentType,
      total: amount,
      customerId: user._id,
      preTaxTotal: subTotal,
      expectedDeliveryDate: date,
      expectedDeliveryTime: time,
      shipping: {
        email: user.email,
        name: address.name,
        city: address.city,
        phone: address.phone,
        postalCode: address.zip,
        country: address.country,
        address: address.street1 + address.street2,
      },
    };
    // create a new order
    const order = await Order.create(orderData);

    if (paymentType === "card") {
      let charged: Stripe.Response<Stripe.Charge> | null = null;

      if (!checkCard && cardCVC && cardNumber && cardYear && cardMonth && cardHolderName) {
        const cardToken = await createCardToken({
          cardHolderName,
          cardNumber,
          cardMonth,
          cardYear,
          cardCVC,
          address,
        });

        if (values.cardSaved) {
          const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
          charged = await createCharge({ amount, source: card.id, customer: customerId });
        } else {
          const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
          charged = await createCharge({ amount, source: card.id, customer: customerId });
          await stripe.customers.deleteSource(customerId, card.id);
        }
      }

      if (card && checkCard) {
        charged = await createCharge({ amount, source: card.cardId, customer: customerId });
      }

      if (charged) {
        const payment = await Payment.create({
          customerId: user._id,
          status: charged.status,
          gateway: "stripe",
          type: charged.payment_method_details?.type,
          amount: charged.amount / 100,
          token: charged.id,
          card: {
            brand: charged.payment_method_details?.card?.brand,
            panLastFour: charged.payment_method_details?.card?.last4,
            expirationMonth: charged.payment_method_details?.card?.exp_month,
            expirationYear: charged.payment_method_details?.card?.exp_year,
          },
        });

        await Order.findByIdAndUpdate(
          { _id: order._id },
          { paymentId: payment._id, paymentStatus: payment.status },
          { new: true, upsert: true }
        );
      }
    }

    // decrement the product stock
    items.forEach(async (item: { productId: string; quantity: number }) => {
      const product = await Product.findOne({ _id: item.productId });
      const newQuantity = product.skus[0].quantity - item.quantity;
      product.skus[0].quantity = newQuantity;

      await Product.updateOne({ _id: product._id }, { $set: product });
    });

    cache.del("orders");
    return res.status(201).json({ message: "Order created Successfully" });
  } catch (error) {
    errorResponse(error);
  }
};

const getAllOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (cache.has("orders")) {
      return res.status(200).json(JSON.parse(cache.get("orders")!));
    }

    const orders = await Order.find({}).sort("-createdAt");
    cache.set("orders", JSON.stringify(orders));
    return res.status(200).json(orders);
  } catch (error) {
    errorResponse(error);
  }
};

const getOrderById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (cache.has(`order-${id}`)) {
      return res.status(200).json(JSON.parse(cache.get(`order-${id}`)!));
    }

    const order = await Order.findById(id).populate(["items.productId", "paymentId"]);

    if (!order) {
      res.status(404);
      throw new Error("Order Not Found!");
    }

    cache.set(`order-${id}`, JSON.stringify(order));
    return res.status(200).json(order);
  } catch (error: unknown) {
    errorResponse(error);
  }
};

const getSingleUserOrders = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const KEY = `orders-${req.user}`;
    if (cache.has(KEY)) {
      return res.status(200).json(JSON.parse(cache.get(KEY)!));
    }

    const orders = await Order.find({ customerId: req.user }).sort("-createdAt");
    cache.set(KEY, JSON.stringify(orders));
    return res.status(200).json(orders);
  } catch (error: unknown) {
    errorResponse(error);
  }
};

const updateOrderById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const updateOrder = await Order.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, upsert: true }
    );

    cache.del(`order-${id}`);
    return res.status(200).json(updateOrder);
  } catch (error: unknown) {
    errorResponse(error);
  }
};

const deleteOrderById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const deleteOrder = await Order.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, upsert: true }
    );

    cache.del(`order-${id}`);
    return res.status(200).json(deleteOrder);
  } catch (error: unknown) {
    errorResponse(error);
  }
};

export default {
  getAllOrder,
  getOrderById,
  createNewOrder,
  deleteOrderById,
  updateOrderById,
  getSingleUserOrders,
};
