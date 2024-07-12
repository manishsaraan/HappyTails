"use client";

import { Pet } from "@/lib/types";
import React, { useState, createContext, ReactNode } from "react";

export type SearchContextType = {
  search: string;
  handleChangeSearchQuery: (input: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // initial state
  const [search, setSearch] = useState("");

  // handlers
  const handleChangeSearchQuery = (input: string) => {
    setSearch(input);
  };

  return (
    <SearchContext.Provider value={{ search, handleChangeSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
