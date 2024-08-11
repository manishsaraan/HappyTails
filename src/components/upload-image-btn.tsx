"use client";

import { getSupabaseSignedUrl, uploadSupabaseImage } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";
import { CircleCheck, CircleX, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const LoadingSpinner = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export default function UploadImageBtn({
  onUpload,
  imageUrl,
  setIsUploading,
  isUploading,
}: {
  onUpload: (url: string) => void;
  imageUrl?: string | null;
  setIsUploading: (isUploading: boolean) => void;
  isUploading: boolean;
}) {
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImage = async (file: File | null) => {
    setIsError(null);
    setIsUploading(true);
    if (!file) {
      alert("Please select an image to upload");
      return;
    }

    const fileName = `${crypto.randomUUID()}-${file.name}`;
    const { error } = await uploadSupabaseImage(file, fileName);
    if (error) {
      setIsError("Unable to upload image");
      return;
    }

    const { data: signedUrlData, error: signedUrlError } =
      await getSupabaseSignedUrl(fileName);

    if (signedUrlError || !signedUrlData || !signedUrlData.signedUrl) {
      setIsError("Unable to upload image");
      return;
    }

    const fullUrl = signedUrlData.signedUrl;
    return fullUrl;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0] || null;
      setIsReplacing(true);
      const imageUrl = await uploadImage(file);
      if (!imageUrl) {
        setIsError("Unable to upload image");
        return;
      }

      onUpload(imageUrl);
      setIsUploading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsError("Unable to upload image");
      setIsUploading(false);
      setIsReplacing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        onChange={handleImageChange}
        className="hidden"
        id="upload-input"
        ref={fileInputRef}
      />
      <label htmlFor="upload-input">
        <Button
          onClick={(e) => {
            e.preventDefault(); // Prevents form submission
            fileInputRef.current?.click(); // Triggers file input
          }}
          type="button"
        >
          {imageUrl ? "Replace Image" : "Upload Image"}
        </Button>
      </label>

      {isError && (
        <span className="flex  gap-2">
          <CircleX size={20} color="red" strokeWidth={2} />
          {isError}
        </span>
      )}
      {isUploading && <LoadingSpinner className="w-4 h-4" />}
      {isSuccess && <CircleCheck size={20} color="green" strokeWidth={2} />}
      {imageUrl && !isReplacing && (
        <div className="flex items-center gap-2">
          <Image
            src={imageUrl}
            alt="Uploaded"
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={20} />
          </a>
        </div>
      )}
    </div>
  );
}
