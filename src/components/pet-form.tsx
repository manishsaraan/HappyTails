"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pet, PetData } from "@/lib/types";
import { usePetContext } from "@/hooks/pet-context-hook";
import { petSchema, TPetFormData } from "@/lib/validations";

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
  const { handleAddPet, handleEditPet } = usePetContext();
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<TPetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name || "",
            age: selectedPet?.age || 0,
            ownerName: selectedPet?.ownerName || "",
            imageUrl: selectedPet?.imageUrl || "",
            notes: selectedPet?.notes || "",
          }
        : {},
  });

  const onSubmit: SubmitHandler<TPetFormData> = async (data) => {
    onFormSubmission(); // closing it before action because of optimistic UI
    let result;
    if (actionType === "add") {
      result = await handleAddPet(data);
    } else if (actionType === "edit") {
      result = await handleEditPet(data, selectedPet!.id);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{heading}</DialogTitle>
      </DialogHeader>
      <form
        action={async () => {
          const result = await trigger();
          if (!result) {
            return;
          }

          const formDataObj: TPetFormData = getValues();

          formDataObj.imageUrl =
            formDataObj.imageUrl ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";
          await onSubmit(formDataObj);
        }}
      >
        <div className="space-y-1 mb-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="owner">Owner</Label>
          <Input id="owner" {...register("ownerName")} />
          {errors.ownerName && (
            <span className="text-red-500">{errors.ownerName.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="image-url">Image URL</Label>
          <Input id="image-url" {...register("imageUrl")} />
          {errors.imageUrl && (
            <span className="text-red-500">{errors.imageUrl.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" {...register("age")} />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <span className="text-red-500">{errors.notes.message}</span>
          )}
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
  return (
    <Button type="submit">
      {actionType === "add" ? "Add a new pet" : "Edit a pet"}
    </Button>
  );
};
