import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Section({ children, className, id }) {
    return (
        <section
            id={id}
            className={twMerge(
                "relative w-full min-h-screen grid place-items-center py-20 px-4 md:px-10",
                className
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl w-full"
            >
                {children}
            </motion.div>
        </section>
    );
}

// Utility for merging classes safely
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
