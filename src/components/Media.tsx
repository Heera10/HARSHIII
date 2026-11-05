import { useRef, useState } from 'react'
import type { MediaItem } from '../data/media'
import { Modal } from './Modal'

interface PhotoProps { item: MediaItem; crop?: boolean; tilt?: number; caption?: boolean; className?: string }

/** Lavender polaroid. Shows the full, uncropped photo by default; `crop` makes a face-aware thumbnail
 *  and the full original is always one tap away in the lightbox. */
export function PhotoFrame({ item, crop = false, tilt = 0, caption = true, className = '' }: PhotoProps) {
  const [open, setOpen] = useState(false)
  return (
    <figure className={`polaroid ${className}`} style={{ ['--tilt' as string]: `${tilt}deg` }}>
      <button className="polaroid-btn" onClick={() => setOpen(true)} aria-label={`Open full photo: ${item.alt}`}>
        <img
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading="lazy"
          decoding="async"
          className={crop ? 'crop' : ''}
          style={crop ? { objectPosition: item.focus } : undefined}
        />
        <span className="zoom-hint" aria-hidden="true">🔍 view full</span>
      </button>
      {caption && <figcaption>{item.caption}</figcaption>}
      {open && (
        <Modal onClose={() => setOpen(false)} label="Full photo" className="lightbox" closeText="Close photo">
          <img className="lightbox-img" src={item.original ?? item.src} alt={item.alt} />
          <p className="lightbox-cap">{item.caption}</p>
          {item.original && <a className="btn ghost" href={item.original} target="_blank" rel="noreferrer">Open original file</a>}
        </Modal>
      )}
    </figure>
  )
}

interface VideoProps { item: MediaItem; tilt?: number; caption?: boolean; className?: string; maxWidth?: number }

/** Lavender video card: poster + custom play button, native controls always available, never autoplays. */
export function VideoCard({ item, tilt = 0, caption = true, className = '', maxWidth }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <figure className={`polaroid video ${className}`} style={{ ['--tilt' as string]: `${tilt}deg`, maxWidth }}>
      <div className="video-wrap" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
        {failed ? (
          <p className="video-fail">
            This video couldn't play in your browser. <a href={item.src} download>Download it instead</a>.
          </p>
        ) : (
          <video
            ref={ref}
            controls
            playsInline
            preload="metadata"
            poster={item.poster}
            aria-label={item.alt}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setFailed(true)}
          >
            <source src={item.src} type="video/mp4" />
          </video>
        )}
        {!playing && !failed && (
          <button className="play-btn" aria-label={`Play video: ${item.caption}`} onClick={() => ref.current?.play()}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </button>
        )}
      </div>
      {caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  )
}

export function MediaFrame(p: { item: MediaItem; tilt?: number; className?: string; crop?: boolean }) {
  return p.item.type === 'photo'
    ? <PhotoFrame item={p.item} tilt={p.tilt} className={p.className} crop={p.crop} />
    : <VideoCard item={p.item} tilt={p.tilt} className={p.className} />
}
