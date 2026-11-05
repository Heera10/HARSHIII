import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { approvedStories } from './data/approvedStories'
import { loveNotes } from './data/loveNotes'
import { openWhenLetters } from './data/openWhenLetters'
import { media } from './data/media'
import fs from 'node:fs'
import path from 'node:path'

const strip = (s: string) => s.replace(/\*\*/g, '').replace(/\*/g, '')
const enter = async () => {
  const u = userEvent.setup()
  render(<App />)
  await u.click(screen.getByRole('button', { name: 'Enter Our Universe ✨' }))
  return u
}

describe('Our Little Universe', () => {
  it('welcome screen has the exact welcome copy and an Enter button', () => {
    render(<App />)
    expect(screen.getByText(/Some people enter our lives quietly/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Our Little Universe, Cutiepiee 💜🌙')
    cleanup()
  })

  it('all six chapters render every paragraph in order, via next/prev/index', async () => {
    const u = await enter()
    await u.click(screen.getByRole('button', { name: 'Start from Chapter 1 ✨' }))
    for (let i = 0; i < approvedStories.length; i++) {
      const ch = approvedStories[i]
      const article = document.querySelector('article.reader') as HTMLElement
      expect(within(article).getByRole('heading', { level: 2 })).toHaveTextContent(ch.title)
      const rendered = Array.from(article.querySelectorAll('.prose p')).map((p) => p.textContent)
      expect(rendered).toEqual(ch.body.split(/\n{2,}/).map(strip))
      if (ch.subtitle) expect(article.querySelector('.chapter-sub')).toHaveTextContent(ch.subtitle)
      if (i < approvedStories.length - 1) await u.click(screen.getByRole('button', { name: /^Continue Our Story/ }))
    }
    await u.click(screen.getByRole('button', { name: 'Chapter Index' }))
    expect(screen.getAllByRole('button', { name: /Chapter \d/ }).length).toBeGreaterThanOrEqual(6)
    await u.click(screen.getAllByRole('button', { name: /^Chapter 6/ })[0])
    await u.click(screen.getByRole('button', { name: '‹ Previous' }))
    expect(screen.getByRole('heading', { level: 2, name: approvedStories[4].title })).toBeInTheDocument()
    cleanup()
  })

  it('has all sections, all 3 photos, all 4 videos, and no quiz', async () => {
    await enter()
    for (const t of [/IT'S YOUR DAY/, /Our Interactive Storybook/, /Our Little Memory Museum/, /Our Scrapbook/, /Our Little Secret World/, /OFFICIAL KISSIE DEPARTMENT/, /A Little Jar of Love/, /Open When Your Heart Needs/, /Things I Wish for You/, /One Last Thing, My Soul Sister/])
      expect(screen.getAllByRole('heading', { name: t }).length).toBeGreaterThan(0)
    const scrap = document.getElementById('scrapbook')!
    expect(scrap.querySelectorAll('img').length).toBe(3)
    expect(scrap.querySelectorAll('video').length).toBe(4)
    for (const v of Array.from(scrap.querySelectorAll('video'))) { expect(v.hasAttribute('autoplay')).toBe(false); expect(v.hasAttribute('controls')).toBe(true) }
    expect(document.body.textContent!.toLowerCase()).not.toContain('quiz')
    expect(document.body.textContent!.toLowerCase()).not.toContain('best friend')
    cleanup()
  })

  it('every media file referenced actually exists on disk', () => {
    for (const m of Object.values(media)) {
      for (const f of [m.src, m.poster, m.original].filter(Boolean) as string[]) {
        expect(fs.existsSync(path.join('public', f.replace(/^\.?\//, ''))), f).toBe(true)
      }
    }
  })

  it('museum exhibits open and link to the full chapter', async () => {
    const u = await enter()
    const items = screen.getAllByRole('button', { name: /Open exhibit/ })
    expect(items).toHaveLength(6)
    await u.click(items[5])
    const dlg = screen.getByRole('dialog')
    await u.click(within(dlg).getByRole('button', { name: /Read Chapter 6/ }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: approvedStories[5].title })).toBeInTheDocument()
    cleanup()
  })

  it('secret corner: cards, constellation, envelope', async () => {
    const u = await enter()
    const sc = document.getElementById('secret')!
    await u.click(within(sc).getAllByText('🌙 Tap to reveal')[0])
    expect(within(sc).getByText(/You are my safe place, Cutiepiee/)).toBeInTheDocument()
    await u.click(within(sc).getByRole('button', { name: /A small secret envelope/ }))
    expect(within(sc).getByText(/No matter how many people come into our lives/)).toBeInTheDocument()
    await u.click(within(sc).getByRole('button', { name: /Open Chapter 3/ }))
    expect(within(document.querySelector('article.reader') as HTMLElement).getByRole('heading', { level: 2 })).toHaveTextContent(approvedStories[2].title)
    cleanup()
  })

  it('kissie department buttons reveal messages and count', async () => {
    const u = await enter()
    await u.click(screen.getByRole('button', { name: 'Claim Your Daily Kissies 💋' }))
    await u.click(screen.getByRole('button', { name: 'Okay, One Last Kissie 😭💋' }))
    expect(document.querySelector('.counter strong')).toHaveTextContent('2')
    cleanup()
  })

  it('jar: picks notes, collects all 15 without repeats, favorites work', async () => {
    const u = await enter()
    const jar = document.getElementById('jar')!
    for (let i = 0; i < loveNotes.length; i++) await u.click(within(jar).getByRole('button', { name: /Pick a Note/ }))
    expect(within(jar).getByText(`${loveNotes.length} of ${loveNotes.length} notes collected`)).toBeInTheDocument()
    await u.click(within(jar).getByRole('button', { name: /Mark as favorite/ }))
    await u.click(within(jar).getByRole('button', { name: /Show favorites \(1\)/ }))
    expect(within(jar).getAllByRole('listitem')).toHaveLength(1)
    cleanup()
  })

  it('open-when letters: 8 envelopes, each opens a 150-250 word letter and closes', async () => {
    const u = await enter()
    const sec = document.getElementById('letters')!
    const envs = within(sec).getAllByRole('button')
    expect(envs).toHaveLength(8)
    for (let i = 0; i < 8; i++) {
      await u.click(within(sec).getAllByRole('button')[i])
      const dlg = screen.getByRole('dialog')
      const words = Array.from(dlg.querySelectorAll('p')).map((p) => p.textContent).join(' ').split(/\s+/).length
      expect(words).toBeGreaterThanOrEqual(150); expect(words).toBeLessThanOrEqual(250)
      expect(dlg).toHaveTextContent(openWhenLetters[i].paragraphs[1].slice(0, 30))
      await u.click(within(dlg).getByRole('button', { name: /Close Letter/ }))
      expect(screen.queryByRole('dialog')).toBeNull()
    }
    cleanup()
  })

  it('photo lightbox opens the original and closes with Escape', async () => {
    const u = await enter()
    const scrap = document.getElementById('scrapbook')!
    await u.click(within(scrap).getAllByRole('button', { name: /Open full photo/ })[0])
    expect(screen.getByRole('dialog').querySelector('img')!.getAttribute('src')).toMatch(/original\/.*\.png$/)
    await u.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    cleanup()
  })

  it('video play buttons call play()', async () => {
    const u = await enter()
    const scrap = document.getElementById('scrapbook')!
    await u.click(within(scrap).getAllByRole('button', { name: /Play video/ })[0])
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled()
    cleanup()
  })

  it('hidden surprises are real buttons that respond', async () => {
    const u = await enter()
    const secrets = screen.getAllByRole('button', { name: /a little secret to discover/ })
    expect(secrets.length).toBeGreaterThanOrEqual(6)
    await u.click(screen.getAllByRole('button', { name: /The moon/ })[0])
    expect(document.querySelector('.toast')).toHaveTextContent(/Even the moon knows/)
    cleanup()
  })

  it('wishes and final letter: exact closing lines, both end buttons work', async () => {
    const u = await enter()
    expect(screen.getByRole('button', { name: "There's One Last Letter for You 💌" })).toBeInTheDocument()
    const fin = document.getElementById('final')!
    expect(fin).toHaveTextContent('Happy Birthday, my Cutiepiee. Thank you for becoming such a beautiful part of my story. No matter how ordinary our beginning looked, I will always be grateful for the little universe we created along the way.')
    expect(fin).toHaveTextContent('With all my love, all my pagalpan, and an unlimited supply of kissies,')
    expect(fin.querySelector('strong')).toHaveTextContent('Your soul sister, forever. 💜🌙🫂')
    await u.click(within(fin).getByRole('button', { name: /Read Our Story Again/ }))
    expect(screen.getByRole('heading', { level: 2, name: /Our Interactive Storybook/ })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Return to Our Little Universe/ }))
    cleanup()
  })
})
