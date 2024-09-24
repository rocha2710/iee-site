import localFont from "next/font/local";
import "./globals.css";
import SessionProviderWrapper from './SessionProviderWrapper'; // Importa o wrapper para o SessionProvider
import Link from 'next/link'; // Importa o componente Link do Next.js

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "IEE - Instituto de Educação Infantil",
  description: "Escola Infantil localizada no Cohatrac",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
          <SessionProviderWrapper>{children}</SessionProviderWrapper> {/* Envolve com o SessionProvider */}
      </body>
    </html>
  );
}
