import { useState, type ReactNode } from 'react'
import { media } from '../data/media'
import { Modal } from '../components/Modal'
import { VideoCard } from '../components/Media'
import { Coffee, Tea } from '../components/Decor'
import { scrollToId } from '../components/FX'

interface Exhibit { n: number; name: string; blurb: string; caption: string; media?: string; art?: ReactNode }

const exhibits: Exhibit[] = [
  { n: 1, name: 'The Beginning', blurb: 'August 6 and our first day at the office.', caption: 'August 6, my very first day at the office. That was the day I met you, and the day our story quietly began. 🌙', media: 'office' },
  { n: 2, name: 'Coffee Meets Tea', blurb: 'Our office balcony conversation.', caption: 'My cup of coffee, your cup of tea, and a conversation that changed so much. ☕🫖', art: <div className="art-pair"><Coffee /><Tea /></div> },
  { n: 3, name: 'Our Midnight World', blurb: 'Late-night conversations and trust.', caption: 'When the whole world went to sleep, our little world came alive. 🌙✨', media: 'v2' },
  { n: 4, name: 'Unlimited Kissies', blurb: 'Our cute and playful affection.', caption: 'The quota is unlimited. No negotiations accepted. 💋🎀', media: 'hearts' },
  { n: 5, name: 'Pagalpan Unlimited', blurb: "Laughter, little fights, and Bro's jealousy.", caption: 'Two pagal girls, unlimited drama, and one very jealous Bro. 😂💜', media: 'v3' },
  { n: 6, name: 'Our Sunday', blurb: 'Our outing, our pictures, and the saved Snapchat memory.', caption: 'Not because everything was perfect, but because it was ours. 🌷', media: 'night' },
]

export function Museum({ onRead }: { onRead: (i: number) => void }) {
  const [open, setOpen] = useState<Exhibit | null>(null)
  return (
    <section className="section" id="museum" aria-labelledby="mu-title">
      <h2 id="mu-title" className="section-title">Our Little Memory Museum 🏛️💜</h2>
      <p className="section-sub">Tiny moments, giant places in my heart.</p>
      <ul className="gallery-wall">
        {exhibits.map((e, i) => {
          const m = e.media ? media[e.media] : undefined
          return (
            <li key={e.n} style={{ ['--tilt' as string]: `${i % 2 ? 1.4 : -1.4}deg` }}>
              <button className="exhibit" onClick={() => setOpen(e)} aria-label={`Open exhibit ${e.n}: ${e.name}`}>
                <span className="exhibit-frame">
                  {m ? (
                    <img src={m.type === 'photo' ? m.src : m.poster} alt="" loading="lazy" decoding="async" style={{ objectPosition: m.focus }} />
                  ) : e.art}
                  {m?.type === 'video' && <span className="badge-play" aria-hidden="true">▶</span>}
                </span>
                <span className="plaque"><strong>{e.n}. {e.name}</strong><small>{e.blurb}</small></span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="center"><button className="btn primary big" onClick={() => scrollToId('secret')}>Visit Our Secret Corner 🧿</button></div>

      {open && (
        <Modal onClose={() => setOpen(null)} label={`Exhibit: ${open.name}`} className="memory-card" closeText="Close exhibit">
          <h3>{open.n}. {open.name}</h3>
          <div className="memory-media">
            {open.media && media[open.media].type === 'photo' && <img src={media[open.media].src} alt={media[open.media].alt} />}
            {open.media && media[open.media].type === 'video' && <VideoCard item={media[open.media]} caption={false} maxWidth={300} />}
            {open.art}
          </div>
          <p className="memory-caption">{open.caption}</p>
          <button className="btn primary" onClick={() => { const i = open.n - 1; setOpen(null); onRead(i) }}>Read Chapter {open.n} in full 📖</button>
        </Modal>
      )}
    </section>
  )
}
