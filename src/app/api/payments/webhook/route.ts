import { NextResponse } from "next/server";
import Stripe from "stripe";

import { connectDB } from "@/lib/mongodb";
import User, { type UserPlan } from "@/models/User";

function getStripeConfig(): { stripe: Stripe; webhookSecret: string } | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    return null;
  }
  return {
    stripe: new Stripe(secretKey),
    webhookSecret,
  };
}

const PLAN_CREDITS: Record<Exclude<UserPlan, "free">, number> = {
  starter: 50000,
  pro: 999999,
};

function inferPlanFromSession(session: Stripe.Checkout.Session): Exclude<UserPlan, "free"> | null {
  const metadataPlan = session.metadata?.plan;
  if (metadataPlan === "starter" || metadataPlan === "pro") {
    return metadataPlan;
  }

  if (session.amount_total && session.amount_total > 0) {
    return "starter";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const stripeConfig = getStripeConfig();
    if (!stripeConfig) {
      return NextResponse.json(
        { success: false, error: "Invalid webhook configuration." },
        { status: 400 },
      );
    }

    const { stripe, webhookSecret } = stripeConfig;
    await connectDB();

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Invalid webhook configuration." },
        { status: 400 },
      );
    }

    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const customerId =
        typeof session.customer === "string" ? session.customer : session.customer?.id;
      const plan = inferPlanFromSession(session);

      if (!plan || (!userId && !customerId)) {
        return NextResponse.json({ received: true });
      }

      const query = userId ? { _id: userId } : { stripeCustomerId: customerId };
      await User.findOneAndUpdate(query, {
        plan,
        "credits.total": PLAN_CREDITS[plan],
        stripeCustomerId: customerId,
      });
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Webhook processing failed." },
      { status: 400 },
    );
  }
}
