"use client";
import { signOut } from "next-auth/react";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { deleteAccount } from "@/app/actions/actions";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function DeleteAccountBtn() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} disabled={isPending}>
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant={"destructive"}
              onClick={async () => {
                startTransition(async () => {
                  await deleteAccount();
                  signOut({ callbackUrl: "/" });
                });
                setOpen(false);
              }}
              disabled={isPending}
            >
              Yes, Delete Account
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
