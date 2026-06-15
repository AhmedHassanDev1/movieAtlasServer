"use client"
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { theme } from "../theme/theme";

const queryClient = new QueryClient()

function providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <html
          lang="en"
          className=''>
          {children}
        </html>
      </ThemeProvider>
    </QueryClientProvider >
  )
}

export default providers
