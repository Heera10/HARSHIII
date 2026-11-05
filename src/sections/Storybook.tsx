import { useEffect, useRef, useState } from 'react'
import { approvedStories } from '../data/approvedStories'
import { chapterMedia, media } from '../data/media'
import { Prose, inline } from '../components/RichText'
import { MediaFrame } from '../components/Media'
import { Calendar, Camera, Coffee, Diary, Eye, Food, Footsteps, Lips, Moon, Ribbon, Sticker, Tea } from '../components/Decor'
import { Secret, scrollToId } from '../components/FX'

function Banner({ id }: { id: number }) {
  return (
    <div className={`banner b${id}`} aria-hidden="true">
      {id === 1 && (<><span className="sun" /><Calendar /></>)}
      {id === 2 && (<><Coffee /><span className="banner-text">&amp;</span><Tea /></>)}
      {id === 3 && (<><Diary /><Moon /><Eye /></>)}
      {id === 4 && (<><Ribbon /><span className="hearts-row">💗 💋 💗</span><Lips /></>)}
      {id === 5 && (<><Sticker text="HAHA!" color="#F4D9EB" rot={-8} /><Sticker text="BRO 👀" color="#E8DEFF" rot={5} /><Sticker text="pagal 💜" color="#C8B6FF" rot={-3} /></>)}
      {id === 6 && (<><Footsteps /><Food /><Camera /></>)}
    </div>
  )
}

interface Props { chapter: number | null; setChapter: (c: number | null) => void }

export function Storybook({ chapter, setChapter }: Props) {
  const total = approvedStories.length
  const articleRef = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (chapter === null) return
    headRef.current?.focus({ preventScroll: true })
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight * 0.55
      setPct(Math.max(0, Math.min(100, ((window.innerHeight * 0.35 - r.top) / Math.max(span, 1)) * 100)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [chapter])

  const go = (c: number | null) => { setChapter(c); setPct(0); scrollToId('storybook') }

  if (chapter === null) {
    return (
      <section className="section" id="storybook" aria-labelledby="sb-title">
        <Secret className="diary-secret" label="A little diary (a little secret to discover)" message="You're my walking diary, Cutiepiee. Every page of my story has you in it. 📖🧿" emojis={['📖', '💜']}><Diary /></Secret>
        <Secret className="sb-star" label="A tiny star (a little secret to discover)" message="You found a little piece of my heart. 🥹" emojis={['⭐', '💜']}>✦</Secret>
        <h2 id="sb-title" className="section-title">Our Interactive Storybook 📖</h2>
        <p className="section-sub">Six chapters, exactly as I wrote them. Pick one to begin, or start from the first page.</p>
        <ol className="chapter-index">
          {approvedStories.map((c, i) => (
            <li key={c.id}>
              <button className={`index-card b${c.id}`} onClick={() => go(i)}>
                <span className="idx-no">Chapter {c.id}</span>
                <span className="idx-title">{c.title}</span>
                {c.subtitle && <span className="idx-sub">{c.subtitle}</span>}
              </button>
            </li>
          ))}
        </ol>
        <div className="center"><button className="btn primary" onClick={() => go(0)}>Start from Chapter 1 ✨</button></div>
      </section>
    )
  }

  const c = approvedStories[chapter]
  const last = chapter === total - 1
  const keepsakes = chapterMedia[c.id] ?? []

  return (
    <section className="section" id="storybook" aria-label="Storybook reader">
      <div className="reader-bar">
        <div className="progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}><span style={{ width: `${pct}%` }} /></div>
        <div className="dots" aria-label={`Chapter ${c.id} of ${total}`}>
          {approvedStories.map((s, i) => (
            <button key={s.id} className={i === chapter ? 'on' : ''} onClick={() => go(i)} aria-label={`Go to chapter ${s.id}`} aria-current={i === chapter ? 'step' : undefined}>{s.id}</button>
          ))}
        </div>
      </div>

      <article ref={articleRef} key={c.id} className={`reader t${c.id}`}>
        <Banner id={c.id} />
        <p className="kicker">Chapter {c.id} of {total}</p>
        <h2 ref={headRef} tabIndex={-1} className="chapter-title">{c.title}</h2>
        {c.subtitle && <p className="chapter-sub"><em>{c.subtitle}</em></p>}
        <Prose text={c.body} />

        {keepsakes.length > 0 && (
          <aside className="keepsakes" aria-label="Keepsakes from this chapter">
            <h3>{keepsakes.length > 1 ? 'Keepsakes from this chapter' : 'A keepsake from this chapter'} 🌙</h3>
            <div className="keep-row">
              {keepsakes.map((k, i) => <MediaFrame key={k} item={media[k]} tilt={i % 2 ? 1.6 : -1.6} />)}
            </div>
          </aside>
        )}

        <nav className="chapter-nav" aria-label="Chapter navigation">
          <button className="btn ghost" disabled={chapter === 0} onClick={() => go(chapter - 1)}>‹ Previous</button>
          <button className="btn ghost" onClick={() => go(null)}>Chapter Index</button>
          <button className="btn ghost" disabled={last} onClick={() => go(chapter + 1)}>Next ›</button>
        </nav>
        <div className="center">
          {last ? (
            <div className="museum-door">
              <p>{inline('*That is our story so far… and there are more little treasures to find.*')}</p>
              <button className="btn primary big" onClick={() => scrollToId('museum')}>Continue Our Story 📖 → Memory Museum 🏛️</button>
            </div>
          ) : (
            <button className="btn primary big" onClick={() => go(chapter + 1)}>Continue Our Story 📖</button>
          )}
        </div>
      </article>
    </section>
  )
}
