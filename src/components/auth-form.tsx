import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logInAction, registerAction } from "@/app/actions/actions";
import prisma from "@/lib/db";

const AuthForm = ({ type }: { type: "login" | "register" }) => {
  return (
    <form
      action={type === "login" ? logInAction : registerAction}
      className="space-y-2"
    >
      <div className="space-y-1">
        <label htmlFor="email">Email</label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="password">Password</label>
        <Input type="password" id="password" name="password" required />
      </div>
      <div className="space-y-1">
        <Button type="submit">{type === "login" ? "Login" : "Register"}</Button>
      </div>
    </form>
  );
};

export default AuthForm;
