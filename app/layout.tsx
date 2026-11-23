import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-src",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Faizan Hamid — AI Engineer",
  description:
    "Faizan Hamid is an AI engineer in Frankfurt building AI agents, retrieval systems and MLOps pipelines.",
  keywords: ["Faizan Hamid", "AI Engineer", "Machine Learning Engineer", "MLOps", "RAG", "Data Science", "Frankfurt"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} antialiased`}>{children}</body>
    </html>
  );
}
