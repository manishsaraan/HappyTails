"use client";

import { usePetContext } from "@/hooks/pet-context-hook";
import { Pet } from "@/lib/types";
import Image from "next/image";
import PetButton from "./pet-button";
import PetImage from "./pet-image";

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
    <div className="py-10 px-5 text-center">
      <div className="flex justify-around mb-5">
        <div className="w-1/2">
          <h3 className="text-[13px] text-zinc-700 font-medium text-center">
            Owner Name
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet.ownerName}</p>
        </div>
        <div className="w-1/2">
          <h3 className="text-[13px] text-zinc-700 font-medium text-center">
            Age
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet.age}</p>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="w-1/2">
          <h3 className="text-[13px] text-zinc-700 font-medium text-center">
            Owner Phone
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet.ownerPhone}</p>
        </div>
        <div className="w-1/2">
          <h3 className="text-[13px] text-zinc-700 font-medium text-center">
            Owner Email
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet.ownerEmail}</p>
        </div>
      </div>
    </div>
  );
}

function Top({ selectedPet }: { selectedPet: Pet }) {
  const { handleCheckoutPet } = usePetContext();

  const deletePet = async () => {
    await handleCheckoutPet(selectedPet.id);
  };

  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <PetImage
        imageUrl={selectedPet?.imageUrl}
        width={75}
        height={75}
        className="h-[75px] w-[75px]"
      />

      <h2 className="text-3xl font-semibold leading-7 ml-5">
        {selectedPet.name}
      </h2>
      <div className="ml-auto space-x-3">
        <PetButton actionType="edit" onHandleClick={() => {}}>
          Edit
        </PetButton>
        <PetButton actionType="delete" onHandleClick={deletePet}>
          Checkout
        </PetButton>
      </div>
    </div>
  );
}
