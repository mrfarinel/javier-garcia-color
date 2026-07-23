import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.javiergarciacolor.com"),
  title: {
    default: "Javier García | DI Colorist",
    template: "%s | Javier García",
  },
  description:
    "Javier García is a Madrid-based DI Colorist working internationally across fiction, commercials, series and music videos.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Javier García | DI Colorist",
    description:
      "Javier García is a Madrid-based DI Colorist working internationally across fiction, commercials, series and music videos.",
    type: "website",
    url: "https://www.javiergarciacolor.com",
    siteName: "Javier García",
    images: [
      {
        url: "/og-logo-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Javier García DI Colorist portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Javier García | DI Colorist",
    description:
      "Javier García is a Madrid-based DI Colorist working internationally across fiction, commercials, series and music videos.",
    images: ["/og-logo-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Javier García",
              jobTitle: "DI Colorist",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Madrid",
              },
              url: "https://www.javiergarciacolor.com",
            }),
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
