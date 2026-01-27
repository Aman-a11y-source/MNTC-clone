import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamCard } from '../ui/TeamCard';
import { Construction } from 'lucide-react';

const TABS = [
    { id: 'faculty', label: 'Faculty Advisors' },
    { id: 'fourthYear', label: 'Fourth Year' },
    { id: 'thirdYear', label: 'Third Year' },
    { id: 'secondYear', label: 'Second Year' },
    { id: 'alumni', label: 'Alumni' },
];

export function TeamGrid({ teamData }) {
    const [activeTab, setActiveTab] = useState('faculty');

    return (
        <div className="py-20 container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 
              ${activeTab === tab.id
                                ? 'bg-neon-blue text-black shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {['secondYear', 'alumni'].includes(activeTab) ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center text-center py-20 min-h-[400px]"
                >
                    <Construction className="w-24 h-24 text-neon-blue mb-6 animate-pulse" />
                    <h3 className="text-3xl font-bold text-white mb-2">Work In Progress</h3>
                    <p className="text-gray-400 font-mono tracking-widest uppercase">
                        ...Will update later on...
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {teamData[activeTab]?.map((member, index) => (
                            <motion.div
                                key={`${activeTab}-${index}`}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >

                                <TeamCard
                                    name={member.name}
                                    role={member.role}
                                    image={member.image}
                                    social={{}}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}
