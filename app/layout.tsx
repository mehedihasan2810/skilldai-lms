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
              {children}
              <Toaster />
            </ReactQueryProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
