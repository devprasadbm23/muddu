import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Muddu, will you be mine? 💫",
  description: "A little universe made just for you, Muddu.",
  openGraph: {
    title: "Muddu, will you be mine? 💫",
    description: "A little universe made just for you, Muddu.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Muddu, will you be mine? 💫",
    description: "A little universe made just for you, Muddu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
