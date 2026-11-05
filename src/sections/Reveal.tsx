import { useMemo } from 'react'
import { Cake } from '../components/Decor'
import { Secret, scrollToId, useFX } from '../components/FX'

export function Reveal() {
  const { toast, burst } = useFX()
  const confetti = useMemo(() => Array.from({ length: 34 }, (_, i) => ({
    x: (i * 29) % 100, d: (i % 11) * 0.45, t: 7 + (i % 5), c: ['#C8B6FF', '#F4D9EB', '#E8DEFF', '#BCA8E8', '#FFF9FF'][i % 5], r: (i * 47) % 360,
  })), [])
  return (
    <section className="reveal" id="top" aria-labelledby="reveal-title">
      <div className="confetti" aria-hidden="true">
        {confetti.map((c, i) => <i key={i} style={{ left: `${c.x}%`, background: c.c, animationDelay: `${c.d}s`, animationDuration: `${c.t}s`, transform: `rotate(${c.r}deg)` }} />)}
      </div>
      <Secret className="reveal-moon" label="The moon (a little secret to discover)" message="Even the moon knows you're my Cutiepiee. 🌙💜" emojis={['🌙', '💜']}><span className="moon-orb small" /></Secret>
      <Secret className="reveal-star" label="A tiny star (a little secret to discover)" message="You found a little piece of my heart. 🥹" emojis={['⭐', '💜']}>✦</Secret>
      <Secret className="reveal-heart" label="A floating heart (a little secret to discover)" emojis={['💋', '💋', '💗', '💋']} message="Kissie burst! 💋💋💋">💗</Secret>

      <button className="cake-btn" aria-label="Birthday cake: tap to make a wish" onClick={(e) => { toast('Make a wish, Cutiepiee. 🕯️✨'); burst(e.currentTarget, ['🎉', '💜', '✨', '🎂'], 12) }}>
        <Cake />
      </button>
      <h2 id="reveal-title" className="display">IT'S YOUR DAY, CUTIEPIEEEE! 🎂💜</h2>
      <p className="hbd">Happy Birthday, Harshi!</p>
      <p className="date-line">November 6 — A Day That Belongs to Someone Very Special.</p>
      <p className="lead">
        Today is about celebrating you, babeeee. The girl who became so much more than someone I happened to meet. The girl who became a part of my little world, my comfort, my laughter, and my story. I hope this new year of your life brings you the kind of happiness that stays, the kind of love that feels safe, and the kind of peace your heart deserves.
      </p>
      <button className="btn primary big" onClick={() => scrollToId('storybook')}>Let's Relive Our Story 📖</button>
    </section>
  )
}
