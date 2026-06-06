// sections2.jsx — Virtual Partner, Scoring, MVP scope, How it works, Who, Comparison, Waitlist, Footer
// Exports to window: VirtualPartner, Scoring, MVPScope, HowItWorks, WhoFor, Comparison, Waitlist, Foot

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

function VirtualPartner({ animate = true }) {
  const [mode, setMode] = useS2("leader");
  const modes = [
    ["solo", "Solo Practice", "Record yourself with count guidance and body framing.", "music"],
    ["leader", "Virtual Leader Guide", "For followers practicing timing, movement response, and confidence.", "partner"],
    ["follower", "Virtual Follower Guide", "For leaders practicing rhythm, spacing, and basic partner movement.", "rhythm"],
  ];
  return (
    <section id="partner" className="section" style={{ background: "var(--bg-1)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <Reveal style={{ maxWidth: 780, marginBottom: 14 }}>
          <p className="eyebrow" style={{ color: "var(--accent-a)" }}>Virtual partner</p>
          <h2 className="h-section">A partner guide when you do not have a partner</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="lead" style={{ marginBottom: 48 }}>
            ChoreoPilot's virtual partner is not a realistic AI person. It is a clean ghost silhouette
            that demonstrates timing, movement direction, and role-based rhythm for solo practice.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 48, alignItems: "center" }} className="vp-grid">
          <Reveal style={{ display: "grid", placeItems: "center" }}>
            <PartnerPhone animate={animate} mode={mode} />
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {modes.map(([id, t, d, ic], i) => (
              <Reveal key={id} delay={i * 80}>
                <button
                  onClick={() => setMode(id)}
                  className={`card card-pad mode-card ${mode === id ? "mode-on" : ""}`}
                  style={{ width: "100%", textAlign: "left", display: "flex", gap: 18, alignItems: "flex-start", cursor: "pointer", background: mode === id ? undefined : "var(--card)" }}>
                  <div className="icon-tile" style={{ width: 46, height: 46 }}><Icon name={ic} size={22} /></div>
                  <div>
                    <h3 className="h-card" style={{ fontSize: 21, marginBottom: 6 }}>{t}</h3>
                    <p className="muted" style={{ margin: 0, fontSize: 15 }}>{d}</p>
                  </div>
                  <span className="mode-dot" style={{ marginLeft: "auto" }} />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Scoring() {
  const ref = useR2(null);
  const [vis, setVis] = useS2(false);
  useE2(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const cats = [
    ["Visibility", 92], ["Timing", 72], ["Side Movement", 82],
    ["Weight Transfer", 65], ["Posture", 84], ["Smoothness", 77],
  ];
  const feedback = [
    ["check", "Your side-to-side movement is clear.", "good"],
    ["target", "You were slightly late around counts 5–6.", "warn"],
    ["check", "Your posture stayed strong.", "good"],
    ["target", "Your weight transfer is not clear enough.", "warn"],
    ["spark", "Try again and focus on fully shifting your weight on counts 1 and 5.", "tip"],
  ];
  return (
    <section id="scoring" className="section">
      <div className="wrap">
        <Reveal style={{ maxWidth: 760, marginBottom: 52 }}>
          <p className="eyebrow">Scoring</p>
          <h2 className="h-section">Know exactly what to improve next</h2>
        </Reveal>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 28, alignItems: "start" }} className="score-grid">
          {/* overall */}
          <Reveal className="card card-pad" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18 }}>
            <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
              <svg viewBox="0 0 100 100" width="180" height="180">
                <circle cx="50" cy="50" r="43" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="6.5" />
                <circle cx="50" cy="50" r="43" fill="none" stroke="url(#sg)" strokeWidth="6.5" strokeLinecap="round"
                  strokeDasharray="270" strokeDashoffset={vis ? 270 - 270 * 0.76 : 270}
                  transform="rotate(-90 50 50)" style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.7,.3,1)" }} />
                <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--accent-b)" /><stop offset="1" stopColor="var(--accent-a)" />
                </linearGradient></defs>
              </svg>
              <div style={{ position: "absolute" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 52, fontWeight: 600, color: "var(--ink-0)", lineHeight: 1 }}>76<small style={{ fontSize: 22, color: "var(--ink-2)" }}>%</small></div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, color: "var(--ink-0)" }}>Good start</div>
              <p className="muted" style={{ margin: "6px 0 0", fontSize: 15 }}>Your basic step is recognizable.</p>
            </div>
            <div className="pill" style={{ color: "var(--accent-a)" }}><Icon name="target" size={14} />Next focus · Weight Transfer</div>
          </Reveal>

          {/* categories + feedback */}
          <Reveal delay={120} className="card card-pad">
            <div className="road-tag" style={{ color: "var(--ink-2)", marginBottom: 18 }}>Category scores</div>
            <div className="grid g-2" style={{ gap: "16px 28px", marginBottom: 28 }}>
              {cats.map(([n, v], i) => (
                <div key={n}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontSize: 14.5 }}>
                    <span style={{ color: "var(--ink-1)" }}>{n}</span>
                    <span style={{ fontFamily: "var(--mono)", color: v < 70 ? "oklch(0.78 0.15 70)" : "var(--ink-0)" }}>{v}%</span>
                  </div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: vis ? `${v}%` : 0, transitionDelay: `${i * 90}ms` }} /></div>
                </div>
              ))}
            </div>
            <hr className="divider" style={{ margin: "4px 0 22px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {feedback.map(([ic, t, kind], i) => (
                <div key={i} className={`fb-row fb-${kind}`}>
                  <Icon name={ic} size={17} />
                  <span style={{ fontSize: 15 }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MVPScope() {
  const cols = [
    ["Now", "accent-b", ["Bachata Basic Step", "Mobile recording", "Body movement recognition", "Movement scoring", "Virtual partner guide", "Practice history"]],
    ["Next", "ink-1", ["Side Basic", "Forward / back basic", "Hip movement", "Right turn prep", "Improved scoring", "Better progress tracking"]],
    ["Later", "ink-2", ["Real pair practice", "Social partner discovery", "Dance events", "Studio tools", "Choreography support", "Advanced partner training"]],
  ];
  return (
    <section id="mvp" className="section" style={{ background: "var(--bg-1)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end", marginBottom: 52 }} className="mvp-head">
          <Reveal>
            <p className="eyebrow">Roadmap</p>
            <h2 className="h-section">Built narrow on purpose</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lead" style={{ margin: 0 }}>
              ChoreoPilot starts with one move — Bachata Basic Step — because useful feedback matters
              more than a huge feature list. Once scoring feels accurate and helpful, the product can
              expand into more moves, pair practice, social events, choreography, and studio tools.
            </p>
          </Reveal>
        </div>
        <div className="grid g-3">
          {cols.map(([title, col, items], ci) => (
            <Reveal key={title} delay={ci * 100} className="card card-pad" style={ci === 0 ? { borderColor: "oklch(0.70 0.17 var(--hue-b) / 0.4)", background: "linear-gradient(160deg, var(--accent-b-soft), var(--card))" } : {}}>
              <div className="road-head">
                <span className="road-tag" style={{ color: `var(--${col})` }}>{title}</span>
                {ci === 0 && <span className="pill" style={{ padding: "4px 10px", fontSize: 10 }}><span className="dot" />Building</span>}
              </div>
              {items.map((it) => (
                <div key={it} className="check-row">
                  <span style={{ color: ci === 0 ? "var(--accent-b)" : "var(--ink-3)", marginTop: 1 }}><Icon name={ci === 0 ? "check" : "arrow"} size={17} /></span>
                  <span style={{ color: ci === 2 ? "var(--ink-2)" : "var(--ink-1)", fontSize: 15.5 }}>{it}</span>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Set up your camera", "Place your phone 2–3 meters away so your full body is visible.", "phone"],
    ["Follow the count", "Move with the 1–8 bachata rhythm.", "rhythm"],
    ["Record your attempt", "Practice solo or with the virtual leader / follower guide.", "record"],
    ["AI analyzes your movement", "The system checks body visibility, side movement, rhythm, posture, weight transfer, and smoothness.", "pose"],
    ["Try again", "Repeat with one clear focus and watch your score improve.", "refresh"],
  ];
  return (
    <section id="how" className="section">
      <div className="wrap">
        <Reveal style={{ maxWidth: 760, marginBottom: 52 }}>
          <p className="eyebrow" style={{ color: "var(--accent-a)" }}>How it works</p>
          <h2 className="h-section">From recording to feedback in one minute</h2>
        </Reveal>
        <div className="how-list">
          {steps.map(([t, d, ic], i) => (
            <Reveal key={t} delay={i * 70} className="how-step">
              <div className="num" style={{ width: 44, height: 44, fontSize: 14 }}>0{i + 1}</div>
              <div className="icon-tile" style={{ width: 46, height: 46 }}><Icon name={ic} size={22} /></div>
              <div style={{ flex: 1 }}>
                <h3 className="h-card" style={{ fontSize: 22, marginBottom: 5 }}>{t}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 15.5 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoFor() {
  const who = [
    ["user", "Beginners", "Understand whether your basic movement is actually correct."],
    ["partner", "Followers", "Practice with a virtual leader guide when no partner is available."],
    ["rhythm", "Leaders", "Practice rhythm and spacing with a virtual follower guide."],
    ["teacher", "Dance teachers", "Use AI scoring later to support student practice outside class."],
  ];
  return (
    <section className="section" style={{ background: "var(--bg-1)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <Reveal style={{ maxWidth: 720, marginBottom: 52 }}>
          <p className="eyebrow">Who it's for</p>
          <h2 className="h-section">Made for beginner bachata practice</h2>
        </Reveal>
        <div className="grid g-4">
          {who.map(([ic, t, d], i) => (
            <Reveal key={t} delay={i * 80} className="card card-pad">
              <div className="icon-tile" style={{ marginBottom: 20 }}><Icon name={ic} /></div>
              <h3 className="h-card" style={{ fontSize: 22, marginBottom: 10 }}>{t}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 15.5 }}>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const bad = ["You watch passively", "No movement recognition", "No scoring", "No personal feedback", "No virtual partner"];
  const good = ["You record yourself", "AI recognizes movement", "You get scored", "You receive clear feedback", "You practice with a virtual leader / follower guide"];
  return (
    <section className="section">
      <div className="wrap">
        <Reveal style={{ maxWidth: 720, marginBottom: 52 }}>
          <p className="eyebrow" style={{ color: "var(--accent-a)" }}>Why ChoreoPilot</p>
          <h2 className="h-section">Not just another dance video app</h2>
        </Reveal>
        <div className="grid g-2" style={{ gap: 24 }}>
          <Reveal className="vs-col vs-bad">
            <div className="road-tag" style={{ color: "var(--ink-2)", marginBottom: 18 }}>Normal dance videos</div>
            {bad.map((b) => (
              <div key={b} className="vs-item" style={{ color: "var(--ink-2)" }}>
                <span style={{ color: "var(--ink-3)", marginTop: 1 }}>—</span>{b}
              </div>
            ))}
          </Reveal>
          <Reveal delay={100} className="vs-col vs-good">
            <div className="road-tag" style={{ color: "var(--accent-b)", marginBottom: 18 }}>ChoreoPilot</div>
            {good.map((g) => (
              <div key={g} className="vs-item" style={{ color: "var(--ink-0)" }}>
                <span style={{ color: "var(--accent-b)", marginTop: 1 }}><Icon name="check" size={18} /></span>{g}
              </div>
            ))}
          </Reveal>
        </div>
        <Reveal delay={120}>
          <p className="h-card" style={{ fontFamily: "var(--serif)", fontStyle: "italic", textAlign: "center", marginTop: 48, fontSize: "clamp(22px,2.6vw,32px)", color: "var(--ink-0)", maxWidth: "24ch", marginInline: "auto" }}>
            You don't just watch the move. You perform it, get scored, and improve.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Waitlist() {
  const [form, setForm] = useS2({ name: "", email: "", level: "", role: "", city: "" });
  const [done, setDone] = useS2(false);
  const levels = ["Beginner", "Beginner+", "Intermediate"];
  const roles = ["Leader", "Follower", "Both", "Solo"];
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => { e.preventDefault(); if (form.email) setDone(true); };
  return (
    <section id="waitlist" className="section">
      <div className="wrap">
        <Reveal className="card card-pad waitlist-card">
          <div className="wl-grid">
            <div>
              <p className="eyebrow" style={{ color: "var(--accent-a)" }}>Waitlist</p>
              <h2 className="h-section" style={{ marginBottom: 18 }}>Help shape the first AI bachata practice coach</h2>
              <p className="lead">
                We are building ChoreoPilot now. Join the waitlist to test it and help improve
                the movement recognition experience.
              </p>
              <p className="muted" style={{ fontFamily: "var(--mono)", fontSize: 12.5, marginTop: 22, display: "flex", alignItems: "center", gap: 9 }}>
                <span className="dot" />Early testers get free access to the first ChoreoPilot release.
              </p>
            </div>

            {done ? (
              <div className="wl-done">
                <div className="icon-tile" style={{ width: 64, height: 64, marginBottom: 22 }}><Icon name="check" size={30} /></div>
                <h3 className="h-card" style={{ fontSize: 26, marginBottom: 10 }}>You're on the list</h3>
                <p className="muted" style={{ margin: 0 }}>Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. We'll reach out when ChoreoPilot is ready to test.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div className="grid g-2" style={{ gap: 16 }}>
                  <div className="field"><label>Name</label><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" /></div>
                  <div className="field"><label>Email</label><input className="input" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" /></div>
                </div>
                <div className="field">
                  <label>Dance level</label>
                  <div className="seg">{levels.map((l) => <button type="button" key={l} className={form.level === l ? "on" : ""} onClick={() => set("level", l)}>{l}</button>)}</div>
                </div>
                <div className="field">
                  <label>Role</label>
                  <div className="seg">{roles.map((r) => <button type="button" key={r} className={form.role === r ? "on" : ""} onClick={() => set("role", r)}>{r}</button>)}</div>
                </div>
                <div className="field"><label>City</label><input className="input" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Where you dance" /></div>
                <button className="btn btn-primary" type="submit" style={{ justifyContent: "center", padding: "15px" }}><Icon name="spark" size={17} />Join the Waitlist</button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Foot() {
  const links = ["Product", "Virtual Partner", "Scoring", "ChoreoPilot", "Contact", "Privacy"];
  return (
    <footer>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ maxWidth: 320 }}>
          <a className="logo" href="#top" style={{ marginBottom: 12 }}><span className="logo-mark" /><span className="logo-word">ChoreoPilot</span></a>
          <p className="muted" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, margin: "10px 0 0" }}>AI dance practice for bachata beginners</p>
        </div>
        <div className="foot-links">{links.map((l) => <a key={l} href="#top">{l}</a>)}</div>
      </div>
      <div className="wrap" style={{ marginTop: 40, paddingTop: 22, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span className="muted" style={{ fontSize: 13 }}>© 2026 ChoreoPilot · Starting with Bachata Basic Step</span>
        <span className="muted" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em" }}>RECORD · RECOGNIZE · SCORE · GUIDE</span>
      </div>
    </footer>
  );
}

Object.assign(window, { VirtualPartner, Scoring, MVPScope, HowItWorks, WhoFor, Comparison, Foot });
