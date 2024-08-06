import { NextRequest } from "next/server";
import prisma from "@/lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
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
    return Response.json(
      { message: "Hook verification failed" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email,
        },
        data: {
          hasAccess: true,
        },
      });
      return Response.json({ message: "success" });
      break;
    default:
      return Response.json({ message: "success" });
  }
}
