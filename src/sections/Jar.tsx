import { useState } from 'react'
import { loveNotes } from '../data/loveNotes'
import { Jar as JarArt } from '../components/Decor'
import { useFX } from '../components/FX'

export function JarOfLove() {
  const { burst } = useFX()
  const [current, setCurrent] = useState<number | null>(null)
  const [collected, setCollected] = useState<number[]>([])
  const [favs, setFavs] = useState<number[]>([])
  const [showFavs, setShowFavs] = useState(false)
  const [spin, setSpin] = useState(0)

  const pick = (el: Element | null) => {
    const unseen = loveNotes.map((_, i) => i).filter((i) => !collected.includes(i))
    const pool = unseen.length ? unseen : loveNotes.map((_, i) => i).filter((i) => i !== current)
    const n = pool[Math.floor(Math.random() * pool.length)]
    setCurrent(n); setSpin((s) => s + 1)
    setCollected((c) => (c.includes(n) ? c : [...c, n]))
    burst(el, ['💜', '✨', '🤍'], 7)
  }
  const toggleFav = (i: number) => setFavs((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]))
  const list = (showFavs ? collected.filter((i) => favs.includes(i)) : collected)

  return (
    <section className="section" id="jar" aria-labelledby="jar-title">
      <h2 id="jar-title" className="section-title">A Little Jar of Love for My Cutiepiee 💌</h2>
      <p className="section-sub">For the days when you need a tiny reminder of how loved you are.</p>
      <div className="jar-stage">
        <button className="jar-btn" onClick={(e) => pick(e.currentTarget)} aria-label="Tap the jar to pick a note"><JarArt /></button>
        <div className="jar-side">
          <button className="btn primary big" onClick={(e) => pick(e.currentTarget)}>Pick a Note 💌</button>
          <p className="counter">{collected.length} of {loveNotes.length} notes collected</p>
          {current !== null && (
            <div key={spin} className="note-card" role="status" aria-live="polite">
              <p>{loveNotes[current]}</p>
              <button className={`fav ${favs.includes(current) ? 'on' : ''}`} aria-pressed={favs.includes(current)} onClick={() => toggleFav(current)}>
                {favs.includes(current) ? '💜 Favorite' : '🤍 Mark as favorite'}
              </button>
            </div>
          )}
        </div>
      </div>
      {collected.length > 0 && (
        <div className="collection">
          <div className="collection-head">
            <h3>Your collection 🌙</h3>
            <button className="btn ghost small" aria-pressed={showFavs} onClick={() => setShowFavs((v) => !v)}>{showFavs ? 'Show all notes' : `Show favorites (${favs.length})`}</button>
          </div>
          {list.length === 0 ? <p className="empty">No favorites yet. Tap the heart on a note you love.</p> : (
            <ul>
              {list.map((i) => (
                <li key={i}><span>{loveNotes[i]}</span><button className={`fav icon ${favs.includes(i) ? 'on' : ''}`} aria-label={favs.includes(i) ? 'Remove favorite' : 'Mark favorite'} aria-pressed={favs.includes(i)} onClick={() => toggleFav(i)}>{favs.includes(i) ? '💜' : '🤍'}</button></li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}
