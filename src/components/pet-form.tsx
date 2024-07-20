"use client";

import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pet } from "@/lib/types";
import { addPetAction } from "@/app/actions/actions";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

/**
 * PetForm component
 */
export default function PetForm({
  heading,
  actionType,
  onFormSubmission,
  selectedPet,
}: {
  heading: string;
  actionType: "add" | "edit" | "delete";
  onFormSubmission: () => void;
  selectedPet?: Pet;
}) {
  // const [state, formAction] = useFormState(addPetAction, {});

  const handleSubmit = async (formData: FormData) => {
    console.log(formData);
    onFormSubmission();
    const { error, success } = await addPetAction(formData);
    if (error) {
      toast.warning(error);
      return;
    }

    toast.success(success);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>{heading}</DialogTitle>
      </DialogHeader>
      <form action={handleSubmit}>
        <div className="space-y-1  mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
            required
          />
        </div>
        <div className="space-y-1  mb-4">
          <Label htmlFor="owner">Owner</Label>
          <Input
            id="owner"
            name="ownerName"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
            required
          />
        </div>
        <div className="space-y-1  mb-4">
          <Label htmlFor="image-url">Image URL</Label>
          <Input
            id="image-url"
            name="imageUrl"
            type="url"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
            required
          />
        </div>
        <div className="space-y-1  mb-4">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
            required
          />
        </div>
        <div className="space-y-1  mb-4">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
            required
          />
        </div>
        <DialogFooter>
          <SubmitButton actionType={actionType} />
        </DialogFooter>
      </form>
    </>
  );
}

const SubmitButton = ({
  actionType,
}: {
  actionType: "add" | "edit" | "delete";
}) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {actionType === "add" ? "Add a new pet" : "Edit a pet"}
    </Button>
  );
};
