"use client";

import { usePetContext } from "@/hooks/pet-context-hook";
import { useSearchContext } from "@/hooks/search-context-hook";
import { Pet } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import PetImage from "./pet-image";
import { Separator } from "./ui/separator";

function PetListItem({
  pet,
  selectedPetId,
  handleChangeSelectedPetId,
}: {
  pet: Pet;
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
}) {
  return (
    <li key={pet.id}>
      <button
        onClick={() => handleChangeSelectedPetId(pet.id)}
        className={cn(
          "flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 focus:bg-[#eff1f2] hover:bg-[#eff1f2]",
          {
            "bg-[#eff1f2]": selectedPetId === pet.id,
          }
        )}
      >
        <PetImage
          imageUrl={pet.imageUrl}
          width={45}
          height={45}
          className="h-[45px] w-[45px]"
        />
        <p className="font-semibold">{pet.name}</p>
      </button>
      <Separator />
    </li>
  );
}

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { search } = useSearchContext();
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {filteredPets.map((pet: Pet) => (
        <PetListItem
          key={pet.id}
          pet={pet}
          selectedPetId={selectedPetId}
          handleChangeSelectedPetId={handleChangeSelectedPetId}
        />
      ))}
    </ul>
  );
}
