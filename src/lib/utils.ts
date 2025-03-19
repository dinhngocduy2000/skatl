import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
export const defaultMetadata: Metadata = {
  title: "SkatL",
  description: "Modern task management app - What ever you do, we track",
  keywords: [
    "SkatL",
    "Task management app",
    "Manage Tasks",
    "Kanban board",
    "Calendar view",
  ],
  openGraph: {
    title: "SkatL | Modern Task Management App",
    description:
      "Manage your tasks easily with modern kanban board and calendar view",
    url: "https://nullify-eight.vercel.app/", // Replace with your actual URL
    siteName: "SkatL",
    images: [
      {
        url: "/images/nuliplayer-thumbnail.png", // Replace with your image path
        width: 1200,
        height: 630,
        alt: "Nuliplayer Music Player Thumbnail",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkatL | Modern Task Management App",
    description:
      "Manage your tasks easily with modern kanban board and calendar view",
    images: ["/images/nuliplayer-thumbnail.png"], // Replace with your image path
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
