"use server";

import Prisma from "@/lib/db";
import { Pet } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const addPetAction = async (formData: FormData) => {
  console.log(formData);
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
};
