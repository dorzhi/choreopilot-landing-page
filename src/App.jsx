// App.jsx — assembles ChoreoPilot landing page.

import { useEffect } from "react";
import { Nav, Hero, GuideBand, Problem, Solution, Features } from "./sections1.jsx";
import { VirtualPartner, Scoring, MVPScope, HowItWorks, WhoFor, Comparison, FAQ, Foot } from "./sections2.jsx";

const ACCENT = ["oklch(0.70 0.17 252)", "oklch(0.68 0.19 298)"]; // Blue + Violet
const GLOW = 1;
const ANIMATE = false;

const hueOf = (css) => (css.match(/(\d+(?:\.\d+)?)\s*\)?$/) || [])[1] || "280";

export default function App() {
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--hue-b", hueOf(ACCENT[0]));
    r.setProperty("--hue-a", hueOf(ACCENT[1]));
    r.setProperty("--glow", String(GLOW));
  }, []);

  return (
    <>
      <Nav />
      <Hero animate={ANIMATE} />
      <GuideBand />
      <Problem />
      <Solution />
      <Features />
      <VirtualPartner animate={ANIMATE} />
      <Scoring />
      <MVPScope />
      <HowItWorks />
      <WhoFor />
      <Comparison />
      <FAQ />
      <Foot />
    </>
  );
}
