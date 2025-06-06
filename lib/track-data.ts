// lib/sanity.ts
import { createClient } from '@sanity/client'

export interface Track {
  _id: string
  title: string
  time: string
  bpm: string
  tags: string[]
  imageUrl: string
  price: number // Changed to number for calculations
  featured?: boolean
  artist?: string
  genre?: string
  description?: string
  audioUrl?: string
  previewUrl?: string
}

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true, // Use CDN only in production
  apiVersion: '2023-05-03', // Updated to current API version
  token: process.env.SANITY_API_TOKEN // For write operations
})

// Fetch all tracks from Sanity
export const fetchTracks = async (): Promise<Track[]> => {
  try {
    const query = `*[_type == "track"]{
      _id,
      title,
      time,
      bpm,
      tags,
      "imageUrl": coverImage.asset->url,
      price,
      featured,
      artist,
      genre,
      description,
      "audioUrl": audioFile.asset->url,
      "previewUrl": previewAudio.asset->url
    }`

    const results = await sanityClient.fetch<Track[]>(query)
    return results.map(track => ({
      ...track,
      artist: track.artist,
      genre: track.genre,
      price: track.price
    }))
  } catch (error) {
    console.error('Failed to fetch tracks:', error)
    return []
  }
}

// Helper functions (now async since they use live data)
export const getFeaturedTrack = async (): Promise<Track | undefined> => {
  const tracks = await fetchTracks()
  return tracks.find(track => track.featured)
}

export const getTrackById = async (id: string): Promise<Track | undefined> => {
  const tracks = await fetchTracks()
  return tracks.find(track => track._id === id)
}

export const getTrackByTitle = async (title: string): Promise<Track | undefined> => {
  const tracks = await fetchTracks()
  return tracks.find(track => 
    track.title.toLowerCase() === title.toLowerCase()
  )
}

export const getTracksByTag = async (tag: string): Promise<Track[]> => {
  const tracks = await fetchTracks()
  return tracks.filter(track => 
    track.tags.some(t => 
      t.toLowerCase().includes(tag.toLowerCase())
    )
  )
}

export const getTracksByGenre = async (genre: string): Promise<Track[]> => {
  const tracks = await fetchTracks()
  return tracks.filter(track => 
    track.genre?.toLowerCase().includes(genre.toLowerCase())
  )
}

export const searchTracks = async (query: string): Promise<Track[]> => {
  const tracks = await fetchTracks()
  const lowercaseQuery = query.toLowerCase()
  
  return tracks.filter(track =>
    track.title.toLowerCase().includes(lowercaseQuery) ||
    (track.tags || []).some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    track.genre?.toLowerCase().includes(lowercaseQuery) ||
    track.description?.toLowerCase().includes(lowercaseQuery) ||
    track.artist?.toLowerCase().includes(lowercaseQuery)
  )
}

export const getAllTags = async (): Promise<string[]> => {
  const tracks = await fetchTracks()
  const allTags = tracks.flatMap(track => track.tags || [])
  return [...new Set(allTags)].sort()
}

export const getAllGenres = async (): Promise<string[]> => {
  const tracks = await fetchTracks()
  const allGenres = tracks
    .map(track => track.genre)
    .filter((genre): genre is string => !!genre)
    
  return [...new Set(allGenres)].sort()
}

export const getRandomTracks = async (count: number): Promise<Track[]> => {
  const tracks = await fetchTracks()
  const shuffled = [...tracks].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const getTotalTracksCount = async (): Promise<number> => {
  const tracks = await fetchTracks()
  return tracks.length
}

export const calculateTotalValue = async (trackIds: string[]): Promise<string> => {
  const tracks = await fetchTracks()
  const total = trackIds.reduce((sum, id) => {
    const track = tracks.find(t => t._id === id)
    return sum + (track?.price || 0)
  }, 0)

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS'
  }).format(total)
}