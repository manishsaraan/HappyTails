import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text(); // Read the raw body as text
    const signature = req.headers.get("stripe-signature");

    // verify stripe webhook
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody, // Use raw body here
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Hook verification failed" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed":
        await prisma.subscription.create({
          data: {
            userId: event.data.object.metadata.userId,
            stripeCustomerId: event.data.object.customer,
            stripeSubscriptionId: event.data.object.subscription,
            paymentType: event.data.object.mode,
            expiresAt: new Date(event.data.object.expires_at * 1000),
          },
        });

        await prisma.user.update({
          where: {
            email: event.data.object.customer_email,
          },
          data: {
            hasAccess: true,
          },
        });

        // send email to user
        return NextResponse.json({ message: "success" }, { status: 200 });
      case "invoice.payment_succeeded":
        await prisma.subscription.update({
          where: { stripeSubscriptionId: event.data.object.subscription },
          data: {
            expiresAt: new Date(event.data.object.expires_at * 1000),
          },
        });
        // send email to user
        return NextResponse.json({ message: "success" }, { status: 200 });
      case "customer.subscription.deleted":
        await prisma.subscription.delete({
          where: { stripeSubscriptionId: event.data.object.subscription },
        });
        // send email to user
        return NextResponse.json({ message: "success" }, { status: 200 });
      case "customer.subscription.updated":
        await prisma.subscription.update({
          where: { stripeSubscriptionId: event.data.object.subscription },
          data: {
            expiresAt: new Date(event.data.object.expires_at * 1000),
          },
        });
        // send email to user
        return NextResponse.json({ message: "success" }, { status: 200 });
      case "invoice.payment_failed":
        // send email to user
        return NextResponse.json({ message: "success" }, { status: 200 });
      default:
        return NextResponse.json({ message: "success" }, { status: 200 });
    }
  } catch (error) {
    console.log(error, "********************error");
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
