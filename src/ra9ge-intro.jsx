import React, { useEffect, useRef, useState } from 'react';

// --- portfolio assets (served from the project's root assets/ folder) ---
const IMG_AVATAR = new URL('../assets/Ra9geAvatar.png', import.meta.url).href;
const IMG_ANIME_HOME = new URL('../assets/Scrin1.jpg', import.meta.url).href;
const IMG_ANIME_TITLE = new URL('../assets/Scrin2.jpg', import.meta.url).href;
const IMG_EXCHANGE_BOT = new URL('../assets/ScrinBotBla.png', import.meta.url).href;
const IMG_OBELISK_TOOLS = new URL('../assets/obeliskToolsScrin.png', import.meta.url).href;
const IMG_AML_CHECKER = new URL('../assets/crypto.png', import.meta.url).href;
const IMG_AUTO_PROMO_BOT = new URL('../assets/BotAutoPiar.png', import.meta.url).href;
const IMG_1XBET_BOT = new URL('../assets/1xbetbot.png', import.meta.url).href;

const PHRASES = ['Ra9ge.dev', 'Company Utsubo Inc.', 'Ra9ge Portfolio'];
const STACK = ['JavaScript', 'Python', 'Node.js', 'Telegram Bots', 'React', 'PHP', 'Full-stack backend'];
const PROJECTS = [
  { src: IMG_ANIME_HOME, title: 'Anime streaming site', sub: 'Home feed' },
  { src: IMG_ANIME_TITLE, title: 'Anime streaming site', sub: 'Title page' },
  { src: IMG_EXCHANGE_BOT, title: 'Currency exchange bot', sub: 'Telegram · Alipay / WeChat' },
  { src: IMG_OBELISK_TOOLS, title: 'Obelisk Tools', sub: 'Account & proxy dashboard' },
  { src: IMG_AML_CHECKER, title: 'AML Checker', sub: 'Wallet risk analysis' },
  { src: IMG_AUTO_PROMO_BOT, title: 'Auto-promotion bot', sub: 'YouTube · TikTok · Instagram' },
  { src: IMG_1XBET_BOT, title: '1xBet bot', sub: 'Telegram integration' },
];

function BrowserIcon({ color }) {
  return (
    <g>
      <rect x="-11" y="-9" width="22" height="18" rx="4" fill="none" stroke={color} strokeWidth="1.6" />
      <line x1="-11" y1="-3" x2="11" y2="-3" stroke={color} strokeWidth="1.6" />
      <circle cx="-7" cy="-6" r="1" fill={color} />
    </g>
  );
}

function ServerIcon({ color }) {
  return (
    <g>
      <rect x="-11" y="-10" width="22" height="8" rx="2.5" fill="none" stroke={color} strokeWidth="1.6" />
      <rect x="-11" y="2" width="22" height="8" rx="2.5" fill="none" stroke={color} strokeWidth="1.6" />
      <circle cx="-6" cy="-6" r="1" fill={color} />
      <circle cx="-6" cy="6" r="1" fill={color} />
    </g>
  );
}

function LoadBalancerIcon({ color }) {
  return (
    <g stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="0" cy="-8" r="2.2" fill={color} stroke="none" />
      <path d="M0,-5 L0,1 M0,1 L-8,8 M0,1 L8,8" />
      <circle cx="-8" cy="9" r="1.6" fill={color} stroke="none" />
      <circle cx="8" cy="9" r="1.6" fill={color} stroke="none" />
    </g>
  );
}

function DbIcon({ color }) {
  return (
    <g fill="none" stroke={color} strokeWidth="1.6">
      <ellipse cx="0" cy="-8" rx="10" ry="3.2" />
      <path d="M -10 -8 L -10 8 A 10 3.2 0 0 0 10 8 L 10 -8" />
      <path d="M -10 0 A 10 3.2 0 0 0 10 0" />
    </g>
  );
}

function DiagramNode({ x, y, width, height, label, sub, badgeColor, iconColor, Icon }) {
  const cx = x + width / 2;
  const iconCy = y + 32;
  const labelY = y + height - 30;
  const subY = y + height - 14;
  return (
    <g filter="url(#r9-shadow)">
      <rect x={x} y={y} width={width} height={height} rx="22" fill="#ffffff" stroke="rgba(14,14,16,0.12)" />
      <circle cx={cx} cy={iconCy} r="18" fill={badgeColor} />
      <g transform={`translate(${cx},${iconCy})`}>
        <Icon color={iconColor} />
      </g>
      <text x={cx} y={labelY} textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="500" fill="var(--ink)">{label}</text>
      <text x={cx} y={subY} textAnchor="middle" fontFamily="Inter" fontSize="10.5" fill="var(--muted)">{sub}</text>
    </g>
  );
}

function ArcLabel({ x, y, text, w }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 13} width={w} height="18" rx="9" fill="var(--bg)" />
      <text x={x} y={y} textAnchor="middle" fontFamily="Inter" fontSize="12" fill="var(--muted)">{text}</text>
    </g>
  );
}

function CacheDiagram() {
  const clusterCx = 350, clusterCy = 545;
  return (
    <svg viewBox="0 0 700 900" className="r9-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="r9-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="rgba(14,14,16,0.1)" />
        </filter>
        <filter id="r9-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <radialGradient id="r9-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--c3)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--c3)" stopOpacity="0" />
        </radialGradient>
        <marker id="r9-arrow-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--ink)" />
        </marker>
        <marker id="r9-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--c1)" />
        </marker>
        <marker id="r9-arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--c3)" />
        </marker>
        <marker id="r9-arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--c5)" />
        </marker>
      </defs>

      {/* glow core behind cluster */}
      <circle cx={clusterCx} cy={clusterCy} r="110" fill="url(#r9-core)" filter="url(#r9-glow)" />

      {/* forward flow */}
      <line x1="350" y1="110" x2="350" y2="166" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1.8" markerEnd="url(#r9-arrow-ink)" />
      <text x="366" y="142" fontFamily="Inter" fontSize="12" fill="var(--muted)">request</text>

      <line x1="350" y1="260" x2="230" y2="316" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1.8" markerEnd="url(#r9-arrow-ink)" />
      <line x1="350" y1="260" x2="470" y2="316" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1.8" markerEnd="url(#r9-arrow-ink)" />
      <ArcLabel x={270} y={292} text="route" w={50} />
      <ArcLabel x={430} y={292} text="route" w={50} />

      <line x1="228" y1="420" x2="336" y2="497" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.8" markerEnd="url(#r9-arrow-ink)" />
      <line x1="472" y1="420" x2="364" y2="497" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.8" markerEnd="url(#r9-arrow-ink)" />
      <ArcLabel x={272} y={468} text="lookup" w={54} />
      <ArcLabel x={428} y={468} text="lookup" w={54} />

      {/* cluster <-> db */}
      <line x1="350" y1="592" x2="350" y2="736" stroke="var(--c3)" strokeWidth="1.8" strokeDasharray="6 5" markerEnd="url(#r9-arrow-amber)" />
      <line x1="392" y1="736" x2="392" y2="592" stroke="var(--c3)" strokeWidth="1.8" strokeDasharray="6 5" markerEnd="url(#r9-arrow-amber)" />
      <ArcLabel x={334} y={704} text="miss" w={44} />
      <ArcLabel x={410} y={704} text="populate" w={68} />

      {/* response, LB -> client, looping right */}
      <path d="M435,215 C560,205 560,75 366,62" fill="none" stroke="var(--c1)" strokeWidth="1.8" markerEnd="url(#r9-arrow-blue)" />
      <ArcLabel x={520} y={140} text="response" w={72} />

      {/* pub/sub invalidation between nodes */}
      <line x1="308" y1="372" x2="392" y2="372" stroke="var(--c5)" strokeWidth="1.8" markerStart="url(#r9-arrow-purple)" markerEnd="url(#r9-arrow-purple)" />
      <ArcLabel x={350} y={356} text="pub/sub" w={64} />

      {/* cache cluster mesh */}
      <g>
        <line x1="350" y1="490" x2="305" y2="575" stroke="var(--c3)" strokeOpacity="0.5" strokeWidth="1.3" />
        <line x1="350" y1="490" x2="395" y2="575" stroke="var(--c3)" strokeOpacity="0.5" strokeWidth="1.3" />
        <line x1="305" y1="575" x2="395" y2="575" stroke="var(--c3)" strokeOpacity="0.5" strokeWidth="1.3" />
        <circle cx="350" cy="490" r="15" fill="#ffffff" stroke="var(--c3)" strokeWidth="1.8" />
        <circle cx="305" cy="575" r="15" fill="#ffffff" stroke="var(--c3)" strokeWidth="1.8" />
        <circle cx="395" cy="575" r="15" fill="#ffffff" stroke="var(--c3)" strokeWidth="1.8" />
      </g>
      <text x="350" y="632" textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="500" fill="var(--ink)">Cache cluster</text>
      <text x="350" y="648" textAnchor="middle" fontFamily="Inter" fontSize="10.5" fill="var(--muted)">Redis Cluster · L2 · 3 shards</text>

      <DiagramNode x={265} y={20} width={170} height={90} label="Client" sub="Browser" badgeColor="rgba(111,168,255,0.14)" iconColor="var(--c1)" Icon={BrowserIcon} />
      <DiagramNode x={265} y={170} width={170} height={90} label="Load balancer" sub="Round-robin" badgeColor="rgba(14,14,16,0.06)" iconColor="var(--ink)" Icon={LoadBalancerIcon} />
      <DiagramNode x={140} y={320} width={160} height={100} label="Node A" sub="Node.js · L1 cache" badgeColor="rgba(14,14,16,0.06)" iconColor="var(--ink)" Icon={ServerIcon} />
      <DiagramNode x={400} y={320} width={160} height={100} label="Node B" sub="Node.js · L1 cache" badgeColor="rgba(14,14,16,0.06)" iconColor="var(--ink)" Icon={ServerIcon} />
      <DiagramNode x={265} y={740} width={170} height={90} label="Database" sub="Primary + replica" badgeColor="rgba(255,158,207,0.2)" iconColor="var(--c4)" Icon={DbIcon} />
    </svg>
  );
}

function ProcessDiagram() {
  const steps = [
    { number: '01', title: 'Understand', text: 'Goals, users, scope' },
    { number: '02', title: 'Design', text: 'Architecture and flow' },
    { number: '03', title: 'Build', text: 'Clean, scalable code' },
    { number: '04', title: 'Launch', text: 'Test, deploy, improve' },
  ];

  return (
    <div className="r9-process-diagram" aria-label="Work process from understanding to launch">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="r9-process-node">
            <span className="r9-process-number">{step.number}</span>
            <div>
              <p className="r9-process-node-title">{step.title}</p>
              <p className="r9-process-node-text">{step.text}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="r9-process-arrow" aria-hidden="true">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14H22M15 7L22 14L15 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Ra9gePortfolioIntro() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [barStarted, setBarStarted] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const timeoutRef = useRef(null);
  const diagramScrollRef = useRef(null);

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    const isLast = phraseIndex === PHRASES.length - 1;

    if (!isDeleting && displayText.length < current.length) {
      const delay = 55 + Math.random() * 95;
      timeoutRef.current = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, delay);
    } else if (!isDeleting && displayText.length === current.length) {
      if (isLast) {
        timeoutRef.current = setTimeout(() => setLoaded(true), 900);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 700);
      }
    } else if (isDeleting && displayText.length > 0) {
      const delay = 20 + Math.random() * 28;
      timeoutRef.current = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1));
      }, delay);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => i + 1);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, phraseIndex]);

  useEffect(() => {
    const t = setTimeout(() => setBarStarted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setRevealed(true), 550);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  useEffect(() => {
    const el = diagramScrollRef.current;
    if (!el) return;
    const center = () => {
      el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
    };
    center();
    const t = setTimeout(center, 200);
    window.addEventListener('resize', center);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', center);
    };
  }, [revealed]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const current = PHRASES[phraseIndex] || '';
  const isPausing = !isDeleting && displayText.length === current.length;

  return (
    <div className="r9-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

        .r9-app {
          --bg: #fcfcfa;
          --ink: #0e0e10;
          --muted: #6b6b70;
          --track: #e8e8e3;
          --fill: #111114;
          --c1: #6fa8ff;
          --c2: #63e0bd;
          --c3: #ffd27a;
          --c4: #ff9ecf;
          --c5: #b9a3ff;
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: var(--bg);
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }

        .r9-loader {
          position: fixed; inset: 0; display: flex; align-items: center; justify-content: flex-start;
          padding: 0 clamp(24px, 8vw, 110px); background: var(--bg);
          transition: opacity 0.7s ease, transform 0.7s ease; opacity: 1; transform: translateY(0); z-index: 50;
        }
        .r9-loader.is-hidden { opacity: 0; transform: translateY(-18px); pointer-events: none; }
        .r9-typed {
          font-family: 'Fredoka', sans-serif; font-weight: 500; font-size: clamp(1.5rem, 7vw, 4.25rem);
          letter-spacing: -0.005em; color: var(--ink); line-height: 1; display: flex; align-items: baseline; white-space: nowrap;
        }
        .r9-cursor {
          display: inline-block; width: clamp(3px, 0.06em, 6px); height: 0.9em; margin-left: 0.08em; border-radius: 3px;
          background: linear-gradient(180deg, var(--c1) 0%, var(--c2) 38%, var(--c3) 70%, var(--c4) 100%);
          box-shadow: 0 0 14px rgba(111, 168, 255, 0.35); opacity: 1;
        }
        .r9-cursor.blink { animation: r9-blink 0.9s steps(1) infinite; }
        @keyframes r9-blink { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0; } 100% { opacity: 1; } }

        .r9-progress-track {
          position: absolute; left: clamp(24px, 8vw, 110px); bottom: clamp(28px, 6vh, 56px);
          width: clamp(120px, 22vw, 220px); height: 3px; background: var(--track); border-radius: 2px; overflow: hidden;
        }
        .r9-progress-fill { height: 100%; width: 0%; background: var(--fill); border-radius: 2px; transition: width 6.8s cubic-bezier(0.22, 0.61, 0.36, 1); }
        .r9-progress-fill.is-started { width: 100%; }

        .r9-hero {
          position: relative; width: 100%; min-height: 100vh; overflow: hidden;
          opacity: 0; transform: scale(1.02); transition: opacity 0.9s ease, transform 1.1s ease;
        }
        .r9-hero.is-visible { opacity: 1; transform: scale(1); }
        .r9-hero-bg { position: absolute; inset: 0; overflow: hidden; background: var(--bg); }
        .r9-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.4; will-change: transform; }
        .r9-blob-1 { width: 42vw; height: 42vw; top: -10%; left: -8%; background: var(--c1); animation: r9-drift-a 22s ease-in-out infinite alternate; }
        .r9-blob-2 { width: 36vw; height: 36vw; bottom: -14%; right: -6%; background: var(--c4); animation: r9-drift-b 26s ease-in-out infinite alternate; }
        .r9-blob-3 { width: 28vw; height: 28vw; bottom: 10%; left: 18%; background: var(--c3); animation: r9-drift-c 19s ease-in-out infinite alternate; }
        @keyframes r9-drift-a { from { transform: translate(0,0) scale(1); } to { transform: translate(6%,8%) scale(1.12); } }
        @keyframes r9-drift-b { from { transform: translate(0,0) scale(1); } to { transform: translate(-7%,-6%) scale(1.08); } }
        @keyframes r9-drift-c { from { transform: translate(0,0) scale(1); } to { transform: translate(5%,-7%) scale(0.94); } }
        .r9-grain {
          position: absolute; inset: -10%; opacity: 0.035; mix-blend-mode: overlay; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .r9-hero-fade {
          position: absolute; left: 0; right: 0; bottom: 0; height: clamp(140px, 24vh, 260px);
          background: linear-gradient(to bottom, rgba(252,252,250,0) 0%, var(--bg) 92%); pointer-events: none;
        }

        .r9-hero-brand {
          position: absolute; top: clamp(20px, 4vh, 40px); left: clamp(20px, 6vw, 56px);
          font-family: 'Fredoka', sans-serif; font-weight: 500; font-size: 0.95rem; color: var(--ink); letter-spacing: -0.005em;
        }
        .r9-hero-avatar {
          position: absolute; top: clamp(20px, 4vh, 40px); right: clamp(20px, 6vw, 56px);
          width: clamp(30px, 6vw, 38px); height: clamp(30px, 6vw, 38px); border-radius: 50%;
          overflow: hidden; border: 1.5px solid rgba(14,14,16,0.12); background: #fff;
        }
        .r9-hero-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .r9-hero-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 24px; }
        .r9-hero-word { font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: clamp(3rem, 14vw, 9.5rem); letter-spacing: -0.02em; color: var(--ink); line-height: 1; margin: 0; }
        .r9-hero-sub { margin-top: clamp(10px, 2vh, 18px); font-family: 'Inter', sans-serif; font-size: 0.95rem; color: var(--muted); letter-spacing: 0.01em; }

        .r9-work { position: relative; width: 100%; background: var(--bg); padding: 0 clamp(20px, 6vw, 80px) clamp(80px, 10vh, 120px); display: flex; flex-direction: column; gap: clamp(28px, 4vw, 40px); }
        .r9-block-title { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: clamp(1.1rem, 2vw, 1.35rem); color: var(--ink); margin: 0 0 clamp(14px, 2vw, 20px); letter-spacing: -0.005em; }
        .r9-projects-heading { font-size: clamp(1.7rem, 5vw, 2.5rem); font-weight: 700; margin-bottom: clamp(16px, 2.5vw, 26px); }
        .r9-card { background: #ffffff; border: 1px solid rgba(14,14,16,0.08); border-radius: 24px; padding: clamp(22px, 3vw, 32px); }
        .r9-work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(20px, 3vw, 28px); }
        .r9-chip-list { display: flex; flex-wrap: wrap; gap: 8px 18px; }
        .r9-chip { font-family: 'Inter', sans-serif; font-size: 0.92rem; font-weight: 500; color: var(--ink); }
        .r9-build-text { font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.55; color: #2a2a2c; margin: 0; }
        .r9-build-text + .r9-build-text { margin-top: 12px; }
        .r9-build-note { font-family: 'Inter', sans-serif; font-size: 0.85rem; font-style: italic; line-height: 1.5; color: var(--muted); margin: 8px 0 0; }

        .r9-track-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 2.5vw, 24px); }
        .r9-track-card { background: #ffffff; border: 1px solid rgba(14,14,16,0.08); border-radius: 22px; padding: clamp(20px, 2.5vw, 26px); }
        .r9-track-headline { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 1.15rem; color: var(--ink); margin: 0 0 6px; }
        .r9-track-sub { font-family: 'Inter', sans-serif; font-size: 0.88rem; color: var(--muted); margin: 0; line-height: 1.45; }

        .r9-diagram-card { padding: clamp(22px, 3vw, 34px); }
        .r9-legend { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 18px; }
        .r9-legend-item { display: flex; align-items: center; gap: 7px; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--muted); }
        .r9-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .r9-diagram-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; display: flex; justify-content: center; scrollbar-width: thin; }
        .r9-diagram-svg { width: min(100%, 560px); min-width: 0; height: auto; display: block; margin: 0 auto; }

        .r9-project-history { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .r9-project-history-card {
          position: relative; overflow: hidden; background: #fff; border: 1px solid rgba(14,14,16,0.08);
          border-radius: 20px; padding: 22px 24px; box-shadow: 0 8px 24px rgba(14,14,16,0.04);
        }
        .r9-project-history-title { font-family: 'Fredoka', sans-serif; font-size: 1.15rem; font-weight: 600; color: var(--ink); margin: 0 0 7px; }
        .r9-project-history-text { font-family: 'Inter', sans-serif; font-size: 0.9rem; line-height: 1.5; color: var(--muted); margin: 0; }
        .r9-project-history-role { display: inline-block; margin-top: 13px; padding: 5px 9px; border-radius: 999px; background: rgba(111,168,255,0.13); color: #3f72c9; font: 500 0.73rem 'Inter', sans-serif; }

        .r9-process-diagram { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 18px 4px 4px; }
        .r9-process-node { flex: 1; min-height: 126px; display: flex; flex-direction: column; justify-content: space-between; background: #eee; border: 1px solid rgba(14,14,16,0); border-radius: 20px; padding: 16px; box-shadow: 0 8px 20px rgba(14,14,16,0); }
        .r9-process-number { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: var(--ink); color: #fff; font: 500 0.75rem 'Inter', sans-serif; }
        .r9-process-node-title { margin: 14px 0 3px; color: var(--ink); font: 600 1.05rem 'Fredoka', sans-serif; }
        .r9-process-node-text { margin: 0; color: var(--muted); font: 0.78rem/1.4 'Inter', sans-serif; }
        .r9-process-arrow { width: 28px; height: 28px; color: var(--muted); flex: 0 0 auto; }
        .r9-process-arrow svg { display: block; width: 100%; height: 100%; }
        .r9-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .r9-testimonial { background: #fff; border: 1px solid rgba(14,14,16,0.08); border-radius: 20px; padding: 22px; }
        .r9-testimonial-quote { margin: 0; color: #2a2a2c; font: 0.92rem/1.55 'Inter', sans-serif; }
        .r9-testimonial-quote::before { content: '“'; color: var(--ink); font: 700 2rem/0 'Fredoka', sans-serif; vertical-align: -0.35rem; margin-right: 3px; }
        .r9-testimonial-author { margin: 18px 0 0; color: var(--ink); font: 500 0.78rem 'Inter', sans-serif; }
        .r9-testimonial-role { margin: 3px 0 0; color: var(--muted); font: 0.74rem 'Inter', sans-serif; }

        .r9-projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 2.5vw, 24px); }
        .r9-project-card {
          position: relative; aspect-ratio: 4 / 3; border-radius: 22px; overflow: hidden;
          border: 1px solid rgba(14,14,16,0.08); background: #f2f2ee;
          display: block; width: 100%; padding: 0; margin: 0; font: inherit; text-align: left;
          appearance: none; -webkit-appearance: none; cursor: pointer; -webkit-tap-highlight-color: transparent;
        }
        .r9-project-card:focus-visible { outline: 2px solid var(--c1); outline-offset: 2px; }
        .r9-project-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .r9-project-caption {
          position: absolute; left: 0; right: 0; bottom: 0; padding: 14px 16px 12px;
          background: linear-gradient(to top, rgba(14,14,16,0.78) 0%, rgba(14,14,16,0.32) 55%, rgba(14,14,16,0) 100%);
        }
        .r9-project-title { font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; color: #fff; margin: 0; }
        .r9-project-sub { font-family: 'Inter', sans-serif; font-size: 0.76rem; color: rgba(255,255,255,0.75); margin: 2px 0 0; }

        .r9-project-more {
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
          background: linear-gradient(135deg, var(--ink) 0%, #2b2b30 100%); text-align: center; padding: 0 14px;
          cursor: default;
        }
        .r9-project-more-count { font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: clamp(1.6rem, 4vw, 2.1rem); color: #fff; margin: 0; }
        .r9-project-more-label { font-family: 'Inter', sans-serif; font-size: 0.88rem; color: rgba(255,255,255,0.85); margin: 2px 0 0; }
        .r9-project-more-note { font-family: 'Inter', sans-serif; font-size: 0.74rem; color: rgba(255,255,255,0.55); margin: 8px 0 0; }

        
        .r9-contact {
          width: 100%; background: var(--bg); border-top: 1px solid rgba(14,14,16,0.08);
          padding: clamp(28px, 5vh, 48px) clamp(20px, 6vw, 80px) clamp(40px, 7vh, 64px);
          display: flex; flex-wrap: wrap; justify-content: center; gap: clamp(24px, 5vw, 56px);
        }
        .r9-contact-item { display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }
        .r9-contact-label { font-family: 'Inter', sans-serif; font-size: 0.78rem; color: var(--muted); }
        .r9-contact-value { font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; color: var(--ink); text-decoration: none; }
        .r9-contact-value:hover { text-decoration: underline; }
        @media (max-width: 480px) {
          .r9-contact { flex-direction: column; align-items: center; gap: 20px; }
        }

        
        .r9-lightbox {
          position: fixed; inset: 0; z-index: 100; background: rgba(10,10,11,0.92);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: clamp(16px, 5vw, 48px); cursor: zoom-out;
        }
        .r9-lightbox-img {
          max-width: min(920px, 100%); max-height: 78vh; width: auto; height: auto;
          object-fit: contain; border-radius: 14px; cursor: default;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45);
        }
        .r9-lightbox-caption { margin-top: 16px; text-align: center; cursor: default; }
        .r9-lightbox-title { font-family: 'Inter', sans-serif; font-size: 0.98rem; font-weight: 500; color: #fff; margin: 0; }
        .r9-lightbox-sub { font-family: 'Inter', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.65); margin: 3px 0 0; }
        .r9-lightbox-close {
          position: absolute; top: clamp(14px, 3vh, 28px); right: clamp(14px, 4vw, 32px);
          width: 40px; height: 40px; border-radius: 50%; border: none; background: rgba(255,255,255,0.12);
          color: #fff; font-size: 1.5rem; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center;
          appearance: none; -webkit-appearance: none;
        }
        .r9-lightbox-close:hover { background: rgba(255,255,255,0.2); }
        @media (max-width: 480px) {
          .r9-lightbox-img { max-height: 62vh; border-radius: 10px; }
          .r9-lightbox-close { width: 36px; height: 36px; font-size: 1.3rem; }
        }

        @media (max-width: 780px) {
          .r9-work-grid { grid-template-columns: 1fr; }
          .r9-track-grid { grid-template-columns: 1fr; }
          .r9-projects-grid { grid-template-columns: repeat(2, 1fr); }
          .r9-project-history { grid-template-columns: 1fr; }
          .r9-blob { opacity: 0.58; filter: blur(58px); }
          .r9-blob-1 { width: 82vw; height: 82vw; top: -13%; left: -22%; }
          .r9-blob-2 { width: 72vw; height: 72vw; bottom: -8%; right: -25%; }
          .r9-blob-3 { width: 65vw; height: 65vw; bottom: 18%; left: 4%; }
          .r9-diagram-scroll { justify-content: center; margin: 0; padding-bottom: 0; }
          .r9-diagram-svg { width: 100% !important; min-width: 0 !important; max-width: 100%; height: auto !important; flex: 0 1 auto; margin: 0 auto; }
          .r9-process-diagram { display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; }
          .r9-process-node { min-height: 118px; }
          .r9-testimonials { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .r9-projects-grid { grid-template-columns: 1fr; }
          .r9-process-diagram { display: flex; flex-direction: column; align-items: stretch; }
          .r9-process-arrow { transform: rotate(90deg); align-self: center; height: 24px; }
        }
        @media (max-width: 420px) {
          .r9-typed { font-size: clamp(1.3rem, 8.5vw, 2.4rem); }
        }
        @media (prefers-reduced-motion: reduce) {
          .r9-blob { animation: none; }
          .r9-cursor.blink { animation: none; }
        }
      `}</style>

      <div className={`r9-loader ${loaded ? 'is-hidden' : ''}`}>
        <div className="r9-typed">
          {displayText}
          <span className={`r9-cursor ${isPausing ? 'blink' : ''}`} />
        </div>
        <div className="r9-progress-track">
          <div className={`r9-progress-fill ${barStarted ? 'is-started' : ''}`} />
        </div>
      </div>

      <div className={`r9-hero ${revealed ? 'is-visible' : ''}`}>
        <div className="r9-hero-bg">
          <span className="r9-blob r9-blob-1" />
          <span className="r9-blob r9-blob-2" />
          <span className="r9-blob r9-blob-3" />
          <span className="r9-grain" />
          <span className="r9-hero-fade" />
        </div>
        <div className="r9-hero-brand">Ra9ge.dev</div>
        <div className="r9-hero-avatar">
          <img src={IMG_AVATAR} alt="avatar" />
        </div>
        <div className="r9-hero-center">
          <h1 className="r9-hero-word">RA9GE</h1>
          <p className="r9-hero-sub">Ra9ge Portfolio</p>
        </div>
      </div>

      <div className="r9-work">
        <div className="r9-work-grid">
          <div className="r9-card">
            <h3 className="r9-block-title">Stack</h3>
            <div className="r9-chip-list">
              {STACK.map((s) => (
                <span className="r9-chip" key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="r9-card">
            <h3 className="r9-block-title">What I build</h3>
            <p className="r9-build-text">
              Websites of any complexity — from a single landing page to a full production platform, covering everything from interface to infrastructure.
            </p>
            <p className="r9-build-text">Worked on building storage systems on Telegram.</p>
            <p className="r9-build-note">p.s. using Telegram as file storage and delivering files to users.</p>
          </div>
        </div>

        <div className="r9-track-grid">
          <div className="r9-track-card">
            <p className="r9-track-headline">5+ years</p>
            <p className="r9-track-sub">of hands-on development experience</p>
          </div>
          <div className="r9-track-card">
            <p className="r9-track-headline">Large user bases</p>
            <p className="r9-track-sub">personal platforms built to handle real scale</p>
          </div>
          <div className="r9-track-card">
            <p className="r9-track-headline">Complex problem solving</p>
            <p className="r9-track-sub">thoughtful, well-considered systems end to end</p>
          </div>
        </div>

        <div className="r9-card r9-diagram-card">
          <h3 className="r9-block-title">How the cache layer works</h3>
          <div className="r9-legend">
            <span className="r9-legend-item"><span className="r9-legend-dot" style={{ background: 'var(--c1)' }} /> response</span>
            <span className="r9-legend-item"><span className="r9-legend-dot" style={{ background: 'var(--c3)' }} /> cache miss / populate</span>
            <span className="r9-legend-item"><span className="r9-legend-dot" style={{ background: 'var(--c5)' }} /> pub/sub invalidation</span>
          </div>
          <div className="r9-diagram-scroll" ref={diagramScrollRef}>
            <CacheDiagram />
          </div>
        </div>

        <div className="r9-card r9-diagram-card">
          <h3 className="r9-block-title">How I work</h3>
          <ProcessDiagram />
        </div>

        <div>
          <h3 className="r9-block-title r9-projects-heading">Projects</h3>
          <div className="r9-projects-grid">
            {PROJECTS.map((p) => (
              <button
                type="button"
                className="r9-project-card"
                key={p.src}
                onClick={() => setLightbox(p)}
                aria-label={`Open ${p.title} full screen`}
              >
                <img src={p.src} alt={p.title} loading="lazy" />
                <div className="r9-project-caption">
                  <p className="r9-project-title">{p.title}</p>
                  <p className="r9-project-sub">{p.sub}</p>
                </div>
              </button>
            ))}
            <div className="r9-project-card r9-project-more">
              <p className="r9-project-more-count">+15</p>
              <p className="r9-project-more-label">other projects</p>
              <p className="r9-project-more-note">available on request — DM me</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="r9-block-title r9-projects-heading">Selected project experience</h3>
          <div className="r9-project-history">
            <article className="r9-project-history-card">
              <h4 className="r9-project-history-title">Obelisk</h4>
              <p className="r9-project-history-text">Telegram spam campaigns, group inviting, and other platform features.</p>
              <span className="r9-project-history-role">Main Coder</span>
            </article>
            <article className="r9-project-history-card">
              <h4 className="r9-project-history-title">Senku</h4>
              <p className="r9-project-history-text">A free 4K anime streaming platform without ads or subscriptions, including Android applications.</p>
              <span className="r9-project-history-role">Creator · Solo Project</span>
            </article>
            <article className="r9-project-history-card">
              <h4 className="r9-project-history-title">AML Wallet Risk Analysis</h4>
              <p className="r9-project-history-text">Blockchain address screening for links to illegal activity, fraud, sanctions, or dark markets.</p>
              <span className="r9-project-history-role">Main Coder · Web &amp; Backend</span>
            </article>
            <article className="r9-project-history-card">
              <h4 className="r9-project-history-title">Auto-Promotion Bot</h4>
              <p className="r9-project-history-text">Automated promotion for social media accounts, companies, websites, and other online projects.</p>
              <span className="r9-project-history-role">Lead Coder</span>
            </article>
            <article className="r9-project-history-card">
              <h4 className="r9-project-history-title">1xBet</h4>
              <p className="r9-project-history-text">A large-scale casino platform delivered through a Telegram bot.</p>
              <span className="r9-project-history-role">Team Lead</span>
            </article>
            <article className="r9-project-history-card">
              <h4 className="r9-project-history-title">Currency Exchange Bot</h4>
              <p className="r9-project-history-text">A large-scale currency exchange service built for fast and convenient transactions.</p>
              <span className="r9-project-history-role">Main Coder</span>
            </article>
          </div>
        </div>

        <div>
          <h3 className="r9-block-title r9-projects-heading">Client feedback</h3>
          <div className="r9-testimonials">
            <article className="r9-testimonial">
              <p className="r9-testimonial-quote">Thank you so much for the project. My colleagues were impressed and said they would like a bot like this for their own work too.</p>
              <p className="r9-testimonial-author">Verified client feedback</p>
              <p className="r9-testimonial-role">Telegram bot project</p>
            </article>
            <article className="r9-testimonial">
              <p className="r9-testimonial-quote">Everything was discussed clearly, without unnecessary complications. The result matched what we needed and worked properly from the first day.</p>
              <p className="r9-testimonial-author">Verified client feedback</p>
              <p className="r9-testimonial-role">Web development project</p>
            </article>
            <article className="r9-testimonial">
              <p className="r9-testimonial-quote">The technical work was done carefully. Requests were understood quickly, and the new features made the workflow much more convenient for our team.</p>
              <p className="r9-testimonial-author">Verified client feedback</p>
              <p className="r9-testimonial-role">Automation project</p>
            </article>
          </div>
        </div>
      </div>

      <footer className="r9-contact">
        <div className="r9-contact-item">
          <span className="r9-contact-label">Email</span>
          <a className="r9-contact-value" href="mailto:SenKuSupport@proton.me">SenKuSupport@proton.me</a>
        </div>
        <div className="r9-contact-item">
          <span className="r9-contact-label">Telegram</span>
          <a className="r9-contact-value" href="https://t.me/Soulmeth" target="_blank" rel="noopener noreferrer">@Soulmeth</a>
        </div>
        <div className="r9-contact-item">
          <span className="r9-contact-label">GitHub</span>
          <a className="r9-contact-value" href="https://github.com/Ra9ge" target="_blank" rel="noopener noreferrer">github.com/Ra9ge</a>
        </div>
      </footer>

      {lightbox && (
        <div className="r9-lightbox" onClick={() => setLightbox(null)}>
          <button type="button" className="r9-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            ×
          </button>
          <img
            className="r9-lightbox-img"
            src={lightbox.src}
            alt={lightbox.title}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="r9-lightbox-caption" onClick={(e) => e.stopPropagation()}>
            <p className="r9-lightbox-title">{lightbox.title}</p>
            <p className="r9-lightbox-sub">{lightbox.sub}</p>
          </div>
        </div>
      )}
    </div>
  );
}
