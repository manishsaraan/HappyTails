import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import Prisma from "@/lib/db";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets = await Prisma.pet.findMany();

  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto flex flex-col min-h-screen">
        <AppHeader />
        <PetContextProvider pets={pets}>
          <SearchContextProvider>{children}</SearchContextProvider>
        </PetContextProvider>

        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
