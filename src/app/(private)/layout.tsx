import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import { defaultMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = defaultMetadata;
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="box-border flex h-screen w-screen justify-center">
          <section className="my-auto box-border flex h-[calc(100vh_-_16px)] w-[calc(100vw_-_16px)] gap-2">
            {/* <SidebarComponent /> */}
            <main className="flex h-full flex-1 flex-col overflow-auto rounded-lg bg-default">
              <div className="block">{children}</div>
              {/* <FooterComponent /> */}
            </main>
          </section>
        </main>
      </body>
    </html>
  );
}
