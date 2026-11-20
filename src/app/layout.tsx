import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/config/siteConfig";

export const viewport: Viewport = {
  themeColor: "#F3EBE1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rozaliya Gabdulhakova | KBT Psixolog & Oilaviy Mutaxassis",
  description:
    "Rozaliya Gabdulhakova (@psixolog_rozaliya) — KBT asosida ishlovchi psixolog. Ayollar va onalar uchun oilaviy munosabatlar hamda farzand tarbiyasi bo'yicha konsultatsiyalar va mualliflik kurslari.",
  openGraph: {
    title: "Rozaliya Gabdulhakova | KBT Psixolog & Oilaviy Mutaxassis",
    description:
      "Toshkentda oflayn va dunyo bo'ylab onlayn individual konsultatsiyalar hamda mualliflik kurslari.",
    type: "website",
    url: SITE_URL,
    siteName: "Rozaliya Gabdulhakova",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Rozaliya Gabdulhakova",
      },
    ],
  },  
  twitter: {
    card: "summary_large_image",
    title: "Rozaliya Gabdulhakova | KBT Psixolog & Oilaviy Mutaxassis",
    description:
      "Toshkentda oflayn va dunyo bo'ylab onlayn individual konsultatsiyalar hamda mualliflik kurslari.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
