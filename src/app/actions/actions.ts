"use server";

import Prisma from "@/lib/db";
import { PetData, PetId } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const addPetAction = async (
  formData: PetData
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    console.log(formData);
    await sleep(1000);
    await Prisma.pet.create({
      data: formData,
    });

    revalidatePath("/app", "layout");
    return { success: "Pet added successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add pet" };
  }
};

export const editPetAction = async (
  formData: PetData,
  petId: PetId
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    console.log(formData);
    await sleep(1000);
    await Prisma.pet.update({
      where: { id: petId },
      data: formData,
    });

    revalidatePath("/app", "layout");
    return { success: "Pet edited successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to edit pet" };
  }
};

export const deletePetAction = async (
  petId: PetId
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    await sleep(1000);
    await Prisma.pet.delete({
      where: { id: petId },
    });

    revalidatePath("/app", "layout");
    return { success: "Pet deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete pet" };
  }
};
