"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { logInAction, registerAction } from "@/app/actions/actions";
import { AuthFormBtn } from "./auth-form-btn";
import { useFormState } from "react-dom";

const AuthForm = ({ type }: { type: "login" | "register" }) => {
  const [signupError, dispatchSignup] = useFormState(registerAction, undefined);
  const [loginError, dispatchLogin] = useFormState(logInAction, undefined);

  return (
    <form
      action={type === "login" ? dispatchLogin : dispatchSignup}
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
      {type === "register" && signupError && (
        <p className="text-red-500">{signupError.error}</p>
      )}
      {type === "login" && loginError && (
        <p className="text-red-500">{loginError.error}</p>
      )}
      <div className="space-y-1">
        <AuthFormBtn type={type} />
      </div>
    </form>
  );
};

export default AuthForm;
