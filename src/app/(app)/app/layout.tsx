import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";

import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getPetsByUserId } from "@/lib/server-utils";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const pets = await getPetsByUserId(session.user.id);
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
    </>
  );
}

export default React.memo(Layout);
