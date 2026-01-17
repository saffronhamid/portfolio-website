import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Faizan Hamid | ML Engineer",
  description:
    "Portfolio of Faizan Hamid - ML/MLOps engineer focused on RAG systems, scalable pipelines, and reliable deployment.",
  keywords: [
    "Faizan Hamid",
    "Machine Learning Engineer",
    "MLOps",
    "RAG",
    "Data Science",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${fraunces.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <div className="earth-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
