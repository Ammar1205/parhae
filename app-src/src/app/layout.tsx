import type { Metadata } from 'next';
import { Fredoka, Quicksand } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import AnnouncementMarquee from '@/components/global/AnnouncementMarquee';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import CartDrawer from '@/components/global/CartDrawer';
import { Toaster } from 'react-hot-toast';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Parhae Likhae – Premium Kids Educational Toys & Books | Pakistan',
  description:
    "Pakistan's #1 kids educational brand. Shop phonics sets, Islamic cards, prophet stories, tracing books, puzzles & learning bundles. Free shipping on 2+ items. Cash on Delivery available.",
  keywords: [
    'kids educational toys Pakistan',
    'phonics books Urdu',
    'Islamic learning cards',
    'children books Pakistan',
    'educational toys Lahore',
    'parhae likhae',
  ],
  openGraph: {
    title: 'Parhae Likhae – Where Little Minds READ, PLAY & GROW!',
    description: 'Premium educational toys & books for Pakistani kids aged 2–10.',
    type: 'website',
    locale: 'en_PK',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${quicksand.variable}`}>
      <body className="bg-white antialiased">
        <AuthProvider>
          <CartProvider>
            <AnnouncementMarquee />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <Toaster position="bottom-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
