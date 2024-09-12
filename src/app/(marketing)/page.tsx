import AppFooter from "@/components/app-footer";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col items-center gap-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20">
        <Logo className="h-[100px] w-[100px] mb-4" />
        <h1 className="text-5xl font-semibold my-6 max-w-[600px] leading-[1.2]">
          Manage Pets, Delight Owners with HappyTails
        </h1>
        <p className="text-2xl font-medium max-w-[700px]">
          Easily track pets and send personalized updates with AI-driven
          insights. Get lifetime of access for {"\u20B9"}2999
        </p>
        <div className="mt-10 space-x-3">
          <Button
            className="hover:bg-[#5DC9A8] px-8 py-6 hover:text-white"
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
        <div className="text-5xl font-semibold text-center mb-10">Features</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-[80%] mx-auto">
          <div className="bg-white px-6 pb-10 pt-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-center mb-2">
              Easy Pet Tracking and Management
            </h3>
            <p className="mt-2 text-xl">
              Easily log pet details, owner information, and notes with our
              intuitive system designed for seamless pet daycare management.
            </p>
          </div>
          <div className="bg-white px-6 pb-10 pt-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-center mb-2">
              AI-Generated Personalized Emails
            </h3>
            <p className="mt-2 text-xl">
              Our AI analyzes pet details and notes to automatically craft
              customized email updates for pet owners, keeping them informed.
            </p>
          </div>
          <div className="bg-white px-6 pb-10 pt-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-center mb-2">
              Built with the latest technology
            </h3>
            <p className="mt-2 text-xl">
              Our platform is built on the latest Next.js and TypeScript
              frameworks, ensuring a secure and scalable solution for pet
              daycare management.
            </p>
          </div>
          <div className="bg-white px-6 pb-10 pt-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-center mb-2">
              Lifetime Access
            </h3>
            <p className="mt-2 text-xl">
              Purchase once and enjoy lifetime access to the app, ensuring
              long-term efficiency for your pet daycare without recurring fees.
            </p>
          </div>
          <div className="bg-white px-6 pb-10 pt-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-center mb-2">
              Easy way to track pet details
            </h3>
            <p className="mt-2 text-xl">
              Upload and store images of each pet for quick identification,
              helping you create a personalized experience for your clients.
            </p>
          </div>
          <div className="bg-white px-6 pb-10 pt-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-center mb-2">
              Checkout with Behavior Notes
            </h3>
            <p className="mt-2 text-xl">
              Record pet behavior during checkout, allowing you to provide
              valuable insights to pet owners after their daycare visit.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AppFooter className="absolute bottom-0 w-full" />
    </main>
  );
}
