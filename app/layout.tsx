import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { TimeThemeProvider } from "@/app/providers/TimeThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Luke Inglis",
    template: "%s | Luke Inglis",
  },
  description:
    "Personal website of Luke Inglis — Technical Product Manager at Red Hat AI, focused on bringing inference-time scaling and post-training techniques into enterprise AI platforms.",
  openGraph: {
    title: "Luke Inglis",
    description:
      "Technical Product Manager at Red Hat AI, focused on bringing inference-time scaling and post-training techniques into enterprise AI platforms.",
    url: "https://lukeinglis.me",
    siteName: "Luke Inglis",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luke Inglis",
    description:
      "Technical Product Manager at Red Hat AI, focused on bringing inference-time scaling and post-training techniques into enterprise AI platforms.",
  },
  metadataBase: new URL("https://lukeinglis.me"),
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const serverHour = hdrs.get("x-server-hour");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TimeThemeProvider
          serverHour={serverHour ? Number(serverHour) : undefined}
        >
          {children}
        </TimeThemeProvider>
      </body>
    </html>
  );
}
