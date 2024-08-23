import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePetContext } from "@/hooks/pet-context-hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pet } from "@prisma/client";
import { suggestionsSchema, SuggestionsSchemaT } from "@/lib/validations";
import { useState } from "react";
import { maxChars } from "@/constants/messages";

export function CheckoutDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedPet,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  selectedPet: Pet;
}) {
  const { handleCheckoutPet } = usePetContext();
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SuggestionsSchemaT>({
    resolver: zodResolver(suggestionsSchema),
  });

  const deletePet = async (data: SuggestionsSchemaT) => {
    await handleCheckoutPet(selectedPet.id, data.suggestions || "");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please enter suggestions </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const isValid = await trigger();
            if (isValid) {
              const formDataObj: SuggestionsSchemaT = getValues();
              await deletePet(formDataObj);
            }
          }}
        >
          <div className="relative">
            <Textarea
              placeholder="Enter any suggestions here..."
              className="min-h-[200px]"
              {...register("suggestions")}
              onChange={(e) => setCharCount(e.target.value.length)}
              maxLength={maxChars}
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {charCount}/{maxChars}
            </div>
          </div>
          {errors.suggestions && (
            <p className="text-red-500">{errors.suggestions.message}</p>
          )}
          <DialogFooter className="mt-3">
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
