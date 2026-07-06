"use client";

/**
 * FloatingTextBg — v4
 *
 * Horizontal rows : full viewport width, very muted — unchanged
 * Vertical columns: ONLY inside the right ~55% zone (the red-box area in the screenshot)
 *                   3 columns inside that zone — left UP · middle DOWN · right UP
 */

/* ── Horizontal rows (full width, untouched) ───────────────────────── */
const H_ROWS = [
  {
    text: "MATRIX • DARWINIA • KRYPTIC • IDEATHON 2.0 • CAMPUS SUDOKU • MERGERS & ACQUISITIONS • AAROHAN • GD WORKSHOP • PORTFOLIO MANAGEMENT • ",
    dur: 55, dir: 1,  top: "6%",  size: "4.8rem", opacity: 0.030,
  },
  {
    text: "MATHS N TECH CLUB • NITDGP • CODE • DESIGN • LOGIC • ALGORITHMS • DATA STRUCTURES • CALL OUT SHERLOCK • TERRORIST TAKEDOWN • FINANCE • ",
    dur: 38, dir: -1, top: "24%", size: "3.2rem", opacity: 0.022,
  },
  {
    text: "CRYPTOGRAPHY • STATISTICS • PROBABILITY • QUANTITATIVE ANALYSIS • LINEAR ALGEBRA • NUMBER THEORY • COMBINATORICS • ",
    dur: 62, dir: 1,  top: "43%", size: "5.2rem", opacity: 0.026,
  },
  {
    text: "DARWINIA • KRYPTIC • MATRIX • IDEATHON • AAROHAN • GD WORKSHOP • MERGERS • CAMPUS SUDOKU • CALL OUT SHERLOCK • ",
    dur: 44, dir: -1, top: "62%", size: "3rem",   opacity: 0.018,
  },
  {
    text: "ALGORITHMS • DATA • DESIGN • LOGIC • STATISTICS • PORTFOLIO • FINANCE • STOCK MARKET • MATHEMATICS • ",
    dur: 70, dir: 1,  top: "81%", size: "4.2rem", opacity: 0.024,
  },
];

/* ── 3 vertical columns — positioned WITHIN the right zone ─────────── */
/* These percentages are relative to the zone container (not the viewport) */
const V_COLS = [
  {
    id: "vleft",
    words: ["MATRIX", "DARWINIA", "KRYPTIC", "IDEATHON", "CAMPUS SUDOKU", "AAROHAN"],
    dur: 24, dir: "up" as const,
    left: "2%", width: "31%",
    color: "#00FFDF", opacity: 0.20, size: "3rem",
  },
  {
    id: "vmid",
    words: ["MERGERS", "FINANCE", "PORTFOLIO", "GD WORKSHOP", "STOCK MARKET", "IDEATION"],
    dur: 20, dir: "down" as const,
    left: "35%", width: "31%",
    color: "#7C3AED", opacity: 0.24, size: "3rem",
  },
  {
    id: "vright",
    words: ["MATHS", "CODE", "DESIGN", "LOGIC", "ALGORITHMS", "THEORY", "NITDGP"],
    dur: 28, dir: "up" as const,
    left: "68%", width: "31%",
    color: "#00FFDF", opacity: 0.18, size: "3rem",
  },
];

export default function FloatingTextBg() {
  return (
    <>
      <style>{`
        @keyframes ftb-l { from { transform:translateX(0);    } to { transform:translateX(-50%);  } }
        @keyframes ftb-r { from { transform:translateX(-50%); } to { transform:translateX(0);     } }
        .ftb-h { display:flex; white-space:nowrap; will-change:transform; }
        .ftb-h.go-l { animation: ftb-l linear infinite; }
        .ftb-h.go-r { animation: ftb-r linear infinite; }

        @keyframes ftb-u { from { transform:translateY(0);    } to { transform:translateY(-50%);  } }
        @keyframes ftb-d { from { transform:translateY(-50%); } to { transform:translateY(0);     } }
        .ftb-v { display:flex; flex-direction:column; will-change:transform; }
        .ftb-v.go-u { animation: ftb-u linear infinite; }
        .ftb-v.go-d { animation: ftb-d linear infinite; }

        .ftb-v-word {
          display: block;
          white-space: nowrap;
          line-height: 1.2;
          padding: 0.3em 0;
          font-weight: 900;
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        @media (prefers-reduced-motion: reduce) {
          .ftb-h, .ftb-v { animation: none !important; }
        }

        /* collapse middle+right vertical cols on small screens */
        @media (max-width: 480px) {
          .ftb-vcol-vmid, .ftb-vcol-vright { display: none; }
        }
        @media (max-width: 768px) {
          .ftb-vcol-vright { display: none; }
        }
      `}</style>

      {/* Root wrapper — fills the hero container */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
          userSelect: "none",
        }}
      >
        {/* ── Horizontal rows (full width) ──────────────────────── */}
        {H_ROWS.map((row, i) => (
          <div
            key={`h${i}`}
            style={{ position: "absolute", top: row.top, left: 0, right: 0, overflow: "hidden" }}
          >
            <div
              className={`ftb-h ${row.dir === 1 ? "go-l" : "go-r"}`}
              style={{
                animationDuration: `${row.dur}s`,
                fontSize: row.size,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 900,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#ffffff",
                opacity: row.opacity,
                lineHeight: 1,
              }}
            >
              <span>{row.text}{row.text}</span>
            </div>
          </div>
        ))}

        {/*
          ── Vertical columns zone ──────────────────────────────────
          This box occupies only the RIGHT portion of the hero
          (matching the red-boxed area in the screenshot).
          All 3 columns are positioned relative to this zone.
        */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            /* starts at ~45% from the left — right of the title text */
            left: "45%",
            right: 0,
            overflow: "hidden",
          }}
        >
          {V_COLS.map((col) => {
            const repeated = [...col.words, ...col.words];
            return (
              <div
                key={col.id}
                className={`ftb-vcol-${col.id}`}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: col.left,
                  width: col.width,
                  overflow: "hidden",
                }}
              >
                <div
                  className={`ftb-v ${col.dir === "up" ? "go-u" : "go-d"}`}
                  style={{
                    animationDuration: `${col.dur}s`,
                    color: col.color,
                    opacity: col.opacity,
                    fontSize: col.size,
                  }}
                >
                  {repeated.map((word, wi) => (
                    <span key={wi} className="ftb-v-word">{word}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
