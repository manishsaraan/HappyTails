"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import PetForm from "./pet-form";

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
          onFormSubmission={() => setOpen(false)}
          actionType={actionType}
          heading="Add a new pet"
        />
      </DialogContent>
    </Dialog>
  );
}
