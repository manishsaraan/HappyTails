import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );

  if (!response.ok) {
    throw new Error("Could not fetch pets");
  }

  const data = await response.json();
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto flex flex-col min-h-screen">
        <AppHeader />
        <PetContextProvider pets={data}>{children}</PetContextProvider>

        <AppFooter />
      </div>
    </>
  );
}
