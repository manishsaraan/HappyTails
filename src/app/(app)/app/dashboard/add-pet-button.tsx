"use client";

import PetButton from "@/components/pet-button";

export default function AddPetButton() {
  return (
    <div className="absolute bottom-4 right-4">
      <PetButton actionType="add" onHandleClick={() => {}}>
        Add
      </PetButton>
    </div>
  );
}
