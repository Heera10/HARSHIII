import { wishes, wishesMessage } from '../data/extras'
import { Secret, scrollToId } from '../components/FX'
import { Envelope } from '../components/Decor'

export function Wishes() {
  return (
    <section className="section" id="wishes" aria-labelledby="w-title">
      <Secret className="hidden-env" label="A hidden envelope (a little secret to discover)" message="Psst… you're loved more than this tiny website can explain." emojis={['💌', '💜']}><Envelope /></Secret>
      <h2 id="w-title" className="section-title">Things I Wish for You, Cutiepiee 🎂</h2>
      <ul className="wish-grid">
        {wishes.map((w, i) => (
          <li key={w.title} className="wish" style={{ animationDelay: `${i * 0.35}s` }}>
            <span className="wish-icon" aria-hidden="true">{w.icon}</span>
            <h3>{w.title}</h3>
            <p>{w.text}</p>
          </li>
        ))}
      </ul>
      <p className="lead wishes-msg">{wishesMessage}</p>
      <div className="center"><button className="btn primary big" onClick={() => scrollToId('final')}>There's One Last Letter for You 💌</button></div>
    </section>
  )
}
