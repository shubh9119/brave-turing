"use client";

import { useState, useEffect } from "react";
import { Globe, Clock, ShieldCheck, Activity } from "lucide-react";

export function GlobalAvailability() {
  const [times, setTimes] = useState({
    est: "",
    pst: "",
    gmt: "",
    ist: "",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        est: now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit" }),
        pst: now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit" }),
        gmt: now.toLocaleTimeString("en-US", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" }),
        ist: now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 overflow-hidden relative shadow-sm">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Global Operations & Hubs</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Worldwide Remote & Multi-Timezone Coverage</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-medium">
          <Activity className="h-3 w-3 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* SVG World Map Visual with Pulsing Hub Beacons */}
      <div className="relative h-36 w-full rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/60 overflow-hidden mb-5 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,rgba(99,102,241,0.5)_1px,transparent_0)] [background-size:16px_16px]" />

        {/* Global Hub Nodes */}
        {/* San Francisco / PST */}
        <div className="absolute left-[18%] top-[38%] group">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-indigo-400 opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-indigo-500" />
          </div>
          <span className="absolute -bottom-4 -left-6 text-[9px] font-mono text-slate-700 dark:text-slate-400 whitespace-nowrap bg-white/95 dark:bg-slate-900/90 px-1 rounded border border-slate-200 dark:border-slate-800 shadow-xs">
            SF / Austin
          </span>
        </div>

        {/* New York / EST */}
        <div className="absolute left-[30%] top-[34%] group">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-indigo-400 opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-indigo-500" />
          </div>
          <span className="absolute -bottom-4 -left-4 text-[9px] font-mono text-slate-700 dark:text-slate-400 whitespace-nowrap bg-white/95 dark:bg-slate-900/90 px-1 rounded border border-slate-200 dark:border-slate-800 shadow-xs">
            NYC
          </span>
        </div>

        {/* London / GMT */}
        <div className="absolute left-[52%] top-[28%] group">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-purple-400 opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-purple-500" />
          </div>
          <span className="absolute -bottom-4 -left-4 text-[9px] font-mono text-slate-700 dark:text-slate-400 whitespace-nowrap bg-white/95 dark:bg-slate-900/90 px-1 rounded border border-slate-200 dark:border-slate-800 shadow-xs">
            London
          </span>
        </div>

        {/* Bengaluru / IST */}
        <div className="absolute left-[72%] top-[52%] group">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-emerald-400 opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
          </div>
          <span className="absolute -bottom-4 -left-6 text-[9px] font-mono text-slate-700 dark:text-slate-400 whitespace-nowrap bg-white/95 dark:bg-slate-900/90 px-1 rounded border border-slate-200 dark:border-slate-800 shadow-xs">
            Bengaluru
          </span>
        </div>

        <div className="text-center z-10 pointer-events-none opacity-40">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
            High-Speed Global Edge Mesh
          </span>
        </div>
      </div>

      {/* Live Clocks Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">New York (EST)</div>
            <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">{times.est || "09:00 AM"}</div>
          </div>
          <Clock className="h-3.5 w-3.5 text-indigo-600/60 dark:text-indigo-400/60" />
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">San Francisco (PST)</div>
            <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">{times.pst || "06:00 AM"}</div>
          </div>
          <Clock className="h-3.5 w-3.5 text-indigo-600/60 dark:text-indigo-400/60" />
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">London (GMT)</div>
            <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">{times.gmt || "02:00 PM"}</div>
          </div>
          <Clock className="h-3.5 w-3.5 text-purple-600/60 dark:text-purple-400/60" />
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Bengaluru (IST)</div>
            <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">{times.ist || "07:30 PM"}</div>
          </div>
          <Clock className="h-3.5 w-3.5 text-emerald-600/60 dark:text-emerald-400/60" />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800/80">
        <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <span>Guaranteed SLA: Response within 24 hours on all inquiries.</span>
      </div>
    </div>
  );
}
