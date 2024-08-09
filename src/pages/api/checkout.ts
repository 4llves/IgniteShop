/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const priceId = 'price_1PgHKsFkZLintRaUxwAZjFWN'

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/',
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
