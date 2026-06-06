// visuals.jsx — icon set + dance visuals (ghost silhouette, pose skeleton, count strip)
// Exports to window: Icon, GhostFigure, Skeleton, CountStrip

const _ic = {
  camera: <><rect x="2.5" y="6.5" width="19" height="13" rx="3"/><path d="M8 6.5l1.6-2.5h4.8L16 6.5"/><circle cx="12" cy="13" r="3.6"/></>,
  pose: <><circle cx="12" cy="4.4" r="2"/><path d="M12 6.6v6.2M12 8.5l-5 2.2M12 8.5l5 2.2M12 12.8l-3.4 6.4M12 12.8l3.4 6.4"/><circle cx="7" cy="10.7" r="1"/><circle cx="17" cy="10.7" r="1"/><circle cx="8.6" cy="19.2" r="1"/><circle cx="15.4" cy="19.2" r="1"/></>,
  score: <><path d="M4 20V10M10 20V5M16 20v-7M22 20V8" /></>,
  partner: <><circle cx="8" cy="6" r="2.4"/><path d="M8 8.6v6.4M5 19l3-4 3 4"/><circle cx="16.5" cy="6" r="2.4"/><path d="M16.5 8.6v6.4M13.5 19l3-4 3 4" strokeDasharray="2.4 2"/></>,
  record: <><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/></>,
  target: <><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></>,
  check: <><path d="M4.5 12.5l4.5 4.5L19.5 6.5"/></>,
  arrow: <><path d="M5 12h13M13 6l6 6-6 6"/></>,
  music: <><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></>,
  play: <><path d="M8 5.5v13l11-6.5z"/></>,
  refresh: <><path d="M3.5 12a8.5 8.5 0 0 1 14.5-6M20.5 12A8.5 8.5 0 0 1 6 18"/><path d="M18 3v3.5h-3.5M6 21v-3.5h3.5"/></>,
  rhythm: <><path d="M3 12h3l2-6 4 14 3-9 2 4h4"/></>,
  history: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2.2"/></>,
  spark: <><path d="M12 3l1.8 5.7L19.5 10l-5.7 1.8L12 17.5l-1.8-5.7L4.5 10l5.7-1.3z"/></>,
  user: <><circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></>,
  teacher: <><path d="M3 8l9-4 9 4-9 4z"/><path d="M7 10v5c0 1.7 2.2 3 5 3s5-1.3 5-3v-5"/></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></>,
  scale: <><path d="M12 4v16M7 8h10M5 8l-2 5h4zM19 8l-2 5h4z"/><path d="M3 13a2 2 0 0 0 4 0M17 13a2 2 0 0 0 4 0"/></>,
};

function Icon({ name, size = 24, stroke = 1.7, style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {_ic[name] || _ic.spark}
    </svg>
  );
}

// Stylized human figure built from simple shapes — used as ghost partner & user silhouette.
// pose: 'leader' | 'follower' (mirrored stance). variant: 'ghost' (glow fill) | 'line'
function GhostFigure({ pose = "leader", variant = "ghost", hue = "a", sway = true, className = "", style }) {
  const flip = pose === "follower";
  const col = hue === "b" ? "var(--accent-b)" : "var(--accent-a)";
  const fill = variant === "ghost" ? col : "none";
  const op = variant === "ghost" ? 0.85 : 1;
  return (
    <svg viewBox="0 0 120 260" className={`fig ${sway ? "fig-sway" : ""} ${className}`} style={{ overflow: "visible", ...style }}
      preserveAspectRatio="xMidYMax meet">
      <g transform={flip ? "scale(-1,1) translate(-120,0)" : ""} fill={fill} stroke={col} strokeWidth={variant === "ghost" ? 0 : 3}
        strokeLinecap="round" opacity={op} style={{ filter: variant === "ghost" ? `drop-shadow(0 0 14px ${col})` : "none" }}>
        {/* head */}
        <circle cx="60" cy="26" r="15" />
        {/* torso */}
        <path d="M46 46 Q60 40 74 46 L70 132 Q60 138 50 132 Z" />
        {/* left arm (raised, frame/hold) */}
        <path d="M48 56 Q26 64 20 92 Q18 100 26 102 Q32 96 34 86 Q40 64 52 64 Z" />
        {/* right arm (extended for partner connection) */}
        <path d="M72 56 Q98 58 110 78 Q113 84 106 88 Q98 80 92 72 Q82 64 70 66 Z" />
        {/* left leg */}
        <path d="M50 128 Q44 180 40 232 Q39 242 48 242 Q54 200 58 150 Z" />
        {/* right leg (stepping) */}
        <path d="M70 128 Q78 178 88 224 Q91 234 82 237 Q72 196 62 150 Z" />
      </g>
    </svg>
  );
}

// Pose-detection skeleton: joints + bones over the user
function Skeleton({ hue = "b", className = "", style }) {
  const col = hue === "b" ? "var(--accent-b)" : "var(--accent-a)";
  const J = [
    [60, 30], [60, 52],            // head, neck
    [40, 66], [30, 100], [26, 134],// L shoulder, elbow, wrist
    [80, 66], [92, 98], [98, 128], // R shoulder, elbow, wrist
    [52, 132], [88, 132],          // hips
    [48, 180], [44, 230],          // L knee, ankle
    [90, 178], [96, 228],          // R knee, ankle
  ];
  const B = [[0,1],[1,2],[2,3],[3,4],[1,5],[5,6],[6,7],[1,8],[1,9],[8,10],[10,11],[9,12],[12,13]];
  return (
    <svg viewBox="0 0 120 260" className={`skel ${className}`} style={{ overflow: "visible", ...style }} preserveAspectRatio="xMidYMax meet">
      <g stroke={col} strokeWidth="2.4" strokeLinecap="round" opacity="0.92"
        style={{ filter: `drop-shadow(0 0 6px ${col})` }}>
        {B.map(([a, b], i) => <line key={i} x1={J[a][0]} y1={J[a][1]} x2={J[b][0]} y2={J[b][1]} />)}
      </g>
      {J.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 9 : 3.4} fill="none" stroke={col} strokeWidth="2.2"
          style={{ filter: `drop-shadow(0 0 5px ${col})` }} />
      ))}
    </svg>
  );
}

// 8-count rhythm strip. active = index 0..7, tapCounts = which beats are "tap"
function CountStrip({ active = -1, taps = [3, 7], size = "md" }) {
  const counts = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className={`count-strip cs-${size}`}>
      {counts.map((n, i) => {
        const isTap = taps.includes(i);
        return (
          <div key={i} className={`count-cell ${isTap ? "tap" : ""} ${active === i ? "active" : ""}`}>
            {isTap ? "tap" : n}
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { Icon, GhostFigure, Skeleton, CountStrip });
