import { useRef, useState } from 'react'
import { kissieMessages, lastKissieMessages } from '../data/extras'
import { useFX } from '../components/FX'

export function Kissie() {
  const { burst } = useFX()
  const [msg, setMsg] = useState('Your department is open. Come on in. 💋')
  const [count, setCount] = useState(0)
  const [pop, setPop] = useState(0)
  const last = useRef(-1)

  const claim = (e: React.MouseEvent<HTMLButtonElement>) => {
    let i = Math.floor(Math.random() * kissieMessages.length)
    if (i === last.current) i = (i + 1) % kissieMessages.length
    last.current = i
    setMsg(kissieMessages[i]); setCount((c) => c + 1); setPop((p) => p + 1)
    burst(e.currentTarget, ['💋', '💗', '🎀'], 8)
  }
  const lastOne = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMsg(lastKissieMessages[Math.floor(Math.random() * lastKissieMessages.length)])
    setCount((c) => c + 1); setPop((p) => p + 1)
    burst(e.currentTarget, ['💋', '💋', '😭', '💗', '🎀', '💜'], 18)
  }

  return (
    <section className="section kissie" id="kissie" aria-labelledby="k-title">
      <h2 id="k-title" className="section-title">THE OFFICIAL KISSIE DEPARTMENT 💋🎀</h2>
      <p className="section-sub">Managed by one very pagal girl. Applications accepted only from my Cutiepiee.</p>
      <div className="stamp" aria-hidden="true">APPROVED</div>
      <div className="kissie-actions">
        <button className="btn primary big" onClick={claim}>Claim Your Daily Kissies 💋</button>
        <button className="btn blush big" onClick={lastOne}>Okay, One Last Kissie 😭💋</button>
      </div>
      <p key={pop} className="kissie-msg pop" role="status" aria-live="polite">{msg}</p>
      <p className="counter">Kissies claimed today: <strong>{count}</strong> <span>(quota: unlimited)</span></p>
    </section>
  )
}
