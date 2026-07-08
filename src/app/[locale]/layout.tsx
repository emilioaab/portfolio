import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { socialLinks } from "@/content/social";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { BackToTop } from "@/components/ui/BackToTop";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    verification: {
      google: "Lx4LiEb-L8hQ3O0EXwHIBny1mfIBliyZ8kQeD9TjojU",
    },
    alternates: {
      languages: {
        en: "/en",
        he: "/he",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
  const t = await getTranslations({ locale, namespace: "Hero" });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t("name"),
    description: t("tagline"),
    url: siteUrl,
    sameAs: socialLinks.filter((link) => link.icon !== "mail").map((link) => link.href),
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-16 sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider locale={locale}>
          <Header />
          {children}
          <Footer />
          <BackToTop />
          <MobileNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
