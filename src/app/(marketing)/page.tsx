import AppFooter from "@/components/app-footer";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col  justify-center items-center gap-10">
      <div className="flex relative flex-col h-screen w-[60%] justify-center items-center gap-10">
        <section className="flex">
          {" "}
          <Image
            src={"/images/homepage-image.png"}
            alt="preview"
            height={472}
            width={519}
          />
          <div className="pl-10 ">
            <Logo />
            <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
              Manage your <span>pet daycare</span> with ease
            </h1>
            <p className="text-2xl font-medium max-w-[600px]">
              Use HappyTails to easily keep track of pets under your care. Get
              lifetime of access for {"\u20B9"}2999
            </p>
            <div className="mt-10 space-x-3">
              <Button className="hover:bg-[#5DC9A8] hover:text-white" asChild>
                <Link href={"/signup"}>Get Started</Link>
              </Button>
              <Button
                className="hover:bg-[#5DC9A8] hover:text-white"
                asChild
                variant={"secondary"}
              >
                <Link href={"/login"}>Log In</Link>
              </Button>
            </div>
          </div>
        </section>

        <AppFooter className="absolute bottom-0 w-full" />
      </div>
    </main>
  );
}
