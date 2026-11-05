import { useEffect, useMemo, useRef, useState } from 'react'
import { finalClosing, finalLetterParagraphs } from '../data/extras'
import { Moon } from '../components/Decor'
import { prefersReducedMotion, scrollToId } from '../components/FX'

export function FinalLetter({ onReadAgain }: { onReadAgain: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const step = prefersReducedMotion() ? 0 : 1.3
  const count = finalLetterParagraphs.length + 3 // + closing, with-love, signature

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setStarted(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const t = window.setTimeout(() => setDone(true), (count * step + 1) * 1000)
    return () => window.clearTimeout(t)
  }, [started, count, step])

  const rain = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ x: (i * 37) % 100, d: (i % 9) * 0.6, t: 6 + (i % 5), e: ['✨', '💜', '⭐', '🤍'][i % 4] })), [])
  const style = (i: number) => (started ? { animationDelay: `${i * step}s` } : undefined)

  return (
    <section ref={ref} className="section final" id="final" aria-labelledby="f-title">
      {done && <div className="rain" aria-hidden="true">{rain.map((r, i) => <span key={i} style={{ left: `${r.x}%`, animationDelay: `${r.d}s`, animationDuration: `${r.t}s` }}>{r.e}</span>)}</div>}
      <Moon />
      <article className={`letter-card ${started ? 'go' : ''}`}>
        <h2 id="f-title">One Last Thing, My Soul Sister…</h2>
        {finalLetterParagraphs.map((p, i) => <p key={i} className="fade" style={style(i)}>{p}</p>)}
        <p className="fade" style={style(finalLetterParagraphs.length)}>{finalClosing.paragraph}</p>
        <p className="fade" style={style(finalLetterParagraphs.length + 1)}>{finalClosing.withLove}</p>
        <p className="fade sig" style={style(finalLetterParagraphs.length + 2)}><strong>{finalClosing.signature}</strong></p>
      </article>
      <div className="final-actions">
        <button className="btn primary" onClick={onReadAgain}>Read Our Story Again 📖</button>
        <button className="btn ghost light" onClick={() => scrollToId('top')}>Return to Our Little Universe 🌙</button>
      </div>
    </section>
  )
}
