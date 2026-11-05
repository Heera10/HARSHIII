import { scrollToId } from './FX'

const links = [
  ['storybook', 'Story'], ['museum', 'Museum'], ['scrapbook', 'Scrapbook'], ['secret', 'Secret Corner'],
  ['kissie', 'Kissies'], ['jar', 'Love Jar'], ['letters', 'Letters'], ['wishes', 'Wishes'], ['final', 'Final Letter'],
]

export function Nav() {
  return (
    <header className="nav">
      <button className="brand" onClick={() => scrollToId('top')} aria-label="Back to the top of Our Little Universe">🌙 Our Little Universe</button>
      <nav aria-label="Sections">
        <ul>
          {links.map(([id, label]) => (
            <li key={id}><button onClick={() => scrollToId(id)}>{label}</button></li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
