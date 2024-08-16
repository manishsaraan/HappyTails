"use client";

import {
  addPetAction,
  deletePetAction,
  editPetAction,
  getPets,
} from "@/app/actions/actions";
import { Pet, PetData, PetId } from "@/lib/types";
import React, {
  useState,
  createContext,
  useOptimistic,
  useEffect,
} from "react";
import { toast } from "sonner";

type PetContextType = {
  pets: Pet[];
  selectedPetId: PetId | null;
  selectedPet: Pet | undefined;
  noOfPets: number;
  loading: boolean;
  handleChangeSelectedPetId: (id: PetId) => void;
  handleCheckoutPet: (id: PetId) => Promise<void>;
  handleAddPet: (formData: PetData) => Promise<void>;
  handleEditPet: (formData: PetData, selectedPetId: PetId) => Promise<void>;
};

export const PetContext = createContext<PetContextType | null>(null);

export default function PetContextProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  // initial state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
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

  useEffect(() => {
    getUserPets(userId);
  }, [userId]);
  // derived State
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const noOfPets = optimisticPets.length;
  // handlers
  const handleChangeSelectedPetId = (id: PetId) => {
    setSelectedPetId(id);
  };

  const getUserPets = async (userId: string) => {
    setLoading(true);
    const pets = await getPets(userId);
    setPets(pets);
    setLoading(false);
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
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        noOfPets,
        loading,
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
