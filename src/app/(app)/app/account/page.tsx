import ContentBlock from "@/components/content-block";
import DeleteAccountBtn from "@/components/delete-account-btn";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
// Ensure this import is correct
import { checkAuth } from "@/lib/server-utils";

export default async function Account() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="py-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex justify-center flex-col items-center space-y-2">
        <p>Logged in as {session?.user?.email}</p>
        <SignOutBtn />
        <DeleteAccountBtn />
      </ContentBlock>
    </main>
  );
}
