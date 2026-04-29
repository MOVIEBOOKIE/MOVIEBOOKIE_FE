import type { ReactNode } from "react";

import Toast from "../_components/noti-toast";
import InAppRedirect from "@/components/inapp-redirect";
import ToastRenderer from "@/components/toast-renderer";
import GACommon from "../_components/ga/ga-common";

import { LoadingProvider } from "app/_context/loading-context";
import { ToastProvider } from "app/_context/toast-context";
import { ReactQueryProvider } from "app/providers/react-query-provider";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <>
      <ToastProvider>
        <InAppRedirect />
        <ToastRenderer />

        <ReactQueryProvider>
          <GACommon />

          <LoadingProvider>{children}</LoadingProvider>
          <Toast />
        </ReactQueryProvider>
      </ToastProvider>
    </>
  );
}
