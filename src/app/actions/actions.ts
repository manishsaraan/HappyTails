"use server";

import { signIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { PetData, PetId } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petIdSchema, petSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const addPetAction = async (
  formData: unknown
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    console.log(formData);
    const result = petSchema.safeParse(formData);
    if (!result.success) {
      return { error: "Invalid form data" };
    }

    await sleep(1000);
    await prisma.pet.create({
      data: result.data,
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
    console.log(formData);
    await sleep(1000);

    const result = petSchema.safeParse(formData);
    const parsedPetId = petIdSchema.safeParse(petId);

    if (!result.success || !parsedPetId.success) {
      return { error: "Invalid form data" };
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
    const parsedPetId = petIdSchema.safeParse(petId);
    if (!parsedPetId.success) {
      return { error: "Invalid pet ID" };
    }

    await sleep(1000);
    await prisma.pet.delete({
      where: { id: parsedPetId.data },
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
  formData: FormData
): Promise<{
  success?: string;
  error?: string;
}> => {
  const result = await signIn("credentials", formData);

  if (result?.error) {
    console.error("Login failed:", result.error);
    return { error: result.error };
  }

  if (result?.ok) {
    console.log("Login successful, redirecting...");
    redirect("/app/dashboard");
  }

  return result;
};

export const registerAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    email: formData.get("email") as string,
    hashedPassword: hashedPassword,
  };

  console.log(user);

  await prisma.user.create({
    data: user,
  });

  await logInAction(formData);
};
