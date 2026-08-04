import { Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

// Title font - bold, modern, strong character
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
});
// Body / description font - clean, readable
const spaceGrotesk = Space_Grotesk({
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
        className={`${syne.variable} ${spaceGrotesk.variable} font-body bg-background-dark text-white min-h-screen flex flex-col overflow-x-hidden antialiased selection:bg-green-500 selection:text-white`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
