"use client";
import { useCursor } from "@/app/hooks/useCursor";
import { createContext, useContext } from "react";

const CursorContext = createContext(null);

export const CursorProvider = ({ children }: any) => {
  const cursor = useCursor();

  return (
    <CursorContext.Provider value={cursor as any}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursorContext = () => {
  return useContext(CursorContext);
};
