import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference",
                scrolled ? "bg-black/50 backdrop-blur-md py-4" : "bg-transparent"
            )}
        >
            <div className="text-2xl font-black font-sans tracking-tighter text-white">
                MNTC.
            </div>

            <div className="hidden md:flex gap-10 items-center">
                {['About', 'Anveshan', 'Events', 'Team'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-xs font-mono font-bold text-gray-300 hover:text-neon-blue transition-colors uppercase tracking-[0.2em]"
                    >
                        {item}
                    </a>
                ))}

            </div>
        </motion.nav>
    );
}
