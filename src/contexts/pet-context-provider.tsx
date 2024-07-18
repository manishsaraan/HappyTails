"use client";

import { addPetAction } from "@/app/actions/actions";
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
  handleEditPet: (pet: Omit<Pet, "id">, selectedPetId: string) => void;
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

  const handleAddPet = async (pet: Omit<Pet, "id">) => {
    //setPets((prevPets) => [...prevPets, { ...pet, id: Date.now().toString() }]);
  };

  const handleEditPet = (pet: Omit<Pet, "id">, selectedPetId: string) => {
    setPets((prevPets) =>
      prevPets.map((p) => (p.id === selectedPetId ? { ...p, ...pet } : p))
    );
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
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
