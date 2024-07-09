import { PetContext } from "@/contexts/pet-context-provider";
import { useContext } from "react";

export function usePetContext() {
  const ctx = useContext(PetContext);

  if (!ctx) {
    throw new Error("usePetContext must be used inside PetContext");
  }

  return ctx;
}
