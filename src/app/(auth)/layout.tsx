import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { DefaultMetadata } from "@/lib/utils";
import ToastProvider from "../toast-provider";
import Logo from "../../assets/svg/skatl-logo.svg";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = DefaultMetadata;

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        <main className="flex h-screen w-screen items-center justify-center bg-muted">
          <ToastProvider>
            <div className="bg-muted w-full flex min-h-dvh flex-col items-center p-6 py-0">
              <div className="flex w-full items-center max-w-sm flex-col">
                <Logo className="w-[10vw] h-[10vw] min-w-[100px] min-h-[100px] max-h-fit max-w-fit" />
                {children}
              </div>
            </div>
          </ToastProvider>
        </main>
      </body>
    </html>
  );
}
