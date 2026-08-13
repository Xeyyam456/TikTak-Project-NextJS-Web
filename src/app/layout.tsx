import type { Metadata } from "next";
import { Roboto, Poppins, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SiteChrome } from "@/shared/components/layout/SiteChrome";
import { QueryProvider } from "@/shared/components/providers/QueryProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TIK TAK | Onlayn Supermarket",
    template: "%s | TIK TAK",
  },
  description:
    "TIK TAK ilə gündəlik ehtiyaclarınızı ən sərfəli qiymətlərlə onlayn sifariş edin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${roboto.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <SiteChrome>{children}</SiteChrome>
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}

