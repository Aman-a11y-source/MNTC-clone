import React, { useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Phone, Mail } from 'lucide-react';
import Experience from './components/three/Experience';
import Navbar from './components/ui/Navbar';
import { SplitSection } from './components/layout/SplitSection';
import { TeamGrid } from './components/layout/TeamGrid';
import { Section } from './components/ui/Section';
import { EventCard } from './components/ui/EventCard';
import { HERO_DATA, ABOUT_DATA, ANVESHAN_DATA, EVENTS_DATA, TEAM_DATA } from './data/mntcData';

function App() {
  const containerRef = useRef(null);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <div ref={containerRef} className="relative w-full min-h-screen bg-black text-white selection:bg-neon-blue selection:text-black">
        <Navbar />

        <div className="fixed inset-0 z-0">
          <Experience />
        </div>

        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="-translate-x-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-[20vh] md:mt-[15vh] text-xl md:text-3xl font-mono text-neon-blue tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap"
            >
              {HERO_DATA.subtitle}
            </motion.p>
          </div>
        </div>

        <Section className="h-screen flex-col justify-center items-center text-center z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-[30vh] w-full" aria-hidden="true" />
          </motion.div>
        </Section>

        <div className="relative z-10 bg-black/30 backdrop-blur-sm">
          <div id="about">
            <SplitSection
              title={ABOUT_DATA.title}
              description={ABOUT_DATA.description}
              image={ABOUT_DATA.image}
            />
          </div>

          <div id="anveshan">
            <SplitSection
              title={ANVESHAN_DATA.title}
              subtitle={ANVESHAN_DATA.subtitle}
              description={ANVESHAN_DATA.description}
              image={ANVESHAN_DATA.image}
              reversed
              imageClassName="aspect-[1/1.4] h-[80vh] md:max-w-md mx-auto"
              backgroundSize="contain"
            >
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-neon-blue text-black font-bold uppercase tracking-widest rounded-sm transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                >
                  Download Now
                </motion.button>
              </div>
            </SplitSection>
          </div>

          <Section id="events" className="py-32 block">
            <div className="container mx-auto px-6 mb-16">
              <h2 className="text-6xl font-black text-white mb-4">Events</h2>
              <p className="text-gray-400 max-w-xl text-lg">
                Events round the calendar
              </p>
            </div>
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
              {EVENTS_DATA.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </Section>

          <div id="team" className="min-h-screen bg-black/90 pt-32 pb-20">
            <div className="container mx-auto px-6 text-center mb-10">
              <h2 className="text-6xl font-black text-white mb-4">Our Team</h2>
              <p className="text-neon-blue font-mono uppercase tracking-widest">
                The backbone of MNTC
              </p>
            </div>

            <TeamGrid teamData={TEAM_DATA} />
          </div>

          <footer className="py-20 bg-black border-t border-white/10 text-white">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Our Social Links</h3>
                <a href="https://www.facebook.com/mathsntechclub/" className="flex items-center gap-4 text-gray-400 hover:text-neon-blue transition-colors">
                  <Facebook className="w-6 h-6" />
                  <span className="font-mono">mathsntechclub</span>
                </a>
                <a href="https://www.instagram.com/mntc.nitd/" className="flex items-center gap-4 text-gray-400 hover:text-neon-blue transition-colors">
                  <Instagram className="w-6 h-6" />
                  <span className="font-mono">mntc.nitd</span>
                </a>
                <a href="https://www.linkedin.com/company/maths-n-tech-club-nit-durgapur/" className="flex items-center gap-4 text-gray-400 hover:text-neon-blue transition-colors">
                  <Linkedin className="w-6 h-6" />
                  <span className="font-mono">mathsntechclub</span>
                </a>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Contact Us On</h3>
                <div className="flex items-center gap-4 text-gray-400">
                  <Phone className="w-6 h-6" />
                  <span className="font-mono">+91-8887684257 (Shreyansh)</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <Phone className="w-6 h-6" />
                  <span className="font-mono">+91-8900991919 (Shivam)</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <Mail className="w-6 h-6" />
                  <span className="font-mono">mntcnitd@gmail.com</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Visit Our Other Pages</h3>
                <div className="flex flex-col gap-4 text-gray-400 font-mono">
                  <a href="#events" className="hover:text-neon-blue transition-colors">Events</a>
                  <a href="#team" className="hover:text-neon-blue transition-colors">Our Team</a>
                  <a href="#about" className="hover:text-neon-blue transition-colors">About Us</a>
                  <a href="#" className="hover:text-neon-blue transition-colors">Join Us</a>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-white/10">
              <p className="text-gray-500 font-bold">
                © All rights reserved by MNTC
              </p>
            </div>
          </footer>
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
