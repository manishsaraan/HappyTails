"use server";

import { signIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { authSchema, petIdSchema, petSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { checkAuth, createPet, getPetByPetId } from "@/lib/server-utils";
import { AuthError } from "next-auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const addPetAction = async (
  formData: unknown
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    const session = await checkAuth();

    const result = petSchema.safeParse(formData);
    if (!result.success) {
      return { error: "Invalid form data" };
    }

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

    const result = petSchema.safeParse(formData);

    const parsedPetId = petIdSchema.safeParse(petId);

    if (!result.success || !parsedPetId.success) {
      return { error: "Invalid form data" };
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

    await prisma.pet.update({
      where: { id: parsedPetId.data },
      data: result.data,
    });

    revalidatePath("/app", "layout");
    return { success: "Pet edited successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to edit pet" };
  }
};

export const deletePetAction = async (
  petId: unknown
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

    console.log(pet);
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
    console.log(formData, "********************login");
    await signIn("credentials", formData);
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
