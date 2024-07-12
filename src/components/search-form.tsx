"use client";

import { useSearchContext } from "@/hooks/search-context-hook";

export default function SearchForm() {
  const { search, handleChangeSearchQuery } = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition 
         focus:bg-white/50 hover:bg-white/50
       placeholder:text-white/50
      "
        placeholder="Search Pets"
        type="search"
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
        value={search}
      />
    </form>
  );
}
