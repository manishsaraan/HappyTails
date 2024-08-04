import { Pet } from "@prisma/client";

export type PetData = Omit<Pet, "id" | "createdAt" | "updatedAt" | "userId">;
export type { Pet };
export type PetId = Pet["id"];
