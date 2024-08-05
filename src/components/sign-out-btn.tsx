"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";

export default function SignOutBtn({ onClick }: { onClick: () => void }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          await onClick();
        });
      }}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
}
