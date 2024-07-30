"use client";

import React from "react";
import { Button } from "./ui/button";

export default function SignOutBtn({ onClick }: { onClick: () => void }) {
  return <Button onClick={async () => await onClick()}>Sign Out</Button>;
}
