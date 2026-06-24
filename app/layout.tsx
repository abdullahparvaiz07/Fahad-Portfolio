import type {Metadata} from 'next';
import { Inter, Outfit, Caveat } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fahad Ali - Portfolio',
  description: 'Fahad Ali - Full-Stack Developer Portfolio, featuring a beautiful modern hero section designed exactly like the reference.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${caveat.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#fcfdfd] text-[#1c1d20] antialiased min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
