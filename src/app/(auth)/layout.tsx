import type { Metadata } from "next";
import "../../assets/style/globals.css";
import { DefaultMetadata } from "@/lib/utils";
import Logo from "../../assets/svg/skatl-logo.svg";

export const metadata: Metadata = DefaultMetadata;

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted w-full flex min-h-dvh flex-col items-center p-6 py-0">
      <div className="flex w-full items-center max-w-sm flex-col">
        <Logo className="w-[10vw] h-[10vw] min-w-[100px] min-h-[100px] max-h-fit max-w-fit" />
        {children}
      </div>
    </div>
  );
}
