import { useState } from 'react'
import { approvedStories } from '../data/approvedStories'
import { secretCards, secretEnvelope } from '../data/extras'
import { Eye, Envelope } from '../components/Decor'
import { Secret } from '../components/FX'

const stars = [
  { x: 10, y: 62 }, { x: 28, y: 28 }, { x: 47, y: 52 }, { x: 62, y: 18 }, { x: 80, y: 46 }, { x: 92, y: 14 },
]

export function SecretCorner({ onRead }: { onRead: (i: number) => void }) {
  const [shown, setShown] = useState<Record<number, boolean>>({})
  const [env, setEnv] = useState(false)
  return (
    <section className="section" id="secret" aria-labelledby="sc-title">
      <Secret className="nazar-secret" label="A protective eye (a little secret to discover)" message="Nazar na lage to our little universe. 🧿💜" emojis={['🧿', '💜']}><Eye /></Secret>
      <h2 id="sc-title" className="section-title">Our Little Secret World 🧿🌙</h2>
      <p className="section-sub">Not everyone knows about us, but we know what we are to each other.</p>
      <p className="intro">Some memories don't need an audience. Some feelings don't need explanations. Some bonds are special because of everything we understand without having to explain it to the world.</p>

      <div className="secret-cards">
        {secretCards.map((m, i) => (
          <button key={i} className={`secret-card ${shown[i] ? 'open' : ''}`} aria-expanded={!!shown[i]} onClick={() => setShown((s) => ({ ...s, [i]: !s[i] }))}>
            {shown[i] ? <span>{m}</span> : <span className="hint">🌙 Tap to reveal</span>}
          </button>
        ))}
      </div>

      <h3 className="sub-h">Our constellation ✨</h3>
      <p className="section-sub small">Six stars, six chapters. Tap one to read it.</p>
      <div className="constellation">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={stars.map((s) => `${s.x},${s.y * 0.8 + 4}`).join(' ')} fill="none" stroke="#C8B6FF" strokeOpacity=".5" strokeWidth=".35" strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" />
        </svg>
        {stars.map((s, i) => (
          <button key={i} className="cstar" style={{ left: `${s.x}%`, top: `${s.y}%` }} onClick={() => onRead(i)} aria-label={`Open Chapter ${i + 1}: ${approvedStories[i].title}`}>
            <span className="cstar-dot">✦</span><span className="cstar-no">{i + 1}</span>
          </button>
        ))}
      </div>

      <div className="center">
        <button className={`mini-env ${env ? 'open' : ''}`} aria-expanded={env} onClick={() => setEnv((v) => !v)}>
          <Envelope /><span>{env ? 'Close the envelope' : 'A small secret envelope'}</span>
        </button>
        {env && <p className="env-msg">{secretEnvelope}</p>}
      </div>
    </section>
  )
}
