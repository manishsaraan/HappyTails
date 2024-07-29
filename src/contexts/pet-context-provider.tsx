"use client";

import {
  addPetAction,
  deletePetAction,
  editPetAction,
} from "@/app/actions/actions";
import { Pet, PetData, PetId } from "@/lib/types";
import React, { useState, createContext, useOptimistic } from "react";
import { toast } from "sonner";

type PetContextType = {
  pets: Pet[];
  selectedPetId: PetId | null;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleChangeSelectedPetId: (id: PetId) => void;
  handleCheckoutPet: (id: PetId) => Promise<void>;
  handleAddPet: (formData: PetData) => Promise<void>;
  handleEditPet: (formData: PetData, selectedPetId: PetId) => Promise<void>;
};

export const PetContext = createContext<PetContextType | null>(null);

export default function PetContextProvider({
  children,
  pets: data,
}: {
  children: React.ReactNode;
  pets: Pet[];
}) {
  // initial state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [
            ...state,
            {
              ...payload,
              id: Date.now().toString(),
            },
          ];
        case "edit":
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload.data } : pet
          );
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<PetId | null>(null);

  // derived State
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const noOfPets = optimisticPets.length;
  // handlers
  const handleChangeSelectedPetId = (id: PetId) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: PetId) => {
    // setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setOptimisticPets({
      action: "delete",
      payload: petId,
    });
    const result = await deletePetAction(petId);
    if (result.success) {
      toast.success(result.success);
    }
    if (result.error) {
      toast.error(result.error);
    }

    setSelectedPetId(null);
  };

  const handleAddPet = async (petData: PetData) => {
    setOptimisticPets({ action: "add", payload: petData });

    const result = await addPetAction(petData);
    if (result && result.error) {
      toast.warning(result.error);
      return;
    }

    toast.success(result?.success);
  };

  const handleEditPet = async (formData: PetData, selectedPetId: PetId) => {
    setOptimisticPets({
      action: "edit",
      payload: { id: selectedPetId, data: formData },
    });

    const result = await editPetAction(formData, selectedPetId);
    if (result && result.error) {
      toast.warning(result.error);
      return;
    }

    toast.success(result?.success);
    // setPets((prevPets) =>
    //   prevPets.map((p) => (p.id === selectedPetId ? { ...p, ...pet } : p))
    // );
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
