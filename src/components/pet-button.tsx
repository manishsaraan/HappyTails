"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PetForm from "./pet-form";
import { usePetContext } from "@/hooks/pet-context-hook";
import { Pet } from "@/lib/types";
import { flushSync } from "react-dom";

type PetButtonProps = {
  actionType: "add" | "edit" | "delete";
  children: React.ReactNode;
  onHandleClick?: () => void;
  disabled?: boolean;
};

export default function PetButton({
  actionType,
  children,
  onHandleClick,
  disabled,
}: PetButtonProps) {
  const [open, setOpen] = useState(false);
  const { selectedPet } = usePetContext();

  const handlePetSubmission = () => {
    // if (actionType === "add") {
    //   handleAddPet(petData);
    // } else if (actionType === "edit") {
    //   handleEditPet(petData, selectedPet!.id);
    // }

    flushSync(() => {
      setOpen(false);
    });
  };

  const handleSecondaryClick = () => {
    if (actionType === "edit") {
      setOpen(true);
    } else {
      setOpen(false);
      onHandleClick?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {actionType === "add" ? (
        <Button
          className="h-14 w-14"
          size={"icon"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusIcon />
        </Button>
      ) : (
        <Button
          className="bg-zinc-300 hover:bg-zinc-300"
          variant={"secondary"}
          onClick={handleSecondaryClick}
        >
          {children}
        </Button>
      )}

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
