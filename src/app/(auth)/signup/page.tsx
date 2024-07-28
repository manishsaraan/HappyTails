import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <div className="w-[300px]">
      <H1 className="text-center">Signup</H1>
      <AuthForm />
      <p className="mt-4">
        No Account yet?{" "}
        <Link className="text-zinc-500 mt-5 text-sm" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
