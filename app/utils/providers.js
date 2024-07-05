"use client"

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react"



export default function Providers({ children }) {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
          {children}
      </SessionProvider>
    </QueryClientProvider>
  );
}
