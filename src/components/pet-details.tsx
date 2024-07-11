"use client";

import { usePetContext } from "@/hooks/pet-context-hook";
import { Pet } from "@/lib/types";
import Image from "next/image";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className="w-full h-full flex flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <Top selectedPet={selectedPet} />
          <Info selectedPet={selectedPet} />
          <Notes selectedPet={selectedPet} />
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <div className="h-full flex items-center justify-center">
      {" "}
      <p className="text-xl font-medium">No Pet Selected</p>
    </div>
  );
}
function Notes({ selectedPet }: { selectedPet: Pet }) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {selectedPet?.notes}
    </section>
  );
}

function Info({ selectedPet }: { selectedPet: Pet }) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] text-zinc-700 font-medium">Owner Name</h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] text-zinc-700 font-medium">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
      </div>
    </div>
  );
}

function Top({ selectedPet }: { selectedPet: Pet }) {
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={selectedPet?.imageUrl}
        alt="pet image"
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">
        {selectedPet?.name}
      </h2>
    </div>
  );
}
