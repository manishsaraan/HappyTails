"use server";

import { signIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { emails } from "@/constants/messages";
import SignUpEmail from "../../../emails/signup";
import {
  authSchema,
  emailSchema,
  petIdSchema,
  petSchemaWithImage,
  suggestionsSchema,
  updatePasswordSchema,
  verifyOTPSchema,
} from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import {
  checkAuth,
  createPet,
  getPetByPetId,
  getPetsByUserId,
  getUserByEmail,
} from "@/lib/server-utils";
import { AuthError } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";
import { resend } from "@/lib/resend";
import ThanksEmail from "../../../emails/thanks";
import { createEmailContent } from "@/lib/openai";
import ResetPasswordEmail from "../../../emails/reset-password";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

export const addPetAction = async (
  formData: unknown
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    const session = await checkAuth();

    const result = petSchemaWithImage.safeParse(formData);
    if (!result.success) {
      return { error: "Invalid form data" };
    }
    try {
      await resend.emails.send({
        from: emails.from,
        subject: emails.welcome.subject,
        to: "manish.knovatek@gmail.com",
        react: SignUpEmail({
          baseUrl: "https://happytails.com",
          otp: "123456",
        }),
      });
    } catch (error) {
      console.error(error);
    }
    console.log(result.data, "result.data");

    await createPet({
      data: {
        ...result.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidatePath("/app", "layout");
    return { success: "Pet added successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add pet" };
  }
};

export const editPetAction = async (
  formData: unknown,
  petId: unknown
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    const session = await checkAuth();
    console.log(formData);

    const result = petSchemaWithImage.safeParse(formData);

    const parsedPetId = petIdSchema.safeParse(petId);

    if (!result.success || !parsedPetId.success) {
      return { error: "Invalid form data" };
    }

    const pet = await getPetByPetId(parsedPetId.data, {
      userId: true,
      id: true,
      imageUrl: true,
    });

    if (!pet) {
      return { error: "Pet not found" };
    }

    if (pet.userId !== session.user.id) {
      return { error: "Not authorized" };
    }

    const updateData = { ...result.data };
    if (!updateData.imageUrl) {
      updateData.imageUrl = pet.imageUrl;
    }

    await prisma.pet.update({
      where: { id: parsedPetId.data },
      data: updateData,
    });

    revalidatePath("/app", "layout");
    return { success: "Pet edited successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to edit pet" };
  }
};

export const deletePetAction = async (
  petId: unknown,
  suggestions: string
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    const session = await checkAuth();

    const parsedPetId = petIdSchema.safeParse(petId);
    if (!parsedPetId.success) {
      return { error: "Invalid pet ID" };
    }

    const parsedSuggestions = suggestionsSchema.safeParse({ suggestions });
    if (!parsedSuggestions.success) {
      return { error: "Invalid suggestions" };
    }

    const pet = await getPetByPetId(parsedPetId.data, {
      userId: true,
      id: true,
    });

    if (!pet) {
      return { error: "Pet not found" };
    }

    if (pet.userId !== session.user.id) {
      return { error: "Not authorized" };
    }

    // send email to user
    const content = await createEmailContent(
      pet.notes,
      suggestions,
      pet.name,
      pet.ownerName
    );

    await resend.emails.send({
      from: emails.from,
      subject: content.subject,
      to: session.user.email as string,
      react: ThanksEmail({
        baseUrl: process.env.NEXT_PUBLIC_APP_URL!,
        reviewLink: `${process.env.NEXT_PUBLIC_APP_URL}/review`,
        petName: pet.name,

        content: content.content,
      }),
    });

    await prisma.pet.delete({
      where: { id: pet.id },
    });

    revalidatePath("/app", "layout");
    return { success: "Pet deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete pet" };
  }
};

// user actions
export const logInAction = async (
  prevState: unknown,
  formData: unknown
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (!(formData instanceof FormData)) {
    return {
      error: "Invalid form data.",
    };
  }

  try {
    await signIn("credentials", formData);
    redirect("/app/dashboard");
    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            error: "Wrong email or password.",
          };
        }
        default: {
          return {
            error: "Error.1 Could not sign in.",
          };
        }
      }
    }

    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
};

export const registerAction = async (prevState: unknown, formData: unknown) => {
  if (!(formData instanceof FormData)) {
    return {
      error: "Invalid form data.",
    };
  }

  const input = Object.fromEntries(formData.entries());
  const result = authSchema.safeParse(input);
  if (!result.success) {
    return {
      error: "Invalid form data.",
    };
  }

  const password = result.data.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    email: result.data.email,
    hashedPassword: hashedPassword,
  };
  console.log(user, "user");
  try {
    await prisma.user.create({
      data: user,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "User already exists" };
      }
    }
    console.error(error);
    return { error: "Failed to register" };
  }

  await logInAction(prevState, formData);
};

export const deleteAccount = async () => {
  const session = await checkAuth();
  if (!session) {
    return { error: "Not authorized" };
  }

  const user = await getUserByEmail(session.user.email as string);
  if (!user) {
    return { error: "User not found" };
  }

  await prisma.user.delete({
    where: { id: user.id },
  });
};
export const createCheckoutSession = async () => {
  const session = await checkAuth();
  if (!session) {
    return { error: "Not authorized" };
  }

  const user = await getUserByEmail(session.user.email as string);
  if (!user) {
    return { error: "User not found" };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    customer_email: user.email,
    metadata: {
      userId: user.id,
    },
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID_RECURRENING,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?cancelled=false`,
  });
  console.log(stripeSession, "stripeSession");
  redirect(stripeSession.url);
};

export const startTrial = async () => {
  const session = await checkAuth();
  if (!session) {
    return { error: "Not authorized" };
  }

  const user = await getUserByEmail(session.user.email as string);
  if (!user) {
    return { error: "User not found" };
  }

  // crate subscirption with one week trial and save dummy stripe credentis

  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      stripeCustomerId: `dummy_${Math.random().toString(36).substring(2, 15)}`,
      stripeSubscriptionId: `dummy_${Math.random()
        .toString(36)
        .substring(2, 15)}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      paymentType: "trial",
    },
  });

  redirect("/payment?success=true");
};

export const getPets = async (userId: string) => {
  const pets = await getPetsByUserId(userId);
  return pets;
};

function generateOtp(length: number): number {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return Number(otp);
}

export const sendResetPasswordEmail = async (
  email: string
): Promise<{ hash: string; error?: string }> => {
  const validation = emailSchema.safeParse({ email });
  const hash = uuidv4();

  if (!validation.success) {
    console.error(validation.error.errors[0].message);
    return { hash };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    console.error("User not found");
    return { hash };
  }

  const otp = generateOtp(6);

  console.log("otp", otp);

  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      otp: otp,
      hash: hash,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expire in 15 minutes
    },
  });

  try {
    resend.emails.send({
      from: emails.from,
      subject: "Reset Your Password - HappyTails",
      to: email,
      react: ResetPasswordEmail({
        baseUrl: process.env.NEXT_PUBLIC_APP_URL!,
        otp: otp,
      }),
    });
  } catch (error) {
    console.error(error);
    return { hash };
  }

  // Don't return if user is registered or not.
  // Just send users to verify email page. If they are actually registered then they will get email otherwise not.
  return { hash };
};

export const verifyOtpAndHash = async (otp: unknown, hash: unknown) => {
  const result = verifyOTPSchema.safeParse({
    otp: otp,
    hash: hash,
  });

  if (!result.success) {
    return { error: "Invalid OTP format" };
  }

  console.log(result.data);
  const passwordReset = await prisma.passwordReset.findFirst({
    where: {
      otp: +result.data.otp,
      hash: result.data.hash,
    },
  });

  if (!passwordReset) {
    return { error: "Invalid OTP" };
  }

  if (passwordReset.expiresAt <= new Date()) {
    return { error: "OTP has expired" };
  }

  redirect(`/reset-password?hash=${hash}`);
};

export const updatePassword = async (password: unknown, hash: unknown) => {
  const result = updatePasswordSchema.safeParse({
    password: password,
    hash: hash,
  });

  if (!result.success) {
    return { error: "Invalid input format" };
  }

  console.log();
  const passwordReset = await prisma.passwordReset.findFirst({
    where: {
      hash: result.data.hash,
    },
  });

  if (!passwordReset) {
    return { error: "Unable to reset password" };
  }

  if (passwordReset.expiresAt <= new Date()) {
    return { error: "Reset password link has expired" };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  await prisma.user.update({
    where: {
      id: passwordReset.userId,
    },
    data: {
      hashedPassword: hashedPassword,
    },
  });

  await prisma.passwordReset.deleteMany({
    where: {
      userId: passwordReset.userId,
    },
  });

  return { success: true };
};
