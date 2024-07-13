import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

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
  if (actionType === "add") {
    return (
      <Button className="h-14 w-14" size={"icon"} onClick={onHandleClick}>
        <PlusIcon />
      </Button>
    );
  }

  if (actionType === "edit") {
    return (
      <Button
        className="bg-zinc-300 hover:bg-zinc-300"
        variant={"secondary"}
        onClick={onHandleClick}
      >
        {children}
      </Button>
    );
  }

  if (actionType === "delete") {
    return (
      <Button
        className="bg-zinc-300 hover:bg-zinc-300"
        variant={"secondary"}
        onClick={onHandleClick}
      >
        {children}
      </Button>
    );
  }

  return null;
}
