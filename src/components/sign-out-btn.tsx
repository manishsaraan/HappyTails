"use client";
import { signOut } from "next-auth/react";
import React, { useTransition } from "react";
import { Button } from "./ui/button";

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();
  function handleSignOut() {
    signOut({ callbackUrl: "/" }); // Ensure correct usage of signOut
  }

  return (
    <Button
      onClick={async () => {
        startTransition(() => {
          handleSignOut();
        });
      }}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
}
