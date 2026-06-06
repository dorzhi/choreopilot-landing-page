// sections1.jsx — Reveal util, Nav, Hero, Partner-guide band, Problem, Solution, Features
// Exports to window: Reveal, Nav, Hero, GuideBand, Problem, Solution, Features

const { useState: useS1, useEffect: useE1, useRef: useR1 } = React;

function Reveal({ children, delay = 0, as = "div", className = "", style }) {
  const ref = useR1(null);
  const [vis, setVis] = useS1(false);
  useE1(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${vis ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

function Logo() {
  return (
    <a className="logo" href="#top"><span className="logo-mark" /><span className="logo-word">ChoreoPilot</span></a>
  );
}

function Nav({ onWaitlist }) {
  const [scr, setScr] = useS1(false);
  useE1(() => {
    const fn = () => setScr(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    ["Product", "#features"], ["How It Works", "#how"], ["Virtual Partner", "#partner"],
    ["Scoring", "#scoring"], ["ChoreoPilot", "#mvp"],
  ];
  return (
    <nav className={`nav ${scr ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <Logo />
        <div className="nav-links">
          {links.map(([l, h]) => <a key={l} className="nav-link" href={h}>{l}</a>)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a className="btn btn-ghost btn-sm" href="#how">See ChoreoPilot Flow</a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ headline = 1, animate = true }) {
  const h1 = "Practice bachata with an AI dance coach";
  const h2a = "Record your dance. Get scored.";
  const h2b = "Improve with a virtual partner.";
  return (
    <header id="top" className="section" style={{ paddingTop: "clamp(48px,6vw,84px)" }}>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center" }}>
        <div className="hero-copy">
          <Reveal><p className="eyebrow">AI movement scoring · bachata practice</p></Reveal>
          <Reveal delay={60} as="h1" className="h-display">
            {headline === 1
              ? <>Practice bachata with <span className="grad-text">an AI dance coach</span></>
              : <>{h2a}<br /><span className="grad-text">{h2b}</span></>}
          </Reveal>
          <Reveal delay={140}>
            <p className="lead" style={{ marginTop: 24 }}>
              ChoreoPilot helps beginner bachata dancers record their practice, recognize body
              movement, receive simple AI feedback, and train with a virtual leader or follower guide.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="https://app.choreopilot.com" target="_blank" rel="noopener"><Icon name="play" size={17} />See ChoreoPilot Demo</a>
              <a className="btn btn-ghost" href="#features"><Icon name="spark" size={15} />Explore Features</a>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="muted" style={{ fontFamily: "var(--mono)", fontSize: 12.5, letterSpacing: "0.04em", marginTop: 22, display: "flex", alignItems: "center", gap: 9 }}>
              <span className="dot" />Starting with Bachata Basic Step. More moves coming later.
            </p>
          </Reveal>
        </div>
        <Reveal delay={120} className="hero-phone-wrap" style={{ display: "grid", placeItems: "center" }}>
          <HeroPhone animate={animate} />
        </Reveal>
      </div>
    </header>
  );
}

// Reframed "whispered guidance" -> Virtual Partner Guide band
function GuideBand() {
  return (
    <section className="section-tight">
      <div className="wrap">
        <Reveal className="card card-pad guide-band">
          <div>
            <p className="eyebrow" style={{ color: "var(--accent-a)" }}>Virtual Partner Guide</p>
            <h2 className="h-section" style={{ maxWidth: "16ch" }}>
              Move with confidence, <span className="italic-serif">even alone</span>
            </h2>
          </div>
          <p className="lead" style={{ margin: 0 }}>
            Practice with a glowing leader or follower silhouette that helps you stay on rhythm,
            understand spacing, and move with confidence — even when you are practicing alone.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    ["eye", "You cannot see your own mistakes", "When practicing alone, it is hard to know if your timing, posture, and weight transfer are correct."],
    ["partner", "You do not always have a partner", "Bachata is partner-based, but a practice partner is not always available."],
    ["play", "Dance videos do not give feedback", "You can copy a video, but it will not tell you what you are doing wrong."],
    ["score", "Progress is hard to measure", "Most beginner dancers do not know whether they are actually improving."],
  ];
  return (
    <section className="section">
      <div className="wrap">
        <Reveal style={{ maxWidth: 720, marginBottom: 52 }}>
          <p className="eyebrow">The problem</p>
          <h2 className="h-section">Practicing partner dance alone is hard</h2>
        </Reveal>
        <div className="grid g-4">
          {items.map(([ic, t, d], i) => (
            <Reveal key={t} delay={i * 80} className="card card-pad">
              <div className="icon-tile" style={{ marginBottom: 22 }}><Icon name={ic} /></div>
              <h3 className="h-card" style={{ marginBottom: 12 }}>{t}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 15.5 }}>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    ["target", "Choose Move", "Start with Bachata Basic Step."],
    ["partner", "Practice with Guide", "Train solo, with a virtual leader, or with a virtual follower."],
    ["record", "Record", "Use your phone camera to capture a 15-second attempt."],
    ["pose", "Recognize", "AI detects your body movement and extracts key movement mechanics."],
    ["score", "Score", "Get a clear score, feedback, and one focus for your next attempt."],
  ];
  return (
    <section className="section" style={{ background: "var(--bg-1)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <Reveal style={{ maxWidth: 760, marginBottom: 52 }}>
          <p className="eyebrow" style={{ color: "var(--accent-a)" }}>The solution</p>
          <h2 className="h-section">ChoreoPilot turns practice into feedback</h2>
        </Reveal>
        <div className="flow-row">
          {steps.map(([ic, t, d], i) => (
            <Reveal key={t} delay={i * 90} className="card card-pad flow-step" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="icon-tile"><Icon name={ic} /></div>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-3)" }}>0{i + 1}</span>
              </div>
              <h3 className="h-card" style={{ fontSize: 21 }}>{t}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 14.5 }}>{d}</p>
              {i < steps.length - 1 && <span className="flow-arrow"><Icon name="arrow" size={18} /></span>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    ["camera", "Record", "Mobile camera practice", "Record a short bachata practice attempt directly from your phone. No studio setup required."],
    ["pose", "Recognize", "Body movement recognition", "Pose detection tracks your movement and identifies the mechanics behind your basic step."],
    ["score", "Score", "Simple performance scoring", "Receive an overall score plus category scores for visibility, timing, side movement, weight transfer, posture, and smoothness."],
    ["partner", "Guide", "Practice with a ghost leader or follower", "Follow a glowing virtual silhouette synced to the 8-count rhythm so you can practice partner movement even when alone."],
  ];
  return (
    <section id="features" className="section">
      <div className="wrap">
        <Reveal style={{ maxWidth: 720, marginBottom: 52 }}>
          <p className="eyebrow">The product</p>
          <h2 className="h-section">Focused ChoreoPilot features</h2>
        </Reveal>
        <div className="grid g-2">
          {feats.map(([ic, tag, t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 90} className="card card-pad" style={{ display: "flex", gap: 22 }}>
              <div className="icon-tile" style={{ width: 58, height: 58 }}><Icon name={ic} size={26} /></div>
              <div>
                <span className="road-tag" style={{ color: "var(--accent-b)" }}>{tag}</span>
                <h3 className="h-card" style={{ margin: "8px 0 12px" }}>{t}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 15.5 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Reveal, Nav, Hero, GuideBand, Problem, Solution, Features });
