import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function TeamCard({ name, role, social, image }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden"
        >
            {/* Abstract Background Decoration */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-neon-purple/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-neon-blue/20 rounded-full blur-2xl" />

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-neon-blue/30 mb-4 overflow-hidden relative">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    /* Avatar Placeholder */
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/20">
                        {name.charAt(0)}
                    </div>
                )}
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
            <p className="text-sm text-neon-blue font-mono mb-4">{role}</p>

            <div className="flex gap-4 mt-auto">
                {social.linkedin && (
                    <a href={social.linkedin} className="text-gray-400 hover:text-neon-blue transition-colors">
                        <Linkedin size={18} />
                    </a>
                )}
                {social.github && (
                    <a href={social.github} className="text-gray-400 hover:text-neon-purple transition-colors">
                        <Github size={18} />
                    </a>
                )}
                {social.email && (
                    <a href={`mailto:${social.email}`} className="text-gray-400 hover:text-white transition-colors">
                        <Mail size={18} />
                    </a>
                )}
            </div>
        </motion.div>
    );
}
