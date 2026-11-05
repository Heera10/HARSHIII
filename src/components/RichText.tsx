import type { ReactNode } from 'react'

/** Renders *italic* and **bold** exactly as written in the approved text. */
export function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })
}

export function Prose({ text }: { text: string }) {
  const paras = text.split(/\n{2,}/)
  return (
    <div className="prose">
      {paras.map((p, i) => {
        const cls = p.startsWith('**') ? 'pull' : p.startsWith('*') && !p.startsWith('**') && i === paras.length - 1 ? 'closing' : undefined
        return <p key={i} className={cls}>{inline(p)}</p>
      })}
    </div>
  )
}
