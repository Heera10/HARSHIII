// Small hand-drawn-style SVG illustrations (decorative only — aria-hidden).
const S = { 'aria-hidden': true, focusable: false } as const

export const Cake = () => (
  <svg viewBox="0 0 160 150" className="art cake" {...S}>
    <ellipse cx="80" cy="136" rx="62" ry="8" fill="#000" opacity=".18" />
    <rect x="22" y="78" width="116" height="52" rx="12" fill="#F4D9EB" />
    <path d="M22 96c10 10 20-6 29 4s20-6 29 4 20-6 29 4 20-6 29 2v20a12 12 0 0 1-12 12H34a12 12 0 0 1-12-12z" fill="#C8B6FF" />
    <rect x="30" y="52" width="100" height="34" rx="10" fill="#FFF9FF" />
    <path d="M30 70c8 8 16-4 24 3s16-5 24 3 16-5 24 3 16-5 24 2v5H30z" fill="#E8DEFF" />
    {[56, 80, 104].map((x) => (
      <g key={x}>
        <rect x={x - 3} y="30" width="6" height="24" rx="3" fill="#7661A8" />
        <path className="flame" d={`M${x} 14c6 7 6 12 0 15-6-3-6-8 0-15z`} fill="#FFD9A0" />
      </g>
    ))}
    <circle cx="48" cy="112" r="4" fill="#fff" /><circle cx="80" cy="116" r="4" fill="#fff" /><circle cx="112" cy="112" r="4" fill="#fff" />
  </svg>
)

export const Calendar = () => (
  <svg viewBox="0 0 120 130" className="art" {...S}>
    <rect x="10" y="18" width="100" height="100" rx="14" fill="#FFF9FF" />
    <path d="M10 32a14 14 0 0 1 14-14h72a14 14 0 0 1 14 14v22H10z" fill="#7661A8" />
    <rect x="34" y="6" width="8" height="22" rx="4" fill="#C8B6FF" /><rect x="78" y="6" width="8" height="22" rx="4" fill="#C8B6FF" />
    <text x="60" y="47" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill="#FFF9FF">AUG</text>
    <text x="60" y="102" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontWeight="600" fontSize="52" fill="#211638">6</text>
    <path d="M86 92c3-5 9-3 8 2-1 4-8 8-8 8s-9-4-8-8c1-5 7-7 8-2z" fill="#F4D9EB" transform="translate(-4 -6) scale(.9)" />
  </svg>
)

export const Coffee = () => (
  <svg viewBox="0 0 110 110" className="art" {...S}>
    <path className="steam" d="M38 30c-6-8 6-12 0-20M54 30c-6-8 6-12 0-20" stroke="#E8DEFF" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M22 38h60v26a26 26 0 0 1-26 26h-8A26 26 0 0 1 22 64z" fill="#FFF9FF" />
    <path d="M82 46h8a10 10 0 0 1 0 20h-9" stroke="#FFF9FF" strokeWidth="6" fill="none" />
    <path d="M22 42h60v8H22z" fill="#7a5a4b" /><ellipse cx="52" cy="100" rx="38" ry="5" fill="#C8B6FF" />
  </svg>
)

export const Tea = () => (
  <svg viewBox="0 0 110 110" className="art" {...S}>
    <path className="steam" d="M42 28c-6-8 6-12 0-20M58 28c-6-8 6-12 0-20" stroke="#E8DEFF" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M14 40h76c0 28-14 48-38 48S14 68 14 40z" fill="#F4D9EB" />
    <path d="M14 40h76c0 6-1 10-2 14H16c-1-4-2-8-2-14z" fill="#d9a46b" opacity=".85" />
    <path d="M90 48h6a9 9 0 0 1 0 18h-10" stroke="#F4D9EB" strokeWidth="5" fill="none" />
    <ellipse cx="52" cy="98" rx="40" ry="5" fill="#C8B6FF" /><path d="M45 56l7 7 7-7" stroke="#fff" strokeWidth="3" fill="none" opacity=".7" />
  </svg>
)

export const Diary = () => (
  <svg viewBox="0 0 100 120" className="art" {...S}>
    <rect x="12" y="8" width="76" height="104" rx="8" fill="#7661A8" /><rect x="12" y="8" width="14" height="104" rx="6" fill="#5b4a8a" />
    <path d="M60 22c-11 0-18 8-18 18s7 18 18 18c-5 3-11 3-16 1 5 8 17 10 25 3s8-18 1-26c-3-9-5-14-10-14z" fill="#E8DEFF" transform="translate(-8 4) scale(.95)" />
    <rect x="34" y="84" width="46" height="5" rx="2.5" fill="#C8B6FF" /><rect x="34" y="94" width="30" height="5" rx="2.5" fill="#C8B6FF" />
    <rect x="80" y="36" width="8" height="30" rx="3" fill="#F4D9EB" />
  </svg>
)

export const Eye = () => (
  <svg viewBox="0 0 100 100" className="art" {...S}>
    <circle cx="50" cy="50" r="46" fill="#3b4fa0" /><circle cx="50" cy="50" r="35" fill="#fff" />
    <circle cx="50" cy="50" r="24" fill="#6fb3e8" /><circle cx="50" cy="50" r="12" fill="#14162e" />
    <circle cx="45" cy="45" r="4" fill="#fff" opacity=".85" />
  </svg>
)

export const Ribbon = () => (
  <svg viewBox="0 0 120 90" className="art" {...S}>
    <path d="M60 44C38 16 8 22 12 46c3 22 34 6 48-2zM60 44c22-28 52-22 48 2-3 22-34 6-48-2z" fill="#F4D9EB" stroke="#e7a9cf" strokeWidth="3" />
    <path d="M58 48c-10 14-18 30-20 40M62 48c10 14 18 30 20 40" stroke="#e7a9cf" strokeWidth="9" strokeLinecap="round" fill="none" />
    <circle cx="60" cy="46" r="10" fill="#e08fbc" />
  </svg>
)

export const Lips = () => (
  <svg viewBox="0 0 100 70" className="art" {...S}>
    <path d="M6 36C20 14 36 10 50 22 64 10 80 14 94 36 80 62 62 64 50 64 38 64 20 62 6 36z" fill="#e0579b" />
    <path d="M10 36c30 8 50 8 80 0" stroke="#a42c68" strokeWidth="3" fill="none" />
    <ellipse cx="34" cy="26" rx="9" ry="4" fill="#fff" opacity=".35" />
  </svg>
)

export const Sticker = ({ text, color = '#F4D9EB', rot = -6 }: { text: string; color?: string; rot?: number }) => (
  <span className="sticker" style={{ background: color, transform: `rotate(${rot}deg)` }} aria-hidden="true">{text}</span>
)

export const Footsteps = () => (
  <svg viewBox="0 0 110 110" className="art" {...S}>
    {[[34, 86, -12], [60, 66, 8], [38, 44, -12], [66, 24, 8]].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
        <ellipse cx="0" cy="0" rx="9" ry="14" fill="#E8DEFF" /><ellipse cx="0" cy="-19" rx="6" ry="4" fill="#E8DEFF" />
      </g>
    ))}
  </svg>
)

export const Food = () => (
  <svg viewBox="0 0 110 110" className="art" {...S}>
    <path className="steam" d="M40 34c-6-8 6-12 0-20M58 34c-6-8 6-12 0-20M76 34c-6-8 6-12 0-20" stroke="#E8DEFF" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M10 48h90c0 28-18 48-45 48S10 76 10 48z" fill="#F4D9EB" /><path d="M20 56h70" stroke="#fff" strokeWidth="3" opacity=".6" />
    <path d="M70 18l24 40" stroke="#C8B6FF" strokeWidth="4" strokeLinecap="round" /><path d="M84 14l20 40" stroke="#C8B6FF" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

export const Camera = () => (
  <svg viewBox="0 0 120 100" className="art" {...S}>
    <rect x="8" y="26" width="104" height="66" rx="14" fill="#E8DEFF" />
    <path d="M38 26l8-14h28l8 14z" fill="#C8B6FF" />
    <circle cx="60" cy="58" r="23" fill="#7661A8" /><circle cx="60" cy="58" r="14" fill="#211638" /><circle cx="54" cy="52" r="4" fill="#fff" opacity=".7" />
    <circle cx="96" cy="40" r="5" fill="#F4D9EB" />
  </svg>
)

export const Envelope = () => (
  <svg viewBox="0 0 120 90" className="art" {...S}>
    <rect x="6" y="14" width="108" height="68" rx="10" fill="#FFF9FF" />
    <path d="M6 24l54 38 54-38" stroke="#C8B6FF" strokeWidth="4" fill="none" strokeLinejoin="round" />
    <path d="M60 52c-9-9-1-17 0-9 1-8 9 0 0 9z" fill="#e08fbc" transform="translate(0 4)" />
  </svg>
)

export const Jar = () => (
  <svg viewBox="0 0 220 280" className="jar-art" {...S}>
    <defs>
      <linearGradient id="glass" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset=".5" stopColor="#fff" stopOpacity=".06" /><stop offset="1" stopColor="#fff" stopOpacity=".22" /></linearGradient>
    </defs>
    <rect x="46" y="10" width="128" height="30" rx="10" fill="#7661A8" />
    <path d="M58 40h104c24 6 40 24 40 52v130c0 30-18 50-48 50H66c-30 0-48-20-48-50V92c0-28 16-46 40-52z" fill="url(#glass)" stroke="#E8DEFF" strokeOpacity=".7" strokeWidth="3" />
    {[[60, 190, -20, '#F4D9EB'], [110, 210, 12, '#E8DEFF'], [150, 180, 28, '#C8B6FF'], [84, 150, 40, '#FFF9FF'], [128, 140, -30, '#F4D9EB'], [70, 108, 10, '#C8B6FF'], [118, 100, -12, '#E8DEFF']].map(([x, y, r, c], i) => (
      <rect key={i} className="jar-note" x={x as number} y={y as number} width="38" height="26" rx="4" fill={c as string} transform={`rotate(${r} ${x} ${y})`} style={{ animationDelay: `${i * 0.5}s` }} />
    ))}
    <text x="52" y="168" fontSize="16">💜</text><text x="132" y="236" fontSize="14">✨</text><text x="92" y="244" fontSize="14">🤍</text>
  </svg>
)

export const Moon = () => <span className="moon-orb" aria-hidden="true" />
