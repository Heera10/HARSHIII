import { useState } from 'react'
import { openWhenLetters, type OpenWhenLetter } from '../data/openWhenLetters'
import { Modal } from '../components/Modal'

export function OpenWhen() {
  const [open, setOpen] = useState<OpenWhenLetter | null>(null)
  const [read, setRead] = useState<string[]>([])
  return (
    <section className="section" id="letters" aria-labelledby="ow-title">
      <h2 id="ow-title" className="section-title">Open When Your Heart Needs a Little Hug 💌</h2>
      <p className="section-sub">Eight little letters, sealed with love. Open the one you need.</p>
      <ul className="envelopes">
        {openWhenLetters.map((l, i) => (
          <li key={l.id} style={{ ['--tilt' as string]: `${[-2, 1.5, -1, 2][i % 4]}deg` }}>
            <button className={`env ${read.includes(l.id) ? 'read' : ''}`} onClick={() => { setOpen(l); setRead((r) => (r.includes(l.id) ? r : [...r, l.id])) }}>
              <span className="env-flap" aria-hidden="true" />
              <span className="env-seal" aria-hidden="true">{l.emoji}</span>
              <span className="env-label">{l.label}</span>
            </button>
          </li>
        ))}
      </ul>
      {open && (
        <Modal onClose={() => setOpen(null)} label={open.label} className="letter" closeText="Close Letter 💌">
          <h3>{open.label}</h3>
          {open.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </Modal>
      )}
    </section>
  )
}
