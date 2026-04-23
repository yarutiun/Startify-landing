import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Amplitude } from "@/amplitude";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://startify.app";
const title = "Startify — Beat task paralysis. One step at a time.";
const description =
  "For ADHD brains, chronic procrastinators, and anyone who freezes before they start. Startify turns overwhelm into one tiny, physical next step—no guilt, no giant plans—so you can build momentum on work, school, home, or life admin.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Startify",
  },
  description,
  keywords: [
    "ADHD productivity",
    "task paralysis",
    "procrastination help",
    "executive dysfunction",
    "body doubling",
    "micro tasks",
    "time blindness",
    "rejection sensitive",
    "getting unstuck",
    "overwhelm",
    "starting tasks",
    "focus",
    "momentum",
  ],
  authors: [{ name: "Startify" }],
  creator: "Startify",
  publisher: "Startify",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title,
    description,
    siteName: "Startify",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Startify — ADHD-friendly help for procrastination and task paralysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
    creator: "@startifyapp",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "productivity",
};

export const viewport: Viewport = {
  themeColor: "#6366F1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Startify",
              applicationCategory: "ProductivityApplication",
              description,
              url: siteUrl,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              operatingSystem: "Web",
            }),
          }}
        />
      </head>
      <Amplitude />
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
