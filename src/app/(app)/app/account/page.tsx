import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { checkAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function Account() {
  const session = await checkAuth();
  async function handleSignOut() {
    "use server";

    await signOut({ redirectTo: "/" });
  }

  return (
    <main>
      <H1 className="py-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex justify-center flex-col items-center space-y-2">
        <p>Logged in as {session?.user?.email}</p>
        <SignOutBtn onClick={handleSignOut} />
      </ContentBlock>
    </main>
  );
}
