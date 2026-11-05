const B = import.meta.env.BASE_URL

export interface MediaItem {
  id: string
  type: 'photo' | 'video'
  src: string // display version
  original?: string // untouched upload (photos)
  poster?: string
  alt: string
  caption: string
  width: number
  height: number
  focus: string // CSS object-position used only for cropped thumbnails
}

export const media: Record<string, MediaItem> = {
  office: {
    id: 'office', type: 'photo', src: `${B}media/office-saree.webp`, original: `${B}media/original/office-saree.png`,
    alt: 'Harshi and me standing together at the office in sarees, beside a flower garland and a petal rangoli',
    caption: 'Two girls, one office, one flower rangoli. Little did we know. 🌸',
    width: 900, height: 1600, focus: '50% 40%',
  },
  night: {
    id: 'night', type: 'photo', src: `${B}media/night-snack.webp`, original: `${B}media/original/night-snack.png`,
    alt: 'Harshi and me outdoors at night, each taking a bite of a snack',
    caption: 'Night air, shared food, and zero plans. 🌙',
    width: 900, height: 1600, focus: '50% 25%',
  },
  hearts: {
    id: 'hearts', type: 'photo', src: `${B}media/heart-selfie.webp`, original: `${B}media/original/heart-selfie.png`,
    alt: 'A cosy selfie of Harshi and me with pink heart stickers floating above our heads',
    caption: 'Hearts on our heads, and so many more in our hearts. 💗',
    width: 899, height: 1599, focus: '50% 15%',
  },
  v1: {
    id: 'v1', type: 'video', src: `${B}media/video-1.mp4`, poster: `${B}media/posters/video-1.jpg`,
    alt: 'Video of Harshi and me smiling at a cafe table with heart stickers on our heads',
    caption: 'Our pagalpan, in motion. 🎀', width: 480, height: 848, focus: '50% 30%',
  },
  v2: {
    id: 'v2', type: 'video', src: `${B}media/video-2.mp4`, poster: `${B}media/posters/video-2.jpg`,
    alt: 'Video of Harshi with heart stickers on her head, a soft moment at a cafe',
    caption: 'A quiet little moment, saved forever. 🌙', width: 480, height: 848, focus: '50% 30%',
  },
  v3: {
    id: 'v3', type: 'video', src: `${B}media/video-3.mp4`, poster: `${B}media/posters/video-3.jpg`,
    alt: 'Short video of Harshi and me being silly together at a cafe',
    caption: 'Random moments are our favourite kind. 😂', width: 480, height: 848, focus: '50% 30%',
  },
  v4: {
    id: 'v4', type: 'video', src: `${B}media/video-4.mp4`, poster: `${B}media/posters/video-4.jpg`,
    alt: 'Video of Harshi and me wearing puppy-ear filters',
    caption: 'Puppy ears: approved by the Department of Pagalpan. 🐶💜', width: 478, height: 850, focus: '50% 30%',
  },
}

// which keepsakes sit under each approved chapter (never inside the story text)
export const chapterMedia: Record<number, string[]> = {
  1: ['office'],
  2: [],
  3: ['v2'],
  4: ['hearts', 'v1'],
  5: ['v3', 'v4'],
  6: ['night'],
}

export const scrapbookOrder = ['office', 'v1', 'night', 'v2', 'hearts', 'v3', 'v4']
