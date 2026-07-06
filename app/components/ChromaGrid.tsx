"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  location?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setX = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setY = useRef<any>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg, #4F46E5, #000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg, #10B981, #000)',
      url: 'https://linkedin.com/in/'
    }
  ];
  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      } as React.CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card cursor-target"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient || 'linear-gradient(145deg, #120e2e, #05040a)',
            cursor: c.url ? 'pointer' : 'default'
          } as React.CSSProperties}
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <div className="chroma-text-details">
              <h3 className="name">{c.title}</h3>
              <p className="role">{c.subtitle}</p>
            </div>
            
            <div className="chroma-socials-overlay">
              {c.facebook && (
                <a href={c.facebook} target="_blank" rel="noopener noreferrer" className="chroma-social-icon fb" title="Facebook" onClick={(e) => e.stopPropagation()}>
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.2" d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" fill="currentColor" />
                    <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 11.0001H19C18.2044 11.0001 17.4413 11.3162 16.8787 11.8788C16.3161 12.4414 16 13.2045 16 14.0001V28.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 18.0001H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              {c.instagram && (
                <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="chroma-social-icon insta" title="Instagram" onClick={(e) => e.stopPropagation()}>
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.2" d="M21.5 4.5H10.5C9.71207 4.5 8.93185 4.65519 8.2039 4.95672C7.47594 5.25825 6.81451 5.7002 6.25735 6.25735C5.7002 6.81451 5.25825 7.47594 4.95672 8.2039C4.65519 8.93185 4.5 9.71207 4.5 10.5V21.5C4.5 22.2879 4.65519 23.0681 4.95672 23.7961C5.25825 24.5241 5.7002 25.1855 6.25735 25.7426C6.81451 26.2998 7.47594 26.7418 8.2039 27.0433C8.93185 27.3448 9.71207 27.5 10.5 27.5H21.5C22.2879 27.5 23.0681 27.3448 23.7961 27.0433C24.5241 26.7418 25.1855 26.2998 25.7426 25.7426C26.2998 25.1855 26.7418 24.5241 27.0433 23.7961C27.3448 23.0681 27.5 22.2879 27.5 21.5V10.5C27.5 9.71207 27.3448 8.93185 27.0433 8.2039C26.7418 7.47594 26.2998 6.81451 25.7426 6.25735C25.1855 5.7002 24.5241 5.25825 23.7961 4.95672C23.0681 4.65519 22.2879 4.5 21.5 4.5ZM16 21C15.0111 21 14.0444 20.7068 13.2221 20.1573C12.3999 19.6079 11.759 18.827 11.3806 17.9134C11.0022 16.9998 10.9031 15.9945 11.0961 15.0245C11.289 14.0546 11.7652 13.1637 12.4645 12.4645C13.1637 11.7652 14.0546 11.289 15.0245 11.0961C15.9945 10.9031 16.9998 11.0022 17.9134 11.3806C18.827 11.759 19.6079 12.3999 20.1573 13.2221C20.7068 14.0444 21 15.0111 21 16C21 17.3261 20.4732 18.5978 19.5355 19.5355C18.5978 20.4732 17.3261 21 16 21Z" fill="currentColor" />
                    <path d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
                    <path d="M21.5 4.5H10.5C7.18629 4.5 4.5 7.18629 4.5 10.5V21.5C4.5 24.8137 7.18629 27.5 10.5 27.5H21.5C24.8137 27.5 27.5 24.8137 27.5 21.5V10.5C27.5 7.18629 24.8137 4.5 21.5 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z" fill="currentColor" />
                  </svg>
                </a>
              )}
              {c.linkedin && (
                <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="chroma-social-icon linkin" title="LinkedIn" onClick={(e) => e.stopPropagation()}>
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.2" d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z" fill="currentColor" />
                    <path d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 14.0001V22.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 14.0001V22.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 17.5001C15 16.5719 15.3687 15.6816 16.0251 15.0252C16.6815 14.3689 17.5717 14.0001 18.5 14.0001C19.4283 14.0001 20.3185 14.3689 20.9749 15.0252C21.6313 15.6816 22 16.5719 22 17.5001V22.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 11.5C11.8284 11.5 12.5 10.8284 12.5 10C12.5 9.17157 11.8284 8.5 11 8.5C10.1716 8.5 9.5 9.17157 9.5 10C9.5 10.8284 10.1716 11.5 11 11.5Z" fill="currentColor" />
                  </svg>
                </a>
              )}
              {c.github && (
                <a href={c.github} target="_blank" rel="noopener noreferrer" className="chroma-social-icon github" title="GitHub" onClick={(e) => e.stopPropagation()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              )}
            </div>
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
