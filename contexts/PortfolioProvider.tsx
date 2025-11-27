"use client";

import { createContext, useContext } from "react";

const PortfolioContext = createContext<any>(null);

export function PortfolioProvider({ children, data }: { children: React.ReactNode; data: any }) {
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
