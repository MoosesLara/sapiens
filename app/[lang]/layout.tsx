import type { Metadata } from "next";
import { Bodoni_Moda, Inter, Montserrat } from "next/font/google";
import "../globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The Sapients® | Cash Luna",
  description: "Escuela de Fe y Sabiduría. Aprenderás a administrar la fe y la sabiduría para construir riquezas con honra sin perder la vida.",
  openGraph: {
    title: "The Sapients® | Cash Luna",
    description: "Escuela de Fe y Sabiduría. Aprenderás a administrar la fe y la sabiduría para construir riquezas con honra sin perder la vida.",
    siteName: "The Sapients®",
    locale: "es_GT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sapients® | Cash Luna",
    description: "Escuela de Fe y Sabiduría. Aprenderás a administrar la fe y la sabiduría para construir riquezas con honra sin perder la vida.",
  },
};
import { i18n } from "../../i18n.config";
import MagneticCursor from "../../features/landing/components/MagneticCursor";

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`dark ${bodoniModa.variable} ${inter.variable} ${montserrat.variable} antialiased selection:bg-primary-container selection:text-on-primary-container`}
    >
      <body className="min-h-screen bg-carbon-void font-body-md text-on-surface" suppressHydrationWarning>
        <MagneticCursor />
        {children}
      </body>
    </html>
  );
}
