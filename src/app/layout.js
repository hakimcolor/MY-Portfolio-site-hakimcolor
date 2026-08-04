import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

// Title font - elegant, strong, high-contrast serifs for headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
});
// Body / description font - clean, modern, highly readable
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['300', '400', '500', '600'],
});

export const metadata = {
  title: 'Muhamaad Azizul Hakim - Portfolio',
  description: 'MERN Stack Developer Portfolio',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} font-body bg-background-dark text-white min-h-screen flex flex-col overflow-x-hidden antialiased selection:bg-green-500 selection:text-white`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
