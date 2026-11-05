import { media, scrapbookOrder } from '../data/media'
import { MediaFrame } from '../components/Media'

export function Scrapbook() {
  return (
    <section className="section" id="scrapbook" aria-labelledby="scrap-title">
      <h2 id="scrap-title" className="section-title">Our Scrapbook 📸💜</h2>
      <p className="section-sub">Real moments, pasted in with love. Tap a photo to see it in full; videos only play when you press play.</p>
      <div className="scrapbook">
        {scrapbookOrder.map((id, i) => (
          <MediaFrame key={id} item={media[id]} tilt={[-2.2, 1.6, -1.2, 2.2, -1.8, 1.2, -2][i % 7]} />
        ))}
      </div>
    </section>
  )
}
