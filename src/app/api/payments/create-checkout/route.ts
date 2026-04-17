import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

type CheckoutPlan = "starter" | "pro";

interface CheckoutBody {
  plan?: CheckoutPlan;
}

function getStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  return new Stripe(secretKey);
}

const PRICE_MAP: Record<CheckoutPlan, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
};

export async function POST(request: Request) {
  try {
    const stripe = getStripeClient();
    if (!stripe) {
      return NextResponse.json({ success: false, error: "Stripe is not configured." }, { status: 500 });
    }

    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as CheckoutBody;
    const plan = body.plan;

    if (!plan || !["starter", "pro"].includes(plan)) {
      return NextResponse.json({ success: false, error: "Invalid plan." }, { status: 400 });
    }

    const priceId = PRICE_MAP[plan];
    if (!priceId) {
      return NextResponse.json({ success: false, error: "Price is not configured." }, { status: 500 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
    }

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user._id.toString() },
      });
      customerId = customer.id;
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      return NextResponse.json({ success: false, error: "App URL is not configured." }, { status: 500 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?payment=success`,
      cancel_url: `${appUrl}/pricing?payment=cancelled`,
      metadata: {
        userId: user._id.toString(),
        plan,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}
