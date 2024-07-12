import {
  SearchContext,
  SearchContextType,
} from "@/contexts/search-context-provider";
import { useContext } from "react";

export function useSearchContext(): SearchContextType {
  const ctx = useContext(SearchContext);

  if (!ctx) {
    throw new Error(
      "useSearchContext must be used inside SearchContextProvider"
    );
  }

  return ctx;
}
