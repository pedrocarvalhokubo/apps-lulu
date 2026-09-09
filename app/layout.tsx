import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Estudos da Lulu | Grade 7",
  description: "Conteúdos, revisões visuais e simulados de English, Matemática e Ciências para Lulu, 7º ano.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Lulu" },
  other: { "codex-preview": "development", "mobile-web-app-capable": "yes" },
  icons: {
    icon: "/icons/app-icon.svg",
    shortcut: "/icons/app-icon.svg",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5ef",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
