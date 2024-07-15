"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PetForm from "./pet-form";
import { usePetContext } from "@/hooks/pet-context-hook";
import { Pet } from "@/lib/types";

type PetButtonProps = {
  actionType: "add" | "edit" | "delete";
  children: React.ReactNode;
  onHandleClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  onHandleClick,
}: PetButtonProps) {
  const [open, setOpen] = useState(false);
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();

  const handlePetSubmission = (petData: Omit<Pet, "id">) => {
    if (actionType === "add") {
      handleAddPet(petData);
    } else if (actionType === "edit") {
      handleEditPet(petData, selectedPet!.id);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button className="h-14 w-14" size={"icon"} onClick={onHandleClick}>
            <PlusIcon />
          </Button>
        ) : (
          <Button
            className="bg-zinc-300 hover:bg-zinc-300"
            variant={"secondary"}
            onClick={onHandleClick}
          >
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <PetForm
          onFormSubmission={handlePetSubmission}
          actionType={actionType}
          heading={actionType === "add" ? "Add a new pet" : "Edit pet"}
          selectedPet={selectedPet}
        />
      </DialogContent>
    </Dialog>
  );
}
