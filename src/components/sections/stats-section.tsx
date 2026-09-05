"use client";

import { useEffect, useState, useRef } from "react";
import { FadeIn } from "@/components/animations/fade-in";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function StatItem({ end, label, suffix = "", prefix = "" }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function: easeOutExpo
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeOut));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, isVisible]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-background border-y border-border relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[200px] bg-indigo-500/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            <StatItem end={50} suffix="+" label="Projects" />
            <StatItem end={10} suffix="K+" label="Lines of Code" />
            <StatItem end={25} suffix="+" label="Technologies" />
            <StatItem end={3} suffix="+" label="Years Experience" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
