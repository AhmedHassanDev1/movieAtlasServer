
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "./styles/globals.css";
import "./styles/animate.css";

import Providers from "@/design-system/components/providers";
import { NextIntlClientProvider } from 'next-intl';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Header from "@/design-system/components/layout/Header"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <body className="min-h-full flex flex-col">
        <CssBaseline />

        <NextIntlClientProvider>
          <Header />
          {children}

        </NextIntlClientProvider>
        <ReactQueryDevtools />
        <ToastContainer />
      </body>
    </Providers>

  );
}
