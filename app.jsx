// app.jsx — assembles ChoreoPilot landing page.
// Tweaks panel removed; defaults from the design baked in.
const { useEffect: useEA } = React;

const ACCENT = ["oklch(0.70 0.17 252)", "oklch(0.68 0.19 298)"]; // Blue + Violet
const GLOW = 1;
const ANIMATE = false;

const hueOf = (css) => (css.match(/(\d+(?:\.\d+)?)\s*\)?$/) || [])[1] || "280";

function App() {
  useEA(() => {
    const r = document.documentElement.style;
    r.setProperty("--hue-b", hueOf(ACCENT[0]));
    r.setProperty("--hue-a", hueOf(ACCENT[1]));
    r.setProperty("--glow", String(GLOW));
  }, []);

  return (
    <>
      <Nav />
      <Hero headline={1} animate={ANIMATE} />
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
      <Foot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
