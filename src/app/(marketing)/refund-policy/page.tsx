import Logo from "@/components/logo";
import React from "react";

export default function RefundPolicy() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row justify-center items-center gap-10">
      <section>
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className="text-3xl font-bold mt-4">HappyTails Refund Policy</h1>
        </div>
        <div className="max-w-4xl mt-6 text-left">
          <p className="mb-4">
            At HappyTails, we are committed to providing a great experience for
            our users. This Refund Policy outlines the conditions under which
            you may request a refund for your subscription.
          </p>

          <h2 className="text-2xl font-semibold mt-8">1. Refund Eligibility</h2>
          <p className="mb-4">
            You are eligible for a full refund if you request it within 14 days
            of purchasing your subscription. Refund requests made after this
            14-day period will not be honored.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            2. How to Request a Refund
          </h2>
          <p className="mb-4">
            To request a refund, please contact our support team at{" "}
            <a href="mailto:support@happytails.com" className="text-blue-600">
              support@happytails.com
            </a>
            . In your email, include your account details, the date of purchase,
            and the reason for the refund request. Our team will review your
            request and respond within 5-7 business days.
          </p>

          <h2 className="text-2xl font-semibold mt-8">3. Refund Process</h2>
          <p className="mb-4">
            If your refund request is approved, the refund will be issued to the
            original payment method used at the time of purchase. Please allow
            up to 10 business days for the refund to reflect in your account,
            depending on your bank or payment provider.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            4. No Refunds After 14 Days
          </h2>
          <p className="mb-4">
            After the 14-day refund window has passed, no refunds will be
            issued. We recommend that you fully utilize our 7-day free trial to
            ensure that HappyTails meets your needs before committing to a
            purchase.
          </p>

          <h2 className="text-2xl font-semibold mt-8">5. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or need further assistance regarding this
            Refund Policy, please reach out to us at{" "}
            <a href="mailto:support@happytails.com" className="text-blue-600">
              support@happytails.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
