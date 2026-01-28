import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={clsx(
                "fixed top-8 left-1/2 z-50",
                "flex items-center gap-12 px-8 py-3",
                "bg-white/5 backdrop-blur-xl border border-white/10",
                "rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",
                "transition-all duration-300 hover:bg-white/10 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            )}
        >
            <div className="text-xl font-black font-sans tracking-tighter text-white">
                MNTC.
            </div>

            <div className="hidden md:flex gap-8 items-center">
                {['About', 'Anveshan', 'Events', 'Team'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-[10px] font-bold font-mono text-gray-300 hover:text-white transition-colors uppercase tracking-[0.15em]"
                    >
                        {item}
                    </a>
                ))}
            </div>
        </motion.nav>
    );
}
