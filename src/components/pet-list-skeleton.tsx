import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "./ui/separator";

export function PetListSkeleton({ count }: { count: number }) {
  const arr = Array.from({ length: count }, (_, index) => index);
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {arr.map((index) => (
        <li key={index}>
          <PetListItemSkeleton />
        </li>
      ))}
    </ul>
  );
}

function PetListItemSkeleton() {
  return (
    <>
      <div className="flex h-[70px] flex-col w-full justify-center items-center px-5  gap-3 ">
        <div className="flex items-center justify-center px-5 text-base gap-3">
          <Skeleton className="h-[45px] w-[45px] rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[230px]" />
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
