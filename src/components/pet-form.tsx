import React, { useState, useEffect } from "react";
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
import PhoneInput from "react-phone-input-2";
import { petSchemaWithoutImage, TPetFormData } from "@/lib/validations";
import UploadImageBtn from "./upload-image-btn";
import "react-phone-input-2/lib/style.css";

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
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [rawPhone, setRawPhone] = useState<string>("");

  useEffect(() => {
    if (selectedPet && selectedPet.ownerPhone) {
      setRawPhone(selectedPet.ownerPhone);
    }
  }, [selectedPet]);

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
            ownerEmail: selectedPet?.ownerEmail || "",
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

    const petData: PetData = {
      ...data,
      imageUrl,
      ownerPhone: rawPhone,
      suggestions: [],
    };

    if (actionType === "add") {
      console.log(petData, "imageFile");
      handleAddPet(petData);
    } else if (actionType === "edit") {
      handleEditPet(petData, selectedPet!.id);
    }
  };

  const handleOnChange = (value: string, data: any) => {
    setRawPhone(value);
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
          <Input
            placeholder="Enter the name of the pet"
            id="name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="owner">Owner Name</Label>
          <Input
            placeholder="Enter the name of the owner"
            id="owner"
            {...register("ownerName")}
          />
          {errors.ownerName && (
            <span className="text-red-500">{errors.ownerName.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="ownerEmail">Owner Email</Label>
          <Input
            placeholder="Enter the email of the owner"
            id="ownerEmail"
            {...register("ownerEmail")}
          />
          {errors.ownerEmail && (
            <span className="text-red-500">{errors.ownerEmail.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="ownerPhone">Owner Phone</Label>
          <PhoneInput
            value={rawPhone}
            onChange={handleOnChange}
            country="in"
            containerClass="w-full"
          />
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="image-url">Pet Image</Label>
          <UploadImageBtn
            imageUrl={actionType === "edit" ? selectedPet?.imageUrl : null}
            onUpload={handleImageUpload}
            setIsUploading={setIsUploading}
            isUploading={isUploading}
          />
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="age">Age</Label>
          <Input
            placeholder="Enter the age of the pet"
            id="age"
            type="number"
            {...register("age")}
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-1 mb-4">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            placeholder="Enter any additional information about the pet"
            id="notes"
            {...register("notes")}
          />
          {errors.notes && (
            <span className="text-red-500">{errors.notes.message}</span>
          )}
        </div>
        <DialogFooter>
          <SubmitButton actionType={actionType} isUploading={isUploading} />
        </DialogFooter>
      </form>
    </>
  );
}

const SubmitButton = ({
  actionType,
  isUploading,
}: {
  actionType: "add" | "edit" | "delete";
  isUploading: boolean;
}) => {
  return (
    <Button type="submit" disabled={isUploading}>
      {actionType === "add" ? "Add a new pet" : "Edit a pet"}
    </Button>
  );
};
