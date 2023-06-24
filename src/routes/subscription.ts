import express from 'express';
import Stripe from 'stripe';

const subscriptionRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2022-11-15',
});

type UserOptions = {
  email: string;
  name: string;
  address: Stripe.Address;
  metadata: {
    internalId: string
  };
}

const handleMissingInfoError = ({ email, name, address, metadata } : UserOptions) => {
  if (!email) throw new Error('Email not provided or undefined.');
  if (!name) throw new Error('Name not provided or undefined.');
  if (!address) throw new Error('Address not provided or undefined.');
  if (!metadata.internalId) throw new Error('Internal customer ID not provided or undefined.');
};

subscriptionRouter.post('/create-customer', async (req, res) => {
  const { email, name, address, metadata } = req.body;
  try {
    handleMissingInfoError({ email, name, address, metadata });
    const customer = await stripe.customers.create({
      email,
      name,
      address,
      metadata
    });

    console.log('customer', customer);
    res.status(201).send(customer);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

subscriptionRouter.post('/create-subscription', async (req, res) => {
  const customerId = req.body.customerId;
  const priceId = req.body.priceId

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent']
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const payentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    res.status(201).send({
      subscriptionId: subscription.id,
      clientSecret: payentIntent.client_secret
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

subscriptionRouter.get('/plans', async (req, res) => {
  try {
    const plans = await stripe.products.list();
    res.status(200).send(plans);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

export {
  subscriptionRouter
};