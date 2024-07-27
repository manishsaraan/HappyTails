"use server";

import Prisma from "@/lib/db";
import { PetData, PetId } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petIdSchema, petSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

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
    await Prisma.pet.create({
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

    await Prisma.pet.update({
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
    await Prisma.pet.delete({
      where: { id: parsedPetId.data },
    });

    revalidatePath("/app", "layout");
    return { success: "Pet deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete pet" };
  }
};
