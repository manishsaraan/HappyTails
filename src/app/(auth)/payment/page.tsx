"use client";
import { createCheckoutSession, startTrial } from "@/app/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Payment({
  searchParams,
}: {
  searchParams: {
    success?: string;
    cancelled?: string;
  };
}) {
  const [isPending, startTransition] = useTransition();
  const { update, data: session, status } = useSession();
  const router = useRouter();
  const success = searchParams.success;
  const cancelled = searchParams.cancelled;

  return (
    <div className="flex flex-col items-center justify-center  space-y-10">
      <H1>One time payment is required to access HappyTails</H1>
      {!success ? (
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-black-400 w-full text-center ">
            You will be charged {"\u20B9"}2999 after 7 days of free trial.
          </p>
          <Button
            disabled={isPending}
            onClick={async () => {
              startTransition(() => {
                startTrial();
              });
            }}
          >
            Start free trial
          </Button>
          {/* <p className="text-sm text-gray-400 w-full text-center ">or</p>
          <Button>Buy recurring access for $9.99</Button> */}
        </div>
      ) : (
        <Button
          disabled={status === "loading"}
          onClick={async () => {
            await update({ hasAccess: true });
            router.push("/app/dashboard");
          }}
        >
          Access HappyTails
        </Button>
      )}
      {success && (
        <p className="text-green-500 text-sm mt-1 animate-pulse">
          Free trail active. Now you have full access to HappyTails.
        </p>
      )}
      {cancelled && (
        <p className="text-red-500 text-sm mt-1">
          Free trail cancelled. Please try again.
        </p>
      )}
    </div>
  );
}
