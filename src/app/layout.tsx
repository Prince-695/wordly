import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import { ThemeProvider } from "~/components/theme-provider";
import { AuthProvider } from "~/components/auth-provider";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Wordly - Modern Blogging Platform",
  description: "Share your ideas with the world. A modern blogging platform built with Next.js, TypeScript, and tRPC.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TRPCReactProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </TRPCReactProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
