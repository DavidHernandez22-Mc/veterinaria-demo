import type { Metadata, Viewport } from "next";
import { Albert_Sans, Bricolage_Grotesque } from "next/font/google";
import { SITE_URL, services } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-albert",
  display: "swap",
});

const title = "Arrayán Clínica Veterinaria · Perros y gatos en Cedritos, Bogotá";
const description =
  "Clínica veterinaria de barrio en Cedritos, Bogotá: consulta, vacunas, cirugía, laboratorio, odontología, peluquería y urgencias 24 horas para perros y gatos. Sitio de demostración.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "Arrayán Clínica Veterinaria",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Arrayán Clínica Veterinaria",
    locale: "es_CO",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#13291c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "@id": `${SITE_URL}/#clinica`,
  name: "Arrayán Clínica Veterinaria",
  description,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  priceRange: "$$",
  currenciesAccepted: "COP",
  paymentAccepted: "Efectivo, tarjeta débito, tarjeta crédito, transferencia",
  areaServed: { "@type": "Place", name: "Cedritos, Bogotá" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressRegion: "Bogotá D.C.",
    addressCountry: "CO",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "19:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios veterinarios",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: s.from,
        priceCurrency: "COP",
      },
    })),
  },
  availableService: { "@type": "MedicalProcedure", name: "Urgencias veterinarias 24 horas" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${bricolage.variable} ${albert.variable}`} suppressHydrationWarning>
      <head>
        <script
          // Marks JS as available so entrance animations never hide content without it.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
