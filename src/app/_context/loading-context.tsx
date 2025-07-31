"use client";

import { createContext, useContext, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading: setIsLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
const defaultLoadingContext = {
  isLoading: false,
  setLoading: (_: boolean) => {},
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  return context ?? defaultLoadingContext;
};
