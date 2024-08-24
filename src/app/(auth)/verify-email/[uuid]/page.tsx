"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema } from "@/lib/validations";
import { verifyOtpAndHash } from "@/app/actions/actions";
import { toast } from "sonner";

export default function VerifyEmailPage({
  params,
}: {
  params: {
    uuid: string;
  };
}) {
  const { uuid: hash } = params;
  const [isVerifying, setIsVerifying] = useState(false);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    setIsVerifying(true);
    // TODO: Implement OTP verification logic here
    console.log(values);
    // Simulating API call
    const result = await verifyOtpAndHash(values.otp, hash);
    console.log(result);
    if (result.error) {
      toast.error(result.error);
    }
    setIsVerifying(false);
  }

  return (
    <div className="container max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Verify Your Email</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter OTP</FormLabel>
                <FormControl>
                  <Controller
                    name="otp"
                    control={form.control}
                    render={({ field }) => (
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    )}
                  />
                </FormControl>
                <FormDescription>
                  Please enter the 6-digit code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isVerifying || !form.formState.isValid}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
          <div className="text-center mt-4">
            <a href="/login" className="text-blue-500 hover:underline">
              Back to Login
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}
