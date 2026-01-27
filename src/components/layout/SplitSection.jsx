import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../ui/Section';

export function SplitSection({ title, subtitle, description, image, reversed = false, children, imageClassName, backgroundSize = "cover" }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });


    const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-[120vh] flex items-center py-20 overflow-hidden">
            <div className={cn(
                "container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center",
                reversed ? "direction-rtl" : ""
            )}>


                <div className={cn(
                    "relative w-full overflow-hidden rounded-2xl shadow-2xl",
                    reversed ? "md:order-2" : "md:order-1",
                    imageClassName || "h-[60vh] aspect-video"
                )}>
                    <motion.div style={{ y: imageY }} className="absolute inset-[-20%] w-[140%] h-[140%]">
                        <div
                            className={cn("w-full h-full bg-center bg-no-repeat", `bg-${backgroundSize}`)}
                            style={{ backgroundImage: `url(${image})` }}
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>
                </div>


                <motion.div
                    style={{ y: textY, opacity }}
                    className={cn("flex flex-col justify-center", reversed ? "md:order-1" : "md:order-2")}
                >
                    {subtitle && <span className="text-neon-blue font-mono tracking-widest uppercase mb-4">{subtitle}</span>}
                    <h2 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9]">{title}</h2>
                    <div className="space-y-6 text-lg text-gray-300/90 leading-relaxed max-w-lg mb-8">
                        {Array.isArray(description) ? description.map((p, i) => (
                            <p key={i}>{p}</p>
                        )) : <p>{description}</p>}
                    </div>


                    {children}
                </motion.div>

            </div>
        </section>
    );
}

