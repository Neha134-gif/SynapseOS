import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SynapseOS Lite",
  description: "Multi-agent AI document intelligence system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}