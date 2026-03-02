import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pódium Académico — Preparación estratégica para Preunal y Preicfes",
  description:
    "Refuerza Matemáticas con banco de preguntas, simulacros y soluciones detalladas creadas por profesor experto. Accede gratis o desbloquea contenido premium.",
  keywords: [
    "Preunal",
    "Preicfes",
    "Matemáticas",
    "examen admisión",
    "Universidad Nacional",
    "preparación examen",
    "simulacros matemáticas",
  ],
  authors: [{ name: "Pódium Académico" }],
  openGraph: {
    title: "Pódium Académico — Preparación Matemáticas Preunal y Preicfes",
    description:
      "Banco de preguntas, simulacros y soluciones paso a paso. Accede gratis o desbloquea premium.",
    type: "website",
    locale: "es_CO",
    siteName: "Pódium Académico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pódium Académico — Preparación Matemáticas",
    description:
      "Practica con ejercicios tipo examen real y soluciones detalladas.",
  },
  robots: { index: true, follow: true },
};

/* JSON-LD structured data */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Pódium Académico",
  description:
    "Plataforma de preparación estratégica en Matemáticas para Preunal y Preicfes.",
  offers: {
    "@type": "Offer",
    category: "Educación",
    availability: "https://schema.org/InStock",
    priceCurrency: "COP",
  },
  educationalCredentialAwarded: "Preparación para examen de admisión",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
