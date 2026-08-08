import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accredian",
  description:
    "Next-gen expertise built for your enterprise in Generative AI, Data Science, and Leadership.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
