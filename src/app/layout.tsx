import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://javiergarcia.co"),
  title: {
    default: "Javier García | Colorist",
    template: "%s | Javier García",
  },
  description: "Portfolio of Javier García, a Madrid-based colorist working internationally.",
  openGraph: {
    title: "Javier García | Colorist",
    description: "Portfolio of Javier García, a Madrid-based colorist working internationally.",
    type: "website",
    url: "https://javiergarcia.co",
    siteName: "Javier García",
  },
  twitter: {
    card: "summary_large_image",
    title: "Javier García | Colorist",
    description: "Portfolio of Javier García, a Madrid-based colorist working internationally.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              url: "https://javiergarcia.co",
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
