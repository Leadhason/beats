export interface Track {
  id: number
  title: string
  time: string
  bpm: string
  tags: string[]
  image: string
  price: string
  featured?: boolean
  artist?: string
  genre?: string
  description?: string
  audioUrl?: string
  previewUrl?: string
}

export const tracks: Track[] = [
  {
    id: 1,
    title: "Honour",
    time: "03:18",
    bpm: "145",
    tags: ["japanese", "type beat"],
    image: "/Cover-images/image-1.jpeg",
    price: "$39.95",
    featured: true,
    artist: "Jay Cactus",
    genre: "Hip Hop",
    description: "A hard-hitting Japanese-inspired type beat with traditional elements",
    audioUrl: "/audio/honour.mp3",
    previewUrl: "/audio/honour-preview.mp3",
  },
  {
    id: 2,
    title: "Luna",
    time: "03:35",
    bpm: "144",
    tags: ["UK Drill", "Nemzzz"],
    image: "/Cover-images/image-2.jpeg",
    price: "$39.95",
    artist: "Jay Cactus",
    genre: "UK Drill",
    description: "Dark and atmospheric UK Drill beat with heavy 808s",
    audioUrl: "/audio/luna.mp3",
    previewUrl: "/audio/luna-preview.mp3",
  },
  {
    id: 3,
    title: "Side",
    time: "03:47",
    bpm: "118",
    tags: ["Young Thug", "Future"],
    image: "/Cover-images/image-3.jpeg",
    price: "$39.95",
    artist: "Jay Cactus",
    genre: "Trap",
    description: "Melodic trap beat inspired by Young Thug and Future",
    audioUrl: "/audio/side.mp3",
    previewUrl: "/audio/side-preview.mp3",
  },
  {
    id: 4,
    title: "Tamper",
    time: "03:19",
    bpm: "140",
    tags: ["griselda", "boom bap"],
    image: "/Cover-images/image-4.jpeg",
    price: "$39.95",
    artist: "Jay Cactus",
    genre: "Boom Bap",
    description: "Classic boom bap beat with Griselda-style dark vibes",
    audioUrl: "/audio/tamper.mp3",
    previewUrl: "/audio/tamper-preview.mp3",
  },
  {
    id: 5,
    title: "Midnight",
    time: "03:42",
    bpm: "130",
    tags: ["dark", "atmospheric"],
    image: "/Cover-images/image-5.jpeg",
    price: "$39.95",
    artist: "Jay Cactus",
    genre: "Dark Trap",
    description: "Moody and atmospheric beat perfect for late night sessions",
    audioUrl: "/audio/midnight.mp3",
    previewUrl: "/audio/midnight-preview.mp3",
  },
  {
    id: 6,
    title: "Elevation",
    time: "03:28",
    bpm: "150",
    tags: ["energetic", "motivational"],
    image: "/Cover-images/image-6.jpeg",
    price: "$39.95",
    artist: "Jay Cactus",
    genre: "Hip Hop",
    description: "Uplifting and energetic beat to elevate your mood",
    audioUrl: "/audio/elevation.mp3",
    previewUrl: "/audio/elevation-preview.mp3",
  },
  {
    id: 7,
    title: "Neon Dreams",
    time: "03:55",
    bpm: "128",
    tags: ["synthwave", "retro"],
    image: "/Cover-images/image-7.jpeg",
    price: "$39.95",
    artist: "Jay Cactus",
    genre: "Synthwave",
    description: "Retro-futuristic synthwave beat with nostalgic vibes",
    audioUrl: "/audio/neon-dreams.mp3",
    previewUrl: "/audio/neon-dreams-preview.mp3",
  },
  {
    id: 8,
    title: "The Code",
    time: "03:33",
    bpm: "142",
    tags: ["street", "vibe", "hardcore"],
    image: "/Cover-images/image-8.jpeg",
    price: "$20.95",
    artist: "Jay Cactus",
    genre: "Hardcore Hip Hop",
    description: "Raw and gritty street beat with hardcore elements",
    audioUrl: "/audio/street-code.mp3",
    previewUrl: "/audio/street-code-preview.mp3",
  },
]

// Helper functions for working with tracks data
export const getFeaturedTrack = (): Track | undefined => {
  return tracks.find((track) => track.featured)
}

export const getTrackById = (id: number): Track | undefined => {
  return tracks.find((track) => track.id === id)
}

export const getTrackByTitle = (title: string): Track | undefined => {
  return tracks.find((track) => track.title.toLowerCase() === title.toLowerCase())
}

export const getTracksByTag = (tag: string): Track[] => {
  return tracks.filter((track) => track.tags.some((trackTag) => trackTag.toLowerCase().includes(tag.toLowerCase())))
}

export const getTracksByGenre = (genre: string): Track[] => {
  return tracks.filter((track) => track.genre?.toLowerCase().includes(genre.toLowerCase()))
}

export const searchTracks = (query: string): Track[] => {
  const lowercaseQuery = query.toLowerCase()
  return tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(lowercaseQuery) ||
      track.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      track.genre?.toLowerCase().includes(lowercaseQuery) ||
      track.description?.toLowerCase().includes(lowercaseQuery) ||
      track.artist?.toLowerCase().includes(lowercaseQuery),
  )
}

export const getAllTags = (): string[] => {
  const allTags = tracks.flatMap((track) => track.tags)
  return [...new Set(allTags)].sort()
}

export const getAllGenres = (): string[] => {
  const allGenres = tracks.map((track) => track.genre).filter(Boolean) as string[]
  return [...new Set(allGenres)].sort()
}

export const getRandomTracks = (count: number): Track[] => {
  const shuffled = [...tracks].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const getTotalTracksCount = (): number => {
  return tracks.length
}

export const calculateTotalValue = (trackIds: number[]): string => {
  const total = trackIds.reduce((sum, id) => {
    const track = getTrackById(id)
    if (track) {
      const price = Number.parseFloat(track.price.replace("$", ""))
      return sum + price
    }
    return sum
  }, 0)
  return `$${total.toFixed(2)}`
}
