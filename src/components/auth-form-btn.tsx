"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const AuthFormBtn = ({ type }: { type: "login" | "register" }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {type === "login" ? "Login" : "Register"}
    </Button>
  );
};
