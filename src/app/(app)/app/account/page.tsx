import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

export default function Account() {
  return (
    <main>
      <H1 className="py-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex justify-center items-center">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}
