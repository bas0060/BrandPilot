"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "-8% 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-6 opacity-0 blur-[6px]"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--lit", "1");
  };
  const onLeave = () => ref.current?.style.setProperty("--lit", "0");

  return (
    <Tag
      ref={ref as React.RefObject<any>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ "--lit": 0 } as React.CSSProperties}
      className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-secondary/30 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:border-border hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.9)] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--lit)] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--foreground) 10%, transparent), transparent 70%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}