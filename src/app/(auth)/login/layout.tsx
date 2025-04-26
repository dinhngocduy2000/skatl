import { DefaultMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../../globals.css";
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
          {children}
        </main>
      </body>
    </html>
  );
}
