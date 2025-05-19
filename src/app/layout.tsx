import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import siteConfig from "@/config/siteConfig";
import PageLayout from "@/components/layout/PageLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords.join(', '),
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageLayout config={siteConfig} metadata={metadata}>
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
