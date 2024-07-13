import { cn } from "@/lib/utils";

type ContentBlockProps = {
  className?: string;
  children: React.ReactNode;
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#f7f8fa] shadow-sm overflow-hidden h-full w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
