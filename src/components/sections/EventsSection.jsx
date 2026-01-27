import { Section } from '../ui/Section';
import { EventCard } from '../ui/EventCard';

const EVENTS = [
    {
        title: "Anveshan 2024",
        date: "March 15, 2024",
        description: "The annual tech-math manifesto. A 3-day saga of coding marathons, treasure hunts, and mathematical seminars.",
        image: null
    },
    {
        title: "Code-O-Fiesta",
        date: "April 02, 2024",
        description: "A competitive programming showdown tailored for the boldest algorithmic minds.",
        image: null
    },
    {
        title: "Mathemania",
        date: "May 20, 2024",
        description: "Where numbers speak louder than words. Solve, integration, and conquer.",
        image: null
    }
];

export default function EventsSection() {
    return (
        <Section id="events" className="py-20">
            <div className="mb-16 text-center">
                <h2 className="text-5xl font-bold mb-4 text-white text-glow">Upcoming Events</h2>
                <p className="text-neon-purple font-mono tracking-widest uppercase">Mark Your Calendars</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full">
                {EVENTS.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </Section>
    );
}
