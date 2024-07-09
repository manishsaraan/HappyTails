import React from "react";
import Stats from "./stats";
import H1 from "./h1";

export default function Branding() {
  return (
    <>
      {" "}
      <section>
        <H1>
          Pet <span className="font-semibold">Soft</span>
        </H1>
        <p className="text-lg opacity-80">Manage your pet day care with ease</p>
      </section>
    </>
  );
}
