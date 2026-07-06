"use client";

/**
 * TransitionLink
 * Drop-in replacement for <Link> that fires the close animation BEFORE
 * calling router.push(), so the sequence is:
 *   click → panels slide IN (close) → navigate → panels slide OUT (open)
 */

import { useRouter } from "next/navigation";
import React from "react";

export const CLOSE_MS = 520;  // panels slide IN
export const HOLD_MS  = 140;  // brief hold at centre
export const OPEN_MS  = 520;  // panels slide OUT — same duration as close

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  "data-index"?: number | string;
  /** Called synchronously on click (e.g. close the menu) before transition starts */
  onBeforeNavigate?: () => void;
  style?: React.CSSProperties;
}

export default function TransitionLink({
  href,
  children,
  onBeforeNavigate,
  ...rest
}: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // 1. close the menu (or any other pre-nav cleanup)
    onBeforeNavigate?.();

    // 2. fire the custom event so PageTransition starts the CLOSE animation
    window.dispatchEvent(new CustomEvent("pt:close"));

    // 3. after the close animation finishes + hold, actually navigate
    setTimeout(() => {
      router.push(href);
    }, CLOSE_MS + HOLD_MS);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
