import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

export function EventCard({ title, date, description, image }) {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass-card rounded-xl overflow-hidden group relative"
        >
            <div className="h-48 w-full bg-gray-800 relative">
                {/* Placeholder for event image if not provided */}
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-white/50" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            <div className="p-6">
                <p className="text-neon-green font-mono text-sm mb-2">{date}</p>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{description}</p>

                <button className="mt-4 flex items-center text-neon-blue hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider">
                    Details <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </motion.div>
    );
}
