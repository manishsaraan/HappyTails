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
  onFormSubmission: (petData: Omit<Pet, "id">) => void;
  selectedPet?: Pet;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the form element
    const form = event.currentTarget;

    // Create a FormData object from the form
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const owner = formData.get("owner") as string;
    const imageUrl = formData.get("image-url") as string;
    const age = parseInt(formData.get("age") as string);
    const notes = formData.get("notes") as string;

    // Convert FormData to a plain object
    const petData = {
      name: name,
      ownerName: owner,
      imageUrl:
        imageUrl ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: age,
      notes: notes,
    };
    // Log the pet data
    console.log("Pet Data:", petData);

    onFormSubmission(petData);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>{heading}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
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
            name="owner"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
            required
          />
        </div>
        <div className="space-y-1  mb-4">
          <Label htmlFor="image-url">Image URL</Label>
          <Input
            id="image-url"
            name="image-url"
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
          <Button type="submit">
            {actionType === "add" ? "Add a new pet" : "Edit a pet"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
