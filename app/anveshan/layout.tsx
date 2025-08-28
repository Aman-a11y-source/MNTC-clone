import { Poppins } from 'next/font/google';
import type { ReactNode } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={`${poppins.className} min-h-screen flex flex-col flex-grow`}>
      {children}
    </main>
  );
}
