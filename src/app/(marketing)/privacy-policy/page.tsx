import Logo from "@/components/logo";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row justify-center items-center gap-10">
      <section>
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className="text-3xl font-bold mt-4">HappyTails Privacy Policy</h1>
        </div>
        <div className="max-w-4xl mt-6 text-left">
          <p className="mb-4">
            Welcome to HappyTails. We are committed to protecting your privacy.
            This Privacy Policy outlines how we collect, use, and protect your
            information when you use our software.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            When you sign up for HappyTails, we collect personal information
            such as your name, email address, and other contact details. We also
            collect information about your pets, including their name, age, and
            other details relevant to the services we provide. Additionally, we
            store information about your subscription status, including payment
            history and subscription terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use your personal information to provide you with access to the
            HappyTails platform and its features. This includes creating and
            managing pet profiles, processing payments, and managing your
            subscription. We may also use your information to communicate with
            you about updates, promotions, or changes to our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            3. Data Retention and Deletion
          </h2>
          <p className="mb-4">
            Your data is retained as long as your account is active. If you
            choose to delete your account, all associated data, including pet
            profiles and subscription information, will be permanently deleted
            from our servers. We take this process seriously to ensure that your
            data is fully removed from our system.
          </p>

          <h2 className="text-2xl font-semibold mt-8">4. Data Security</h2>
          <p className="mb-4">
            We implement a variety of security measures to maintain the safety
            of your personal information. Your data is stored in secure
            databases and protected against unauthorized access.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            5. Third-Party Services
          </h2>
          <p className="mb-4">
            We do not share your personal information with third-party services
            except as necessary to process payments or as required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-8">6. Your Consent</h2>
          <p className="mb-4">
            By using HappyTails, you consent to our Privacy Policy. If we make
            changes to this policy, we will notify you through our platform or
            via email.
          </p>

          <h2 className="text-2xl font-semibold mt-8">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at support@happytails.com.
          </p>
        </div>
      </section>
    </main>
  );
}
