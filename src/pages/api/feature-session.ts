import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SK!, { apiVersion: '2023-10-16' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { eventId } = req.body;
  if (!eventId) return res.status(400).json({ error: 'Missing eventId' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Feature Event (24h)' },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      metadata: { eventId },
      success_url: process.env.NEXT_PUBLIC_BASE_URL + '/?featured=success',
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/?featured=cancel',
    });
    res.status(200).json({ sessionId: session.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
