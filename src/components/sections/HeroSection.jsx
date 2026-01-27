import { section } from 'framer-motion/client';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <Section className="h-screen flex-col justify-center items-start text-left z-10 pointer-events-none">
            <div className="pointer-events-auto">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple text-glow mb-4"
                >
                    MNTC
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-xl md:text-2xl font-mono text-neon-blue/80 tracking-widest uppercase"
                >
                    Maths 'N' Tech Club
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-6 max-w-lg text-white/60 text-lg"
                >
                    Exploring the infinite possibilities where Mathematics meets Technology.
                    The future is computed.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="mt-10 px-8 py-3 bg-neon-blue/10 border border-neon-blue/50 text-neon-blue font-bold tracking-wider hover:bg-neon-blue hover:text-black transition-all rounded-sm uppercase"
                >
                    Discover More
                </motion.button>
            </div>
        </Section>
    );
}
