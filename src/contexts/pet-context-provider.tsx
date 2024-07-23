"use client";

import {
  addPetAction,
  deletePetAction,
  editPetAction,
} from "@/app/actions/actions";
import { Pet } from "@/lib/types";
import React, {
  useState,
  createContext,
  useOptimistic,
  startTransition,
} from "react";
import { toast } from "sonner";

type PetContextType = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (formData: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (
    formData: Omit<Pet, "id">,
    selectedPetId: string
  ) => Promise<void>;
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
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived State
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const noOfPets = optimisticPets.length;
  // handlers
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: string) => {
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

  const handleAddPet = async (petData: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "add", payload: petData });

    const result = await addPetAction(petData);
    if (result && result.error) {
      toast.warning(result.error);
      return;
    }

    toast.success(result?.success);
  };

  const handleEditPet = async (
    formData: Omit<Pet, "id">,
    selectedPetId: string
  ) => {
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
