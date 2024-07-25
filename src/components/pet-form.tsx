"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<PetData>({
    defaultValues: {
      name: selectedPet?.name || "",
      age: selectedPet?.age || 0,
      ownerName: selectedPet?.ownerName || "",
      imageUrl: selectedPet?.imageUrl || "",
      notes: selectedPet?.notes || "",
    },
  });

  const onSubmit: SubmitHandler<PetData> = async (data) => {
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
        // onSubmit={handleSubmit(onSubmit)}
        action={async (formData: FormData) => {
          const result = await trigger();
          if (!result) {
            return;
          }
          const formDataObj: PetData = {
            name: formData.get("name") as string,
            ownerName: formData.get("ownerName") as string,
            imageUrl: formData.get("imageUrl") as string,
            age: parseInt(formData.get("age") as string),
            notes: formData.get("notes") as string,
          };

          await onSubmit(formDataObj);
        }}
      >
        <div className="space-y-1 mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
              maxLength: {
                value: 20,
                message: "Name must be at most 20 characters long",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="owner">Owner</Label>
          <Input
            id="owner"
            {...register("ownerName", {
              required: "Owner is required",
              minLength: {
                value: 2,
                message: "Owner must be at least 2 characters long",
              },
            })}
          />
          {errors.ownerName && (
            <span className="text-red-500">{errors.ownerName.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="image-url">Image URL</Label>
          <Input
            id="image-url"
            {...register("imageUrl", {
              required: "Image URL is required",
            })}
          />
          {errors.imageUrl && (
            <span className="text-red-500">{errors.imageUrl.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
            })}
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register("notes", {
              required: "Notes are required",
              minLength: {
                value: 2,
                message: "Notes must be at least 2 characters long",
              },
              maxLength: {
                value: 100,
                message: "Notes must be at most 100 characters long",
              },
            })}
          />
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
