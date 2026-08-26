import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SevaGuide — Government services, explained in human terms",
  description: "A plain-language guide to understanding application status.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
