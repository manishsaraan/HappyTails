"use client";

import { Pet } from "@/lib/types";
import React, { useState, createContext } from "react";

type PetContextType = {
  pets: Pet[];
  selectedPetId: string | null;
};

export const PetContext = createContext<PetContextType | null>(null);

export default function PetContextProvider({
  children,
  pets: petsData,
}: {
  children: React.ReactNode;
  pets: Pet[];
}) {
  const [pets, setPets] = useState(petsData);
  const [selectedPetId, setSelectedPetId] = useState(null);
  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
