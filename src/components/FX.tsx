import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

interface Particle { id: number; e: string; dx: number; dy: number; r: number; d: number }
interface Burst { id: number; x: number; y: number; ps: Particle[] }

interface FXApi {
  /** Pop a small message at the bottom of the screen. */
  toast: (msg: string) => void
  /** Burst emojis out of an element (works for mouse, touch and keyboard activation). */
  burst: (from: Element | null, emojis?: string[], count?: number) => void
}

const FXContext = createContext<FXApi>({ toast: () => {}, burst: () => {} })
export const useFX = () => useContext(FXContext)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function scrollToId(id: string) {
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }, 30)
}

export function FXProvider({ children }: { children: ReactNode }) {
  const [bursts, setBursts] = useState<Burst[]>([])
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null)
  const seq = useRef(0)
  const timer = useRef<number | undefined>(undefined)

  const toast = useCallback((text: string) => {
    const id = ++seq.current
    setMsg({ id, text })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMsg(null), 4200)
  }, [])

  const burst = useCallback((from: Element | null, emojis = ['💜', '✨', '💗'], count = 9) => {
    const r = from?.getBoundingClientRect()
    const x = r ? r.left + r.width / 2 : window.innerWidth / 2
    const y = r ? r.top + r.height / 2 : window.innerHeight / 2
    const id = ++seq.current
    const ps: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      e: emojis[i % emojis.length],
      dx: (Math.random() - 0.5) * 220,
      dy: -60 - Math.random() * 150,
      r: (Math.random() - 0.5) * 50,
      d: Math.random() * 0.2,
    }))
    setBursts((b) => [...b, { id, x, y, ps }])
    window.setTimeout(() => setBursts((b) => b.filter((q) => q.id !== id)), 1900)
  }, [])

  const api = useMemo(() => ({ toast, burst }), [toast, burst])

  return (
    <FXContext.Provider value={api}>
      {children}
      <div className="fx-layer" aria-hidden="true">
        {bursts.map((b) =>
          b.ps.map((p) => (
            <span
              key={`${b.id}-${p.id}`}
              className="fx-particle"
              style={{ left: b.x, top: b.y, animationDelay: `${p.d}s`, ['--dx' as string]: `${p.dx}px`, ['--dy' as string]: `${p.dy}px`, ['--r' as string]: `${p.r}deg` }}
            >
              {p.e}
            </span>
          )),
        )}
      </div>
      <div className="toast-wrap" role="status" aria-live="polite">
        {msg && (
          <button key={msg.id} className="toast" onClick={() => setMsg(null)} title="Tap to close">
            {msg.text}
          </button>
        )}
      </div>
    </FXContext.Provider>
  )
}

// deterministic pseudo-random so the sky doesn't reshuffle on every render
function rng(seed: number) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

export function Sky() {
  const items = useMemo(() => {
    const r = rng(42)
    return {
      stars: Array.from({ length: 70 }, () => ({ x: r() * 100, y: r() * 100, s: 1 + r() * 2.2, d: r() * 6, t: 3 + r() * 5 })),
      hearts: Array.from({ length: 9 }, (_, i) => ({ x: 4 + r() * 92, d: i * 2.6 + r() * 2, t: 16 + r() * 10, s: 0.7 + r() * 0.8, e: ['💜', '🤍', '🩷'][i % 3] })),
    }
  }, [])
  return (
    <div className="sky" aria-hidden="true">
      {items.stars.map((s, i) => (
        <i key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }} />
      ))}
      <div className="cloud c1" />
      <div className="cloud c2" />
      <div className="cloud c3" />
      {items.hearts.map((h, i) => (
        <span key={i} className="fheart" style={{ left: `${h.x}%`, animationDelay: `-${h.d}s`, animationDuration: `${h.t}s`, fontSize: `${h.s}rem` }}>
          {h.e}
        </span>
      ))}
    </div>
  )
}

/** A clickable decorative thing that triggers a tiny hidden surprise. */
export function Secret({
  className = '', label, message, emojis, children,
}: { className?: string; label: string; message?: string; emojis?: string[]; children: ReactNode }) {
  const { toast, burst } = useFX()
  return (
    <button
      type="button"
      className={`secret ${className}`}
      aria-label={label}
      onClick={(e) => {
        if (message) toast(message)
        burst(e.currentTarget, emojis)
      }}
    >
      {children}
    </button>
  )
}
