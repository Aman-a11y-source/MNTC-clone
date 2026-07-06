"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";

interface EventItem {
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "WORKSHOPS", "HACKATHON", "FINANCE EVENTS", "FUN EVENTS", "AAROHAN EVENTS"];

  const eventsList: EventItem[] = useMemo(() => [
    {
      category: "WORKSHOPS",
      title: "Graphic Design Workshop",
      date: "Jan 20, 2024",
      description: "Ever wondered how to create digital media from scratch using software?\nWant to broaden your horizons by communicating through visual concepts?",
      image: "/events/GD-WORKSHOP.png",
      link: "#",
    },
    {
      category: "WORKSHOPS",
      title: "Stock Market Workshop",
      date: "Jan 29, 2023",
      description: "Do you ever imagine yourself as a star investor ruling the markets of the Stock Exchange and reaping sumptuous? Isn't it worth it to take a chance to be the one, to be the billionaires?",
      image: "/events/STOCK MARKET.png",
      link: "#",
    },
    {
      category: "HACKATHON",
      title: "Ideathon",
      date: "Mar 14, 2024",
      description: "Are you brimming with ideas to address the common real world problems and revolutionize the field of solutions?! IDEATION is an offline team-based event wheres participant in a team come together to present solution on various real life problem.",
      image: "/events/IDEATHON-2.0.png",
      link: "#",
    },
    {
      category: "FINANCE EVENTS",
      title: "Stock Bit",
      date: "Jan 30, 2023",
      description: "Embrace yourselves as we present to you, StockBit. A five day Stock Market simulation. Invest fake money and see if you're able to predict the movement of stocks.",
      image: "/events/STOCK BIT.png",
      link: "#",
    },
    {
      category: "FINANCE EVENTS",
      title: "Mergers Alliance 2.0",
      date: "Dec 23, 2023",
      description: "Get ready to embark on a journey of innovation, inspiration, and interaction! We at Maths N Tech Club are thrilled to be back with our latest event MERGERS ALLIANCE 2.0 where you not only get a chance to showcase your entrepreneurial spirit",
      image: "/events/MERGERS.png",
      link: "#",
    },
    {
      category: "FUN EVENTS",
      title: "Campusudo",
      date: "Oct 16, 2022",
      description: "Maths N Tech Club is soon bringing to you all, the first ever version of 'Campusudo', an offline intrepid hunting game, that will have your brains engaged in mind boggling assumptions and leave you craving for more.",
      image: "/events/CAMPUSUDO.png",
      link: "#",
    },
    {
      category: "FUN EVENTS",
      title: "Brain Darts",
      date: "Feb 25, 2024",
      description: "Just like a vector, the magnitude is not the only thing that matters in Brain Darts .As you witness your scores run riot, just by a correct sense of direction!!!Miss and see yourself fall behind on the leaderboad. Hit and you’ll see yourself reach the pinnacle!!!And, as you decide amongst yourselves who has the better aim, Team Aavishkar presents before you BRAIN DARTS! Can you aim for the eye… Arjuna?",
      image: "/events/BRAINDARTS.png",
      link: "#",
    },
    {
      category: "AAROHAN EVENTS",
      title: "Terrorist Takedown 2.0",
      date: "Apr 9, 2024",
      description: "Do you pose a keen desire to explore the unknown? We feel you, Master Snow. The Night's Watch is definitely not your place. Last Aarohan, MNTC organized the annual edition of the prolific treasure hunt, TERRORIST TAKEDOWN! As one reached out to the east of Essos and to the west of Westeros, each careful step unraveled a series of mysteries",
      image: "/events/TT.png",
      link: "#",
    },
    {
      category: "AAROHAN EVENTS",
      title: "Kryptic",
      date: "Apr 10, 2024",
      description: "Is adrenaline rush what you crave for whilst cracking codes? Fascinated by outlandish and bizarre cyphers, eh? This Aarohan, Team Aavishkar brings to you KRYPTIC, to put your crypto-hungry soul to rest. Delve deeper into this enigmatic World of Cryptology, sail through the labyrinthine trail of codes and decipher them to climb up to the pinnacle",
      image: "/events/KRYPTIC.png",
      link: "#",
    },
    {
      category: "AAROHAN EVENTS",
      title: "Matrix",
      date: "Apr 8, 2024",
      description: "This Aarohan relive those adrenaline packed days of family game nights, those same tears of defeat, the roars of success and the incessant praying for the dice to roll in your favour! Team Aavishkar brings to you the chance of travelling down the memory lane, with twist of numbers and logic: MATRIX",
      image: "/events/MATRIX.png",
      link: "#",
    },
    {
      category: "AAROHAN EVENTS",
      title: "Call out Sherlock",
      date: "Apr 8, 2024",
      description: "Will you be excited to hear that we are back again with an enthralling opportunity to unleash the hidden detective inside of you?",
      image: "/events/COS.png",
      link: "#",
    },
    {
      category: "AAROHAN EVENTS",
      title: "Darwinia",
      date: "Apr 9, 2024",
      description: "Have you ever thought of playing football online rather than going to the field?,This Aarohan, Team Aavishkar brings to you DARWINIA, a football match for all the soccer enthusiasts out there, with numerous twists and turns.",
      image: "/events/DARWINIA.png",
      link: "#",
    },
    {
      category: "AAROHAN EVENTS",
      title: "House of Cups",
      date: "Apr 8, 2024",
      description: "Because Team Aavishkar is bringing to you an astonishing game of thrill and delight through HOUSE OF CUPS. Form your houses and protect them from demolition.",
      image: "/events/HOUSE-OF-CUPS.png",
      link: "#",
    },
    {
      category: "AAROHAN EVENTS",
      title: "Portfolio Venture",
      date: "Apr 10, 2024",
      description: "Are you ready to test your financial acumen and strategic thinking? Welcome to Portfolio Venture, an exciting game hosted by our Maths N Tech Club that puts your investment skills to the ultimate test !! The goal?",
      image: "/events/PORTFOLIO.png",
      link: "#",
    },
    {
      category: "AAROHAN EVENTS",
      title: "Clash of Titans",
      date: "Apr 10, 2024",
      description: "Do you remember how much fun it was to watch those game shows with your family back in the day? Those enjoyable, heartwarming, and humorous games.",
      image: "/events/COT.png",
      link: "#",
    }
  ], []);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "ALL") return eventsList;
    return eventsList.filter(ev => ev.category === selectedCategory);
  }, [selectedCategory, eventsList]);


  const getGlowClass = (cat: string) => {
    switch (cat) {
      case "WORKSHOPS":
        return "border-[#10B981]/30 hover:border-[#10B981] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]";
      case "HACKATHON":
        return "border-[#8B5CF6]/30 hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]";
      case "FINANCE EVENTS":
        return "border-[#F59E0B]/30 hover:border-[#F59E0B] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]";
      case "FUN EVENTS":
        return "border-[#EF4444]/30 hover:border-[#EF4444] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]";
      case "AAROHAN EVENTS":
        return "border-[#00FFDF]/30 hover:border-[#00FFDF] hover:shadow-[0_0_20px_rgba(0,255,223,0.2)]";
      default:
        return "border-white/10 hover:border-white/30";
    }
  };

  const getTagColor = (cat: string) => {
    switch (cat) {
      case "WORKSHOPS":
        return "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20";
      case "HACKATHON":
        return "text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20";
      case "FINANCE EVENTS":
        return "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20";
      case "FUN EVENTS":
        return "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20";
      case "AAROHAN EVENTS":
        return "text-[#00FFDF] bg-[#00FFDF]/10 border-[#00FFDF]/20";
      default:
        return "text-white bg-white/10 border-white/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#08070d] text-white pb-24 relative overflow-hidden">

      <div className="absolute top-10 right-10 w-96 h-96 bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[135px] opacity-15 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#00FFDF] rounded-full mix-blend-screen filter blur-[125px] opacity-10 pointer-events-none"></div>


      <div className="text-center mb-16 pt-12 relative z-10">
        <ScrollReveal baseOpacity={0.05} baseRotation={3} blurStrength={6} textClassName="text-5xl md:text-7xl font-black tracking-tight font-space-grotesk text-white">
          Events Round The Calendar
        </ScrollReveal>
        <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#00FFDF] mx-auto mt-4 rounded-full"></div>
      </div>


      <div className="max-w-6xl mx-auto px-6 mb-16 flex flex-wrap justify-center gap-3 relative z-10">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 border cursor-target ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-[#7C3AED] to-[#5227FF] border-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] scale-105"
                : "bg-[#0e0d19]/80 border-white/5 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((item, index) => (
              <div
                key={index}
                className={`glass-panel p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 border ${getGlowClass(
                  item.category
                )}`}
              >
                <div>

                  {item.image && (
                    <div className="relative w-full h-48 overflow-hidden rounded-xl mb-6 border border-white/5">
                      <Image
                        fill
                        src={item.image}
                        alt={item.title}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-w-768px) 100vw, 33vw"
                      />
                    </div>
                  )}


                  <div className="mb-4">
                    <span className={`text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md border ${getTagColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>


                  <h3 className="text-2xl font-bold font-space-grotesk tracking-tight mb-2 text-white">
                    {item.title}
                  </h3>


                  <p className="text-xs font-semibold tracking-wider font-space-grotesk text-[#00FFDF] mb-4">
                    {item.date}
                  </p>


                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line">
                    {item.description}
                  </p>
                </div>


                <a
                  href={item.link}
                  className="inline-flex items-center text-xs font-bold tracking-widest text-[#00FFDF] hover:underline cursor-target gap-1 group mt-auto"
                >
                  LEARN MORE 
                  <span className="transition-transform group-hover:translate-x-1">&gt;</span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 font-medium">No events found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}