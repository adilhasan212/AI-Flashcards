import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Function to format currency amount for Stripe API
const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100) // Convert amount to cents
}

// Handle GET request: Retrieve checkout session details
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')

  try {
    // Retrieve checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    return NextResponse.json(checkoutSession)
  } catch (error) {
    console.error('Error retrieving checkout session: ', error)
    return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  }
}

// Handle POST request: Create a new checkout session
export async function POST(req) {
  const params = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pro Subscription'
          },
          unit_amount: formatAmountForStripe(10), // Price in cents
          recurring: {
            interval: 'month',
            interval_count: 1,
          }
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
  }

  // Create checkout session with Stripe
  const checkoutSession = await stripe.checkout.sessions.create(params);

  return NextResponse.json(checkoutSession, { status: 200 })
}
