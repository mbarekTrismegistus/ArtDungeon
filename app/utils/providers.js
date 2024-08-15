"use client"

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';



export default function Providers({ children }) {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="812937698268-14md8miugbmnnc39phnutj3ibr4tk5r9.apps.googleusercontent.com">
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
