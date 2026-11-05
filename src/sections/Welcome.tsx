import { Moon } from '../components/Decor'
import { Secret, useFX } from '../components/FX'

export function Welcome({ onEnter }: { onEnter: () => void }) {
  const { toast, burst } = useFX()
  return (
    <main className="welcome">
      <button
        className="moon-btn"
        aria-label="The moon (a little secret to discover)"
        onClick={(e) => { toast('Even the moon knows you\'re my Cutiepiee. 🌙💜'); burst(e.currentTarget, ['🌙', '💜', '✨']) }}
      >
        <Moon />
      </button>
      <Secret className="tiny-star" label="A tiny star (a little secret to discover)" message="You found a little piece of my heart. 🥹" emojis={['⭐', '💜']}>✦</Secret>

      <p className="quote">“Some people enter our lives quietly… and somehow become our whole little universe.”</p>
      <h1 className="title">Welcome to Our Little Universe, Cutiepiee 💜🌙</h1>
      <p className="welcome-msg">
        “Babeeee, I made a tiny little universe just for you. A place filled with our memories, our pagalpan, our little secrets, our laughs, our emotions, and all the things that make us… US. Take your time, explore every little corner, and remember that every page was made with so much love for you.”
      </p>
      <button className="btn primary big" onClick={onEnter}>Enter Our Universe ✨</button>
    </main>
  )
}
