import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function PetImage({
  imageUrl,
  width,
  height,
  className,
}: {
  imageUrl: string | null;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Image
      src={imageUrl || "/images/placeholder.png"}
      alt="pet image"
      width={width}
      height={height}
      className={cn("rounded-full object-cover", className)}
    />
  );
}
