import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://startify.app";
const title = "Startify — Stop Overthinking. Start Moving.";
const description =
  "The AI execution companion that breaks any goal into one single action. No plans. No lists. Just the next step — right now. Built for developers, students, and anyone who struggles to start.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Startify",
  },
  description,
  keywords: [
    "productivity",
    "task paralysis",
    "ADHD productivity",
    "AI productivity",
    "execution",
    "focus",
    "getting things done",
    "anti procrastination",
    "micro tasks",
    "action",
    "start",
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
        alt: "Startify — AI execution companion",
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
  themeColor: "#05050a",
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
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
