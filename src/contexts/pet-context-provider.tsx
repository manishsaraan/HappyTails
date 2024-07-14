"use client";

import { Pet } from "@/lib/types";
import React, { useState, createContext } from "react";

type PetContextType = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (pet: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

export default function PetContextProvider({
  children,
  pets: petsData,
}: {
  children: React.ReactNode;
  pets: Pet[];
}) {
  // initial state
  const [pets, setPets] = useState<Pet[]>(petsData);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived State
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const noOfPets = pets.length;
  // handlers
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleAddPet = (pet: Omit<Pet, "id">) => {
    setPets((prevPets) => [...prevPets, { ...pet, id: Date.now().toString() }]);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        noOfPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
