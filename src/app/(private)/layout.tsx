import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DefaultMetadata } from "@/lib/utils";
import ToastProvider from "../toast-provider";
import HeaderComponent from "@/components/layout/header";
import { AppSidebarComponent } from "@/components/layout/sidebar";
import { ThemeProvider } from "../theme-provider";

export const metadata: Metadata = DefaultMetadata;
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="mR4qYmtt6qpoWPEbihH5MBmLrmkuuUpYfsSH7gcXKE0"
        />

        <meta
          name="description"
          content="Modern task management app - What ever you do, we track"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <SidebarProvider>
              <main className="box-border flex h-screen w-screen gap-2 justify-center">
                <AppSidebarComponent />
                <SidebarInset>
                  <main className="flex h-full flex-1 flex-col overflow-auto rounded-lg bg-default">
                    <HeaderComponent />
                    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                      {children}
                    </main>
                    {/* <FooterComponent /> */}
                  </main>
                </SidebarInset>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
