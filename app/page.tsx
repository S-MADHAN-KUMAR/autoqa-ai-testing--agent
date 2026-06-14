"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function AutoQaPage() {
  const { isSignedIn } = useUser();
  useEffect(() => {
    const tiltCards = document.querySelectorAll<HTMLElement>('.tilt-card');

    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (card: HTMLElement) => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    const mouseMoveListeners = new Map();
    const mouseLeaveListeners = new Map();

    tiltCards.forEach(card => {
      const moveListener = (e: MouseEvent) => handleMouseMove(e, card);
      const leaveListener = () => handleMouseLeave(card);

      mouseMoveListeners.set(card, moveListener);
      mouseLeaveListeners.set(card, leaveListener);

      card.addEventListener('mousemove', moveListener);
      card.addEventListener('mouseleave', leaveListener);
    });

    const nav = document.querySelector('nav');
    const handleScroll = () => {
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.classList.add('py-2');
        nav.classList.remove('py-3');
      } else {
        nav.classList.add('py-3');
        nav.classList.remove('py-2');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      tiltCards.forEach(card => {
        card.removeEventListener('mousemove', mouseMoveListeners.get(card));
        card.removeEventListener('mouseleave', mouseLeaveListeners.get(card));
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[-1] opacity-40"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 bg-surface/80 backdrop-blur-md dark:bg-surface/80 rounded-full mt-3 mx-auto max-w-6xl w-[95%] border-2 border-primary dark:border-outline-variant shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img alt="AutoQa Logo" className="w-8 h-8 object-contain" src="/logo.png" />
          <span className="font-headline text-lg font-black tracking-tighter text-primary dark:text-primary-fixed uppercase">AutoQa</span>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              {/* Workspace button */}
              <Link
                href="/workspace"
                className="px-4 py-1.5 bg-transparent border-2 border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all duration-100 active:translate-y-0.5"
              >
                Workspace
              </Link>
              {/* Clerk profile button — avatar, manage account, sign out */}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              {/* Connect GitHub */}
              <button className="flex items-center gap-1.5 px-4 py-1.5 bg-transparent border-2 border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all duration-100 active:translate-y-0.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                Connect GitHub
              </button>
              {/* Sign In */}
              <Link
                href="/sign-in"
                className="px-4 py-1.5 bg-primary text-white font-bold uppercase tracking-widest text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>

      <section className="relative min-h-screen pt-20 pb-14 px-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="z-10">
            <div className="inline-block px-3 py-0.5 bg-primary text-white font-black uppercase tracking-tighter text-xs mb-4">
              Autonomous Testing v2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase mb-6 metallic-text">
              Ship Code <br />With <br />Confidence
            </h1>
            <p className="text-base font-medium text-on-surface-variant/80 max-w-xl mb-8 border-l-4 border-primary pl-4">
              The world&apos;s first AI-native testing agent that writes, executes, and auto-heals E2E tests in real-time. No more flaky CI/CD.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-7 py-3 bg-primary-container text-primary font-black uppercase text-base neo-brutalist-border neo-brutalist-shadow transition-all active:translate-y-1 active:translate-x-1 active:shadow-none">
                Connect GitHub Repo
              </button>
              <button className="px-7 py-3 bg-white text-primary font-black uppercase text-base border-2 border-primary hover:bg-surface-container transition-all">
                View Demo
              </button>
            </div>
          </div>
          <div className="relative w-full aspect-square lg:aspect-video flex items-center justify-center">
            <div className="w-full h-full glass-panel neo-brutalist-border neo-brutalist-shadow rotate-3 scale-95 hover:rotate-0 transition-transform duration-700 tilt-card">
              <img src="https://i.pinimg.com/originals/c5/6c/97/c56c9756a71f917b5fd1c65f3f95d198.gif" className="w-full h-full object-cover" alt="Demo" />
            </div>
            <div className="absolute -top-3 -right-3 px-4 py-2 text-sm bg-[#7c3aed] text-white font-bold neo-brutalist-border neo-brutalist-shadow -rotate-6">99.9% Coverage</div>
            <div className="absolute -bottom-3 -left-3 px-4 py-2 text-sm bg-[#06b6d4] text-white font-bold neo-brutalist-border neo-brutalist-shadow rotate-6">Auto-Healed</div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-surface-container/10 border-y-4 border-primary">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-3">The Pipeline</h2>
              <p className="text-on-surface-variant/70 text-sm uppercase font-bold tracking-widest">End-to-end automated orchestration</p>
            </div>
            <div className="text-right">
              <span className="text-6xl font-black text-primary/10">01</span>
            </div>
          </div>

          {/* HOW IT FLOWS label */}
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant/50 mb-10">How It Flows</p>

          {/* 5-step flow */}
          <div className="flex items-start justify-between gap-0">

            {/* Step 1 — GitHub Repo */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center neo-brutalist-border neo-brutalist-shadow mb-4 group-hover:-translate-y-1 transition-transform">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <h3 className="font-black uppercase text-sm mb-1">GitHub Repo</h3>
              <p className="text-xs text-on-surface-variant/60">Connect &amp; clone</p>
            </div>

            {/* Connector 1 */}
            <div className="flex items-center mt-8 flex-1 min-w-0 px-2">
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
                <div className="flex-1 border-t-2 border-dashed border-primary/30 relative">
                  <div className="absolute inset-0 border-t-2 border-dashed border-primary w-1/2 animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
              </div>
            </div>

            {/* Step 2 — AI Analysis */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
              </div>
              <h3 className="font-black uppercase text-sm mb-1">AI Analysis</h3>
              <p className="text-xs text-on-surface-variant/60">Map routes + flows</p>
            </div>

            {/* Connector 2 */}
            <div className="flex items-center mt-8 flex-1 min-w-0 px-2">
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
                <div className="flex-1 border-t-2 border-dashed border-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
              </div>
            </div>

            {/* Step 3 — Test Generation */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="font-black uppercase text-sm mb-1">Test Generation</h3>
              <p className="text-xs text-on-surface-variant/60">214 scenarios</p>
            </div>

            {/* Connector 3 */}
            <div className="flex items-center mt-8 flex-1 min-w-0 px-2">
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
                <div className="flex-1 border-t-2 border-dashed border-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
              </div>
            </div>

            {/* Step 4 — Browserbase */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>
                </svg>
              </div>
              <h3 className="font-black uppercase text-sm mb-1">Browserbase</h3>
              <p className="text-xs text-on-surface-variant/60">Cloud execution</p>
            </div>

            {/* Connector 4 */}
            <div className="flex items-center mt-8 flex-1 min-w-0 px-2">
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
                <div className="flex-1 border-t-2 border-dashed border-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
              </div>
            </div>

            {/* Step 5 — Results */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center neo-brutalist-border neo-brutalist-shadow mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
              </div>
              <h3 className="font-black uppercase text-sm mb-1">Results</h3>
              <p className="text-xs text-on-surface-variant/60">Report + video</p>
            </div>

          </div>
        </div>
      </section>


      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 text-center">Autonomous Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-8 group p-1 bg-white neo-brutalist-border neo-brutalist-shadow transition-all hover:scale-[1.01]">
              <div className="relative h-full p-6 overflow-hidden bg-white text-primary">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl font-black uppercase leading-tight">AI Test<br />Generation</h3>
                  <span className="material-symbols-outlined text-4xl">model_training</span>
                </div>
                <p className="text-base font-medium mb-6 max-w-md">Our LLM agents browse your application like a human, understanding context and edge cases to build comprehensive test suites in minutes, not weeks.</p>
                <div className="h-36 w-full bg-on-secondary/5 neo-brutalist-border p-3 font-mono text-sm">
                  <div className="flex gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <code className="text-primary/70 text-xs">
                    <span className="text-[#7c3aed]">await</span> page.goto(&apos;<span className="text-[#06b6d4]">/checkout</span>&apos;);<br />
                    <span className="text-[#7c3aed]">await</span> page.getByRole(&apos;<span className="text-[#06b6d4]">button</span>&apos;).click();<br />
                    <span className="text-green-600">// Auto-generated by AutoQa</span>
                  </code>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 p-1 bg-primary text-white neo-brutalist-border neo-brutalist-shadow">
              <div className="h-full p-6 flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>healing</span>
                  <h3 className="text-2xl font-black uppercase leading-tight mb-3">Auto-Healing</h3>
                  <p className="font-medium opacity-80 text-sm">CSS selectors changed? No problem. AutoQa identifies UI updates and patches tests automatically.</p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest">Stability Index</span>
                    <span className="text-xl font-black">99.2%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 p-6 glass-panel neo-brutalist-border neo-brutalist-shadow transition-all hover:bg-white/10">
              <h3 className="text-xl font-black uppercase mb-3">Actionable Reports</h3>
              <p className="mb-6 opacity-70 text-sm">Rich traces, video recordings, and step-by-step logs for every single test execution.</p>
              <div className="space-y-2">
                <div className="h-1.5 bg-green-500 w-full"></div>
                <div className="h-1.5 bg-green-500 w-4/5"></div>
                <div className="h-1.5 bg-red-500 w-1/3"></div>
                <div className="h-1.5 bg-green-500 w-full"></div>
              </div>
            </div>

            <div className="md:col-span-8 p-1 bg-primary-container text-primary neo-brutalist-border neo-brutalist-shadow">
              <div className="h-full p-6 flex items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-black uppercase mb-3">Native CI Integration</h3>
                  <p className="font-medium text-sm">Seamlessly plug into GitHub Actions, GitLab CI, or Jenkins. Blocks merges on failure with rich PR comments.</p>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t-4 border-primary mt-14 bg-surface dark:bg-surface grid grid-cols-1 md:grid-cols-4 gap-6 px-8 py-10 max-w-full">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-display font-black text-primary uppercase mb-3">AutoQa</h2>
          <p className="font-body text-xs font-medium uppercase text-on-surface-variant/70 leading-relaxed">
            © 2024 AUTOQA AI. FORM FOLLOWS FUNCTION.
          </p>
        </div>
        <div>
          <h4 className="font-headline font-black uppercase text-primary mb-4 text-sm">Product</h4>
          <ul className="space-y-3">
            <li><a className="font-body text-xs font-medium uppercase text-primary dark:text-primary-fixed hover:text-secondary transition-colors duration-75" href="#">API Reference</a></li>
            <li><a className="font-body text-xs font-medium uppercase text-primary dark:text-primary-fixed hover:text-secondary transition-colors duration-75" href="#">Changelog</a></li>
            <li><a className="font-body text-xs font-medium uppercase text-primary dark:text-primary-fixed hover:text-secondary transition-colors duration-75" href="#">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-black uppercase text-primary mb-4 text-sm">Resources</h4>
          <ul className="space-y-3">
            <li><a className="font-body text-xs font-medium uppercase text-primary dark:text-primary-fixed hover:text-secondary transition-colors duration-75" href="#">Security</a></li>
            <li><a className="font-body text-xs font-medium uppercase text-primary dark:text-primary-fixed hover:text-secondary transition-colors duration-75" href="#">System Status</a></li>
            <li><a className="font-body text-xs font-medium uppercase text-primary dark:text-primary-fixed hover:text-secondary transition-colors duration-75" href="#">Docs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-black uppercase text-primary mb-4 text-sm">Legal</h4>
          <ul className="space-y-3">
            <li><a className="font-body text-xs font-medium uppercase text-primary dark:text-primary-fixed hover:text-secondary transition-colors duration-75" href="#">Terms</a></li>
            <li><a className="font-body text-xs font-medium uppercase text-primary dark:text-primary-fixed hover:text-secondary transition-colors duration-75" href="#">Privacy</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
