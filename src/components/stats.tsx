"use client";
import { usePetContext } from "@/hooks/pet-context-hook";
import React from "react";

export default function Stats() {
  const { noOfPets } = usePetContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{noOfPets}</p>
      <p className="opacity-80 ">Current Guests</p>
    </section>
  );
}
