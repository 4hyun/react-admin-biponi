import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import User from "../model/User";
import ExtendNextApiRequest from "../utils/extendRequest";
import errorResponse from "__server__/utils/error";

// setup stripe
export const stripe = new Stripe(process.env.STRIPE_KEY!, { apiVersion: "2022-11-15" });

// get stripe customer if exists
export const findStripeCustomer = async (email: string) => {
  return (await stripe.customers.list({ email })).data;
};

const createNewStripeCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = req.body;
    const findCustomer = await findStripeCustomer(email);
    if (findCustomer && findCustomer.length > 0) {
      return res.status(200).json(findCustomer[0]);
    }
    const customer = await stripe.customers.create({ email });
    return res.status(200).json(customer);
  } catch (error) {
    errorResponse(error);
  }
};

const getAllCardsForSingleUser = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const user = await User.findById(req.user);
    const customer = await findStripeCustomer(user.email);

    if (customer && customer.length > 0) {
      const customerSource = await stripe.customers.listSources(customer[0].id, { object: "card" });
      const cardList = customerSource.data;

      const cards = cardList.map((card: any) => ({
        name: card.name,
        cardId: card.id,
        cardType: card.brand,
        cardLast4: card.last4,
        cardExpYear: card.exp_year,
        cardExpMonth: card.exp_month,
      }));

      return res.status(200).json(cards);
    }
    res.setHeader("Cache-Control", "s-maxage=10");
    return res.status(200).json({ message: "No Card Available" });
  } catch (error) {
    errorResponse(error);
  }
};

const createNewCard = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const {
      cardName,
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVC,
      country,
      postal_code,
      customerId,
    } = req.body;

    const cardToken = await stripe.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC,
        address_country: country,
        address_zip: postal_code,
      },
    });

    const createdCard = await stripe.customers.createSource(customerId, { source: cardToken.id });
    return res.status(200).json(createdCard);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteCard = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const cardId = req.query.cardId as string;

    const user = await User.findById(req.user);
    const customer = await findStripeCustomer(user.email);

    if (customer && customer.length > 0) {
      const deleteCard = await stripe.customers.deleteSource(customer[0].id, cardId);
      return res.status(200).json(deleteCard);
    } else {
      res.status(400);
      throw new Error("Customer not found!");
    }
  } catch (error) {
    errorResponse(error);
  }
};

const chargeFromCard = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const { amount, customerId, cardId } = req.body;

    if (!amount || !customerId || !cardId) {
      res.status(400);
      throw new Error("Necessary Card Details are required for One Time Payment");
    }

    const user = await User.findById(req.user);
    const charged = await stripe.charges.create({
      source: cardId,
      currency: "USD",
      customer: customerId,
      amount: amount * 100,
      receipt_email: user.email,
      description: `Charged Amount is ${amount}`,
    });

    return res.status(201).json(charged);
  } catch (error) {
    errorResponse(error);
  }
};

const chargeFormNewCard = async (req: ExtendNextApiRequest, res: NextApiResponse) => {
  try {
    const {
      amount,
      country,
      cardCVC,
      cardName,
      cardNumber,
      cardExpYear,
      postal_code,
      cardExpMonth,
    } = req.body;

    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
      throw new Error("Necessary Card Details are required for One Time Payment");
    }

    const user = await User.findById(req.user);
    const cardToken = await stripe.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC,
        address_country: country,
        address_zip: postal_code,
      },
    });

    const charged = await stripe.charges.create({
      currency: "USD",
      amount: amount * 100,
      source: cardToken.id,
      receipt_email: user.email,
      description: `Charged Amount is ${amount}`,
    });

    return res.status(201).json(charged);
  } catch (error) {
    errorResponse(error);
  }
};

export default {
  deleteCard,
  createNewCard,
  chargeFromCard,
  chargeFormNewCard,
  createNewStripeCustomer,
  getAllCardsForSingleUser,
};
