import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
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

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

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

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
