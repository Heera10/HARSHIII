import { useState } from 'react'
import { FXProvider, Sky, scrollToId } from './components/FX'
import { Nav } from './components/Nav'
import { Welcome } from './sections/Welcome'
import { Reveal } from './sections/Reveal'
import { Storybook } from './sections/Storybook'
import { Museum } from './sections/Museum'
import { Scrapbook } from './sections/Scrapbook'
import { SecretCorner } from './sections/SecretCorner'
import { Kissie } from './sections/Kissie'
import { JarOfLove } from './sections/Jar'
import { OpenWhen } from './sections/OpenWhen'
import { Wishes } from './sections/Wishes'
import { FinalLetter } from './sections/FinalLetter'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [chapter, setChapter] = useState<number | null>(null)

  const openChapter = (i: number) => { setChapter(i); scrollToId('storybook') }
  const enter = () => { setEntered(true); window.scrollTo(0, 0) }
  const readAgain = () => { setChapter(null); scrollToId('storybook') }

  return (
    <FXProvider>
      <Sky />
      {!entered ? (
        <Welcome onEnter={enter} />
      ) : (
        <div className="universe">
          <Nav />
          <main>
            <Reveal />
            <Storybook chapter={chapter} setChapter={setChapter} />
            <Museum onRead={openChapter} />
            <Scrapbook />
            <SecretCorner onRead={openChapter} />
            <Kissie />
            <JarOfLove />
            <OpenWhen />
            <Wishes />
            <FinalLetter onReadAgain={readAgain} />
          </main>
          <footer className="foot">Made with love, for Harshi. 💜🌙</footer>
        </div>
      )}
    </FXProvider>
  )
}
