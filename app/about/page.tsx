"use client";

import Image from "next/image";
import React from "react";
import ScrollReveal from "../components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="relative text-white min-h-screen w-full overflow-hidden bg-[#08070d] pb-24">

      <div className="absolute top-10 right-10 w-96 h-96 bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[130px] opacity-15 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#00FFDF] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">

        <div className="text-center mb-16">
          <ScrollReveal baseOpacity={0.05} baseRotation={3} blurStrength={6} textClassName="text-5xl md:text-7xl font-black tracking-tight font-space-grotesk text-white">
            About Us
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#00FFDF] mx-auto mt-4 rounded-full"></div>
        </div>


        <div className="relative group max-w-4xl mx-auto mb-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#00FFDF] rounded-3xl blur opacity-35 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 aspect-[16/9]">
            <Image 
              src="/about-us/mntcaboutus.jpg" 
              alt="About us image section" 
              className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-105 transition-transform duration-700" 
              width={1920} 
              height={1080}
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#08070d] via-transparent to-transparent opacity-85"></div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          

          <div className="glass-panel p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7C3AED]/10 rounded-full blur-2xl group-hover:bg-[#7C3AED]/20 transition-colors"></div>
            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center border border-[#7C3AED]/20 mb-6 text-[#7C3AED]">
              <span className="font-space-grotesk font-bold text-xl">01</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-space-grotesk text-white">Our Origin</h3>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              We, Maths N Tech Club, are the official knowledge club of National Institute of Technology, Durgapur. Back in 2004, when the Regional Engineering College Durgapur got the status of an Institute of National Importance and was renamed as the National Institute of Technology Durgapur, Maths N Tech Club was formed.
            </p>
          </div>


          <div className="glass-panel p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00FFDF]/5 rounded-full blur-2xl group-hover:bg-[#00FFDF]/15 transition-colors"></div>
            <div className="w-12 h-12 rounded-2xl bg-[#00FFDF]/10 flex items-center justify-center border border-[#00FFDF]/20 mb-6 text-[#00FFDF]">
              <span className="font-space-grotesk font-bold text-xl">02</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-space-grotesk text-white">Our Mission</h3>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Our club was set up with the aim of creating a platform that helps in stimulating passion for mathematics and interest in the technology, of today&apos;s world. At Maths N Tech Club, we understand the importance of analytical reasoning and rational thinking. Hence, we organise a plethora of events throughout the year that aims at reinvigorating the seemingly dormant passion for mathematics and the thirst for knowledge about today&apos;s technology.
            </p>
          </div>


          <div className="glass-panel p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7C3AED]/10 rounded-full blur-2xl group-hover:bg-[#7C3AED]/20 transition-colors"></div>
            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center border border-[#7C3AED]/20 mb-6 text-[#7C3AED]">
              <span className="font-space-grotesk font-bold text-xl">03</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-space-grotesk text-white">Our Execution</h3>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              It is our continuous goal to try our best to deliver knowledge about recent technical enhancements through the various workshops that we conduct around the year. Our attempts also aim to kindle analytical reasoning and logical aptitude in the brain through various fun events and experiences.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
