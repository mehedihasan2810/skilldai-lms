import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/app/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { TooltipProvider } from "@/components/ui";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { RestrictSupportChat } from "@/components/restrict-support-chat";
import { CSPostHogProvider } from "./providers";
import { RefreshSession } from "@/components/refresh-session";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
    <html
      lang="en"
      className={cn(`${inter.className} antialiased`)}
      suppressHydrationWarning
    >
      <CSPostHogProvider>
        <body className={cn("min-h-screen font-sans")}>
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

          <RestrictSupportChat />
          <RefreshSession />
          {/* <Analytics /> */}

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
      </CSPostHogProvider>
    </html>
  );
}
