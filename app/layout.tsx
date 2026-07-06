import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import TargetCursor from "./components/TargetCursor";
import StaggeredMenu from "./components/StaggeredMenu";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MNTC | NIT Durgapur",
  description: "Maths N Tech Club (MNTC), NIT Durgapur. The official knowledge club of National Institute of Technology, Durgapur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About Us', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Anveshan', ariaLabel: 'View our magazine', link: '/anveshan' },
    { label: 'Events', ariaLabel: 'Check our events', link: '/events' },
    { label: 'Our Team', ariaLabel: 'Meet the team', link: '/team' }
  ];

  const socialItems = [
    { label: 'Facebook', link: 'https://www.facebook.com/mathsntechclub/' },
    { label: 'Instagram', link: 'https://www.instagram.com/mntc.nitd/' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/maths-n-tech-club-nit-durgapur/' }
  ];

  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-[#08070d] text-[#f4f4f7] min-h-screen">
        <TargetCursor 
          spinDuration={3}
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColor="#ffffff"
          cursorColorOnTarget="#00FFDF"
        />

        <StaggeredMenu 
          position="right"
          colors={['#181622', '#2d1b54', '#7C3AED']}
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#00FFDF"
          accentColor="#00FFDF"
          changeMenuColorOnOpen={true}
          isFixed={true}
        />

        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
