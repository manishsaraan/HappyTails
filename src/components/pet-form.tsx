import React, { useState } from "react";
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
import {
  basePetSchema,
  petSchemaWithoutImage,
  TPetFormData,
} from "@/lib/validations";
import UploadImageBtn from "./upload-image-btn";
import { toast } from "sonner";

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
  const [imageFile, setImageFile] = useState<string | null>(null);

  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<TPetFormData>({
    resolver: zodResolver(petSchemaWithoutImage),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name || "",
            age: selectedPet?.age || 0,
            ownerName: selectedPet?.ownerName || "",
            notes: selectedPet?.notes || "",
          }
        : {},
  });

  console.log(errors, getValues());
  const handleImageUpload = async (imageUrl: string) => {
    setImageFile(imageUrl);
  };

  const onSubmit: SubmitHandler<TPetFormData> = async (data) => {
    onFormSubmission(); // closing it before action because of optimistic UI

    // Perform the necessary actions, like adding or editing the pet
    const imageUrl = imageFile || "";

    if (actionType === "add") {
      console.log({ ...data, imageUrl }, "imageFile");
      handleAddPet({ ...data, imageUrl });
    } else if (actionType === "edit") {
      handleEditPet({ ...data, imageUrl }, selectedPet!.id);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{heading}</DialogTitle>
      </DialogHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await trigger();
          if (isValid) {
            const formDataObj: TPetFormData = getValues();
            await onSubmit(formDataObj);
          }
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
          <UploadImageBtn
            imageUrl={actionType === "edit" ? selectedPet?.imageUrl : null}
            onUpload={handleImageUpload}
          />
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
