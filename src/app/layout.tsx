import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RssLink } from "@/components/RssLink";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "woza.ink",
  description:
    "A collection of creative experiments and interactive experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="woza.ink RSS Feed"
          href="/feed.xml"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('woza-theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&p))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="fixed top-4 right-4 z-50 flex items-center gap-1">
          <RssLink />
          <ThemeToggle />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
