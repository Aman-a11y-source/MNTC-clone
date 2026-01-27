import { Section } from '../ui/Section';

export default function AboutSection() {
    return (
        <Section id="about" className="py-32">
            <div className="glass-card p-10 rounded-2xl max-w-5xl mx-auto border border-white/10 relative overflow-hidden">
                {/* Decorative mesh gradient behind text */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/20 blur-[100px] -z-10" />

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-5xl font-bold mb-6 text-white text-glow">The Intersection of Logic & Code</h2>
                        <div className="h-1 w-20 bg-neon-blue mb-8 rounded-full" />
                    </div>
                    <div>
                        <p className="text-lg leading-relaxed text-gray-300 mb-6">
                            To simply imply that we are a club of geeks would be an understatement.
                            <span className="text-neon-blue font-semibold"> MNTC</span> is a society of forward-thinkers.
                            We build, we solve, we innovate.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-300">
                            From competitive programming battles to exploring the depths of pure mathematics,
                            we bridge the gap between abstract theory and digital reality.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
