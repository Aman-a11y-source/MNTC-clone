"use client";

import React, { useState, useEffect, useRef } from "react";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  dotColor?: string;
  hoverColor?: string;
  hoverRadius?: number;
  className?: string;
}

export const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 1.5,
  gap = 32,
  dotColor = "rgba(255, 255, 255, 0.12)",
  hoverColor = "#00FFDF",
  hoverRadius = 120,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gap) + 1;
      const rows = Math.ceil(canvas.height / gap) + 1;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;

          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let currentSize = dotSize;
          let currentColor = dotColor;
          let offsetX = 0;
          let offsetY = 0;

          if (dist < hoverRadius) {
            const factor = (hoverRadius - dist) / hoverRadius;
            offsetX = -dx * 0.12 * factor;
            offsetY = -dy * 0.12 * factor;
            currentSize = dotSize + 2 * factor;
            currentColor = hoverColor;
          }

          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = currentColor;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotSize, gap, dotColor, hoverColor, hoverRadius, isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default DotGrid;
