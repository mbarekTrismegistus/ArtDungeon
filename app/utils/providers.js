"use client"

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';



export default function Providers({ children }) {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.AUTH_GOOGLE_ID}>
        {children}
        <ProgressBar 
          height="3px"
          color="#14b8a6"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
