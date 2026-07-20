import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.javiergarciacolor.com"),
  title: {
    default: "Javier García | Colorist",
    template: "%s | Javier García",
  },
  description: "Portfolio of Javier García, a Madrid-based colorist working internationally.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Javier García | Colorist",
    description: "Portfolio of Javier García, a Madrid-based colorist working internationally.",
    type: "website",
    url: "https://www.javiergarciacolor.com",
    siteName: "Javier García",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Javier García colorist portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Javier García | Colorist",
    description: "Portfolio of Javier García, a Madrid-based colorist working internationally.",
    images: ["/og-image.jpg"],
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
              jobTitle: "Colorist",
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
