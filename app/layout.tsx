import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
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
        className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable} antialiased`}
      >
        <div className="earth-bg" aria-hidden="true" />
        <div className="page-wrap">{children}</div>
      </body>
    </html>
  );
}
