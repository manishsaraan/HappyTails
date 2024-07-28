import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AuthForm = () => {
  return (
    <form className="space-y-2">
      <div className="space-y-1">
        <label htmlFor="email">Email</label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="password">Password</label>
        <Input type="password" id="password" name="password" required />
      </div>
      <div className="space-y-1">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default AuthForm;
