"use client";

import { usePetContext } from "@/hooks/pet-context-hook";
import { Pet } from "@/lib/types";
import Image from "next/image";
import React from "react";

type PetListProp = {
  pets: Pet[];
};

export default function PetList() {
  const { pets } = usePetContext();
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map((pet: Pet) => (
        <li key={pet.id}>
          <button className="flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 focus:bg-[#eff1f2] hover:bg-[#eff1f2]">
            <Image
              src={pet.imageUrl}
              alt="pet image"
              width={45}
              height={45}
              className="h-[45px] w-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
