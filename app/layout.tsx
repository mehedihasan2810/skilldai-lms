import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/app/react-query-provider";
import { cookies } from "next/headers";
import { SupabaseProvider } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";
import { TooltipProvider } from "@/components/ui";
import { Analytics } from "@vercel/analytics/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Skilld AI",
  // description: "Create and Share Artifacts with Claude",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen",
          GeistSans.className
          // fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider session={session}>
            <ReactQueryProvider>
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </ReactQueryProvider>
          </SupabaseProvider>
        </ThemeProvider>
        <NextTopLoader color="hsl(0 0% 98%)" height={4} showSpinner={false} />
        <Analytics />
      </body>
    </html>
  );
}
