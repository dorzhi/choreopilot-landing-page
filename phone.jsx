// phone.jsx — phone mockups. Figures are now a STATIC couple image
// (leader = blue male on the left, follower = red female on the right).
// Exports to window: HeroPhone, PartnerPhone

const { useState, useEffect, useRef } = React;

// shared 8-count beat clock (only ticks when animate is on)
function useBeat(active, bpm = 116) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!active) return;
    const ms = (60 / bpm) * 1000;
    const id = setInterval(() => setBeat(b => (b + 1) % 8), ms);
    return () => clearInterval(id);
  }, [active, bpm]);
  return active ? beat : -1;
}

function FrameCorners() {
  const pos = [
    { top: -2, left: -2, borderRight: 0, borderBottom: 0 },
    { top: -2, right: -2, borderLeft: 0, borderBottom: 0 },
    { bottom: -2, left: -2, borderRight: 0, borderTop: 0 },
    { bottom: -2, right: -2, borderLeft: 0, borderTop: 0 },
  ];
  return <>{pos.map((p, i) => <span key={i} className="frame-corner" style={p} />)}</>;
}

// static couple. focus: 'none' | 'left' | 'right' adds a soft glow behind one dancer
function Couple({ focus = "none" }) {
  return (
    <div className="couple-stage" aria-hidden="true">
      {focus !== "none" && <div className={`couple-glow glow-${focus}`} />}
      <div className="couple-fig" />
    </div>
  );
}

// HERO: static demo (recording loop only runs if animate is toggled on)
function HeroPhone({ animate = false }) {
  const beat = useBeat(animate, 116);
  const [secs, setSecs] = useState(15);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (!animate) { setSecs(15); setShowScore(false); return; }
    let s = 15, scoring = false;
    const id = setInterval(() => {
      if (scoring) return;
      s -= 1;
      if (s <= 0) {
        scoring = true;
        setShowScore(true);
        setTimeout(() => { setShowScore(false); s = 15; setSecs(15); scoring = false; }, 3200);
      } else setSecs(s);
    }, 900);
    return () => clearInterval(id);
  }, [animate]);

  const mm = String(Math.floor((15 - secs) / 60)).padStart(2, "0");
  const ss = String((15 - secs) % 60).padStart(2, "0");
  const timer = animate ? `${mm}:${ss}` : "00:15";

  return (
    <div className="phone hero-phone">
      <div className="phone-screen">
        <div className="phone-notch" />
        <div className="camera-feed" />
        <div className="frame-outline"><FrameCorners /></div>

        <Couple focus="none" />

        {/* role tags — Leader (blue) left, Follower (red) right */}
        <div className="role-tag role-lead" style={{ left: 16, bottom: 206 }}>Leader</div>
        <div className="role-tag role-foll" style={{ right: 14, bottom: 236 }}>Follower</div>

        <div className="hud rec-badge"><span className="rec-dot" />REC</div>
        <div className="hud score-badge"><b>76%</b><span>LIVE SCORE</span></div>

        <CountStrip active={beat} taps={[3, 7]} />
        <div className="timer-pill"><span className="rec-dot" />{timer}</div>

        {/* score reveal overlay (only when animating) */}
        <div className={`score-reveal ${showScore ? "show" : ""}`}>
          <div className="sr-ring">
            <svg viewBox="0 0 100 100" width="118" height="118">
              <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(1 0 0 / 0.1)" strokeWidth="7" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#hg)" strokeWidth="7" strokeLinecap="round"
                strokeDasharray="264" strokeDashoffset={showScore ? 264 - 264 * 0.76 : 264}
                transform="rotate(-90 50 50)" style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.3,1)" }} />
              <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--accent-b)" /><stop offset="1" stopColor="var(--accent-a)" />
              </linearGradient></defs>
            </svg>
            <div className="sr-num">76<small>%</small></div>
          </div>
          <div className="sr-label">Good start</div>
          <div className="sr-focus">Next focus · Weight Transfer</div>
        </div>
      </div>
    </div>
  );
}

// PARTNER section phone — static couple; mode highlights which role is the virtual guide
function PartnerPhone({ animate = false, mode = "leader" }) {
  const beat = useBeat(animate, 116);
  const focus = mode === "leader" ? "left" : mode === "follower" ? "right" : "none";
  return (
    <div className="phone partner-phone">
      <div className="phone-screen">
        <div className="phone-notch" />
        <div className="camera-feed" />
        <div className="frame-outline"><FrameCorners /></div>

        <Couple focus={focus} />

        <div className={`role-tag role-lead ${mode === "leader" ? "tag-on" : ""}`} style={{ left: 16, bottom: 206 }}>
          {mode === "leader" ? "Virtual · Leader" : "Leader"}
        </div>
        <div className={`role-tag role-foll ${mode === "follower" ? "tag-on" : ""}`} style={{ right: 14, bottom: 236 }}>
          {mode === "follower" ? "Virtual · Follower" : "Follower"}
        </div>

        <div className="hud rec-badge"><span className="rec-dot" />REC</div>
        <CountStrip active={beat} taps={[3, 7]} />
        <div className="timer-pill"><Icon name="music" size={13} />{mode === "solo" ? "Solo guide" : "8-count sync"}</div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroPhone, PartnerPhone });
