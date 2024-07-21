"use server";

import Prisma from "@/lib/db";
import { Pet } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const addPetAction = async (
  formData: FormData
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    console.log(formData);
    await sleep(2000);
    await Prisma.pet.create({
      data: {
        name: formData.get("name") as string,
        age: parseInt(formData.get("age") as string),
        ownerName: formData.get("ownerName") as string,
        imageUrl: formData.get("imageUrl") as string,
        notes: formData.get("notes") as string,
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
  formData: FormData,
  petId: string
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    console.log(formData);
    await sleep(2000);
    await Prisma.pet.update({
      where: { id: petId },
      data: {
        name: formData.get("name") as string,
        age: parseInt(formData.get("age") as string),
        ownerName: formData.get("ownerName") as string,
        imageUrl: formData.get("imageUrl") as string,
        notes: formData.get("notes") as string,
      },
    });

    revalidatePath("/app", "layout");
    return { success: "Pet edited successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to edit pet" };
  }
};

export const deletePetAction = async (
  petId: string
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    await sleep(2000);
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
