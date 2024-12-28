import type { Metadata } from "next";
import { EB_Garamond, Inter as FontSans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/app/react-query-provider";
import { cookies } from "next/headers";
// import { SupabaseProvider } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";
import { TooltipProvider } from "@/components/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { RestrictSupportChat } from "@/components/restrict-support-chat";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
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


  return (
    <html lang="en"  
    // className={cn(inter.variable, eb_garamond.variable)}
     suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans",
          // GeistSans.variable, eb_garamond.variable
          inter.className,
          eb_garamond.variable
          // fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <SupabaseProvider session={session}> */}
            <ReactQueryProvider>
              <NuqsAdapter>
                <TooltipProvider>{children}</TooltipProvider>
              </NuqsAdapter>
            </ReactQueryProvider>
          {/* </SupabaseProvider> */}
          <Toaster richColors closeButton />
        </ThemeProvider>
        <NextTopLoader
          color="hsl(229 100% 62%)"
          height={4}
          showSpinner={false}
          
        />

        <RestrictSupportChat/>
        <Analytics />

        {/* <Script
          id="supportChatbot"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.$crisp=[];window.CRISP_WEBSITE_ID="0d02dec6-b49b-477b-8af3-357e2eb7064e";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
          `,
          }}
        /> */}
      </body>
    </html>
  );
}
