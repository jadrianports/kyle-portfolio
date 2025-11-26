"use client";
import React, { createContext, useContext, useState } from "react";

/**
 * Global Loading State Context
 * Tracks loading state across the entire application
 */

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingText?: string;
  setLoadingText: (text?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string | undefined>();

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        loadingText,
        setLoadingText,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
