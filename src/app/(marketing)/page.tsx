import AppFooter from "@/components/app-footer";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-appBGPrimary min-h-screen flex flex-col items-center gap-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 text-appBlack">
        <Logo className="h-[100px] w-[100px] mb-4" />
        <h1 className="text-5xl font-semibold my-6 max-w-[600px] leading-[1.2]">
          Manage Pets, Delight Owners with HappyTails
        </h1>
        <p className="text-2xl font-medium max-w-[700px]">
          Easily track pets and send personalized updates with AI-driven
          insights. Get lifetime of access for $199
        </p>
        <div className="mt-10 space-x-3">
          <Button
            className="hover:bg-[#5DC9A8] bg-btnPrimary px-8 py-6 hover:text-white"
            asChild
          >
            <Link className="text-xl" href={"/signup"}>
              Get Started
            </Link>
          </Button>
          <Button
            className="hover:bg-[#5DC9A8] hover:text-white px-8 py-6"
            asChild
            variant={"secondary"}
          >
            <Link className="text-xl" href={"/login"}>
              Log In
            </Link>
          </Button>
        </div>
      </div>

      {/* Dashboard Image */}
      <div className="flex justify-center items-center mt-20">
        <Image
          src={"/images/landing.png"}
          alt="preview"
          height={800}
          width={1000}
          className="shadow-[0_4px_6px_-1px_rgba(93,201,168,0.1),0_2px_4px_-1px_rgba(93,201,168,0.06)] rounded-xl"
        />
      </div>

      {/* Features Section */}
      <section className="mt-20 px-10 w-full mb-20">
        <div className="text-5xl font-semibold text-center mb-10 italic">
          Features
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-[80%] mx-auto">
          <div className="bg-[#F9F9F9] px-6 pb-10 pt-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-4 text-appBlack w-[70%] mx-auto">
              Easy Pet Tracking and Management
            </h3>
            <p className="text-lg text-center text-appBlack leading-[1.5]">
              Easily log pet details, owner information, and notes with our
              intuitive system designed for seamless pet daycare management.
            </p>
          </div>
          <div className="bg-[#F9F9F9] px-6 pb-10 pt-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-4 text-appBlack w-[70%] mx-auto">
              AI-Generated Personalized Emails
            </h3>
            <p className="text-lg text-center text-appBlack leading-[1.5]">
              Our AI analyzes pet details and notes to automatically craft
              customized email updates for pet owners, keeping them informed.
            </p>
          </div>
          <div className="bg-[#F9F9F9] px-6 pb-10 pt-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-4 text-appBlack w-[70%] mx-auto">
              Built with the Latest Technology
            </h3>
            <p className="text-lg text-center text-appBlack leading-[1.5]">
              Our platform is built on the latest Next.js and TypeScript
              frameworks, ensuring a secure and scalable solution for pet
              daycare management.
            </p>
          </div>
          <div className="bg-[#F9F9F9] px-6 pb-10 pt-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-4 text-appBlack w-[70%] mx-auto">
              Lifetime Access with 1-time Payment
            </h3>
            <p className="text-lg text-center text-appBlack leading-[1.5]">
              Purchase once and enjoy lifetime access to the app, ensuring
              long-term efficiency for your pet daycare without recurring fees.
            </p>
          </div>
          <div className="bg-[#F9F9F9] px-6 pb-10 pt-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-4 text-appBlack w-[70%] mx-auto">
              Easy Way to Track Pet Details
            </h3>
            <p className="text-lg text-center text-appBlack leading-[1.5]">
              Upload and store images of each pet for quick identification,
              helping you create a personalized experience for your clients.
            </p>
          </div>
          <div className="bg-[#F9F9F9] px-6 pb-10 pt-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-4 text-appBlack w-[70%] mx-auto">
              Checkout with Behavior Notes
            </h3>
            <p className="text-lg text-center text-appBlack leading-[1.5]">
              Record pet behavior during checkout, allowing you to provide
              valuable insights to pet owners after their daycare visit.
            </p>
          </div>
        </div>
      </section>

      <section className="flex   flex-col items-center gap-10 px-10 pb-10 pt-8 rounded-lg text-center">
        <h3 className="text-5xl font-bold mb-4 text-appBlack">
          Get started to manage your pet daycare
        </h3>

        <Button
          className="hover:bg-[#5DC9A8] bg-btnPrimary px-8 py-6 hover:text-white"
          asChild
        >
          <Link className="text-xl" href={"/signup"}>
            Get Started
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <AppFooter className=" bottom-0 w-full" />
    </main>
  );
}
