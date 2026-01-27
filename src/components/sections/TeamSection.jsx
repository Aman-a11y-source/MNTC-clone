import { Section } from '../ui/Section';
import { TeamCard } from '../ui/TeamCard';

const TEAM = [
    { name: "Dr. Anita Pal", role: "Faculty Advisor", social: { email: "anita.pal@nitdgp.ac.in" } },
    { name: "Shreyansh Agrahari", role: "President", social: { linkedin: "#", github: "#" } },
    { name: "Shivam Singh", role: "General Secretary", social: { linkedin: "#", github: "#" } },
    { name: "Ranit Barua", role: "Treasurer", social: { linkedin: "#", github: "#" } },
    { name: "Koushik Kumar", role: "Vice President", social: { linkedin: "#", github: "#" } },
    { name: "Soham Bhattacharya", role: "General Secretary", social: { linkedin: "#", github: "#" } },
];

export default function TeamSection() {
    return (
        <Section id="team" className="py-20">
            <div className="mb-16 text-center">
                <h2 className="text-5xl font-bold mb-4 text-white text-glow">The Minds Behind</h2>
                <p className="text-neon-blue font-mono tracking-widest uppercase">Faculty & Core Team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {TEAM.map((member, index) => (
                    <TeamCard key={index} {...member} />
                ))}
            </div>

            <div className="mt-16 text-center">
                <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-mono tracking-widest">
                    VIEW FULL TEAM
                </button>
            </div>
        </Section>
    );
}
