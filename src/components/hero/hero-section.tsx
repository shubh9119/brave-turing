"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";
import { cn } from "@/lib/utils";

const roles = [
  "Full-Stack Developer",
  "Creative Engineer",
  "Open Source Contributor",
  "Problem Solver",
];

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBeforeDelete = 1500;

    let timeout: NodeJS.Timeout;

    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText === currentRole) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBeforeDelete);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => currentRole.slice(0, prev.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 px-4">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background animate-pulse-slow"></div>

      <div className="max-w-4xl mx-auto text-center">
        <StaggerChildren className="space-y-6">
          <StaggerItem>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
                Brave Turing
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <div className="h-10 sm:h-12 flex justify-center items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-muted-foreground">
                <span className="mr-1">I am a</span>
                <span className="text-foreground inline-block min-w-[200px] sm:min-w-[300px] text-left">
                  {displayText}
                  <span className="animate-blink">|</span>
                </span>
              </h2>
            </div>
          </StaggerItem>

          <StaggerItem>
            <FadeIn delay={0.4}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
                I build exceptional and accessible digital experiences for the web. Let's turn your vision into reality.
              </p>
            </FadeIn>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href="/projects"
                className="px-8 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 w-full sm:w-auto"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full border border-input bg-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto"
              >
                Get in Touch
              </Link>
            </div>
          </StaggerItem>
        </StaggerChildren>

        {/* Floating Tech Icons - simplified placeholder */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute hidden md:block top-1/4 left-1/4 text-indigo-500/30 w-12 h-12"
        >
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
