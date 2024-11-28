import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/Navbar'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dailo - AI-Powered Podcast Platform',
    description: 'Transform your podcast listening experience with Dailo. Discover AI-curated podcasts, get real-time summaries, and engage with content like never before.',
    keywords: ['AI Podcasts', 'Podcast Platform', 'Audio Content', 'AI Summary', 'Dailo'],
    openGraph: {
      title: 'Dailo - AI-Powered Podcast Platform',
      description: 'Transform your podcast listening experience with Dailo. Discover AI-curated podcasts, get real-time summaries, and engage with content like never before.',
      url: 'https://dailo.org',
      siteName: 'Dailo',
      images: [
        {
          url: '/img/dailo_og.jpg', // Make sure to add this image to your public folder
          width: 1200,
          height: 630,
          alt: 'Dailo - AI-Powered Podcast Platform',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dailo - AI-Powered Podcast Platform',
      description: 'Transform your podcast listening experience with Dailo. Discover AI-curated podcasts, get real-time summaries, and engage with content like never before.',
      images: ['/img/dailo_og.jpg'], // Same image as OpenGraph
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
