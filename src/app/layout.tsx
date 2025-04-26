import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/src/components/providers/theme-provider";
import { NextAuthProvider } from "@/src/components/providers/auth-provider";
import Providers from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnipStash - Code Snippet Organizer",
  description: "A powerful tool to organize and categorize your code snippets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {/* <NextAuthProvider> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
          {/* </NextAuthProvider> */}
        </Providers>
      </body>
    </html>
  );
}
