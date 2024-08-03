import "server-only";

import prisma from "./db";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Session } from "next-auth";
import { Pet, Prisma } from "@prisma/client";
import { PetId } from "./types";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getPetByPetId(petId: PetId, select: Prisma.PetSelect) {
  const query: Prisma.PetFindUniqueArgs = {
    where: { id: petId },
  };

  if (select) {
    query.select = select;
  }

  const pet = await prisma.pet.findUnique(query);

  return pet;
}

export async function createPet(pet: Prisma.PetCreateArgs) {
  const newPet = await prisma.pet.create(pet);
  return newPet;
}

export async function getPetsByUserId(userId: string) {
  const pets = await prisma.pet.findMany({
    where: {
      userId: userId,
    },
  });

  return pets;
}
export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user;
}
