import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://system-design-learning-platform.vercel.app"),
  title: {
    default: "System Design Learning Platform",
    template: "%s | System Design Learning Platform"
  },
  description:
    "A premium, modular system design curriculum built with Next.js, MDX, Tailwind CSS, shadcn/ui patterns, and Vercel-first architecture.",
  applicationName: "System Design Learning Platform",
  keywords: ["system design", "next.js", "vercel", "mdx", "distributed systems"],
  openGraph: {
    title: "System Design Learning Platform",
    description:
      "Progressive system design learning with modular content, polished UX, and a Vercel-ready architecture.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "System Design Learning Platform",
    description:
      "Progressive system design learning with modular content, polished UX, and a Vercel-ready architecture."
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
