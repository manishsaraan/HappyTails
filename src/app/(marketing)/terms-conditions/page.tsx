import Logo from "@/components/logo";
import React from "react";

export default function TermsConditions() {
  return (
    <main className="bg-appBGPrimary text-appBlack min-h-screen flex flex-col xl:flex-row justify-center items-center gap-10">
      <section>
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className="text-3xl font-bold mt-4">
            HappyTails Terms & Conditions
          </h1>
        </div>
        <div className="max-w-4xl mt-6 text-left">
          <p className="mb-4">
            Welcome to HappyTails. By using our software, you agree to comply
            with and be bound by the following terms and conditions. Please read
            these terms carefully before using our service.
          </p>

          <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
          <p className="mb-4">
            These Terms and Conditions (&quot;Terms&quot;) govern your access to
            and use of the HappyTails software (&quot;Service&quot;). By
            accessing or using our Service, you agree to be bound by these
            Terms. If you do not agree with these Terms, you may not use the
            Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8">2. Free Trial</h2>
          <p className="mb-4">
            HappyTails offers a 7-day free trial to new users. During the trial
            period, you will have full access to the software without the need
            to provide payment information. After the trial period ends, you
            must make a one-time payment of {"\u20B9"}2999 to continue using the
            software indefinitely.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            3. Payments and Refunds
          </h2>
          <p className="mb-4">
            Upon the expiration of the free trial, you must complete the payment
            to continue using the Service. We offer a full refund on the
            one-time subscription fee if the request is made within 14 days of
            the purchase. Please review our Refund Policy for more details.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            4. Account and Data Deletion
          </h2>
          <p className="mb-4">
            If you choose to delete your account, all associated data, including
            pet profiles and subscription information, will be permanently
            deleted. This action is irreversible, and HappyTails will not be
            able to recover any data once it has been deleted.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            5. User Responsibilities
          </h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your
            account and password, and for restricting access to your computer or
            device. You agree to accept responsibility for all activities that
            occur under your account. You must not use the Service for any
            illegal or unauthorized purpose.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            6. Modifications to the Service
          </h2>
          <p className="mb-4">
            HappyTails reserves the right to modify or discontinue, temporarily
            or permanently, the Service (or any part thereof) with or without
            notice. We shall not be liable to you or to any third party for any
            modification, price change, suspension, or discontinuance of the
            Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            In no event shall HappyTails, its directors, officers, employees,
            affiliates, or agents, be liable for any indirect, incidental,
            special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your use or inability to use
            the Service; (ii) any unauthorized access to or use of our servers
            and/or any personal information stored therein; (iii) any
            interruption or cessation of transmission to or from the Service;
            (iv) any bugs, viruses, or the like that may be transmitted to or
            through the Service by any third party; or (v) any errors or
            omissions in any content or for any loss or damage incurred as a
            result of the use of any content posted, emailed, transmitted, or
            otherwise made available through the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8">8. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the
            laws of the jurisdiction in which HappyTails operates, without
            regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to update, change, or
            replace any part of these Terms by posting updates and changes to
            our website. It is your responsibility to check our website
            periodically for changes. Your continued use of or access to the
            Service following the posting of any changes to these Terms
            constitutes acceptance of those changes.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            10. Contact Information
          </h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at
            support@happytails.com.
          </p>
        </div>
      </section>
    </main>
  );
}
