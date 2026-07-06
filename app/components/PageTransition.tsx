"use client";

/**
 * PageTransition — Camera-lens iris wipe (v3, correct sequence)
 *
 * Sequence:
 *  1. User clicks a TransitionLink → "pt:close" event fires
 *  2. Panels slide IN from sides (CLOSE_MS) → "closing"
 *  3. Panels meet at centre (HOLD_MS) → "closed"  [MNTC logo flash]
 *  4. router.push() fires in TransitionLink after CLOSE_MS + HOLD_MS
 *  5. usePathname() detects new route → "opening"
 *  6. Panels retract back to off-screen (OPEN_MS) → "idle"
 *
 * Panels always live in the DOM at their off-screen position;
 * CSS transitions do the heavy lifting — zero JS animation loop.
 */

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CLOSE_MS, HOLD_MS, OPEN_MS } from "./TransitionLink";

type Phase = "idle" | "closing" | "closed" | "opening";

/* Same easing for both directions — professional, symmetrical */
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const BG   = "#08070d";

export default function PageTransition() {
  const pathname    = usePathname();
  const firstRender = useRef(true);
  const phaseRef    = useRef<Phase>("idle");
  const [phase, _setPhase] = useState<Phase>("idle");

  const setPhase = (p: Phase) => {
    phaseRef.current = p;
    _setPhase(p);
  };

  /* ── Listen for the CLOSE event fired by TransitionLink ──────────── */
  useEffect(() => {
    const onClose = () => {
      setPhase("closing");
      setTimeout(() => setPhase("closed"), CLOSE_MS);
    };
    window.addEventListener("pt:close", onClose);
    return () => window.removeEventListener("pt:close", onClose);
  }, []);

  /* ── On pathname change, play the OPEN animation ─────────────────── */
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }

    /* Small rAF delay ensures the new page has rendered and
       the panels are sitting at their "closed" (center) position
       before we start the open transition */
    const raf = requestAnimationFrame(() => {
      setPhase("opening");
      setTimeout(() => setPhase("idle"), OPEN_MS);
    });

    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* ── Panel positions ─────────────────────────────────────────────── */
  // idle    → off-screen (left: -101%, right: 101%)
  // closing → sliding to centre (0%)
  // closed  → at centre (0%)
  // opening → sliding back off-screen

  const atCenter  = phase === "closing" || phase === "closed";
  const leftX     = atCenter ? "0%"    : "-101%";
  const rightX    = atCenter ? "0%"    :  "101%";

  // Apply transition only when actually moving
  const isMoving  = phase === "closing" || phase === "opening";
  const duration  = phase === "opening" ? `${OPEN_MS}ms` : `${CLOSE_MS}ms`;
  const trans     = isMoving ? `transform ${duration} ${EASE}` : "none";

  const isClosed  = phase === "closed";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: phase === "idle" ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Left panel */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, left: 0,
          width: "51%",
          background: BG,
          transform: `translateX(${leftX})`,
          transition: trans,
          boxShadow: "6px 0 32px 0 rgba(0,255,223,0.10)",
        }}
      />

      {/* Right panel */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0, right: 0,
          width: "51%",
          background: BG,
          transform: `translateX(${rightX})`,
          transition: trans,
          boxShadow: "-6px 0 32px 0 rgba(124,58,237,0.10)",
        }}
      />

      {/* Centre logo — visible only while fully closed */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
          opacity: isClosed ? 1 : 0,
          transition: `opacity 0.15s ease ${isClosed ? "0.05s" : "0s"}`,
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 200 60" width="100" height="30" xmlns="http://www.w3.org/2000/svg">
          <text
            x="5" y="42"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="900"
            fontSize="38"
            fill="none"
            stroke="#00FFDF"
            strokeWidth="1.4"
            letterSpacing="2"
          >
            MNTC
          </text>
        </svg>
        <div style={{
          width: "36px", height: "1px",
          background: "linear-gradient(90deg, transparent, #00FFDF80, transparent)",
        }} />
      </div>
    </div>
  );
}
